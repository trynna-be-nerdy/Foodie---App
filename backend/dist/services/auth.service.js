"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.verifyPassword = verifyPassword;
exports.generateTokens = generateTokens;
exports.verifyAccessToken = verifyAccessToken;
exports.verifyRefreshToken = verifyRefreshToken;
exports.refreshTokens = refreshTokens;
exports.invalidateRefreshToken = invalidateRefreshToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const redis_service_1 = require("./redis.service");
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-super-secret-refresh-key';
const JWT_ACCESS_EXPIRY = 900; // 15 minutes in seconds
const JWT_REFRESH_EXPIRY = 604800; // 7 days in seconds
const BCRYPT_ROUNDS = 12;
/**
 * Hash a password using bcrypt
 */
async function hashPassword(password) {
    return bcryptjs_1.default.hash(password, BCRYPT_ROUNDS);
}
/**
 * Verify a password against a hash
 */
async function verifyPassword(password, hash) {
    return bcryptjs_1.default.compare(password, hash);
}
/**
 * Generate access and refresh tokens
 */
async function generateTokens(payload) {
    const accessToken = jsonwebtoken_1.default.sign(payload, JWT_SECRET, {
        expiresIn: JWT_ACCESS_EXPIRY,
    });
    const refreshToken = jsonwebtoken_1.default.sign(payload, JWT_REFRESH_SECRET, {
        expiresIn: JWT_REFRESH_EXPIRY,
    });
    // Store refresh token in Redis
    await (0, redis_service_1.storeRefreshToken)(payload.userId, refreshToken, JWT_REFRESH_EXPIRY);
    return { accessToken, refreshToken };
}
/**
 * Verify access token
 */
function verifyAccessToken(token) {
    return jsonwebtoken_1.default.verify(token, JWT_SECRET);
}
/**
 * Verify refresh token
 */
function verifyRefreshToken(token) {
    return jsonwebtoken_1.default.verify(token, JWT_REFRESH_SECRET);
}
/**
 * Refresh tokens using a valid refresh token
 */
async function refreshTokens(refreshToken) {
    try {
        const payload = verifyRefreshToken(refreshToken);
        // Check if refresh token exists in Redis
        const storedToken = await (0, redis_service_1.getRefreshToken)(payload.userId);
        if (!storedToken || storedToken !== refreshToken) {
            return null;
        }
        // Generate new tokens
        const newTokens = await generateTokens({
            userId: payload.userId,
            email: payload.email,
            role: payload.role,
        });
        return newTokens;
    }
    catch {
        return null;
    }
}
/**
 * Invalidate refresh token (logout)
 */
async function invalidateRefreshToken(userId) {
    return (0, redis_service_1.deleteRefreshToken)(userId);
}
//# sourceMappingURL=auth.service.js.map