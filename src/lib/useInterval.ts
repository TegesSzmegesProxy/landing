import { useEffect, useRef } from 'react';

/** Calls `fn` every `ms` milliseconds; pass `null` to pause. */
export function useInterval(fn: () => void, ms: number | null) {
  const saved = useRef(fn);
  useEffect(() => {
    saved.current = fn;
  }, [fn]);
  useEffect(() => {
    if (ms === null) return;
    const t = setInterval(() => saved.current(), ms);
    return () => clearInterval(t);
  }, [ms]);
}
