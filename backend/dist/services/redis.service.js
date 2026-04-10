"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
exports.getCache = getCache;
exports.setCache = setCache;
exports.deleteCache = deleteCache;
exports.deleteCachePattern = deleteCachePattern;
exports.flushCache = flushCache;
exports.storeRefreshToken = storeRefreshToken;
exports.getRefreshToken = getRefreshToken;
exports.deleteRefreshToken = deleteRefreshToken;
exports.testRedisConnection = testRedisConnection;
exports.disconnectRedis = disconnectRedis;
const ioredis_1 = __importDefault(require("ioredis"));
// Redis client configuration
const redisEnabled = !!process.env.REDIS_URL;
const redisUrl = process.env.REDIS_URL;
function createNoopRedis() {
    const multi = {
        zremrangebyscore: () => multi,
        zadd: () => multi,
        zcard: () => multi,
        expire: () => multi,
        exec: async () => [],
    };
    return {
        get: async () => null,
        setex: async () => 'OK',
        del: async () => 0,
        keys: async () => [],
        flushdb: async () => 'OK',
        ping: async () => 'PONG',
        quit: async () => 'OK',
        incr: async () => 0,
        expire: async () => 0,
        multi: () => multi,
        on: () => createNoopRedis(),
    };
}
// Create Redis client with retry logic
const redis = redisEnabled && redisUrl
    ? new ioredis_1.default(redisUrl, {
        maxRetriesPerRequest: 3,
        enableReadyCheck: true,
        connectTimeout: 10000,
        lazyConnect: true,
    })
    : createNoopRedis();
exports.redis = redis;
// Connection event handlers
if (redisEnabled) {
    redis.on('connect', () => {
        console.log('dY"- Connecting to Redis...');
    });
    redis.on('ready', () => {
        console.log('ƒo. Redis connection ready');
    });
    redis.on('error', (error) => {
        console.error('ƒ?O Redis connection error:', error.message);
    });
    redis.on('close', () => {
        console.log('Redis connection closed');
    });
    redis.on('reconnecting', () => {
        console.log('dY", Reconnecting to Redis...');
    });
}
// Cache utility functions
async function getCache(key) {
    try {
        const value = await redis.get(key);
        if (value) {
            return JSON.parse(value);
        }
        return null;
    }
    catch (error) {
        console.error(`Error getting cache for key ${key}:`, error);
        return null;
    }
}
async function setCache(key, value, ttlSeconds = 300 // Default 5 minutes
) {
    try {
        await redis.setex(key, ttlSeconds, JSON.stringify(value));
        return true;
    }
    catch (error) {
        console.error(`Error setting cache for key ${key}:`, error);
        return false;
    }
}
async function deleteCache(key) {
    try {
        await redis.del(key);
        return true;
    }
    catch (error) {
        console.error(`Error deleting cache for key ${key}:`, error);
        return false;
    }
}
async function deleteCachePattern(pattern) {
    try {
        const keys = await redis.keys(pattern);
        if (keys.length > 0) {
            await redis.del(...keys);
        }
        return true;
    }
    catch (error) {
        console.error(`Error deleting cache pattern ${pattern}:`, error);
        return false;
    }
}
async function flushCache() {
    try {
        await redis.flushdb();
        return true;
    }
    catch (error) {
        console.error('Error flushing cache:', error);
        return false;
    }
}
// Session storage for refresh tokens
async function storeRefreshToken(userId, token, ttlSeconds = 7 * 24 * 60 * 60 // 7 days
) {
    try {
        await redis.setex(`refresh_token:${userId}`, ttlSeconds, token);
        return true;
    }
    catch (error) {
        console.error(`Error storing refresh token for user ${userId}:`, error);
        return false;
    }
}
async function getRefreshToken(userId) {
    try {
        return await redis.get(`refresh_token:${userId}`);
    }
    catch (error) {
        console.error(`Error getting refresh token for user ${userId}:`, error);
        return null;
    }
}
async function deleteRefreshToken(userId) {
    try {
        await redis.del(`refresh_token:${userId}`);
        return true;
    }
    catch (error) {
        console.error(`Error deleting refresh token for user ${userId}:`, error);
        return false;
    }
}
// Health check
async function testRedisConnection() {
    if (!redisEnabled) {
        return false;
    }
    try {
        await redis.ping();
        console.log('ƒo. Redis connection successful');
        return true;
    }
    catch (error) {
        console.error('ƒ?O Redis connection failed:', error);
        return false;
    }
}
// Graceful shutdown
async function disconnectRedis() {
    if (!redisEnabled) {
        return;
    }
    await redis.quit();
    console.log('Redis disconnected');
}
exports.default = redis;
//# sourceMappingURL=redis.service.js.map