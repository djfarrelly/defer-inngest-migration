const inngestAPI =
  process.env.NODE_ENV === 'production'
    ? 'https://api.inngest.com'
    : 'http://localhost:8288';

async function getRunsForEvent(eventID: string) {
  const res = await fetch(`${inngestAPI}/v1/events/${eventID}/runs`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + process.env.INNGEST_SIGNING_KEY,
    },
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return await res.json();
}
