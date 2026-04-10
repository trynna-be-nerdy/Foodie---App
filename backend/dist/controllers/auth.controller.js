"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = signup;
exports.login = login;
exports.refresh = refresh;
exports.logout = logout;
exports.forgotPassword = forgotPassword;
exports.resetPassword = resetPassword;
const zod_1 = require("zod");
const crypto_1 = __importDefault(require("crypto"));
const database_service_1 = require("../services/database.service");
const auth_service_1 = require("../services/auth.service");
// Validation schemas
const signupSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email format'),
    password: zod_1.z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number'),
    name: zod_1.z.string().min(2, 'Name must be at least 2 characters'),
});
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email format'),
    password: zod_1.z.string().min(1, 'Password is required'),
});
const forgotPasswordSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email format'),
});
const resetPasswordSchema = zod_1.z.object({
    token: zod_1.z.string().min(1, 'Reset token is required'),
    password: zod_1.z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number'),
});
// Cookie options
const REFRESH_TOKEN_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/',
};
/**
 * POST /api/v1/auth/signup
 * Register a new user
 */
async function signup(req, res) {
    try {
        const validation = signupSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({
                success: false,
                error: {
                    message: 'Validation failed',
                    code: 'VALIDATION_ERROR',
                    details: validation.error.issues,
                },
            });
            return;
        }
        const { email, password, name } = validation.data;
        // Check if user already exists
        const existingUser = await database_service_1.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            res.status(409).json({
                success: false,
                error: {
                    message: 'Email already registered',
                    code: 'EMAIL_EXISTS',
                },
            });
            return;
        }
        // Hash password and create user
        const passwordHash = await (0, auth_service_1.hashPassword)(password);
        const user = await database_service_1.prisma.user.create({
            data: {
                email,
                passwordHash,
                name,
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
            },
        });
        // Generate tokens
        const tokens = await (0, auth_service_1.generateTokens)({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        // Set refresh token in HTTP-only cookie
        res.cookie('refreshToken', tokens.refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);
        res.status(201).json({
            success: true,
            data: {
                user,
                accessToken: tokens.accessToken,
            },
        });
    }
    catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({
            success: false,
            error: {
                message: 'Failed to create account',
                code: 'SIGNUP_FAILED',
            },
        });
    }
}
/**
 * POST /api/v1/auth/login
 * Authenticate user and return tokens
 */
async function login(req, res) {
    try {
        const validation = loginSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({
                success: false,
                error: {
                    message: 'Validation failed',
                    code: 'VALIDATION_ERROR',
                    details: validation.error.issues,
                },
            });
            return;
        }
        const { email, password } = validation.data;
        // Find user
        const user = await database_service_1.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            res.status(401).json({
                success: false,
                error: {
                    message: 'Invalid email or password',
                    code: 'INVALID_CREDENTIALS',
                },
            });
            return;
        }
        // Verify password
        const isValidPassword = await (0, auth_service_1.verifyPassword)(password, user.passwordHash);
        if (!isValidPassword) {
            res.status(401).json({
                success: false,
                error: {
                    message: 'Invalid email or password',
                    code: 'INVALID_CREDENTIALS',
                },
            });
            return;
        }
        // Generate tokens
        const tokens = await (0, auth_service_1.generateTokens)({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        // Set refresh token in HTTP-only cookie
        res.cookie('refreshToken', tokens.refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);
        res.status(200).json({
            success: true,
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    profilePhoto: user.profilePhoto,
                },
                accessToken: tokens.accessToken,
            },
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            error: {
                message: 'Login failed',
                code: 'LOGIN_FAILED',
            },
        });
    }
}
/**
 * POST /api/v1/auth/refresh
 * Refresh access token using refresh token from cookie
 */
async function refresh(req, res) {
    try {
        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken) {
            res.status(401).json({
                success: false,
                error: {
                    message: 'Refresh token not found',
                    code: 'REFRESH_TOKEN_MISSING',
                },
            });
            return;
        }
        const tokens = await (0, auth_service_1.refreshTokens)(refreshToken);
        if (!tokens) {
            // Clear invalid cookie
            res.clearCookie('refreshToken', { path: '/' });
            res.status(401).json({
                success: false,
                error: {
                    message: 'Invalid or expired refresh token',
                    code: 'REFRESH_TOKEN_INVALID',
                },
            });
            return;
        }
        // Set new refresh token in cookie
        res.cookie('refreshToken', tokens.refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);
        res.status(200).json({
            success: true,
            data: {
                accessToken: tokens.accessToken,
            },
        });
    }
    catch (error) {
        console.error('Token refresh error:', error);
        res.status(500).json({
            success: false,
            error: {
                message: 'Token refresh failed',
                code: 'REFRESH_FAILED',
            },
        });
    }
}
/**
 * POST /api/v1/auth/logout
 * Invalidate refresh token and clear cookie
 */
