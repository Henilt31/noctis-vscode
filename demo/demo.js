// Noctis Theme - JavaScript Demo
// Modern ES6+ features: destructuring, symbols, regex, template literals, async iterators

const CACHE_EXPIRATION_MS = 60 * 1000;
const SESSION_KEY = Symbol('noctis.session');

class TokenBucketRateLimiter {
  #capacity;
  #tokens;
  #lastRefill;

  constructor(capacity = 50, refillRatePerSec = 10) {
    this.#capacity = capacity;
    this.#tokens = capacity;
    this.#lastRefill = Date.now();
    this.refillRate = refillRatePerSec;
  }

  refill() {
    const now = Date.now();
    const elapsedSeconds = (now - this.#lastRefill) / 1000;
    this.#tokens = Math.min(this.#capacity, this.#tokens + elapsedSeconds * this.refillRate);
    this.#lastRefill = now;
  }

  tryConsume(tokens = 1) {
    this.refill();
    if (this.#tokens >= tokens) {
      this.#tokens -= tokens;
      return true;
    }
    return false;
  }
}

async function fetchDeveloperMetrics(endpoint, { timeout = 5000, debug = false } = {}) {
  const urlPattern = /^https:\/\/api\.[a-z0-9-]+\.[a-z]{2,}(\/.*)?$/i;

  if (!urlPattern.test(endpoint)) {
    throw new TypeError(`Invalid URL format: ${endpoint}`);
  }

  const limiter = new TokenBucketRateLimiter(20, 5);
  if (!limiter.tryConsume()) {
    console.warn(`[Noctis] Rate limit approached for endpoint: ${endpoint}`);
  }

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: { 'Accept': 'application/json' },
    signal: AbortSignal.timeout(timeout),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: Failed to retrieve developer metrics`);
  }

  return response.json();
}

module.exports = {
  TokenBucketRateLimiter,
  fetchDeveloperMetrics,
};
