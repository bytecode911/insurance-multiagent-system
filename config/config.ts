import dotenv from 'dotenv';
dotenv.config();

export interface AppConfig {
  complianceStandard: string;
  logLevel: string;
  redisUrl: string;
  cloudRegion: string;
  secretsVaultUrl: string;
}

/**
 * Reads config fresh from process.env on every call. Use this (rather than
 * the `config` snapshot below) anywhere a value might change at runtime —
 * e.g. tests that mutate process.env, or COMPLIANCE_STANDARD overrides.
 */
export function getConfig(): AppConfig {
  return {
    complianceStandard: process.env.COMPLIANCE_STANDARD || 'irdai',
    logLevel: process.env.LOG_LEVEL || 'info',
    redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
    cloudRegion: process.env.CLOUD_REGION || 'us-east-1',
    secretsVaultUrl: process.env.SECRETS_VAULT_URL || '',
  };
}

/** Snapshot taken at boot — fine for values like log level that are set once at startup. */
export const config = getConfig();
