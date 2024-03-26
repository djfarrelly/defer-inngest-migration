import { inngest } from './client';

export type FifoTask = {
  name: 'fifo.task';
  data: {
    userId: string;
  };
};

export default inngest.createFunction(
  {
    id: 'fifo-running-task',
    concurrency: 1,
  },
  { event: 'fifo.task' },
  async ({ event, step }) => {
    // Use the user id
    const { userId } = event.data;

    return { success: true, userId };
  }
);
