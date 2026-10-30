"use client";

import { useEffect, useRef } from "react";

import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";

type Dot = { hx: number; hy: number; x: number; y: number; vx: number; vy: number };

const GAP = 26;
const RADIUS = 150;

// A faint grid of dots behind the hero, the same motif as the footer wordmark.
// Dots near the cursor drift away and warm to orange, then settle back.
export function HeroField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const interactive = hasFinePointer() && !prefersReducedMotion();
    const mouse = { x: -1e4, y: -1e4 };
    let dots: Dot[] = [];
    let W = 0;
    let H = 0;
    let raf = 0;
    let visible = false;

    const build = () => {
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      // Centre the grid so the margins match on both sides.
      const ox = (W % GAP) / 2;
      const oy = (H % GAP) / 2;
      for (let y = oy; y < H; y += GAP) {
        for (let x = ox; x < W; x += GAP) {
          dots.push({ hx: x, hy: y, x, y, vx: 0, vy: 0 });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      let moving = false;
      for (const d of dots) {
        if (interactive) {
          const dx = d.x - mouse.x;
          const dy = d.y - mouse.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < RADIUS) {
            const k = 1 - dist / RADIUS;
            d.vx += (dx / dist) * k * 1.4;
            d.vy += (dy / dist) * k * 1.4;
          }
          d.vx = (d.vx + (d.hx - d.x) * 0.05) * 0.85;
          d.vy = (d.vy + (d.hy - d.y) * 0.05) * 0.85;
          d.x += d.vx;
          d.y += d.vy;
        }
        const away = Math.hypot(d.x - d.hx, d.y - d.hy);
        if (away > 0.2) moving = true;
        // Ink at rest; pushed dots warm toward brand orange (#ff5a1f) and grow.
        const k = Math.min(1, away / 16);
        ctx.fillStyle =
          k > 0.05
            ? `rgba(${Math.round(10 + 245 * k)}, ${Math.round(10 + 80 * k)}, ${Math.round(11 + 20 * k)}, ${0.16 + 0.6 * k})`
            : "rgba(10, 10, 11, 0.16)";
        const s = 1.6 + k * 1.6;
        ctx.fillRect(d.x - s / 2, d.y - s / 2, s, s);
      }
      const hovering = mouse.x > -1e3;
      raf = visible && interactive && (moving || hovering) ? requestAnimationFrame(draw) : 0;
    };

    const start = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const inside = x > -RADIUS && y > -RADIUS && x < W + RADIUS && y < H + RADIUS;
      mouse.x = inside ? x : -1e4;
      mouse.y = inside ? y : -1e4;
      if (inside) start();
    };
    // The mouse left the window: let the dots settle and the loop stop.
    const onOut = (e: PointerEvent) => {
      if (!e.relatedTarget) mouse.x = mouse.y = -1e4;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    io.observe(canvas);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        build();
        draw();
      }, 150);
    };

    build();
    draw();
    window.addEventListener("resize", onResize);
    if (interactive) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerout", onOut);
    }

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onOut);
    };
  }, []);

  return <canvas ref={ref} className="hero-field" aria-hidden />;
}
