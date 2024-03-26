"use client";
import { ExecutionState } from "@defer/client/typings/backend";

export const stateToText: {
  [k in ExecutionState]: string;
} = {
  aborted: "Aborted",
  aborting: "Aborting",
  cancelled: "Canceled",
  created: "Queued",
  discarded: "Discarded",
  failed: "Failed",
  started: "Running",
  succeed: "Succeed",
};
export const stateToColor: {
  [k in ExecutionState]: [bg: string, text: string];
} = {
  aborted: ["#282828", "#b1b1b1"],
  aborting: ["#2c230a", "#ffee33"],
  cancelled: ["#282828", "#b1b1b1"],
  created: ["#282828", "#b1b1b1"],
  discarded: ["#282828", "#b1b1b1"],
  failed: ["#3b191d", "#ff8589"],
  started: ["#2c230a", "#ffee33"],
  succeed: ["#12281f", "#3dd68c"],
};
