import pino from 'pino';
import { config } from '../config/config.js';

const isProd = process.env.NODE_ENV === 'production';

export const logger = pino({
  level: config.logLevel,
  // pino-pretty is a devDependency; only wire it in outside production
  // so a production install (npm ci --omit=dev) doesn't break at runtime.
  ...(isProd
    ? {}
    : {
        transport: {
          target: 'pino-pretty',
          options: { colorize: true },
        },
      }),
});
