// Shared checks for the interactive layer. Call them in effects, never during render.

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// A mouse or trackpad. Phones and tablets get the scroll-based effects only.
export const hasFinePointer = () =>
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;
