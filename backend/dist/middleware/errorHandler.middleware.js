"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
exports.notFoundHandler = notFoundHandler;
exports.asyncHandler = asyncHandler;
const errors_1 = require("../utils/errors");
/**
 * Global error handling middleware
 * Must be placed after all routes
 */
function errorHandler(err, req, res, _next) {
    const isDevelopment = process.env.NODE_ENV === 'development';
    // Log error
    console.error('Error:', {
        message: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method,
        timestamp: new Date().toISOString(),
    });
    // Handle AppError (our custom errors)
    if (err instanceof errors_1.AppError) {
        const response = {
            success: false,
            error: {
                message: err.message,
                code: err.code,
                details: err.details,
            },
        };
        if (isDevelopment) {
            response.error.stack = err.stack;
        }
        res.status(err.statusCode).json(response);
        return;
    }
    // Handle Prisma errors
    if (err.name === 'PrismaClientKnownRequestError') {
        const prismaError = err;
        let message = 'Database error occurred';
        let statusCode = 500;
        let code = 'DATABASE_ERROR';
        switch (prismaError.code) {
            case 'P2002':
                message = `Duplicate value for: ${prismaError.meta?.target?.join(', ')}`;
                statusCode = 409;
                code = 'CONFLICT';
                break;
            case 'P2025':
                message = 'Record not found';
                statusCode = 404;
                code = 'NOT_FOUND';
                break;
            case 'P2003':
                message = 'Foreign key constraint violation';
                statusCode = 400;
                code = 'VALIDATION_ERROR';
                break;
        }
        res.status(statusCode).json({
            success: false,
            error: {
                message,
                code,
                ...(isDevelopment && { stack: err.stack }),
            },
        });
        return;
    }
    // Handle JWT errors
    if (err.name === 'JsonWebTokenError') {
        res.status(401).json({
            success: false,
            error: {
                message: 'Invalid token',
                code: 'TOKEN_INVALID',
                ...(isDevelopment && { stack: err.stack }),
            },
        });
        return;
    }
    if (err.name === 'TokenExpiredError') {
        res.status(401).json({
            success: false,
            error: {
                message: 'Token has expired',
                code: 'TOKEN_EXPIRED',
                ...(isDevelopment && { stack: err.stack }),
            },
        });
        return;
    }
    // Handle validation errors (e.g., from Joi or Zod)
    if (err.name === 'ValidationError' || err.name === 'ZodError') {
        res.status(400).json({
            success: false,
            error: {
                message: 'Validation failed',
                code: 'VALIDATION_ERROR',
                details: err.message,
                ...(isDevelopment && { stack: err.stack }),
            },
        });
        return;
    }
    // Handle syntax errors in JSON body
    if (err instanceof SyntaxError && 'body' in err) {
        res.status(400).json({
            success: false,
            error: {
                message: 'Invalid JSON in request body',
                code: 'INVALID_JSON',
            },
        });
        return;
    }
    // Default error response for unexpected errors
    const response = {
        success: false,
        error: {
            message: isDevelopment ? err.message : 'An unexpected error occurred',
            code: 'INTERNAL_ERROR',
        },
    };
    if (isDevelopment) {
        response.error.stack = err.stack;
    }
    res.status(500).json(response);
}
/**
 * 404 Not Found handler
 * Place before error handler
 */
function notFoundHandler(req, res) {
    res.status(404).json({
        success: false,
        error: {
            message: `Route ${req.method} ${req.path} not found`,
            code: 'ROUTE_NOT_FOUND',
        },
    });
}
/**
 * Async handler wrapper to catch async errors
 * Express 5 handles this natively, but this provides explicit handling
 */
function asyncHandler(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}
//# sourceMappingURL=errorHandler.middleware.js.map