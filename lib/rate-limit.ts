import { RateLimitStore, RateLimitInfo } from '@/types';

const store: RateLimitStore = {};

export function checkRateLimit(identifier: string, limit: number = 10, windowMs: number = 60000): boolean {
  const now = Date.now();
  const key = `rate_limit_${identifier}`;
  
  if (!store[key] || now > store[key].resetTime) {
    store[key] = {
      count: 1,
      resetTime: now + windowMs
    };
    return true;
  }
  
  if (store[key].count >= limit) {
    return false;
  }
  
  store[key].count++;
  return true;
}

export function getRateLimitInfo(identifier: string): RateLimitInfo | null {
  const key = `rate_limit_${identifier}`;
  const data = store[key];
  
  if (!data) {
    return null;
  }
  
  const now = Date.now();
  if (now > data.resetTime) {
    return null;
  }
  
  return {
    remaining: Math.max(0, 10 - data.count),
    resetTime: data.resetTime
  };
} 