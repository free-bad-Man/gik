import { headers } from "next/headers";

interface SpamCheckResult {
  isSpam: boolean;
  reason?: string;
}

const SUBMISSION_THRESHOLD_MS = 3000; // 3 seconds
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// In-memory store for rate limiting (Note: resets on server restart/redeploy)
const ipRequestCounts = new Map<string, number[]>();

function cleanOldRequests(ip: string) {
  const now = Date.now();
  const timestamps = ipRequestCounts.get(ip) || [];
  const validTimestamps = timestamps.filter(
    (ts) => now - ts < RATE_LIMIT_WINDOW_MS
  );
  
  if (validTimestamps.length === 0) {
    ipRequestCounts.delete(ip);
  } else {
    ipRequestCounts.set(ip, validTimestamps);
  }
  
  return validTimestamps;
}

export async function checkSpam(formData: FormData): Promise<SpamCheckResult> {
  // 1. Honeypot check
  const honeypot = formData.get("company");
  if (honeypot && honeypot.toString().length > 0) {
    return { isSpam: true, reason: "Honeypot filled" };
  }

  // 2. Time threshold check
  // Client should send '_created' timestamp (Date.now() at mount)
  const createdStr = formData.get("_created");
  if (!createdStr) {
    // If field is missing, it might be a bot that didn't run JS
    // Or a user with JS disabled. We can decide to block or allow.
    // For now, let's treat it as spam if we enforce JS.
    return { isSpam: true, reason: "Missing timestamp (JS required)" };
  }

  const createdAt = parseInt(createdStr.toString(), 10);
  const now = Date.now();
  
  // If created in the future (clock skew) or less than threshold
  // We allow some clock skew (e.g. client is ahead), but generally
  // if (now - createdAt) < THRESHOLD, it's too fast.
  // Note: This relies on client clock. 
  // If client clock is way behind server, (now - createdAt) will be huge (OK).
  // If client clock is ahead of server, (now - createdAt) could be negative.
  // We'll skip strict clock sync for this simple check and just hope for the best
  // or mainly rely on it being non-empty.
  // Let's just check if it's logically valid number.
  if (isNaN(createdAt)) {
     return { isSpam: true, reason: "Invalid timestamp" };
  }
  
  // Simple check: if difference is less than 3 seconds. 
  // But due to clock skew, we should be careful. 
  // Let's skip strict 3s check if we suspect clock skew issues, 
  // but strictly enforcing it helps against script bots.
  // A safer check: client calculates elapsed time and sends it?
  // Let's stick to the instruction "Time threshold". 
  // We will assume that if (ServerNow - ClientCreated) < 3000ms, it is spam.
  // This might block legitimate users with clocks set to future.
  // To mitigate, we can check if it is REASONABLY close.
  // For now, let's just implement the logic.
  if (now - createdAt < SUBMISSION_THRESHOLD_MS) {
     return { isSpam: true, reason: "Too fast" };
  }

  // 3. Rate Limit
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || "unknown";
  
  // If we are behind a proxy, x-forwarded-for might be a list
  const clientIp = ip.split(",")[0].trim();
  
  const requestTimestamps = cleanOldRequests(clientIp);
  
  if (requestTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return { isSpam: true, reason: "Rate limit exceeded" };
  }
  
  // Add current request
  requestTimestamps.push(now);
  ipRequestCounts.set(clientIp, requestTimestamps);

  return { isSpam: false };
}
