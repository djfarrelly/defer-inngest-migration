'use client';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { ListExecutionsResult } from '@defer/client/typings/backend';
import { differenceInSeconds, format, parseISO } from 'date-fns';

import {
  listTasks,
  reRunTask,
  runLongRunningTask,
  runManyFIFOTasks,
  runCron,
} from './actions/actions';
import { stateToColor, stateToText } from '../utils/executionStateHelpers';

import logo from './logo.png';

export default function Index() {
  const [tasks, updateTasks] = useState<ListExecutionsResult | undefined>();
  // const [inngestEvents, updateInngestEvents] = useState<ListExecutionsResult | undefined>();
  // const [inngestRuns, updateInngestRuns] = useState<ListExecutionsResult | undefined>();

  useEffect(() => {
    const interval = setInterval(
      // leverafe Server Actions to regurarly refresh the tasks list
      () => listTasks().then((data) => updateTasks(data)),
      1000
    );
    return () => clearInterval(interval);
  });

  const triggerLongRunningTask = useCallback(
    () => runLongRunningTask(),
    [runLongRunningTask]
  );

  const triggerManyTasks = useCallback(
    () => runManyFIFOTasks(),
    [runManyFIFOTasks]
  );

  const triggerCron = useCallback(() => runCron(), [runCron]);

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <Image src={logo} alt={'Defer'} className="flex-1 max-w-24" />
          <a
            className="py-2 px-3 flex rounded-md no-underline hover:bg-btn-background-hover border"
            href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdefer-run%2Fdefer.demo%2Ftree%2Fmaster%2Fnextjs%2Fapp-template%2F&project-name=nextjs-with-defer&repository-name=nextjs-with-defer&demo-title=nextjs-with-defer&demo-description=Perform%20long-running%20tasks,%20workflows%20and%20CRONs%20within%20your%20Next.js%20application.&demo-url=https%3A%2F%2Fdemo-nextjs-with-defer.vercel.app%2F&external-id=https%3A%2F%2Fgithub.com%2Fdefer-run%2Fdefer.demo%2Ftree%2Fmaster%2Fnextjs%2Fapp-template%2F&demo-image=https%3A%2F%2Fraw.githubusercontent.com%2Fdefer-run%2Fdefer.demo%2Fmaster%2Fnextjs%2Fapp-template%2Fapp%2Fog_image.png&integration-ids="
            target="_blank"
            rel="noreferrer"
          >
            <svg
              aria-label="Vercel logomark"
              role="img"
              viewBox="0 0 74 64"
              className="h-4 w-4 mr-2"
            >
              <path
                d="M37.5896 0.25L74.5396 64.25H0.639648L37.5896 0.25Z"
                fill="currentColor"
              ></path>
            </svg>
            Deploy to Vercel
          </a>
        </div>
      </nav>

      <div className="flex flex-col gap-20 max-w-4xl px-3">
        <main className="grid grid-cols-3 gap-4 justify-evenly">
          <div className="py-2 px-3 rounded-md border flex gap-6 flex-col">
            <div className="flex-1">
              <h2>
                <code>longRunningTask()</code>
              </h2>
              <p>
                <em>Runs for 30 seconds with a max concurrency of 2.</em>
              </p>
            </div>
            <div className="flex justify-end">
              <button
                className="py-1 px-2 bg-black text-white flex rounded-md no-underline hover:bg-gray-800 border"
                onClick={triggerLongRunningTask}
              >
                Trigger now
              </button>
            </div>
          </div>
          <div className="py-2 px-3 rounded-md border flex gap-6 flex-col">
            <div className="flex-1">
              <h2>
                <code>parallelTasks()</code>
              </h2>
              <p>
                <em>Runs for 1 second with a max concurrency of 1.</em>
              </p>
            </div>
            <div className="flex justify-end">
              <button
                className="py-1 px-2 bg-black text-white flex rounded-md no-underline hover:bg-gray-800 border"
                onClick={triggerManyTasks}
              >
                Trigger 10 runs now
              </button>
            </div>
          </div>
          <div className="py-2 px-3 rounded-md border flex gap-6 flex-col">
            <div className="flex-1">
              <h2>
                <code>dailyCron()</code>
              </h2>
              <p>
                <em>Trigger a CRON run.</em>
              </p>
            </div>
            <div className="flex justify-end">
              <button
                className="py-1 px-2 bg-black text-white flex rounded-md no-underline hover:bg-gray-800 border"
                onClick={triggerCron}
              >
                Trigger in 10 secs
              </button>
            </div>
          </div>
        </main>
        {/* <div>
          <div className="border px-2 py-2 rounded-md">
            <table className="border-collapse w-full">
              <thead>
                <tr>
                  <th className="text-left p-[16px] font-semibold text-xs w-[100px] text-gray-600">
                    Status
                  </th>
                  <th className="text-left p-[16px] font-semibold text-xs text-gray-600">
                    Function
                  </th>
                  <th className="text-left p-[16px] font-semibold text-xs text-gray-600">
                    Time to process
                  </th>
                  <th className="text-left p-[16px] font-semibold text-xs text-gray-600">
                    Scheduled for
                  </th>
                  <th className="text-left p-[16px] font-semibold text-xs text-gray-600"></th>
                </tr>
              </thead>
              <tbody>
                {tasks?.data.length! > 0 ? (
                  tasks?.data.map(
                    ({ id, functionName, scheduledAt, updatedAt, state }) => (
                      <tr className="border-b-gray-400" key={`execution-${id}`}>
                        <td className="p-[16px] text-left flex">
                          <span
                            className={`rounded-[24px] px-2 py-1 text-xs font-semibold`}
                            style={{
                              color: stateToColor[state][1],
                              backgroundColor: stateToColor[state][0],
                            }}
                          >
                            {stateToText[state]}
                          </span>
                        </td>
                        <td className="p-[16px] text-left">
                          <code>
                            {functionName}
                            {"()"}
                          </code>
                        </td>
                        <td className="p-[16px] text-left">
                          {["succeed", "failed"].includes(state) ? (
                            `${differenceInSeconds(
                              parseISO(updatedAt.toISOString()),
                              parseISO(scheduledAt.toISOString())
                            )}s`
                          ) : (
                            <em>Pending...</em>
                          )}
                        </td>
                        <td className="p-[16px] text-left">
                          {format(parseISO(scheduledAt.toISOString()), "P pp")}
                        </td>
                        <td className="p-[16px] flex justify-end">
                          {["succeed", "failed"].includes(state) && (
                            <button
                              onClick={() => reRunTask(id)}
                              className="py-1 px-2 bg-black text-white flex rounded-md no-underline hover:bg-gray-800 border"
                            >
                              Rerun
                            </button>
                          )}
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td colSpan={5}>
                      <div className="text-center py-4">
                        {"To get started, trigger a task above."}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
              */}
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Explore the{' '}
          <a
            href="https://www.defer.run/docs/introduction"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Defer documentation
          </a>
        </p>
      </footer>
    </div>
  );
}
