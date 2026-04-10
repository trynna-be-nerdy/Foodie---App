import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { storeRefreshToken, getRefreshToken, deleteRefreshToken } from './redis.service';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-super-secret-refresh-key';
const JWT_ACCESS_EXPIRY = 900; // 15 minutes in seconds
const JWT_REFRESH_EXPIRY = 604800; // 7 days in seconds
const BCRYPT_ROUNDS = 12;

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
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_ROUNDS);
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Generate access and refresh tokens
 */
export async function generateTokens(payload: TokenPayload): Promise<TokenPair> {
  const accessToken = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_ACCESS_EXPIRY,
  });

  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRY,
  });

  // Store refresh token in Redis
  await storeRefreshToken(payload.userId, refreshToken, JWT_REFRESH_EXPIRY);

  return { accessToken, refreshToken };
}

/**
 * Verify access token
 */
export function verifyAccessToken(token: string): TokenPayload {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
}

/**
 * Verify refresh token
 */
export function verifyRefreshToken(token: string): TokenPayload {
  return jwt.verify(token, JWT_REFRESH_SECRET) as TokenPayload;
}

/**
 * Refresh tokens using a valid refresh token
 */
export async function refreshTokens(refreshToken: string): Promise<TokenPair | null> {
  try {
    const payload = verifyRefreshToken(refreshToken);

    // Check if refresh token exists in Redis
    const storedToken = await getRefreshToken(payload.userId);

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
  } catch {
    return null;
  }
}

/**
 * Invalidate refresh token (logout)
 */
export async function invalidateRefreshToken(userId: string): Promise<boolean> {
  return deleteRefreshToken(userId);
}

