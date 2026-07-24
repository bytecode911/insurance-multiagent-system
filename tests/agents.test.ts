import { describe, it, expect } from 'vitest';
import {
  UpgradeAgent,
  CiCdAgent,
  TestingAgent,
  DocumentationAgent,
  SecurityAgent,
  GovernanceAgent,
  CostOptimizationAgent,
  IntegrationAgent,
  StrategyAgent,
  RiskAgent,
  InnovationAgent,
} from '../agents/index.js';
import type { BaseAgent } from '../agents/index.js';

const agents: BaseAgent[] = [
  new UpgradeAgent(),
  new CiCdAgent(),
  new TestingAgent(),
  new DocumentationAgent(),
  new SecurityAgent(),
  new GovernanceAgent(),
  new CostOptimizationAgent(),
  new IntegrationAgent(),
  new StrategyAgent(),
  new RiskAgent(),
  new InnovationAgent(),
];

describe('all agents', () => {
  it.each(agents.map((a) => [a.name, a] as const))(
    '%s returns at least one finding with required fields',
    async (_name, agent) => {
      const results = await agent.run();
      expect(results.length).toBeGreaterThan(0);
      for (const finding of results) {
        expect(finding.component).toBeTruthy();
      }
    },
  );
});
