import { BaseAgent, AgentFinding } from './baseAgent.js';

export class DocumentationAgent extends BaseAgent {
  name = 'DocumentationAgent';

  async run(): Promise<AgentFinding[]> {
    this.logStart();
    const results: AgentFinding[] = [
      { component: 'README', check: 'Setup & run instructions present', action: 'Flag repos missing a README with local dev steps.', severity: 'low' },
      { component: 'API Docs', check: 'OpenAPI/Swagger spec freshness', action: 'Regenerate API docs when contracts drift from code.', severity: 'medium' },
      { component: 'ADR', check: 'Architecture decision records', action: 'Ensure major migrations are captured as ADRs.', severity: 'low' },
    ];
    this.logComplete(results);
    return results;
  }
}