async function logout(req, res) {
    try {
        if (req.user?.userId) {
            await (0, auth_service_1.invalidateRefreshToken)(req.user.userId);
        }
        // Clear the cookie
        res.clearCookie('refreshToken', { path: '/' });
        res.status(200).json({
            success: true,
            data: {
                message: 'Logged out successfully',
            },
        });
    }
    catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            error: {
                message: 'Logout failed',
                code: 'LOGOUT_FAILED',
            },
        });
    }
}
/**
 * POST /api/v1/auth/forgot-password
 * Send password reset email
 */
async function forgotPassword(req, res) {
    try {
        const validation = forgotPasswordSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({
                success: false,
                error: {
                    message: 'Validation failed',
                    code: 'VALIDATION_ERROR',
                    details: validation.error.issues,
                },
            });
            return;
        }
        const { email } = validation.data;
        // Find user
        const user = await database_service_1.prisma.user.findUnique({
            where: { email },
        });
        // Always return success to prevent email enumeration
        if (!user) {
            res.status(200).json({
                success: true,
                data: {
                    message: 'If an account exists with this email, a reset link has been sent',
                },
            });
            return;
        }
        // Generate reset token
        const resetToken = crypto_1.default.randomBytes(32).toString('hex');
        const resetTokenHash = crypto_1.default.createHash('sha256').update(resetToken).digest('hex');
        const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
        // Store reset token in database (we'll add these fields to User model)
        // For now, we'll use a simple approach with RefreshToken table
        await database_service_1.prisma.refreshToken.create({
            data: {
                token: `reset_${resetTokenHash}`,
                userId: user.id,
                expiresAt: resetTokenExpiry,
            },
        });
        // TODO: Send email with reset link
        // In production, use a service like SendGrid, AWS SES, or Nodemailer
        console.log(`Password reset link: ${process.env.APP_URL}/reset-password?token=${resetToken}`);
        res.status(200).json({
            success: true,
            data: {
                message: 'If an account exists with this email, a reset link has been sent',
                // For development only - remove in production
                ...(process.env.NODE_ENV === 'development' && { resetToken }),
            },
        });
    }
    catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({
            success: false,
            error: {
                message: 'Failed to process request',
                code: 'FORGOT_PASSWORD_FAILED',
            },
        });
    }
}
/**
 * POST /api/v1/auth/reset-password
 * Reset password using token
 */
async function resetPassword(req, res) {
    try {
        const validation = resetPasswordSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({
                success: false,
                error: {
                    message: 'Validation failed',
                    code: 'VALIDATION_ERROR',
                    details: validation.error.issues,
                },
            });
            return;
        }
        const { token, password } = validation.data;
        // Hash the provided token to compare with stored hash
        const tokenHash = crypto_1.default.createHash('sha256').update(token).digest('hex');
        // Find reset token
        const resetTokenRecord = await database_service_1.prisma.refreshToken.findFirst({
            where: {
                token: `reset_${tokenHash}`,
                expiresAt: {
                    gt: new Date(),
                },
            },
        });
        if (!resetTokenRecord) {
            res.status(400).json({
                success: false,
                error: {
                    message: 'Invalid or expired reset token',
                    code: 'RESET_TOKEN_INVALID',
                },
            });
            return;
        }
        // Hash new password and update user
        const passwordHash = await (0, auth_service_1.hashPassword)(password);
        await database_service_1.prisma.user.update({
            where: { id: resetTokenRecord.userId },
            data: { passwordHash },
        });
        // Delete the used reset token
        await database_service_1.prisma.refreshToken.delete({
            where: { id: resetTokenRecord.id },
        });
        // Invalidate all existing refresh tokens for this user
        await database_service_1.prisma.refreshToken.deleteMany({
            where: { userId: resetTokenRecord.userId },
        });
        res.status(200).json({
            success: true,
            data: {
                message: 'Password reset successfully',
            },
        });
    }
    catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({
            success: false,
            error: {
                message: 'Failed to reset password',
                code: 'RESET_PASSWORD_FAILED',
            },
        });
    }
}
//# sourceMappingURL=auth.controller.js.map