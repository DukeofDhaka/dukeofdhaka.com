"use client";

import { useEffect, useRef } from "react";
import Matter from "matter-js";
import {
  siDocker,
  siFastapi,
  siGithubactions,
  siHuggingface,
  siOnnx,
  siPandas,
  siPydantic,
  siPytest,
  siPython,
  siPytorch,
  siReact,
  siScikitlearn,
  siTensorflow,
  siTypescript,
} from "simple-icons";
import { techBalls } from "@/lib/content";

/**
 * "My Techstack" physics ball pit (the moncy.dev signature). Balls labeled
 * with the stack tumble in when the section scrolls into view and scatter
 * away from the cursor. Touch devices get a periodic shake instead.
 * Brand glyphs come from simple-icons (CC0); labels without one stay text.
 */

const ACCENT = "#f42a41";
const SOFT = "#141416";
const PAPER = "#ece7de";
const DIM = "#8f8a81";
const H = 440;

const ICONS: Record<string, { path: string }> = {
  Python: siPython,
  TypeScript: siTypescript,
  React: siReact,
  FastAPI: siFastapi,
  Docker: siDocker,
  PyTorch: siPytorch,
  TensorFlow: siTensorflow,
  RoBERTa: siHuggingface,
  ONNX: siOnnx,
  pandas: siPandas,
  "scikit-learn": siScikitlearn,
  Pydantic: siPydantic,
  pytest: siPytest,
  "GitHub Actions": siGithubactions,
};

type Ball = {
  body: Matter.Body;
  label: string;
  r: number;
  fill: string;
  text: string;
  stroke: string;
  icon: Path2D | null;
};

