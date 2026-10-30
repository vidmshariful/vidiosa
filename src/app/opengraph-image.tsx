import { ImageResponse } from "next/og";

export const alt = "Vidiosa: One plan. A full video team. Videos every week.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "64px 72px",
        backgroundColor: "#0a0a0b",
        color: "#ffffff",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        {/* The play mark, drawn so the card needs no image fetch. */}
        <svg width="44" height="44" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ff9a4d" />
              <stop offset="0.52" stopColor="#ff5a1f" />
              <stop offset="1" stopColor="#f23d0f" />
            </linearGradient>
          </defs>
          <path
            d="M28 24 L28 76 Q28 88 38 82 L84 56 Q94 50 84 44 L38 18 Q28 12 28 24 Z"
            fill="url(#g)"
          />
        </svg>
        <span style={{ fontSize: 40, fontWeight: 600, letterSpacing: -1 }}>
          vidiosa
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{ fontSize: 86, lineHeight: 0.96, letterSpacing: -4, fontWeight: 600 }}
        >
          One plan. A full video team.
        </span>
        <span
          style={{
            fontSize: 86,
            lineHeight: 0.96,
            letterSpacing: -4,
            fontWeight: 600,
            color: "#ff5a1f",
            marginTop: 8,
          }}
        >
          Videos every week.
        </span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "#a1a1a6",
          fontSize: 24,
        }}
      >
        <span>Product and founder videos for SaaS teams</span>
        <span>vidiosa.com</span>
      </div>
    </div>,
    size,
  );
}
