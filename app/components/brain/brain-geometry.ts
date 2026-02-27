import * as THREE from "three";

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function pseudoRandom(seed: number): number {
  const v = Math.sin(seed * 127.1) * 43758.5453;
  return v - Math.floor(v);
}

export function createBrainGeometry(): THREE.BufferGeometry {
  const geometry = new THREE.PlaneGeometry(20, 20, 72, 72);
  geometry.rotateX(-Math.PI / 2);

  const positions = geometry.attributes.position;
  const count = positions.count;
  const maskArray = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const x = positions.getX(i);
    const z = positions.getZ(i);

    const nx = x / 10;
    const nz = z / 10;

    const angle = Math.atan2(nz, nx);
    const boundary =
      0.92 +
      0.04 * Math.cos(2 * angle) -
      0.02 * Math.sin(angle) +
      0.015 * Math.cos(4 * angle);

    const radius = Math.sqrt(nx * nx + nz * nz);
    const mask = 1 - smoothstep(0.5 * boundary, 0.88 * boundary, radius);
    maskArray[i] = mask;

    const dome = mask * mask * 2.6;

    const absZ = Math.abs(nz);
    const fissureFalloff = 0.4 + 0.6 * smoothstep(0, 0.5, absZ);
    const fissureWidth = 0.035 + 0.01 * (1 - absZ);
    const fissure =
      Math.exp(-(nx * nx) / fissureWidth) * (0.7 * fissureFalloff * mask);

    positions.setY(i, dome - fissure);
  }

  geometry.setAttribute(
    "aBrainMask",
    new THREE.Float32BufferAttribute(maskArray, 1)
  );
  positions.needsUpdate = true;
  geometry.computeVertexNormals();

  return geometry;
}

export function createSignalGeometry(
  brainGeometry: THREE.BufferGeometry
): THREE.BufferGeometry {
  const positions = brainGeometry.attributes.position;
  const posArray = positions.array as Float32Array;
  const maskArray = (
    brainGeometry.attributes.aBrainMask as THREE.BufferAttribute
  ).array as Float32Array;

  const linePositions: number[] = [];
  const progressValues: number[] = [];
  const lineIdValues: number[] = [];
  let lineCount = 0;
  let seed = 42;

  while (lineCount < 120 && seed < 100000) {
    const idx1 = Math.floor(pseudoRandom(seed++) * 5329);
    const idx2 = Math.floor(pseudoRandom(seed++) * 5329);

    if (idx1 === idx2 || maskArray[idx1] < 0.25 || maskArray[idx2] < 0.25) {
      continue;
    }

    const x1 = posArray[3 * idx1];
    const z1 = posArray[3 * idx1 + 2];
    const x2 = posArray[3 * idx2];
    const z2 = posArray[3 * idx2 + 2];
    const dist = Math.sqrt((x2 - x1) ** 2 + (z2 - z1) ** 2);

    if (dist < 1.5 || dist > 8) continue;

    const normalizedId = lineCount / 120;

    for (let s = 0; s < 16; s++) {
      const t0 = s / 16;
      const t1 = (s + 1) / 16;

      const px0 = x1 + (x2 - x1) * t0;
      const py0 = posArray[3 * idx1 + 1] +
        (posArray[3 * idx2 + 1] - posArray[3 * idx1 + 1]) * t0;
      const pz0 = z1 + (z2 - z1) * t0;

      const px1 = x1 + (x2 - x1) * t1;
      const py1 = posArray[3 * idx1 + 1] +
        (posArray[3 * idx2 + 1] - posArray[3 * idx1 + 1]) * t1;
      const pz1 = z1 + (z2 - z1) * t1;

      linePositions.push(px0, py0, pz0, px1, py1, pz1);
      progressValues.push(t0, t1);
      lineIdValues.push(normalizedId, normalizedId);
    }

    lineCount++;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(linePositions, 3)
  );
  geo.setAttribute(
    "aProgress",
    new THREE.Float32BufferAttribute(progressValues, 1)
  );
  geo.setAttribute(
    "aLineId",
    new THREE.Float32BufferAttribute(lineIdValues, 1)
  );
  return geo;
}

export function createFiberGeometry(
  brainGeometry: THREE.BufferGeometry
): THREE.BufferGeometry {
  const posArray = (
    brainGeometry.attributes.position as THREE.BufferAttribute
  ).array as Float32Array;
  const maskArray = (
    brainGeometry.attributes.aBrainMask as THREE.BufferAttribute
  ).array as Float32Array;

  const fiberPositions: number[] = [];
  const progressValues: number[] = [];
  const lineIdValues: number[] = [];
  let fiberCount = 0;

  for (let side = 0; side < 2; side++) {
    const direction = side === 0 ? -1 : 1;
    let found = 0;
    let seed = 5000 * side + 5137;

    while (found < 28 && seed < 80000) {
      const idx = Math.floor(pseudoRandom(seed++) * 5329);
      const mask = maskArray[idx];

      if (mask < 0.03 || mask > 0.45) continue;

      const bx = posArray[3 * idx];
      const by = posArray[3 * idx + 1];
      const bz = posArray[3 * idx + 2];

      if (side === 0 && bx > -3) continue;
      if (side === 1 && bx < 3) continue;

      const length = 6 + 14 * pseudoRandom(seed++);
      const yCurve = (pseudoRandom(seed++) - 0.5) * 2;
      const zCurve = (pseudoRandom(seed++) - 0.5) * 4;
      const wiggleAmp = 0.4 * pseudoRandom(seed++);
      const wiggleFreq = 2 + 4 * pseudoRandom(seed++);
      const normalizedId = fiberCount / 56;

      for (let s = 0; s < 20; s++) {
        const t0 = s / 20;
        const t1 = (s + 1) / 20;

        const px0 = bx + direction * length * t0;
        const py0 =
          by +
          yCurve * Math.sin(t0 * Math.PI * 0.7) +
          wiggleAmp * Math.sin(t0 * wiggleFreq) * t0;
        const pz0 = bz + zCurve * t0 * t0;

        const px1 = bx + direction * length * t1;
        const py1 =
          by +
          yCurve * Math.sin(t1 * Math.PI * 0.7) +
          wiggleAmp * Math.sin(t1 * wiggleFreq) * t1;
        const pz1 = bz + zCurve * t1 * t1;

        fiberPositions.push(px0, py0, pz0, px1, py1, pz1);
        progressValues.push(t0, t1);
        lineIdValues.push(normalizedId, normalizedId);
      }

      found++;
      fiberCount++;
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(fiberPositions, 3)
  );
  geo.setAttribute(
    "aProgress",
    new THREE.Float32BufferAttribute(progressValues, 1)
  );
  geo.setAttribute(
    "aLineId",
    new THREE.Float32BufferAttribute(lineIdValues, 1)
  );
  return geo;
}
