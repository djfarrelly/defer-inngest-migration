"use server";

import dailyCron from "@/defer/dailyCron";
import fifoTask from "@/defer/fifoTask";
import longRunningTask from "@/defer/longRunningTask";
import { assignOptions, listExecutions, reRunExecution } from "@defer/client";

// Next.js Server Actions are perfect way to trigger Defer Background functions
//  from Client-Side Components

export async function listTasks() {
  return await listExecutions();
}

export async function reRunTask(executionId: string) {
  return await reRunExecution(executionId);
}

export async function runLongRunningTask() {
  return await longRunningTask();
}

export async function runCron() {
  const delayedCronRun = assignOptions(dailyCron, { delay: "10s" });
  return await delayedCronRun();
}

export async function runManyFIFOTasks() {
  for (let i = 0; i < 10; i++) {
    await fifoTask();
  }
}
