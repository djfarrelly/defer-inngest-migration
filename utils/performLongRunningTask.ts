import { sleep } from "./sleep";

export async function performLongRunningTask() {
  return await sleep(30000);
}
