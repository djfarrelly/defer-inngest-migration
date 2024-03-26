import { performLongRunningTask } from '@/utils/performLongRunningTask';
import { defer } from '@defer/client';

async function longRunningTask({ message }: { message: string }) {
  // runs a fake task for 30s
  await performLongRunningTask();
  return { success: true, message };
}

export default defer(longRunningTask, {
  concurrency: 2, // want maximum 2 executions of this function in parallel
  retry: 5, // adding retry to recover from potential network issues or rate limiting
});
