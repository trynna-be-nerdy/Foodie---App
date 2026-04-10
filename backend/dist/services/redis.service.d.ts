import Redis from 'ioredis';
declare const redis: Redis;
export declare function getCache<T>(key: string): Promise<T | null>;
export declare function setCache<T>(key: string, value: T, ttlSeconds?: number): Promise<boolean>;
export declare function deleteCache(key: string): Promise<boolean>;
export declare function deleteCachePattern(pattern: string): Promise<boolean>;
export declare function flushCache(): Promise<boolean>;
export declare function storeRefreshToken(userId: string, token: string, ttlSeconds?: number): Promise<boolean>;
export declare function getRefreshToken(userId: string): Promise<string | null>;
export declare function deleteRefreshToken(userId: string): Promise<boolean>;
export declare function testRedisConnection(): Promise<boolean>;
export declare function disconnectRedis(): Promise<void>;
export { redis };
export default redis;
//# sourceMappingURL=redis.service.d.ts.map