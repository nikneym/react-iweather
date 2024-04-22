import { useCallback, useRef, useState, useSyncExternalStore } from "react";

export default function useMediaQuery(query: string): boolean {
  const mediaQueryRef = useRef<MediaQueryList>(window.matchMedia(query));
  const [match, setMatch] = useState<boolean>(mediaQueryRef.current!.matches);

  const checkMedia = useCallback(({ matches }: MediaQueryListEvent) => {
    setMatch(matches);
  }, []);

  // this can be used instead of useEffect
  return useSyncExternalStore(
    () => {
      // on mount
      const mediaQuery = mediaQueryRef.current!;

      // match the media on change
      mediaQuery.addEventListener("change", checkMedia);

      // cleanup
      return () => mediaQuery.removeEventListener("change", checkMedia);
    },
    () => match
  );
}
