import { functions, inngest } from '@/inngest';
import { serve } from 'inngest/next';

/**
 * Inngest functions run in your own codebase, on your own servers.
 *
 * Functions are invoked via HTTP requests.
 *
 * Functions can be broken into steps, each of which is individually retried.
 *
 * Steps can be run up to as long as your platform allows, for example:
 *   - Vercel Pro plan allows up to 300s (5 minutes)
 *   - Vercel Edge functions can run for 15 minutes (or way longer) - on ANY plan
 *   - Other platforms can run beyond that limit, including Render, AWS, GCP, Azure, etc.
 *
 * Steps can be run in parallel or in sequence.
 */
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions,
});
