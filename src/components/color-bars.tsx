/** SMPTE 75% colour bars — the strip a monitor shows before the picture arrives. */
const BARS = [
  "#c0c0c0",
  "#c0c000",
  "#00c0c0",
  "#00c000",
  "#c000c0",
  "#c00000",
  "#0000c0",
];

export function ColorBars() {
  return (
    <div aria-hidden className="flex h-1.5 w-full shrink-0">
      {BARS.map((color) => (
        <div
          key={color}
          className="flex-1"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}
