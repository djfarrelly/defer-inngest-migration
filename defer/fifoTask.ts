import { performLongRunningTask } from '@/utils/performLongRunningTask';
import { defer } from '@defer/client';

async function fifoTask({ userId }: { userId: string }) {
  return { success: true, userId };
}

export default defer(fifoTask, {
  concurrency: 1, // one at a time!
});
