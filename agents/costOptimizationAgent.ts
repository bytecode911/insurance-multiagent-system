import { BaseAgent, AgentFinding } from './baseAgent.js';

export class CostOptimizationAgent extends BaseAgent {
  name = 'CostOptimizationAgent';

  async run(): Promise<AgentFinding[]> {
    this.logStart();
    const results: AgentFinding[] = [
      { component: 'Compute', check: 'Idle/underutilized instances', action: 'Right-size or schedule non-prod environments off-hours.', severity: 'low' },
      { component: 'Storage', check: 'Orphaned volumes/snapshots', action: 'Clean up unattached volumes and stale snapshots.', severity: 'low' },
      { component: 'Commitments', check: 'Reserved/savings plan coverage', action: 'Recommend reserved capacity for steady-state workloads.', severity: 'medium' },
    ];
    this.logComplete(results);
    return results;
  }
}
