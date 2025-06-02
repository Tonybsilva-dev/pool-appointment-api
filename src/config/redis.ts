import Redis from 'ioredis';
import { ENV_CONFIG } from './env';
import { logger } from './logger';

class RedisManager {
  private static instance: RedisManager;
  private client: Redis;

  private constructor() {
    this.client = new Redis(ENV_CONFIG.REDIS_URL);
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    this.client.on('error', (error: Error) => {
      logger.error('Redis connection error:', error);
    });

    this.client.on('connect', () => {
      logger.info('Redis connected successfully');
    });
  }

  public static getInstance(): RedisManager {
    if (!RedisManager.instance) {
      RedisManager.instance = new RedisManager();
    }
    return RedisManager.instance;
  }

  public getClient(): Redis {
    return this.client;
  }

  public async get<T>(key: string): Promise<T | null> {
    try {
      const data = await this.client.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      logger.error('Error getting cache:', error);
      return null;
    }
  }

  public async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    try {
      const stringValue = JSON.stringify(value);
      if (ttl) {
        await this.client.setex(key, ttl, stringValue);
      } else {
        await this.client.set(key, stringValue);
      }
    } catch (error) {
      logger.error('Error setting cache:', error);
    }
  }

  public async del(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (error) {
      logger.error('Error deleting cache:', error);
    }
  }
}

export const redisManager = RedisManager.getInstance();
export const redis = redisManager.getClient();

export const getCache = async <T>(key: string): Promise<T | null> => {
  try {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    logger.error('Error getting cache:', error);
    return null;
  }
};

export const setCache = async <T>(key: string, value: T, ttl?: number): Promise<void> => {
  try {
    const stringValue = JSON.stringify(value);
    if (ttl) {
      await redis.setex(key, ttl, stringValue);
    } else {
      await redis.set(key, stringValue);
    }
  } catch (error) {
    logger.error('Error setting cache:', error);
  }
}; 