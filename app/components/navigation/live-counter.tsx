"use client";

import { useEffect, useRef, useState } from "react";

const BASE_VALUE = 798.7;
const INCREMENT_PER_SECOND = 0.0003;

function formatValue(value: number): string {
  return value.toFixed(1);
}

export function LiveCounter() {
  const [display, setDisplay] = useState(formatValue(BASE_VALUE));
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    let rafId = 0;

    function tick(timestamp: number) {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }
      const elapsed = (timestamp - startTimeRef.current) / 1000;
      const current = BASE_VALUE + elapsed * INCREMENT_PER_SECOND;
      setDisplay(formatValue(current));
      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <span className="hidden font-mono text-[11px] tracking-[0.02em] lg:inline">
      <span className="text-[var(--gray-11)]">{display} trillion</span>
      <span className="ml-1 text-[var(--gray-7)]">
        synapses fired while you&apos;re here
      </span>
    </span>
  );
}
