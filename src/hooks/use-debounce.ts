import { useCallback, useRef } from "react";

export default function useDebounce<T>(
  actionCallback: (e: T) => void,
  timeout: number
) {
  const timer = useRef<Timer | number | null>(null);

  return useCallback(
    (e: T) => {
      if (timer.current !== null) {
        clearTimeout(timer.current);
        timer.current = null;
      }

      timer.current = setTimeout(() => actionCallback(e), timeout);
    },
    [actionCallback, timeout]
  );
}
