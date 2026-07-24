# Modernization Roadmap

## Phase 1 — Foundation (this repo)
- 12 reporting agents wired to a shared event bus.
- CI, compliance, security, and modernization GitHub Actions workflows.
- Vitest coverage for every agent (smoke tests) plus deeper compliance-specific tests.

## Phase 2 — Real data sources
- Replace hardcoded findings with real integrations: dependency/CVE scanners for `SecurityAgent`, coverage reports for `TestingAgent`, cost/billing APIs for `CostOptimizationAgent`, tag inventories for `GovernanceAgent`.
- Persist findings (e.g. to a database or dashboard) instead of just logging.

## Phase 3 — Remediation
- Add the repo-backed (PR-opening) and unmanaged (approval-gated API call) remediation paths described in `architecture.md`, starting with the highest-value agents (Security, Compliance).
- Introduce a decision/approval layer for anything touching prod.

## Phase 4 — Distributed execution
- Swap the in-process `eventBus` for Redis/NATS so agents can run as independent services/containers across environments.
- Add OpenTelemetry tracing across agent runs for cross-service observability.

## Phase 5 — Org rollout
- Package as a reusable template (this repo) that any team can fork/instantiate.
- Document onboarding steps for new teams/services in `docs/README.md`.
