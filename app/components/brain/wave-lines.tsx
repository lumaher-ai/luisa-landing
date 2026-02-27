function generateWavePath(
  yBase: number,
  amplitude: number,
  frequency: number,
  phase: number
): string {
  const width = 3000;
  const points: string[] = [];

  for (let x = 0; x <= width; x += 4) {
    const y = yBase + Math.sin((x * frequency) / 200 + phase) * amplitude;
    points.push(`${x},${y.toFixed(1)}`);
  }

  return `M${points[0]} ${points.slice(1).map((p) => `L${p}`).join(" ")}`;
}

interface WaveConfig {
  yOffset: number;
  amplitude: number;
  frequency: number;
  phase: number;
  opacity: number;
}

const WAVES: WaveConfig[] = [
  { yOffset: -100, amplitude: 4, frequency: 1.0, phase: 0, opacity: 0.12 },
  { yOffset: -70, amplitude: 6, frequency: 0.7, phase: 1.2, opacity: 0.1 },
  { yOffset: -40, amplitude: 8, frequency: 0.9, phase: 2.5, opacity: 0.14 },
  { yOffset: -10, amplitude: 5, frequency: 1.3, phase: 0.5, opacity: 0.12 },
  { yOffset: 20, amplitude: 10, frequency: 0.6, phase: 3.0, opacity: 0.16 },
  { yOffset: 50, amplitude: 7, frequency: 1.1, phase: 1.8, opacity: 0.13 },
  { yOffset: 80, amplitude: 12, frequency: 0.5, phase: 4.2, opacity: 0.1 },
  { yOffset: 110, amplitude: 5, frequency: 1.4, phase: 2.0, opacity: 0.11 },
  { yOffset: 140, amplitude: 9, frequency: 0.8, phase: 0.3, opacity: 0.08 },
];

export function WaveLines() {
  const centerY = 300;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <svg
        className="absolute top-1/2 left-0 h-[600px] w-[3000px] -translate-y-1/2"
        viewBox="0 0 3000 600"
        preserveAspectRatio="none"
        style={{
          animation: "wave-flow 30s linear infinite",
        }}
      >
        {WAVES.map((wave, i) => (
          <path
            key={i}
            d={generateWavePath(
              centerY + wave.yOffset,
              wave.amplitude,
              wave.frequency,
              wave.phase
            )}
            fill="none"
            stroke="#ffffff"
            strokeWidth="0.5"
            opacity={wave.opacity}
          />
        ))}
      </svg>
    </div>
  );
}
