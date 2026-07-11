"use client";

import { useEffect, useRef } from "react";
import Matter from "matter-js";
import { techBalls } from "@/lib/content";

/**
 * "My Techstack" physics ball pit (the moncy.dev signature). Balls labeled
 * with the stack tumble in when the section scrolls into view and scatter
 * away from the cursor. Touch devices get a periodic shake instead.
 */

const ACCENT = "#f42a41";
const SOFT = "#141416";
const PAPER = "#ece7de";
const DIM = "#8f8a81";

export default function TechBalls() {
  const host = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = host.current;
    const canvas = canvasRef.current;
    if (!el || !canvas) return;

    let engine: Matter.Engine | null = null;
    let raf = 0;
    let started = false;
    let cleanupFns: (() => void)[] = [];

    const start = () => {
      if (started) return;
      started = true;

      const W = el.clientWidth;
      const H = 440;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      const ctx = canvas.getContext("2d")!;
      ctx.scale(dpr, dpr);

      engine = Matter.Engine.create({ gravity: { x: 0, y: 1.1 } });

      // walls
      const wallOpts = { isStatic: true, restitution: 0.9 };
      Matter.Composite.add(engine.world, [
        Matter.Bodies.rectangle(W / 2, H + 30, W + 200, 60, wallOpts),
        Matter.Bodies.rectangle(-30, H / 2, 60, H * 3, wallOpts),
        Matter.Bodies.rectangle(W + 30, H / 2, 60, H * 3, wallOpts),
      ]);

      // balls sized by label weight (first entries = bigger)
      const balls = techBalls.map((label, i) => {
        const r =
          (i < 6 ? 46 : i < 14 ? 38 : 30) * (W < 640 ? 0.72 : 1);
        const body = Matter.Bodies.circle(
          60 + Math.random() * (W - 120),
          -80 - i * 55 - Math.random() * 40,
          r,
          {
            restitution: 0.75,
            friction: 0.02,
            frictionAir: 0.008,
            density: 0.0018,
          }
        );
        const fill = i % 5 === 0 ? ACCENT : SOFT;
        const text = i % 5 === 0 ? PAPER : i % 3 === 0 ? PAPER : DIM;
        const stroke = i % 5 === 0 ? ACCENT : "rgba(236,231,222,0.18)";
        return { body, label, r, fill, text, stroke };
      });
      Matter.Composite.add(engine.world, balls.map((b) => b.body));

      // cursor repulsion — the "juggle"
      const onMove = (e: MouseEvent) => {
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
      cleanupFns.push(() => window.removeEventListener("mousemove", onMove));

      // touch devices: gentle periodic shake
      const isTouch = window.matchMedia("(hover: none)").matches;
      if (isTouch) {
        const shake = setInterval(() => {
          for (const b of balls) {
            Matter.Body.applyForce(b.body, b.body.position, {
              x: (Math.random() - 0.5) * 0.05,
              y: -Math.random() * 0.06,
            });
          }
        }, 2600);
        cleanupFns.push(() => clearInterval(shake));
      }

      let last = performance.now();
      const loop = (now: number) => {
        const dt = Math.min(32, now - last);
        last = now;
        Matter.Engine.update(engine!, dt);

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
          ctx.font = `600 ${Math.max(10, b.r * 0.34)}px var(--font-geist), sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(b.label, 0, 0);
          ctx.restore();
        }
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      cleanupFns.push(() => cancelAnimationFrame(raf));
    };

    // drop the balls the first time the section is visible; pause offscreen
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) start();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    cleanupFns.push(() => io.disconnect());

    return () => {
      cleanupFns.forEach((fn) => fn());
      if (engine) Matter.Engine.clear(engine);
    };
  }, []);

  return (
    <div ref={host} className="relative mx-auto max-w-6xl px-6 sm:px-10">
      <canvas
        ref={canvasRef}
        className="block w-full rounded-2xl border border-paper/10 bg-ink-soft/40"
        aria-label="Interactive tech stack — move your mouse to scatter the balls"
      />
      <p className="mt-3 text-center text-[11px] uppercase tracking-[0.25em] text-paper-dim/60">
        move your mouse through the pit ↑
      </p>
    </div>
  );
}
