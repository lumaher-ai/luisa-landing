export type SignalType =
  | "sine"
  | "square"
  | "sawtooth"
  | "harmonic"
  | "complex";

export const SIGNAL_POINTS = 200;

export function sineSignal(e: number, t: number): number {
  return Math.sin((e + t) * Math.PI * 6);
}

export function squareSignal(e: number, t: number): number {
  return Math.tanh(5 * Math.sin((e + t) * Math.PI * 12));
}

export function sawtoothSignal(e: number, t: number): number {
  const n = (e + t) * 8;
  const r = Math.floor(4 * n) / 4;
  return 0.6 * ((n % 1) * 2 - 1) + ((r % 1) * 2 - 1) * 0.4;
}

export function harmonicSignal(e: number, t: number): number {
  const n = (e + t) * Math.PI * 6;
  return 0.6 * Math.sin(n) + 0.25 * Math.sin(3 * n) + 0.1 * Math.sin(5 * n);
}

export function complexSignal(e: number, t: number): number {
  const n = (e + t) * Math.PI * 2;
  return (
    0.4 * Math.sin(2 * n) +
    0.3 * Math.sin(5 * n) +
    0.2 * Math.sin(8.5 * n) +
    0.1 * Math.sin(13 * n)
  );
}

const GENERATORS: Record<SignalType, (e: number, t: number) => number> = {
  sine: sineSignal,
  square: squareSignal,
  sawtooth: sawtoothSignal,
  harmonic: harmonicSignal,
  complex: complexSignal,
};

export function getSignalGenerator(
  type: SignalType
): (e: number, t: number) => number {
  return GENERATORS[type];
}