export default function TechBalls() {
  const host = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = host.current;
    const canvas = canvasRef.current;
    if (!el || !canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none)").matches;
    const icons = new Map(
      Object.entries(ICONS).map(([k, v]) => [k, new Path2D(v.path)])
    );

    let engine: Matter.Engine | null = null;
    let balls: Ball[] = [];
    let W = 0;
    let raf = 0;
    let visible = false;
    let built = false;
    let shake: ReturnType<typeof setInterval> | undefined;

    const draw = (ctx: CanvasRenderingContext2D) => {
      ctx.clearRect(0, 0, W, H);
      for (const b of balls) {
        const { x, y } = b.body.position;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(b.body.angle * 0.2);
        ctx.beginPath();
        ctx.arc(0, 0, b.r, 0, Math.PI * 2);
        ctx.fillStyle = b.fill;
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = b.stroke;
        ctx.stroke();
        ctx.fillStyle = b.text;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        if (b.icon) {
          // simple-icons paths live in a 24×24 box
          const s = (b.r * 0.82) / 24;
          ctx.save();
          ctx.translate(-12 * s, -12 * s - b.r * 0.16);
          ctx.scale(s, s);
          ctx.fill(b.icon);
          ctx.restore();
          ctx.font = `600 ${Math.max(8, b.r * 0.22)}px var(--font-geist), sans-serif`;
          ctx.fillText(b.label, 0, b.r * 0.58);
        } else {
          ctx.font = `600 ${Math.max(10, b.r * 0.34)}px var(--font-geist), sans-serif`;
          ctx.fillText(b.label, 0, 0);
        }
        ctx.restore();
      }
    };

    const teardown = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      if (shake) clearInterval(shake);
      if (engine) Matter.Engine.clear(engine);
      engine = null;
      balls = [];
      built = false;
    };

    const build = () => {
      teardown();
      // size from the canvas's own box: the host's clientWidth includes its padding
      W = Math.round(canvas.getBoundingClientRect().width);
      if (W < 10) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.height = `${H}px`;
      const ctx = canvas.getContext("2d")!;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      engine = Matter.Engine.create({ gravity: { x: 0, y: 1.1 } });
      const wallOpts = { isStatic: true, restitution: 0.9 };
      Matter.Composite.add(engine.world, [
        Matter.Bodies.rectangle(W / 2, H + 30, W + 200, 60, wallOpts),
        Matter.Bodies.rectangle(-30, H / 2, 60, H * 3, wallOpts),
        Matter.Bodies.rectangle(W + 30, H / 2, 60, H * 3, wallOpts),
      ]);

      // balls sized by label weight (first entries = bigger)
      const shrink = W < 640 ? 0.72 : W < 900 ? 0.85 : 1;
      balls = techBalls.map((label, i) => {
        const r = (i < 6 ? 46 : i < 14 ? 38 : 30) * shrink;
        const body = Matter.Bodies.circle(
          r + Math.random() * (W - 2 * r),
          -80 - i * 55 - Math.random() * 40,
          r,
          { restitution: 0.75, friction: 0.02, frictionAir: 0.008, density: 0.0018 }
        );
        const red = i % 5 === 0;
        return {
          body,
          label,
          r,
          fill: red ? ACCENT : SOFT,
          text: red || i % 3 === 0 || icons.has(label) ? PAPER : DIM,
          stroke: red ? ACCENT : "rgba(236,231,222,0.18)",
          icon: icons.get(label) ?? null,
        };
      });
      Matter.Composite.add(engine.world, balls.map((b) => b.body));

      // reduced motion: settle the pit off-screen instead of animating the drop
      if (reduced) for (let i = 0; i < 360; i++) Matter.Engine.update(engine, 16);

      if (isTouch && !reduced) {
        shake = setInterval(() => {
          if (!visible) return;
          for (const b of balls) {
            Matter.Body.applyForce(b.body, b.body.position, {
              x: (Math.random() - 0.5) * 0.05,
              y: -Math.random() * 0.06,
            });
          }
        }, 2600);
      }

      built = true;
      draw(ctx);
      if (visible) loop();
    };

    let last = performance.now();
    const loop = () => {
      if (raf || !engine) return;
      const ctx = canvas.getContext("2d")!;
      last = performance.now();
      const tick = (now: number) => {
        if (!engine || !visible) {
          raf = 0;
          return;
        }
        Matter.Engine.update(engine, Math.min(32, now - last));
        last = now;
        draw(ctx);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    // cursor repulsion — the "juggle"
    const onMove = (e: MouseEvent) => {
      if (!visible) return;
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      if (mx < -50 || mx > rect.width + 50 || my < -50 || my > rect.height + 50) return;
      for (const b of balls) {
        const dx = b.body.position.x - mx;
        const dy = b.body.position.y - my;
        const d2 = dx * dx + dy * dy;
        const R = 140;
        if (d2 < R * R && d2 > 1) {
          const d = Math.sqrt(d2);
          const f = ((R - d) / R) * 0.9;
          Matter.Body.applyForce(b.body, b.body.position, {
            x: (dx / d) * f * 0.09,
            y: (dy / d) * f * 0.09 - 0.02,
          });
        }
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    // drop the balls the first time the pit is visible; pause while offscreen
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !built) build();
        else if (visible) loop();
      },
      { threshold: 0.2 }
    );
    io.observe(el);

    // rebuild when the width really changes (rotation, window resize)
    let resizeT: ReturnType<typeof setTimeout> | undefined;
    const ro = new ResizeObserver(() => {
      if (!built) return;
      clearTimeout(resizeT);
      resizeT = setTimeout(() => {
        const w = Math.round(canvas.getBoundingClientRect().width);
        if (Math.abs(w - W) > 24) build();
      }, 250);
    });
    ro.observe(el);

    return () => {
      window.removeEventListener("mousemove", onMove);
      io.disconnect();
      ro.disconnect();
      clearTimeout(resizeT);
      teardown();
    };
  }, []);

  return (
    <div ref={host} className="relative mx-auto max-w-6xl px-6 sm:px-10">
      <canvas
        ref={canvasRef}
        className="block w-full rounded-2xl border border-paper/10 bg-ink-soft/40"
        style={{ height: H }}
        aria-label="Interactive tech stack — move your mouse to scatter the balls"
      />
      <p className="mt-3 text-center text-[11px] uppercase tracking-[0.25em] text-paper-dim/60">
        move your mouse through the pit ↑
      </p>
    </div>
  );
}
