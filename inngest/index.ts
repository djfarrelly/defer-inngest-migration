import longRunningTask from './longRunningTask';
import fifoTask from './fifoTask';
import dailyCron from './dailyCron';

export const functions = [longRunningTask, fifoTask, dailyCron];

export { inngest } from './client';
