"use client";

import dynamic from "next/dynamic";

const SignalSphereRenderer = dynamic(() => import("./signal-sphere-renderer"), {
  ssr: false,
});

export function SignalSphereCanvas() {
  return (
    <div aria-hidden="true">
      <SignalSphereRenderer />
    </div>
  );
}
