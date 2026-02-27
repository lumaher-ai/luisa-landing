"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  createBrainGeometry,
  createSignalGeometry,
  createFiberGeometry,
} from "./brain-geometry";
import {
  brainVertexShader,
  brainFragmentShader,
  signalVertexShader,
  signalFragmentShader,
  fiberVertexShader,
  fiberFragmentShader,
} from "./brain-shaders";

const ACCENT_R = 0x8a / 255;
const ACCENT_G = 0x9c / 255;
const ACCENT_B = 0xfa / 255;

function makeUniforms(): Record<string, THREE.IUniform> {
  return {
    uTime: { value: 0 },
    uCursor: { value: new THREE.Vector2(0, 0) },
    uDark: { value: 1 },
    uAccent: { value: new THREE.Vector3(ACCENT_R, ACCENT_G, ACCENT_B) },
  };
}

function updateUniforms(
  mat: THREE.ShaderMaterial | null,
  time: number,
  cursorX: number,
  cursorY: number
): void {
  if (!mat) return;
  mat.uniforms.uTime.value = time;
  mat.uniforms.uCursor.value.set(cursorX, cursorY);
}

export default function BrainScene() {
  const cameraReady = useRef(false);
  const brainMatRef = useRef<THREE.ShaderMaterial>(null);
  const signalMatRef = useRef<THREE.ShaderMaterial>(null);
  const fiberMatRef = useRef<THREE.ShaderMaterial>(null);

  const brainGeo = useMemo(() => createBrainGeometry(), []);
  const signalGeo = useMemo(
    () => createSignalGeometry(brainGeo),
    [brainGeo]
  );
  const fiberGeo = useMemo(
    () => createFiberGeometry(brainGeo),
    [brainGeo]
  );

  const brainUniforms = useMemo(() => makeUniforms(), []);
  const signalUniforms = useMemo(() => makeUniforms(), []);
  const fiberUniforms = useMemo(() => makeUniforms(), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const cam = state.camera as THREE.PerspectiveCamera;
    const isMobile = window.innerWidth < 768;
    const targetY = isMobile ? 34 : 12;
    const targetZ = isMobile ? 30 : 10;
    const targetFov = isMobile ? 38 : 45;

    if (cameraReady.current) {
      cam.position.set(0, targetY, targetZ);
      cam.fov = targetFov;
    } else {
      const progress = Math.min(t / 2.5, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      cam.position.set(
        0,
        18 + (targetY - 18) * ease,
        18 + (targetZ - 18) * ease
      );
      cam.fov = 50 + (targetFov - 50) * ease;

      if (progress >= 1) cameraReady.current = true;
    }

    cam.updateProjectionMatrix();
    cam.lookAt(0, isMobile ? -8 : 0, 0);

    const cx = state.pointer.x;
    const cy = state.pointer.y;

    updateUniforms(brainMatRef.current, t, cx, cy);
    updateUniforms(signalMatRef.current, t, cx, cy);
    updateUniforms(fiberMatRef.current, t, cx, cy);
  });

  return (
    <group>
      <mesh geometry={brainGeo}>
        <shaderMaterial
          ref={brainMatRef}
          vertexShader={brainVertexShader}
          fragmentShader={brainFragmentShader}
          uniforms={brainUniforms}
          wireframe
          transparent
          depthWrite={false}
        />
      </mesh>

      <lineSegments geometry={signalGeo}>
        <shaderMaterial
          ref={signalMatRef}
          vertexShader={signalVertexShader}
          fragmentShader={signalFragmentShader}
          uniforms={signalUniforms}
          transparent
          depthWrite={false}
        />
      </lineSegments>

      <lineSegments geometry={fiberGeo}>
        <shaderMaterial
          ref={fiberMatRef}
          vertexShader={fiberVertexShader}
          fragmentShader={fiberFragmentShader}
          uniforms={fiberUniforms}
          transparent
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}
