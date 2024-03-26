'use server';

import { inngest } from '@/inngest/index';

import dailyCron from '@/defer/dailyCron';
import fifoTask from '@/defer/fifoTask';
import longRunningTask from '@/defer/longRunningTask';
import { assignOptions, listExecutions, reRunExecution } from '@defer/client';

// Next.js Server Actions are perfect way to trigger functions
//  from Client-Side Components

export async function listTasks() {
  return await listExecutions();
}

export async function listInngestTasks() {
  return await listExecutions();
}

export async function reRunTask(executionId: string) {
  return await reRunExecution(executionId);
}

export async function runLongRunningTask() {
  //
  // Before: You directly invoke the function in your codebase
  await longRunningTask({ message: 'Hello from Next.js Server Action' });

  // After: You send an event to trigger the function
  const { ids } = await inngest.send({
    name: 'run.task',
    data: {
      message: 'Hello from Next.js Server Action',
    },
  });

  return { ids };
}

export async function runManyFIFOTasks() {
  const userIds = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  // Before: Iterate over the user ids and invoke the function
  for (const userId of userIds) {
    await fifoTask({ userId });
  }

  // After: You can send a bulk of events to trigger the function
  await inngest.send(
    userIds.map((userId) => ({
      name: 'fifo.task',
      data: { userId },
    }))
  );
}

export async function runCron() {
  // Before:
  const delayedCronRun = assignOptions(dailyCron, { delay: '10s' });
  await delayedCronRun();

  // After: Using events w/ the `ts` field to delay the execution
  await inngest.send({
    name: 'run.daily.cron',
    data: {},
    ts: Date.now() + 10000, // + 10s
  });
}
