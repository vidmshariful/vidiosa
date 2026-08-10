import { ImageResponse } from "next/og";

export const alt = "Vidiosa — SaaS videos that educate, engage, and convert";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BARS = [
  "#c0c0c0",
  "#c0c000",
  "#00c0c0",
  "#00c000",
  "#c000c0",
  "#c00000",
  "#0000c0",
];

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "#0b0c0f",
      }}
    >
      <div style={{ display: "flex", height: 10 }}>
        {BARS.map((color) => (
          <div key={color} style={{ flex: 1, backgroundColor: color }} />
        ))}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "space-between",
          padding: "64px 72px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#8b909b",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <span style={{ color: "#edebe6" }}>Vidiosa</span>
          <span>SaaS video studio</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              color: "#fe681c",
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Coming soon
          </span>
          <span
            style={{
              color: "#edebe6",
              fontSize: 78,
              lineHeight: 1.04,
              letterSpacing: -2,
              marginTop: 26,
              maxWidth: 940,
            }}
          >
            SaaS videos that educate, engage, and convert.
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              height: 6,
              width: "100%",
              backgroundColor: "#14161b",
            }}
          >
            <div style={{ width: "25%", backgroundColor: "#fe681c" }} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 16,
              color: "#8b909b",
              fontSize: 20,
            }}
          >
            <span>00:00:07:12</span>
            <span>hello@vidiosa.com</span>
            <span>00:00:30:00</span>
          </div>
        </div>
      </div>
    </div>,
    size,
  );
}
