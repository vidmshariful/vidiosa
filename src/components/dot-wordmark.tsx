"use client";

import { useEffect, useRef } from "react";

const TEXT = "vidiosa studio";

type Dot = { hx: number; hy: number; x: number; y: number; vx: number; vy: number };

// The footer wordmark drawn as a grid of small squares. Squares near the cursor
// swirl away, warm from white to orange, then spring back into the letters.
export function DotWordmark() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: -1e4, y: -1e4 };
    let dots: Dot[] = [];
    let W = 0;
    let H = 0;
    let size = 2.2;
    let raf = 0;
    let visible = false;

    const build = () => {
      W = wrap.clientWidth;
      if (!W) return;

      // Size the type so the word fills the width, then crop the canvas to the letters.
      const family = getComputedStyle(wrap).fontFamily;
      const probe = document.createElement("canvas").getContext("2d");
      if (!probe) return;
      const setFont = (c: CanvasRenderingContext2D, px: number) => {
        c.font = `600 ${px}px ${family}`;
        if ("letterSpacing" in c) c.letterSpacing = `${-0.045 * px}px`;
      };
      setFont(probe, 100);
      const m = probe.measureText(TEXT);
      const scale = W / (m.actualBoundingBoxLeft + m.actualBoundingBoxRight);
      const fs = 100 * scale;
      const ascent = m.actualBoundingBoxAscent * scale;
      H = Math.ceil(ascent + m.actualBoundingBoxDescent * scale) + 2;
      wrap.style.setProperty("--ratio", `${W / H}`);

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const off = document.createElement("canvas");
      off.width = W;
      off.height = H;
      const o = off.getContext("2d", { willReadFrequently: true });
      if (!o) return;
      setFont(o, fs);
      o.textBaseline = "alphabetic";
      o.fillText(TEXT, m.actualBoundingBoxLeft * scale, ascent + 1);
      const data = o.getImageData(0, 0, W, H).data;

      // Finer grid on narrow screens so the small letters keep their shape.
      const gap = W < 500 ? 2 : W < 900 ? 3 : 4;
      size = gap * 0.55;
      dots = [];
      for (let y = 0; y < H; y += gap) {
        for (let x = 0; x < W; x += gap) {
          if (data[(y * W + x) * 4 + 3] > 128) {
            dots.push({ hx: x, hy: y, x, y, vx: 0, vy: 0 });
          }
        }
      }
    };

    const frame = () => {
      ctx.clearRect(0, 0, W, H);
      const R = W < 600 ? 50 : 100;
      let moving = false;

      for (const d of dots) {
        if (!still) {
          const dx = d.x - mouse.x;
          const dy = d.y - mouse.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < R) {
            const k = 1 - dist / R;
            const nx = dx / dist;
            const ny = dy / dist;
            d.vx += (nx * 2.2 - ny * 1.7) * k;
            d.vy += (ny * 2.2 + nx * 1.7) * k;
          }
          d.vx = (d.vx + (d.hx - d.x) * 0.06) * 0.82;
          d.vy = (d.vy + (d.hy - d.y) * 0.06) * 0.82;
          d.x += d.vx;
          d.y += d.vy;
        }

        const away = Math.hypot(d.x - d.hx, d.y - d.hy);
        if (away > 0.3) moving = true;
        // White at rest, through to brand orange (#ff5a1f) when pushed furthest.
        const k = Math.min(1, away / 18);
        ctx.fillStyle =
          k > 0.05
            ? `rgb(255 ${Math.round(255 - 165 * k)} ${Math.round(255 - 224 * k)})`
            : "rgba(255, 255, 255, 0.92)";
        ctx.fillRect(d.x, d.y, size + k, size + k);
      }

      // Rest once everything is home and the cursor has left; pointermove wakes it again.
      const hovering = mouse.x > -1e3;
      raf = visible && !still && (moving || hovering) ? requestAnimationFrame(frame) : 0;
    };

    const start = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      start();
    };
    const onLeave = () => {
      mouse.x = mouse.y = -1e4;
    };
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    io.observe(wrap);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        build();
        start();
      }, 150);
    };
    window.addEventListener("resize", onResize);

    let cancelled = false;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      build();
      start();
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className="dot-mark" role="img" aria-label="Vidiosa Studio">
      <canvas ref={canvasRef} />
    </div>
  );
}
