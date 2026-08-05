// localStorage-backed persistence helpers for Studio tools.
// Keys are namespaced per user so prefs survive reloads but never collide.

export function loadLS<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw == null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function saveLS<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota / privacy-mode failures
  }
}

export function removeLS(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

/** Build a namespaced key. */
export function lsKey(scope: string, name: string): string {
  return `wugweb.studio.${scope}.${name}`;
}
