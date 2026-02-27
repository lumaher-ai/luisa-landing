"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import SignalSphereScene from "./signal-sphere-scene";

export default function SignalSphereRenderer() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 48 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Suspense fallback={null}>
        <SignalSphereScene />
      </Suspense>
    </Canvas>
  );
}
