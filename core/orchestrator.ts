import { eventBus } from './eventBus.js';
import { logger } from './logger.js';
import {
  ComplianceAgent,
  RiskAgent,
  UpgradeAgent,
  CiCdAgent,
  TestingAgent,
  DocumentationAgent,
  SecurityAgent,
  GovernanceAgent,
  CostOptimizationAgent,
  IntegrationAgent,
  StrategyAgent,
  InnovationAgent,
} from '../agents/index.js';

// PR opened: run the code-quality/compliance/security gate
eventBus.on('pr_opened', async () => {
  logger.info('Event: pr_opened — running CI/CD, testing, compliance, and security checks');
  await new CiCdAgent().run();
  await new TestingAgent().run();
  await new ComplianceAgent().run();
  await new SecurityAgent().run();
  await new DocumentationAgent().run();
});

// Claim submitted: run risk/fraud checks
eventBus.on('claim_submitted', async (payload) => {
  logger.info({ payload }, 'Event: claim_submitted');
  await new RiskAgent().run();
});

// Policy bound: run governance/compliance checks
eventBus.on('policy_bound', async (payload) => {
  logger.info({ payload }, 'Event: policy_bound');
  await new ComplianceAgent().run();
  await new GovernanceAgent().run();
});

// Deployment requested: run the prod-readiness gate
eventBus.on('deployment_requested', async (payload) => {
  logger.info({ payload }, 'Event: deployment_requested');
  await new SecurityAgent().run();
  await new CiCdAgent().run();
});

// Scheduled scan: org-wide sweep (upgrade, cost, strategy, innovation, integration)
eventBus.on('scheduled_scan', async () => {
  logger.info('Event: scheduled_scan — running org-wide sweep');
  await new UpgradeAgent().run();
  await new CostOptimizationAgent().run();
  await new IntegrationAgent().run();
  await new StrategyAgent().run();
  await new InnovationAgent().run();
});

// Demo boot: simulate a PR-opened event so `npm run orchestrator` shows output immediately.
if (process.env.NODE_ENV !== 'test') {
  eventBus.emit('pr_opened');
}
