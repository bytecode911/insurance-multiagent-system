import { EventEmitter } from 'events';

/**
 * In-process event bus for agent orchestration.
 * Swap for Redis/NATS pub-sub if agents need to run as separate processes/services.
 */
class EventBus extends EventEmitter {}

export const eventBus = new EventBus();

export type AgentEvent =
  | 'pr_opened'
  | 'claim_submitted'
  | 'policy_bound'
  | 'deployment_requested'
  | 'scheduled_scan';
