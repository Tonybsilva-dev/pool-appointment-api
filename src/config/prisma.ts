import { PrismaClient } from '@prisma/client';
import { softDeleteMiddleware } from './prisma-middleware';
import { ENV_CONFIG } from './env';

const prisma: PrismaClient = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
  datasources: {
    db: {
      url: ENV_CONFIG.DATABASE_URL
    }
  }
});

export { prisma };
prisma.$use(softDeleteMiddleware);
