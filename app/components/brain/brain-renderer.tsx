"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import BrainScene from "./brain-scene";

export default function BrainRenderer() {
  return (
    <Canvas
      camera={{ position: [0, 18, 18], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0, zIndex: 1 }}
    >
      <Suspense fallback={null}>
        <BrainScene />
      </Suspense>
    </Canvas>
  );
}
