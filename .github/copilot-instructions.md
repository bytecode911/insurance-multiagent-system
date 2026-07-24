# Copilot Instructions — Insurance Multi-Agent System (ByteCode911 Engineering Agent Team)

- Agents extend `BaseAgent` from `agents/baseAgent.ts` and implement `run(): Promise<AgentFinding[]>`.
- Always use the shared `pino` logger (`import { logger } from '../core/logger.js'`), never `console.log`.
- Compliance and governance agents must read `config.complianceStandard` from `config/config.ts` rather than hardcoding a standard.
- Use TypeScript strict mode, native ES modules (`.js` extensions in relative imports, per NodeNext resolution), and modern Node (LTS, ES2022+).
- Prefer `async/await` with explicit error handling over unhandled promises.
- For inter-agent communication, emit/listen on `eventBus` from `core/eventBus.ts` — do not import one agent directly into another.
- New agents must be added to `agents/index.ts` and wired into `core/orchestrator.ts`.
- Do not include any client-specific identifiers (real org names, account aliases, repo names) in code, comments, or examples — keep this repo generic and reusable across the org.
- Every new agent needs a corresponding smoke test in `tests/agents.test.ts`.
