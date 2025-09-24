/**
 * Client-side rate limiting for security
 */

interface RateLimitEntry {
  count: number;
  lastAttempt: number;
  blocked: boolean;
}

const rateLimitStore: Map<string, RateLimitEntry> = new Map();

/**
 * Rate limit configuration
 */
const RATE_LIMITS = {
  login: {
    maxAttempts: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes
    blockDurationMs: 30 * 60 * 1000, // 30 minutes
  },
  adminLogin: {
    maxAttempts: 3,
    windowMs: 15 * 60 * 1000, // 15 minutes
    blockDurationMs: 60 * 60 * 1000, // 1 hour
  },
};

/**
 * Check if an IP/identifier is rate limited
 */
export const isRateLimited = (
  identifier: string,
  type: 'login' | 'adminLogin' = 'login'
): { allowed: boolean; retryAfter?: number } => {
  const config = RATE_LIMITS[type];
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  if (!entry) {
    return { allowed: true };
  }

  // Check if block period has expired
  if (entry.blocked && now - entry.lastAttempt > config.blockDurationMs) {
    rateLimitStore.delete(identifier);
    return { allowed: true };
  }

  // If still blocked
  if (entry.blocked) {
    const retryAfter = config.blockDurationMs - (now - entry.lastAttempt);
    return { allowed: false, retryAfter };
  }

  // Check if window has expired
  if (now - entry.lastAttempt > config.windowMs) {
    rateLimitStore.delete(identifier);
    return { allowed: true };
  }

  // Check if limit exceeded
  if (entry.count >= config.maxAttempts) {
    entry.blocked = true;
    entry.lastAttempt = now;
    const retryAfter = config.blockDurationMs;
    return { allowed: false, retryAfter };
  }

  return { allowed: true };
};

/**
 * Record a failed attempt
 */
export const recordFailedAttempt = (
  identifier: string,
  type: 'login' | 'adminLogin' = 'login'
): void => {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier) || {
    count: 0,
    lastAttempt: now,
    blocked: false,
  };

  const config = RATE_LIMITS[type];

  // Reset if window expired
  if (now - entry.lastAttempt > config.windowMs) {
    entry.count = 1;
  } else {
    entry.count += 1;
  }

  entry.lastAttempt = now;

  // Block if limit exceeded
  if (entry.count >= config.maxAttempts) {
    entry.blocked = true;
  }

  rateLimitStore.set(identifier, entry);
};

/**
 * Record a successful attempt (clears the record)
 */
export const recordSuccessfulAttempt = (identifier: string): void => {
  rateLimitStore.delete(identifier);
};

/**
 * Get user identifier for rate limiting
 */
export const getUserIdentifier = (): string => {
  // Use a combination of IP-like info and user agent hash for client-side rate limiting
  const userAgent = navigator.userAgent;
  const language = navigator.language;
  const platform = navigator.platform;
  const fingerprint = `${userAgent}-${language}-${platform}`;
  
  // Simple hash function
  let hash = 0;
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return Math.abs(hash).toString(36);
};

/**
 * Format retry after time for user display
 */
export const formatRetryAfter = (retryAfterMs: number): string => {
  const minutes = Math.ceil(retryAfterMs / (60 * 1000));
  if (minutes < 60) {
    return `${minutes} minuto${minutes > 1 ? 's' : ''}`;
  }
  const hours = Math.ceil(minutes / 60);
  return `${hours} hora${hours > 1 ? 's' : ''}`;
};