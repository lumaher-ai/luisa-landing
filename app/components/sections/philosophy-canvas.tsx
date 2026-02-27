"use client";

import { useCallback, useEffect, useRef } from "react";

/* ── Geometry ── */

interface Point {
  x: number;
  y: number;
}

interface Axon {
  p0: Point;
  c1: Point;
  c2: Point;
  p1: Point;
}

const AXONS: Axon[] = [
  { p0: { x: 80, y: 45 }, c1: { x: 170, y: 20 }, c2: { x: 290, y: 68 }, p1: { x: 400, y: 45 } },
  { p0: { x: 400, y: 45 }, c1: { x: 510, y: 68 }, c2: { x: 610, y: 20 }, p1: { x: 720, y: 45 } },
];

const NODES: Point[] = [
  { x: 80, y: 45 },
  { x: 400, y: 45 },
  { x: 720, y: 45 },
];

// Node x positions as percentages of the 800-unit canvas
const NODE_PERCENTS = NODES.map((n) => (n.x / 800) * 100);

interface Dendrite {
  a: number;
  t: number;
  dx: number;
  dy: number;
}

const DENDRITES: Dendrite[] = [
  { a: 0, t: 0.25, dx: -20, dy: -20 },
  { a: 0, t: 0.5, dx: -12, dy: 22 },
  { a: 0, t: 0.72, dx: 15, dy: 20 },
  { a: 0, t: 0.82, dx: 20, dy: -15 },
  { a: 1, t: 0.25, dx: -12, dy: 20 },
  { a: 1, t: 0.42, dx: 14, dy: -22 },
  { a: 1, t: 0.7, dx: 18, dy: -20 },
  { a: 1, t: 0.85, dx: 12, dy: 14 },
];

const CURVE_STEPS = 200;

function bezierPoint(
  p0: Point, c1: Point, c2: Point, p1: Point, t: number
): Point {
  const u = 1 - t;
  const uu = u * u;
  const uuu = uu * u;
  const tt = t * t;
  const ttt = tt * t;
  return {
    x: uuu * p0.x + 3 * uu * t * c1.x + 3 * u * tt * c2.x + ttt * p1.x,
    y: uuu * p0.y + 3 * uu * t * c1.y + 3 * u * tt * c2.y + ttt * p1.y,
  };
}

function buildCurvePoints(axon: Axon): Point[] {
  const pts: Point[] = [];
  for (let i = 0; i <= CURVE_STEPS; i++) {
    pts.push(bezierPoint(axon.p0, axon.c1, axon.c2, axon.p1, i / CURVE_STEPS));
  }
  return pts;
}

const CURVES = AXONS.map(buildCurvePoints);

function pseudoRandom(seed: number): number {
  const v = 43758.5453 * Math.sin(127.1 * seed + 311.7);
  return v - Math.floor(v);
}

/* ── Pulse state ── */

interface Pulse {
  ax: number;
  pos: number;
  spd: number;
  width: number;
  peak: number;
  burst: boolean;
}

interface Flash {
  idx: number;
  start: number;
  dur: number;
}

interface CanvasState {
  pulses: Pulse[];
  flashes: Flash[];
  burstP: number;
  burstSpd: number;
  burstAxons: number[];
  burstRev: boolean;
  burstActive: boolean;
  time: number;
  last: number;
  active: number;
  w: number;
  h: number;
  dpr: number;
  nextFlash: number;
  nodeFire: number[];
}

/* ── Drawing helpers ── */

function drawSegment(
  ctx: CanvasRenderingContext2D,
  pts: Point[],
  from: number,
  to: number,
  sx: (v: number) => number,
  sy: (v: number) => number,
  step: number
) {
  const lo = Math.max(0, Math.floor(CURVE_STEPS * from));
  const hi = Math.min(CURVE_STEPS, Math.ceil(CURVE_STEPS * to));
  if (hi <= lo) return;
  ctx.beginPath();
  ctx.moveTo(sx(pts[lo].x), sy(pts[lo].y));
  for (let i = lo + step; i <= hi; i += step) {
    const idx = Math.min(i, CURVE_STEPS);
    ctx.lineTo(sx(pts[idx].x), sy(pts[idx].y));
  }
  const last = Math.min(hi, CURVE_STEPS);
  ctx.lineTo(sx(pts[last].x), sy(pts[last].y));
  ctx.stroke();
}

