import { pino } from 'pino';
import { ENV_CONFIG } from './env.js';

const isDocker = ENV_CONFIG.DOCKER === 'true';

export const logger = pino({
  level: ENV_CONFIG.NODE_ENV === 'production' ? 'info' : 'debug',
  ...(isDocker ? {} : {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: true,
        ignore: 'pid,hostname',
      },
    },
  }),
}); 