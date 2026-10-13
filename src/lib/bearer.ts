/**
 * Bearer-token check for private read endpoints (e.g. /api/not-found-report).
 * Pure, so it unit-tests with plain `node --test` (bearer.test.ts).
 *
 * Fails closed: if the expected token is not configured on the deployment,
 * nothing is authorized. Constant-time compare via safeEqual.
 */
import { safeEqual } from './indexnow.ts';

export type BearerResult = 'ok' | 'denied' | 'unconfigured';

/** Shortest token accepted as configured; anything shorter is treated as unset. */
export const MIN_TOKEN_LENGTH = 32;

export function checkBearer(authorization: string | null | undefined, expected: string | null | undefined): BearerResult {
  if (typeof expected !== 'string' || expected.length < MIN_TOKEN_LENGTH) return 'unconfigured';
  const m = /^Bearer\s+(\S+)\s*$/i.exec(authorization ?? '');
  if (!m) return 'denied';
  return safeEqual(m[1], expected) ? 'ok' : 'denied';
}