/* ── Component ── */

interface Props {
  active: number;
  onSelect: (index: number) => void;
}

export function PhilosophyCanvas({ active, onSelect }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<CanvasState | null>(null);
  const rafRef = useRef(0);
  const activeRef = useRef(active);

  // Keep activeRef in sync
  activeRef.current = active;

  const fireBurst = useCallback(
    (from: number, to: number) => {
      const st = stateRef.current;
      if (!st) return;
      const forward = to > from;
      const axons: number[] = [];
      if (forward) {
        for (let i = from; i < to; i++) axons.push(i);
      } else {
        for (let i = from - 1; i >= to; i--) axons.push(i);
      }
      st.burstAxons = axons;
      st.burstP = 0;
      st.burstSpd = 2.2 / Math.max(1, axons.length);
      st.burstRev = !forward;
      st.burstActive = true;

      for (const ax of axons) {
        st.pulses.push({
          ax,
          pos: forward ? -0.1 : 1.1,
          spd: (forward ? 1 : -1) * 2,
          width: 0.22,
          peak: 1,
          burst: true,
        });
      }
      st.nodeFire[to] = st.time;
      st.active = to;
    },
    []
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      const st = stateRef.current;
      if (!canvas || !st) return;
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const scaleX = st.w / 800;
      for (let i = 0; i < NODES.length; i++) {
        const nx = NODES[i].x * scaleX;
        if (Math.abs(mx - nx) < 30 * scaleX && i !== activeRef.current) {
          fireBurst(activeRef.current, i);
          onSelect(i);
          return;
        }
      }
    },
    [onSelect, fireBurst]
  );

  // Initialize canvas once on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const dpr = window.devicePixelRatio || 1;

    const st: CanvasState = {
      pulses: [],
      flashes: [],
      burstP: 0,
      burstSpd: 0,
      burstAxons: [],
      burstRev: false,
      burstActive: false,
      time: 0,
      last: performance.now(),
      active: activeRef.current,
      w: 800,
      h: 95,
      dpr,
      nextFlash: 1.2,
      nodeFire: [-999, -999, -999],
    };
    stateRef.current = st;

    // Seed initial pulses
    for (let ax = 0; ax < 2; ax++) {
      for (let j = 0; j < 3; j++) {
        st.pulses.push({
          ax,
          pos: pseudoRandom(100 * ax + 31 * j + 11),
          spd: 0.12 + 0.18 * pseudoRandom(50 * ax + 19 * j + 7),
          width: 0.14 + 0.08 * pseudoRandom(30 * ax + 23 * j),
          peak: 0.3 + 0.15 * pseudoRandom(70 * ax + 13 * j),
          burst: false,
        });
      }
    }

    const ro = new ResizeObserver(([entry]) => {
      const { width } = entry.contentRect;
      if (width > 0) {
        const h = 0.11875 * width;
        st.w = width;
        st.h = h;
        canvas.width = width * st.dpr;
        canvas.height = h * st.dpr;
        canvas.style.width = width + "px";
        canvas.style.height = h + "px";
      }
    });
    ro.observe(wrap);

    function render(now: number) {
      const dt = Math.min((now - st.last) / 1000, 0.05);
      st.last = now;
      st.time += dt;

      // Update pulses
      for (let i = st.pulses.length - 1; i >= 0; i--) {
        const p = st.pulses[i];
        p.pos += p.spd * dt;
        if (p.burst) {
          if (p.pos > 1.3 || p.pos < -0.3) st.pulses.splice(i, 1);
        } else if (p.pos > 1.15) {
          p.pos = -0.15;
          p.spd = 0.12 + 0.18 * pseudoRandom(100 * st.time + 7 * i);
        }
      }

      // Update burst wave
      if (st.burstActive) {
        st.burstP += st.burstSpd * dt;
        if (st.burstP > 1) st.burstActive = false;
      }

      // Flashes
      st.nextFlash -= dt;
      if (st.nextFlash <= 0) {
        st.flashes.push({
          idx: Math.floor(pseudoRandom(100 * st.time) * DENDRITES.length) % DENDRITES.length,
          start: st.time,
          dur: 0.12,
        });
        st.nextFlash = 1 + 2 * pseudoRandom(300 * st.time);
      }
      st.flashes = st.flashes.filter((f) => st.time - f.start < f.dur);

      if (!canvas) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }

      const g = st.time;
      const sx = (v: number) => v * (st.w / 800);
      const sy = (v: number) => v * (st.h / 95);
      const sw = (v: number) => v * (st.w / 800);

      ctx.save();
      ctx.scale(st.dpr, st.dpr);
      ctx.clearRect(0, 0, st.w, st.h);

      // Draw axon base curves
      for (let a = 0; a < 2; a++) {
        const axon = AXONS[a];
        const isAx = (a === 0 && st.active >= 1) || (a === 1 && st.active >= 2);
        const baseAlpha = 0.06 + 0.02 * Math.sin(7 * g + 2.5 * a);
        ctx.beginPath();
        ctx.moveTo(sx(axon.p0.x), sy(axon.p0.y));
        ctx.bezierCurveTo(
          sx(axon.c1.x), sy(axon.c1.y),
          sx(axon.c2.x), sy(axon.c2.y),
          sx(axon.p1.x), sy(axon.p1.y)
        );
        ctx.strokeStyle = isAx
          ? `rgba(15,60,140,${(baseAlpha + 0.12).toFixed(3)})`
          : `rgba(255,255,255,${baseAlpha.toFixed(3)})`;
        ctx.lineWidth = isAx ? 1 : 0.5;
        ctx.stroke();
      }

      // Draw pulses
      ctx.lineCap = "round";
      for (const p of st.pulses) {
        const pts = CURVES[p.ax];
        if (!pts) continue;
        const half = p.width / 2;
        const lo = p.pos - half;
        const hi = p.pos + half;
        if (hi <= 0 || lo >= 1) continue;

        const isAx = (p.ax === 0 && st.active >= 1) || (p.ax === 1 && st.active >= 2);
        const strength = p.burst || isAx ? p.peak : 0.35 * p.peak;

        ctx.globalAlpha = 0.15 * strength;
        ctx.strokeStyle = "rgb(15,60,140)";
        ctx.lineWidth = sw(p.burst ? 12 : 8);
        drawSegment(ctx, pts, Math.max(0, lo), Math.min(1, hi), sx, sy, 4);

        ctx.globalAlpha = 0.35 * strength;
        ctx.lineWidth = sw(p.burst ? 5 : 3);
        drawSegment(ctx, pts, Math.max(0, lo), Math.min(1, hi), sx, sy, 4);

        ctx.globalAlpha = strength * (p.burst ? 0.85 : 0.6);
        ctx.strokeStyle = p.burst ? "rgb(200,220,255)" : "rgb(45,110,200)";
        ctx.lineWidth = sw(p.burst ? 2 : 1.2);
        drawSegment(ctx, pts, Math.max(0, lo), Math.min(1, hi), sx, sy, 4);

        ctx.globalAlpha = 1;
      }

      // Draw burst wave highlight
      if (st.burstActive) {
        for (const ax of st.burstAxons) {
          const pts = CURVES[ax];
          if (!pts) continue;
          const prog = st.burstRev ? 1 - st.burstP : st.burstP;
          const lo = Math.max(0, prog - 0.12);
          const hi = Math.min(1, prog + 0.12);
          ctx.save();
          ctx.lineCap = "round";
          ctx.shadowColor = "rgba(15,60,140,0.6)";
          ctx.shadowBlur = 16;
          ctx.globalAlpha = 0.9;
          ctx.strokeStyle = "rgb(200,220,255)";
          ctx.lineWidth = sw(4);
          drawSegment(ctx, pts, lo, hi, sx, sy, 2);
          ctx.restore();
        }
      }

      // Draw dendrites
      for (let d = 0; d < DENDRITES.length; d++) {
        const den = DENDRITES[d];
        const isDenAct = (den.a === 0 && st.active >= 1) || (den.a === 1 && st.active >= 2);
        const isFlashing = st.flashes.some((f) => f.idx === d);
        const pt = CURVES[den.a][Math.round(CURVE_STEPS * den.t)];
        const ex = pt.x + den.dx;
        const ey = pt.y + den.dy;
        const alpha = isFlashing ? 0.55 : isDenAct ? 0.1 : 0.04;

        ctx.beginPath();
        ctx.moveTo(sx(pt.x), sy(pt.y));
        ctx.quadraticCurveTo(
          sx(pt.x + 0.5 * den.dx), sy(pt.y + 0.3 * den.dy),
          sx(ex), sy(ey)
        );
        ctx.strokeStyle = isDenAct || isFlashing
          ? `rgba(15,60,140,${alpha.toFixed(3)})`
          : `rgba(255,255,255,${alpha.toFixed(3)})`;
        ctx.lineWidth = isFlashing ? 1 : 0.6;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(sx(ex), sy(ey), sw(1.3), 0, 2 * Math.PI);
        ctx.fillStyle = isDenAct || isFlashing
          ? `rgba(15,60,140,${(0.6 * alpha).toFixed(3)})`
          : `rgba(255,255,255,${(0.4 * alpha).toFixed(3)})`;
        ctx.fill();
      }

      // Draw nodes
      ctx.lineCap = "butt";
      for (let n = 0; n < NODES.length; n++) {
        const node = NODES[n];
        const isNodeActive = st.active === n;
        const fireDelta = g - st.nodeFire[n];
        const fireGlow = fireDelta > 0 && fireDelta < 0.4 ? 1 - fireDelta / 0.4 : 0;

        if (isNodeActive) {
          ctx.save();
          ctx.shadowColor = "rgba(15,60,140,0.12)";
          ctx.shadowBlur = 30;
          ctx.beginPath();
          ctx.arc(sx(node.x), sy(node.y), sw(16), 0, 2 * Math.PI);
          ctx.fillStyle = "rgba(15,60,140,0.03)";
          ctx.fill();
          ctx.restore();
        }

        ctx.beginPath();
        ctx.arc(sx(node.x), sy(node.y), sw(14), 0, 2 * Math.PI);
        ctx.strokeStyle = "rgba(255,255,255,0.07)";
        ctx.lineWidth = 1;
        ctx.stroke();

        if (fireGlow > 0) {
          ctx.beginPath();
          ctx.arc(sx(node.x), sy(node.y), sw(14 + 6 * fireGlow), 0, 2 * Math.PI);
          ctx.strokeStyle = `rgba(15,60,140,${(0.5 * fireGlow).toFixed(3)})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        const dotRadius = isNodeActive ? 4 : 2.5;
        ctx.beginPath();
        ctx.arc(sx(node.x), sy(node.y), sw(dotRadius), 0, 2 * Math.PI);
        ctx.fillStyle = isNodeActive ? "rgb(45,110,200)" : "rgba(255,255,255,0.25)";
        ctx.fill();
      }

      ctx.restore();
      rafRef.current = requestAnimationFrame(render);
    }

    rafRef.current = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []); // mount only — active is synced via ref

  // Sync active into canvas state without re-creating it
  useEffect(() => {
    const st = stateRef.current;
    if (st) st.active = active;
  }, [active]);

  return (
    <div className="relative">
      <div ref={wrapRef} className="w-full" style={{ aspectRatio: "800/95" }}>
        <canvas
          ref={canvasRef}
          className="h-full w-full cursor-pointer"
          onClick={handleClick}
        />
      </div>
      {/* 01 / 02 / 03 labels below nodes */}
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 translate-y-full">
        {NODE_PERCENTS.map((pct, i) => (
          <span
            key={i}
            className="absolute font-mono text-[12px] tracking-[0.06em] transition-colors duration-300"
            style={{
              left: `${pct}%`,
              transform: "translateX(-50%)",
              top: 4,
              color: active === i ? "var(--gray-12)" : "var(--gray-6)",
            }}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
        ))}
      </div>
    </div>
  );
}
