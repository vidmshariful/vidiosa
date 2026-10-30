"use client";

import { useEffect, useRef } from "react";

import { PlayIcon } from "@/components/icons";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";

type Mode = "default" | "link" | "play" | "none";

// What the cursor should become over a given element. An explicit data-cursor
// wins; otherwise anything clickable gets the larger ring.
function modeFor(target: EventTarget | null): Mode {
  if (!(target instanceof Element)) return "default";
  if (target.tagName === "IFRAME") return "none";
  const zone = target.closest<HTMLElement>("[data-cursor]");
  if (zone) return zone.dataset.cursor as Mode;
  if (target.closest("a, button, label, summary")) return "link";
  return "default";
}

// A small dot that replaces the system cursor on mouse and trackpad devices. It
// grows into a ring over links and into a "Play reel" bubble over the showreel.
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;

    const root = document.documentElement;
    root.classList.add("has-cursor");

    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let raf = 0;
    let seen = false;

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.3;
      pos.y += (target.y - pos.y) * 0.3;
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      const settled =
        Math.abs(target.x - pos.x) < 0.1 && Math.abs(target.y - pos.y) < 0.1;
      raf = settled ? 0 : requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      target.x = e.clientX;
      target.y = e.clientY;
      if (!seen) {
        // Start where the mouse is instead of sliding in from the corner.
        pos.x = target.x;
        pos.y = target.y;
        seen = true;
      }
      el.classList.add("is-on");
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onOver = (e: PointerEvent) => {
      el.dataset.mode = modeFor(e.target);
    };
    const onOut = (e: PointerEvent) => {
      if (!e.relatedTarget) el.classList.remove("is-on");
    };
    const onDown = () => el.classList.add("is-down");
    const onUp = () => el.classList.remove("is-down");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div ref={ref} className="cursor" data-mode="default" aria-hidden>
      <span className="cursor-label">
        <PlayIcon size={16} />
        Play reel
      </span>
    </div>
  );
}
