import { EventSchemas } from 'inngest';

import { type LongRunningTask } from './longRunningTask';
import { type FifoTask } from './fifoTask';
import { type RunDailyCron } from './dailyCron';

export const schemas = new EventSchemas().fromUnion<
  LongRunningTask | FifoTask | RunDailyCron
>();
