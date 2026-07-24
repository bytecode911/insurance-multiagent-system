import { logger } from '../core/logger.js';

export interface AgentFinding {
  component: string;
  check?: string;
  current?: string;
  recommended?: string;
  action?: string;
  notes?: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
}

export abstract class BaseAgent {
  abstract name: string;

  abstract run(): Promise<AgentFinding[]>;

  protected logStart(): void {
    logger.info(`[${this.name}] Starting...`);
  }

  protected logComplete(results: AgentFinding[]): void {
    logger.info({ count: results.length, results }, `[${this.name}] Completed.`);
  }
}
