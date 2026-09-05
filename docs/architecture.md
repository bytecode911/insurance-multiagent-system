# Architecture

## Event-driven orchestration

Agents don't call each other directly. They listen on a shared `eventBus` (`core/eventBus.ts`) and react to domain events:

| Event | Agents triggered | Purpose |
|---|---|---|
| `pr_opened` | CiCd, Testing, Compliance, Security, Documentation | Pre-merge quality gate |
| `claim_submitted` | Risk | Fraud/risk scoring on new claims |
| `policy_bound` | Compliance, Governance | Post-bind regulatory & data-governance checks |
| `deployment_requested` | Security, CiCd | Prod-readiness gate before deploy |
| `scheduled_scan` | Upgrade, CostOptimization, Integration, Strategy, Innovation | Explicitly triggered org-wide sweep |

In local/dev mode, the bus is an in-process `EventEmitter`. For multi-service deployments, replace `core/eventBus.ts` with a Redis or NATS-backed implementation using the same `.emit`/`.on` interface so agent code doesn't change.

## Agent contract

Every agent extends `BaseAgent` (`agents/baseAgent.ts`):

- `name: string` — used in structured logs.
- `run(): Promise<AgentFinding[]>` — returns a list of findings, each with `component`, optional `check`/`current`/`recommended`/`action`/`notes`, and a `severity`.

This keeps agents independently testable and composable — the orchestrator just calls `run()` and logs/aggregates the result.

## Two remediation paths (future extension)

For agents that go beyond reporting into applying fixes, the recommended pattern (matching other agent systems in the org) is:

1. **Repo-backed path** — findings that map to a source-controlled repo open a PR with the fix.
2. **Unmanaged path** — findings on resources with no backing repo require a direct API/SDK call gated behind mandatory human approval, especially for prod-environment findings.

This repo currently implements the reporting layer (`run()` returns findings); the remediation layer can be added agent-by-agent as needed.

## Observability

`core/logger.ts` wraps `pino`, pretty-printed in development and structured JSON in production (`NODE_ENV=production`) so pino-pretty (a dev-only dependency) isn't required at runtime.
