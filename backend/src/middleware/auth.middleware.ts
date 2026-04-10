import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../types';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';

interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

/**
 * Authentication middleware - verifies JWT access token
 */
export function authenticate(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
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
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // Attach user info to request
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        success: false,
        error: {
          message: 'Token has expired',
          code: 'TOKEN_EXPIRED',
        },
      });
      return;
    }

    if (error instanceof jwt.JsonWebTokenError) {
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
export const authenticateToken = authenticate;

/**
 * Optional authentication - doesn't fail if no token provided
 */
export function optionalAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      next();
      return;
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer === 'Bearer' && token) {
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
      req.user = {
        userId: decoded.userId,
        email: decoded.email,
        role: decoded.role,
      };
    }

    next();
  } catch {
    // Token invalid but optional, continue without user
    next();
  }
}

/**
 * Role-based authorization middleware
 */
export function authorize(...allowedRoles: string[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
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
