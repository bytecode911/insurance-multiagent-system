import { describe, it, expect } from 'vitest';
import { ComplianceAgent } from '../agents/complianceAgent.js';

describe('ComplianceAgent', () => {
  it('should return compliance checks with the correct standard', async () => {
    process.env.COMPLIANCE_STANDARD = 'gdpr';
    const agent = new ComplianceAgent();
    const results = await agent.run();
    expect(results[0].action).toContain('GDPR');
  });

  it('should always include a data retention check', async () => {
    const agent = new ComplianceAgent();
    const results = await agent.run();
    expect(results.some((r) => r.component === 'Data Retention')).toBe(true);
  });
});
