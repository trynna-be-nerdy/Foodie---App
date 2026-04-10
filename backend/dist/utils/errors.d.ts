/**
 * Custom error classes for the Foodie API
 */
export declare class AppError extends Error {
    readonly statusCode: number;
    readonly code: string;
    readonly isOperational: boolean;
    readonly details?: unknown;
    constructor(message: string, statusCode?: number, code?: string, details?: unknown);
}
export declare class ValidationError extends AppError {
    constructor(message: string, details?: unknown);
}
export declare class AuthenticationError extends AppError {
    constructor(message?: string);
}
export declare class AuthorizationError extends AppError {
    constructor(message?: string);
}
export declare class NotFoundError extends AppError {
    constructor(resource?: string);
}
export declare class ConflictError extends AppError {
    constructor(message?: string);
}
export declare class RateLimitError extends AppError {
    constructor(message?: string);
}
export declare class DatabaseError extends AppError {
    constructor(message?: string);
}
export declare class ExternalServiceError extends AppError {
    constructor(service: string, message?: string);
}
//# sourceMappingURL=errors.d.ts.map