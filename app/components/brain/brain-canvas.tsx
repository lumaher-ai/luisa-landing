"use client";

import dynamic from "next/dynamic";

const BrainRenderer = dynamic(() => import("./brain-renderer"), {
  ssr: false,
});

export function BrainCanvas() {
  return (
    <div aria-hidden="true">
      <BrainRenderer />
    </div>
  );
}
