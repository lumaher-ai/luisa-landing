"use client";

import type { Metric } from "./metric-card-types";
import { OrbitCard } from "./metric-card-orbit";

export type { Metric };

export function MetricCards({
  metrics,
  accentColor,
}: {
  metrics: Metric[];
  accentColor: string;
}) {
  return (
    <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-6">
      {metrics.map((metric) => (
        <OrbitCard
          key={metric.label}
          metric={metric}
          accentColor={accentColor}
        />
      ))}
    </div>
  );
}
