"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
exports.authenticate = authenticate;
exports.optionalAuth = optionalAuth;
exports.authorize = authorize;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';
/**
 * Authentication middleware - verifies JWT access token
 */
function authenticate(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json({
                success: false,
                error: {
                    message: 'Authorization header is missing',
                    code: 'AUTH_HEADER_MISSING',
                },
            });
            return;
        }
        const [bearer, token] = authHeader.split(' ');
        if (bearer !== 'Bearer' || !token) {
            res.status(401).json({
                success: false,
                error: {
                    message: 'Invalid authorization format. Use: Bearer <token>',
                    code: 'AUTH_FORMAT_INVALID',
                },
            });
            return;
        }
        // Verify the token
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        // Attach user info to request
        req.user = {
            userId: decoded.userId,
            email: decoded.email,
            role: decoded.role,
        };
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            res.status(401).json({
                success: false,
                error: {
                    message: 'Token has expired',
                    code: 'TOKEN_EXPIRED',
                },
            });
            return;
        }
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            res.status(401).json({
                success: false,
                error: {
                    message: 'Invalid token',
                    code: 'TOKEN_INVALID',
                },
            });
            return;
        }
        res.status(500).json({
            success: false,
            error: {
                message: 'Authentication error',
                code: 'AUTH_ERROR',
            },
        });
    }
}
// Backward-compatible alias for existing route imports.
exports.authenticateToken = authenticate;
/**
 * Optional authentication - doesn't fail if no token provided
 */
function optionalAuth(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            next();
            return;
        }
        const [bearer, token] = authHeader.split(' ');
        if (bearer === 'Bearer' && token) {
            const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            req.user = {
                userId: decoded.userId,
                email: decoded.email,
                role: decoded.role,
            };
        }
        next();
    }
    catch {
        // Token invalid but optional, continue without user
        next();
    }
}
/**
 * Role-based authorization middleware
 */
function authorize(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({
                success: false,
                error: {
                    message: 'Authentication required',
                    code: 'AUTH_REQUIRED',
                },
            });
            return;
        }
        if (!allowedRoles.includes(req.user.role)) {
            res.status(403).json({
                success: false,
                error: {
                    message: 'Insufficient permissions',
                    code: 'FORBIDDEN',
                },
            });
            return;
        }
        next();
    };
}
//# sourceMappingURL=auth.middleware.js.map