import { inngest } from './client';
import getUsers from '@/utils/getUsers';

export type RunDailyCron = {
  name: 'run.daily.cron';
  data: {};
};

export default inngest.createFunction(
  {
    id: 'daily-cron',
  },
  [{ cron: '0 8 * * *' }, { event: 'run.daily.cron' }],
  async ({ event, step }) => {
    console.log('I run everyday at 8am UTC!');

    const users = await step.run('get-users', async () => {
      // Imagine this is a long running task
      return getUsers();
    });

    // Let's run tasks in parallel
    await Promise.all(
      users.map((user) =>
        step.run('send-email', async () => {
          // Imagine this is a long running task
          console.log(`Sending email to ${user.email}`);
          return { message: `Send email to ${user.email}` };
        })
      )
    );

    return { success: true, count: users.length };
  }
);
