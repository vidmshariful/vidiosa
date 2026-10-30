"use client";

import { PlayIcon } from "@/components/icons";
import { PLAY_REEL_EVENT } from "@/lib/contact";

export function WatchButton() {
  return (
    <button
      type="button"
      className="btn btn-line"
      onClick={() => window.dispatchEvent(new Event(PLAY_REEL_EVENT))}
      aria-label="Watch the showreel"
    >
      <span className="btn-play">
        <PlayIcon />
      </span>
      <span className="roll" data-t="Watch the showreel">
        <span>Watch the showreel</span>
      </span>
    </button>
  );
}
