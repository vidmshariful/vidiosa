"use client";

import { useEffect } from "react";

import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";

// Page-wide touches that need no markup of their own:
// - elements marked data-magnetic lean toward a nearby cursor, then spring back
// - the header slides away while scrolling down and returns when scrolling up
// - the orange gradient text shifts with the cursor (--gx on the root)
export function SiteMotion() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const cleanups: (() => void)[] = [];

    const header = document.querySelector<HTMLElement>(".hdr");
    if (header) {
      let lastY = window.scrollY;
      let ticking = false;
      const update = () => {
        const y = window.scrollY;
        if (y > lastY + 6 && y > 140) header.classList.add("is-hidden");
        else if (y < lastY - 6 || y <= 140) header.classList.remove("is-hidden");
        lastY = y;
        ticking = false;
      };
      const onScroll = () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      cleanups.push(() => window.removeEventListener("scroll", onScroll));
    }

    if (hasFinePointer()) {
      const root = document.documentElement;
      const magnets = Array.from(
        document.querySelectorAll<HTMLElement>("[data-magnetic]"),
      );
      const PAD = 36;

      const onMove = (e: PointerEvent) => {
        // Map the cursor across the screen to 30%..70% of the gradient.
        root.style.setProperty("--gx", `${30 + (e.clientX / window.innerWidth) * 40}%`);

        for (const el of magnets) {
          const r = el.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          const near =
            Math.abs(dx) < r.width / 2 + PAD && Math.abs(dy) < r.height / 2 + PAD;
          if (near) {
            el.style.transform = `translate(${dx * 0.22}px, ${dy * 0.32}px)`;
            el.dataset.pulled = "";
          } else if ("pulled" in el.dataset) {
            el.style.transform = "";
            delete el.dataset.pulled;
          }
        }
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      cleanups.push(() => window.removeEventListener("pointermove", onMove));
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
