"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
/**
 * CORS configuration for the Foodie API
 */
// Parse allowed origins from environment variable
function getAllowedOrigins() {
    const originsEnv = process.env.CORS_ORIGINS || '';
    const origins = originsEnv
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean);
    // Add default development origins
    if (process.env.NODE_ENV === 'development') {
        const devOrigins = [
            'http://localhost:3000',
            'http://localhost:8081', // React Native Metro bundler
            'http://localhost:19000', // Expo
            'http://localhost:19006', // Expo web
        ];
        devOrigins.forEach((origin) => {
            if (!origins.includes(origin)) {
                origins.push(origin);
            }
        });
    }
    return origins;
}
const allowedOrigins = getAllowedOrigins();
exports.corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, Postman, etc.)
        if (!origin) {
            callback(null, true);
            return;
        }
        // Check if origin is in allowed list
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
            return;
        }
        // In development, allow all localhost origins
        if (process.env.NODE_ENV === 'development' && origin.includes('localhost')) {
            callback(null, true);
            return;
        }
        callback(new Error('Not allowed by CORS'));
    },
    credentials: true, // Allow cookies and credentials
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Accept',
        'Origin',
    ],
    exposedHeaders: [
        'X-RateLimit-Limit',
        'X-RateLimit-Remaining',
        'X-RateLimit-Reset',
        'X-Response-Time',
    ],
    maxAge: 86400, // 24 hours - cache preflight requests
    preflightContinue: false,
    optionsSuccessStatus: 204,
};
exports.default = exports.corsOptions;
//# sourceMappingURL=cors.config.js.map