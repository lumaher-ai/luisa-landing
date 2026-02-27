"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const SPHERE_R = 3.2;
const ARC_COUNT = 60;
const ARC_STEPS = 14;

const arcVertexShader = `
uniform float uTime;
attribute float aProgress;
attribute float aLineId;
varying float vProgress;
varying float vLineId;

void main() {
  vProgress = aProgress;
  vLineId = aLineId;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const arcFragmentShader = `
uniform float uTime;
varying float vProgress;
varying float vLineId;

void main() {
  float speed = 0.08 + fract(vLineId * 7.31) * 0.13;
  float phase = fract(vLineId * 13.73);
  float rawCycle = fract(uTime * speed + phase);

  float firing = smoothstep(0.0, 0.04, rawCycle) * smoothstep(0.32, 0.27, rawCycle);
  float signalPos = rawCycle / 0.27;

  float dist = abs(vProgress - clamp(signalPos, 0.0, 1.0));
  float core = exp(-dist * dist * 140.0);
  float glow = exp(-dist * dist * 18.0);
  float trail = exp(-max(vProgress - signalPos, 0.0) * 9.0) * 0.3;
  float signal = (core + glow * 0.5 + trail) * firing;

  vec3 baseColor = vec3(0.22);
  vec3 coreColor = vec3(0.75, 0.88, 1.0);
  vec3 glowColor = vec3(0.25, 0.45, 0.9);
  vec3 electricColor = mix(glowColor, coreColor, core);

  vec3 color = mix(baseColor, electricColor, clamp(signal, 0.0, 1.0));
  float baseAlpha = 0.09;
  float alpha = baseAlpha + signal * 0.55;

  float endFade = smoothstep(0.0, 0.06, vProgress) * smoothstep(0.0, 0.06, 1.0 - vProgress);
  alpha *= endFade;

  gl_FragColor = vec4(color, clamp(alpha, 0.0, 1.0));
}`;

function rand(n: number): number {
  const v = Math.sin(n * 127.1) * 43758.5453;
  return v - Math.floor(v);
}

function buildArcGeometry(): THREE.BufferGeometry {
  const positions: number[] = [];
  const progressValues: number[] = [];
  const lineIdValues: number[] = [];

  for (let i = 0; i < ARC_COUNT; i++) {
    const phi1 = rand(i * 5) * Math.PI;
    const theta1 = rand(i * 5 + 1) * Math.PI * 2;
    const phi2 = rand(i * 5 + 2) * Math.PI;
    const theta2 = rand(i * 5 + 3) * Math.PI * 2;

    const a = new THREE.Vector3(
      Math.sin(phi1) * Math.cos(theta1),
      Math.cos(phi1),
      Math.sin(phi1) * Math.sin(theta1)
    );
    const b = new THREE.Vector3(
      Math.sin(phi2) * Math.cos(theta2),
      Math.cos(phi2),
      Math.sin(phi2) * Math.sin(theta2)
    );

    const normalizedId = i / ARC_COUNT;

    for (let s = 0; s < ARC_STEPS; s++) {
      const t0 = s / ARC_STEPS;
      const t1 = (s + 1) / ARC_STEPS;

      const p0 = a.clone().lerp(b, t0).normalize().multiplyScalar(SPHERE_R);
      const p1 = a.clone().lerp(b, t1).normalize().multiplyScalar(SPHERE_R);

      positions.push(p0.x, p0.y, p0.z, p1.x, p1.y, p1.z);
      progressValues.push(t0, t1);
      lineIdValues.push(normalizedId, normalizedId);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("aProgress", new THREE.Float32BufferAttribute(progressValues, 1));
  geo.setAttribute("aLineId", new THREE.Float32BufferAttribute(lineIdValues, 1));
  return geo;
}

function buildWireframeGeometry(): THREE.BufferGeometry {
  const sphere = new THREE.SphereGeometry(SPHERE_R, 22, 14);
  const wire = new THREE.WireframeGeometry(sphere);
  sphere.dispose();
  return wire;
}

export default function SignalSphereScene() {
  const groupRef = useRef<THREE.Group>(null);
  const arcMatRef = useRef<THREE.ShaderMaterial>(null);

  const arcGeo = useMemo(() => buildArcGeometry(), []);
  const wireGeo = useMemo(() => buildWireframeGeometry(), []);

  const arcUniforms = useMemo(
    () => ({ uTime: { value: 0 } }),
    []
  );

  useEffect(() => {
    return () => {
      arcGeo.dispose();
      wireGeo.dispose();
    };
  }, [arcGeo, wireGeo]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.1;
    }
    if (arcMatRef.current) {
      arcMatRef.current.uniforms.uTime.value = t;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Base wireframe sphere */}
      <lineSegments geometry={wireGeo}>
        <lineBasicMaterial color={0x3a4a6a} transparent opacity={0.12} depthWrite={false} />
      </lineSegments>

      {/* Animated arc signals */}
      <lineSegments geometry={arcGeo}>
        <shaderMaterial
          ref={arcMatRef}
          vertexShader={arcVertexShader}
          fragmentShader={arcFragmentShader}
          uniforms={arcUniforms}
          transparent
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}
