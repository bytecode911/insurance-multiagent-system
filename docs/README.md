# Insurance Multi-Agent System

**ByteCode911 Engineering Agent Team**

An org-wide, event-driven multi-agent system for insurance engineering platforms. Twelve agents cover modernization, CI/CD health, testing, compliance, documentation, security, governance, cost, integrations, strategy, risk, and innovation scouting — coordinated through a lightweight in-process event bus (swappable for Redis/NATS).

## Quick start

```bash
npm install
cp .env.example .env
npm run orchestrator   # fires a sample pr_opened event through the agent pipeline
npm test
```

## Running a single agent

```bash
npx tsx agents/complianceAgent.ts
npx tsx agents/securityAgent.ts
```

## Architecture

See [architecture.md](./architecture.md) for the event flow and agent responsibilities, and [modernization-roadmap.md](./modernization-roadmap.md) for the phased rollout plan. `visuals/architecture.html` renders a quick visual diagram — open it directly in a browser or serve it with `npx serve visuals`.

## Project layout

```
agents/     — 12 agents + BaseAgent + barrel export
core/       — eventBus, logger, orchestrator
config/     — env-driven config
tests/      — vitest suites (per-agent smoke tests + compliance detail tests)
.github/    — CI, compliance, security, and modernization workflows + Copilot instructions
docs/       — this file, architecture notes, roadmap
visuals/    — architecture.html diagram
```

## Extending

1. Create `agents/yourAgent.ts` extending `BaseAgent`.
2. Export it from `agents/index.ts`.
3. Wire it to the relevant event(s) in `core/orchestrator.ts`.
4. Add a smoke test entry in `tests/agents.test.ts`.

## Branding & scope note

This repo is intentionally generic — no client names, account aliases, or repo names should be added here. It's meant to be reusable across any team in the org.
