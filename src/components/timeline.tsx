"use client";

import { useEffect, useRef } from "react";

const DURATION = 30; // seconds — the shortest film Vidiosa cuts
const FPS = 24;
const STILL_FRAME = 7.5; // where the playhead rests when motion is reduced
const TICKS = Array.from({ length: DURATION + 1 }, (_, i) => i);

function timecode(seconds: number) {
  const whole = Math.floor(seconds);
  const mm = String(Math.floor(whole / 60)).padStart(2, "0");
  const ss = String(whole % 60).padStart(2, "0");
  const ff = String(Math.floor((seconds - whole) * FPS)).padStart(2, "0");
  return `00:${mm}:${ss}:${ff}`;
}

/**
 * A live thirty-second timeline. The playhead scrubs in real time and loops,
 * so the page states its own thesis: a short film is a fixed, small budget.
 *
 * The scrub is written straight to the DOM — at 24fps a React re-render per
 * frame buys nothing.
 */
export function Timeline() {
  const fill = useRef<HTMLDivElement>(null);
  const head = useRef<HTMLDivElement>(null);
  const readout = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const paint = (elapsed: number) => {
      const percent = `${(elapsed / DURATION) * 100}%`;
      if (fill.current) fill.current.style.width = percent;
      if (head.current) head.current.style.left = percent;
      if (readout.current) readout.current.textContent = timecode(elapsed);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      paint(STILL_FRAME);
      return;
    }

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      paint(((now - start) / 1000) % DURATION);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section aria-labelledby="timeline-note" className="w-full">
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-2">
        <p
          id="timeline-note"
          className="max-w-md text-sm leading-relaxed text-paper/60 sm:text-[0.9375rem]"
        >
          A thirty-second film is 720 frames. Every one has a job.
        </p>
        <p className="tc text-sm text-paper/85 sm:text-base">
          <span ref={readout} className="text-flare">
            00:00:00:00
          </span>
          <span className="px-2 text-paper/30">/</span>
          <span className="text-paper/60">00:00:30:00</span>
        </p>
      </div>

      <div
        className="relative mt-4 h-16 overflow-hidden border border-line bg-panel sm:h-20"
        role="img"
        aria-label="A thirty-second timeline scrubbing in real time."
      >
        {/* Elapsed region */}
        <div ref={fill} className="absolute inset-y-0 left-0 w-0 bg-flare/10" />

        {/* Second ruler */}
        {TICKS.map((second) => {
          const major = second % 5 === 0;
          return (
            <div
              key={second}
              className={`absolute bottom-0 w-px ${
                major ? "h-4 bg-paper/30" : "h-2 bg-paper/12"
              }`}
              style={{ left: `${(second / DURATION) * 100}%` }}
            />
          );
        })}

        {/* Playhead */}
        <div
          ref={head}
          className="absolute inset-y-0 left-0 w-px bg-flare shadow-[0_0_14px_2px_rgba(254,104,28,0.45)]"
        >
          <div className="absolute -top-px -left-[4px] h-[6px] w-[9px] bg-flare [clip-path:polygon(0_0,100%_0,50%_100%)]" />
        </div>
      </div>

      <div className="tc mt-2 flex justify-between text-[0.6875rem] text-muted">
        <span>In 00:00:00:00</span>
        <span>Out 00:00:30:00</span>
      </div>
    </section>
  );
}
