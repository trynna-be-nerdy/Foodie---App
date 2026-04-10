interface TokenPayload {
    userId: string;
    email: string;
    role: string;
}
interface TokenPair {
    accessToken: string;
    refreshToken: string;
}
/**
 * Hash a password using bcrypt
 */
export declare function hashPassword(password: string): Promise<string>;
/**
 * Verify a password against a hash
 */
export declare function verifyPassword(password: string, hash: string): Promise<boolean>;
/**
 * Generate access and refresh tokens
 */
export declare function generateTokens(payload: TokenPayload): Promise<TokenPair>;
/**
 * Verify access token
 */
export declare function verifyAccessToken(token: string): TokenPayload;
/**
 * Verify refresh token
 */
export declare function verifyRefreshToken(token: string): TokenPayload;
/**
 * Refresh tokens using a valid refresh token
 */
export declare function refreshTokens(refreshToken: string): Promise<TokenPair | null>;
/**
 * Invalidate refresh token (logout)
 */
export declare function invalidateRefreshToken(userId: string): Promise<boolean>;
export {};
//# sourceMappingURL=auth.service.d.ts.map