import Lenis from "lenis";

/**
 * One shared Lenis instance for the whole page.
 *
 * Everything that moves the page — the stage rail, the nav anchors, the hero
 * buttons — routes through here so scrolling is never part smooth and part
 * instant. When smooth scrolling is unavailable (reduced-motion, or a browser
 * without the APIs Lenis needs) every helper falls back to native scrolling,
 * so behaviour degrades rather than breaking.
 */

let lenis: Lenis | null = null;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initSmoothScroll(): () => void {
  if (prefersReducedMotion()) return () => undefined;

  lenis = new Lenis({
    duration: 1.15,
    // Long, gentle tail — the deceleration is what reads as "smooth".
    easing: (t: number) => 1 - Math.pow(1 - t, 3.2),
    wheelMultiplier: 0.92,
    touchMultiplier: 1.4,
    // Native touch scrolling on mobile: hijacking it costs more than it gains.
    syncTouch: false,
  });

  let frame = requestAnimationFrame(function raf(time: number) {
    lenis?.raf(time);
    frame = requestAnimationFrame(raf);
  });

  return () => {
    cancelAnimationFrame(frame);
    lenis?.destroy();
    lenis = null;
  };
}

/** Absolute document Y, in CSS pixels. */
export function scrollToY(y: number, immediate = false) {
  const top = Math.max(0, y);
  if (lenis) {
    lenis.scrollTo(top, { duration: immediate ? 0 : 1.25, lock: false });
    return;
  }
  window.scrollTo({ top, behavior: immediate ? "auto" : "smooth" });
}

/** Scrolls an element to the top of the viewport, under the fixed header. */
export function scrollToElement(target: Element, offset = 0) {
  const top = target.getBoundingClientRect().top + window.scrollY + offset;
  scrollToY(top);
}

export function stopSmoothScroll() {
  lenis?.stop();
}

export function startSmoothScroll() {
  lenis?.start();
}
