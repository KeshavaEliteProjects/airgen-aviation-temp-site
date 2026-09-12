import { useEffect, useState } from "react";

/** Subscribes to a media query. Returns `false` during SSR / before first paint. */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia(query).matches,
  );

  useEffect(() => {
    const list = window.matchMedia(query);
    const onChange = () => setMatches(list.matches);
    onChange();
    list.addEventListener("change", onChange);
    return () => list.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

export const useReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");

/**
 * Fires once when the element first enters the viewport, for reveal-on-scroll.
 * Deliberately one-shot: content that fades back out on the way past reads as
 * a bug rather than as motion design.
 */
export function useInView<T extends Element>(ref: React.RefObject<T | null>, margin = "-12% 0px") {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin, threshold: 0.08 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, inView, margin]);

  return inView;
}
