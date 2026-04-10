import Redis from 'ioredis';

// Redis client configuration
const redisEnabled = !!process.env.REDIS_URL;
const redisUrl = process.env.REDIS_URL;

function createNoopRedis(): Redis {
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
  } as unknown as Redis;
}

// Create Redis client with retry logic
const redis =
  redisEnabled && redisUrl
    ? new Redis(redisUrl, {
        maxRetriesPerRequest: 3,
        enableReadyCheck: true,
        connectTimeout: 10000,
        lazyConnect: true,
      })
    : createNoopRedis();

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
export async function getCache<T>(key: string): Promise<T | null> {
  try {
    const value = await redis.get(key);
    if (value) {
      return JSON.parse(value) as T;
    }
    return null;
  } catch (error) {
    console.error(`Error getting cache for key ${key}:`, error);
    return null;
  }
}

export async function setCache<T>(
  key: string,
  value: T,
  ttlSeconds: number = 300 // Default 5 minutes
): Promise<boolean> {
  try {
    await redis.setex(key, ttlSeconds, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error setting cache for key ${key}:`, error);
    return false;
  }
}

export async function deleteCache(key: string): Promise<boolean> {
  try {
    await redis.del(key);
    return true;
  } catch (error) {
    console.error(`Error deleting cache for key ${key}:`, error);
    return false;
  }
}

export async function deleteCachePattern(pattern: string): Promise<boolean> {
  try {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
    return true;
  } catch (error) {
    console.error(`Error deleting cache pattern ${pattern}:`, error);
    return false;
  }
}

export async function flushCache(): Promise<boolean> {
  try {
    await redis.flushdb();
    return true;
  } catch (error) {
    console.error('Error flushing cache:', error);
    return false;
  }
}

// Session storage for refresh tokens
export async function storeRefreshToken(
  userId: string,
  token: string,
  ttlSeconds: number = 7 * 24 * 60 * 60 // 7 days
): Promise<boolean> {
  try {
    await redis.setex(`refresh_token:${userId}`, ttlSeconds, token);
    return true;
  } catch (error) {
    console.error(`Error storing refresh token for user ${userId}:`, error);
    return false;
  }
}

export async function getRefreshToken(userId: string): Promise<string | null> {
  try {
    return await redis.get(`refresh_token:${userId}`);
  } catch (error) {
    console.error(`Error getting refresh token for user ${userId}:`, error);
    return null;
  }
}

export async function deleteRefreshToken(userId: string): Promise<boolean> {
  try {
    await redis.del(`refresh_token:${userId}`);
    return true;
  } catch (error) {
    console.error(`Error deleting refresh token for user ${userId}:`, error);
    return false;
  }
}

// Health check
export async function testRedisConnection(): Promise<boolean> {
  if (!redisEnabled) {
    return false;
  }
  try {
    await redis.ping();
    console.log('ƒo. Redis connection successful');
    return true;
  } catch (error) {
    console.error('ƒ?O Redis connection failed:', error);
    return false;
  }
}

// Graceful shutdown
export async function disconnectRedis(): Promise<void> {
  if (!redisEnabled) {
    return;
  }
  await redis.quit();
  console.log('Redis disconnected');
}

export { redis };
export default redis;
