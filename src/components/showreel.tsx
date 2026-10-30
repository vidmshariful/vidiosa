"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { ArrowIcon, PlayIcon } from "@/components/icons";
import { BOOK_CALL_URL, PLAY_REEL_EVENT } from "@/lib/contact";

const POSTER = "/video/showreel-poster.jpg";

export function Showreel() {
  const [playing, setPlaying] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLVideoElement>(null);

  // React does not always put `muted` on the element before autoplay runs,
  // so set it here and start the silent preview by hand.
  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;
    preview.muted = true;
    preview.play().catch(() => {});
  }, []);

  useEffect(() => {
    const start = () => {
      setPlaying(true);
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    };
    window.addEventListener(PLAY_REEL_EVENT, start);
    return () => window.removeEventListener(PLAY_REEL_EVENT, start);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="showreel"
      aria-label="Vidiosa showreel"
      className={`stage fade-in${playing ? " is-playing" : ""}`}
      // On desktop the whole frame plays the reel; the cursor turns into a Play bubble.
      data-cursor={playing ? undefined : "play"}
      onClick={(e) => {
        if (!playing && !(e.target as Element).closest("a")) setPlaying(true);
      }}
    >
      <video
        ref={previewRef}
        className="stage-preview"
        src="/video/showreel-preview.mp4"
        poster={POSTER}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
      />

      {playing ? (
        <video
          className="stage-reel"
          data-cursor="none"
          src="/video/showreel.mp4"
          poster={POSTER}
          autoPlay
          controls
          playsInline
          preload="auto"
        />
      ) : (
        <>
          <button
            type="button"
            className="play-pill"
            onClick={() => setPlaying(true)}
            aria-label="Play the Vidiosa showreel with sound"
          >
            <span className="play-pill-dot">
              <PlayIcon size={22} />
            </span>
            Play showreel
          </button>

          <a
            href={BOOK_CALL_URL}
            className="call-card"
            data-cursor="link"
            data-magnetic
          >
            <span className="flex h-13 w-13 items-center justify-center rounded-[14px] bg-ink">
              <Image
                src="/brand/vidiosa-mark-white.png"
                alt=""
                width={109}
                height={116}
                className="h-auto w-[26px]"
              />
            </span>
            <span className="flex flex-col pr-2 leading-tight">
              <span className="text-xs text-muted">Free, 30 minutes</span>
              <span className="text-[15px] font-semibold">
                Plan your first month
              </span>
            </span>
            <span className="call-card-go">
              <ArrowIcon size={16} />
            </span>
          </a>
        </>
      )}
    </section>
  );
}
