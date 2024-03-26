import { inngest } from './client';

import { performLongRunningTask } from '@/utils/performLongRunningTask';

export type LongRunningTask = {
  name: 'run.task';
  data: {
    message: string;
  };
};

export default inngest.createFunction(
  {
    id: 'long-running-task',
    concurrency: 2,
    retries: 5,
  },
  { event: 'run.task' },
  async ({ event, step }) => {
    await step.run('long-running-task', async () => {
      // Fake task that runs for 30s
      return await performLongRunningTask();
    });

    await step.run('another-long-running-task', async () => {
      // Run it again!
      return await performLongRunningTask();
    });

    return {
      success: true,
    };
  }
);
