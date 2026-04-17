import { useState, useEffect, useCallback } from 'react';

/**
 * Persistent state hook backed by localStorage.
 * Survives refresh; safe for SSR (guards window).
 */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initial;
    try {
      const raw = window.localStorage.getItem(key);
      if (!raw) return initial;
      const parsed = JSON.parse(raw);
      // Revive Date strings on known fields
      return parsed as T;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // quota or serialization issue — silent
    }
  }, [key, value]);

  const reset = useCallback(() => setValue(initial), [initial]);

  return [value, setValue, reset] as const;
}
