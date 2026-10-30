"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";

// Each work type has a short silent loop that pops up beside the cursor on hover.
const MAKES = [
  { label: "Launch films", clip: "/video/make/launch.mp4" },
  { label: "Product demos", clip: "/video/make/demo.mp4" },
  { label: "Explainers", clip: "/video/make/explainer.mp4" },
  { label: "Founder clips", clip: "/video/make/founder.mp4" },
  { label: "Onboarding videos", clip: "/video/make/onboarding.mp4" },
];

const BASE_SPEED = 60; // px per second

function MarqueeSet({
  hidden = false,
  onEnter,
}: {
  hidden?: boolean;
  onEnter: (index: number) => void;
}) {
  return (
    <div className="marquee-set" aria-hidden={hidden || undefined}>
      {MAKES.map((item, i) => (
        <span key={item.label} className="contents">
          <span className="marquee-item" onPointerEnter={() => onEnter(i)}>
            {item.label}
          </span>
          <Image
            src="/brand/vidiosa-mark-black.png"
            alt=""
            width={109}
            height={116}
          />
        </span>
      ))}
    </div>
  );
}

// The "what we make" strip. It drifts at a steady pace; hovering a word eases it
// to a stop and shows a clip.
export function Marquee() {
  const [active, setActive] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const peekRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const hoverRef = useRef(false);
  const startPeekRef = useRef<() => void>(() => {});

  useEffect(() => {
    const track = trackRef.current;
    if (!track || prefersReducedMotion()) return;

    let x = 0;
    let speed = BASE_SPEED;
    let last = performance.now();
    let raf = 0;
    let visible = false;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const goal = hoverRef.current ? 0 : BASE_SPEED;
      speed += (goal - speed) * 0.08;
      x -= speed * dt;
      const half = track.scrollWidth / 2;
      if (half > 0 && x <= -half) x += half;
      track.style.transform = `translate3d(${x}px, 0, 0)`;
      raf = visible ? requestAnimationFrame(tick) : 0;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    });
    io.observe(track);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  // The preview card trails the cursor, but only animates while a word is hovered.
  useEffect(() => {
    const peek = peekRef.current;
    if (!peek || !hasFinePointer()) return;
    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let raf = 0;

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      peek.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      raf = hoverRef.current ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };
    startPeekRef.current = () => {
      if (raf) return;
      // Appear at the cursor instead of sliding in from where it was last.
      pos.x = target.x;
      pos.y = target.y;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      startPeekRef.current = () => {};
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === active) {
        video.muted = true;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [active]);

  const enter = (i: number) => {
    if (!hasFinePointer()) return;
    hoverRef.current = true;
    startPeekRef.current();
    setActive(i);
  };
  const leave = () => {
    hoverRef.current = false;
    setActive(null);
  };

  return (
    <div className="marquee" aria-label="What we make" onPointerLeave={leave}>
      <div ref={trackRef} className="marquee-track">
        <MarqueeSet onEnter={enter} />
        <MarqueeSet hidden onEnter={enter} />
      </div>

      <div
        ref={peekRef}
        className="peek"
        data-on={active !== null || undefined}
        aria-hidden
      >
        <div className="peek-card">
          {MAKES.map((item, i) => (
            <video
              key={item.clip}
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              src={item.clip}
              muted
              loop
              playsInline
              preload="none"
              data-on={i === active || undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
