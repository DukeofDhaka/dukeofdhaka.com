"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

/**
 * The Duke, now played by Tahsin himself: three Copilot 3D figurines
 * (thumbs-up "greet", seated-with-coffee "sit", surfboard "surf") in a
 * fixed full-screen canvas. Scroll choreographs position/scale/rotation
 * per section; crossing into a section with a different figurine swaps
 * models with a quick spin-shrink/pop-in. Click him for a 360.
 */

type ModelKey = "greet" | "sit" | "surf";

type Keyframe = {
  fx: number;
  fy: number;
  scale: number;
  rotY: number;
  model: ModelKey;
};

// one keyframe per panel:
// hero, about, what-i-do, career, works, skillset(techstack), life, contact
// Career/Works/Techstack use centered layouts, so the figurine parks
// offscreen (fx ±1.7, scale ~0) to keep them clean.
const KEYFRAMES: Keyframe[] = [
  { fx: 0.0, fy: -1.0, scale: 2.7, rotY: 0.0, model: "greet" }, // hero: huge centered bust
  { fx: -0.52, fy: -0.12, scale: 0.95, rotY: 0.35, model: "sit" }, // about: left of text
  { fx: -0.5, fy: 0.05, scale: 0.9, rotY: 0.3, model: "sit" }, // what-i-do: left
  { fx: -1.7, fy: 0, scale: 0.02, rotY: 0, model: "sit" }, // career: parked
  { fx: 1.7, fy: 0, scale: 0.02, rotY: 0, model: "greet" }, // works: parked
  { fx: -1.7, fy: 0, scale: 0.02, rotY: 0, model: "greet" }, // techstack: parked
  { fx: 0.62, fy: -0.06, scale: 0.95, rotY: -0.3, model: "surf" }, // life: surfer right
  { fx: 0.5, fy: -0.12, scale: 1.05, rotY: -0.25, model: "sit" }, // contact: seated right
];
const HERO_SEG = 0;

const MODEL_URLS: Record<ModelKey, string> = {
  greet: "/models/greet.glb",
  sit: "/models/sit.glb",
  surf: "/models/surf.glb",
};
const KEYS: ModelKey[] = ["greet", "sit", "surf"];

function useReducedMotion() {
  const ref = useRef(false);
  useEffect(() => {
    ref.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);
  return ref;
}

function Cast({ playing }: { playing: boolean }) {
  const gltfs = useLoader(
    GLTFLoader,
    KEYS.map((k) => MODEL_URLS[k]),
    (loader) => {
      const d = new DRACOLoader();
      d.setDecoderPath("/draco/");
      (loader as GLTFLoader).setDRACOLoader(d);
    }
  );

  const root = useRef<THREE.Group>(null);
  const rim = useRef<THREE.PointLight>(null);
  const wrappers = useRef<Record<ModelKey, THREE.Group | null>>({
    greet: null,
    sit: null,
    surf: null,
  });

  const { viewport, camera } = useThree();
  const reduced = useReducedMotion();

  const panelTops = useRef<number[]>([]);
  const lastScroll = useRef(0);
  const velocity = useRef(0);
  const shown = useRef<ModelKey>("greet");
  const swapT = useRef(0); // 0 = fully shown, 1 = fully shrunk mid-swap
  const spinClock = useRef(0);

  // normalize each figurine to ~1.8 units tall, centered at origin
  const normalized = useMemo(() => {
    const out: Partial<Record<ModelKey, THREE.Group>> = {};
    KEYS.forEach((key, i) => {
      const scene = gltfs[i].scene;
      const box = new THREE.Box3().setFromObject(scene);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const s = 1.8 / Math.max(size.x, size.y, size.z);
      const g = new THREE.Group();
      scene.position.sub(center);
      scene.scale.setScalar(1); // scale applied on the wrapper for clean math
      g.add(scene);
      g.scale.setScalar(s);
      out[key] = g;
    });
    return out as Record<ModelKey, THREE.Group>;
  }, [gltfs]);

  useEffect(() => {
    const measure = () => {
      panelTops.current = Array.from(
        document.querySelectorAll<HTMLElement>("main > div")
      ).map((el) => el.offsetTop);
    };
    measure();
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 1200);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);

  // click easter egg: raycast against the visible figurine's bounding sphere
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const g = root.current;
      if (!g || spinClock.current > 0) return;
      const ndc = new THREE.Vector2(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      );
      const ray = new THREE.Raycaster();
      ray.setFromCamera(ndc, camera);
      const sphere = new THREE.Sphere(g.position.clone(), 1.1 * g.scale.x);
      if (ray.ray.intersectsSphere(sphere)) spinClock.current = 1;
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [camera]);

  const lerp = THREE.MathUtils.lerp;
  const damp = THREE.MathUtils.damp;
  const ease = (t: number) => t * t * (3 - 2 * t);

  useFrame((state, delta) => {
    const g = root.current;
    if (!g) return;
    const tops = panelTops.current;
    const y = reduced.current ? 0 : window.scrollY;
    const vh = window.innerHeight;
    const time = state.clock.elapsedTime;

    velocity.current = damp(
      velocity.current,
      Math.min(1.5, Math.abs(y - lastScroll.current) / 28),
      6,
      delta
    );
    lastScroll.current = y;

    let seg = 0;
    let t = 0;
    if (tops.length >= 2) {
      seg = tops.length - 1;
      for (let i = 0; i < tops.length - 1; i++) {
        if (y < tops[i + 1] - vh * 0.3) {
          seg = i;
          const span = Math.max(1, tops[i + 1] - tops[i]);
          t = THREE.MathUtils.clamp((y - tops[i]) / span, 0, 1);
          break;
        }
      }
    }
    const a = KEYFRAMES[Math.min(seg, KEYFRAMES.length - 1)];
    const b = KEYFRAMES[Math.min(seg + 1, KEYFRAMES.length - 1)];
    const k = ease(t);

    // which figurine should be on stage?
    const desired: ModelKey = t < 0.5 ? a.model : b.model;
    if (desired !== shown.current) {
      swapT.current = Math.min(1, swapT.current + delta / 0.22);
      if (swapT.current >= 1) shown.current = desired;
    } else {
      swapT.current = Math.max(0, swapT.current - delta / 0.22);
    }
    KEYS.forEach((key) => {
      const w = wrappers.current[key];
      if (w) w.visible = key === shown.current;
    });

    // placement
    const halfW = viewport.width / 2;
    const halfH = viewport.height / 2;
    const targetX = lerp(a.fx, b.fx, k) * halfW * 0.82;
    const targetY = lerp(a.fy, b.fy, k) * halfH * 0.85;
    const swapShrink = 1 - 0.92 * ease(swapT.current);
    const targetS = lerp(a.scale, b.scale, k) * swapShrink;
    const spin = spinClock.current > 0 ? (1 - ease(spinClock.current)) * Math.PI * 2 : 0;
    if (spinClock.current > 0) spinClock.current = Math.max(0, spinClock.current - delta / 0.9);
    const targetR =
      lerp(a.rotY, b.rotY, k) +
      Math.sin(time * 0.6) * 0.12 + // idle turntable sway
      velocity.current * 0.35 + // lean into the scroll
      ease(swapT.current) * Math.PI + // swap spin
      spin;

    g.position.x = damp(g.position.x, targetX, 5, delta);
    g.position.y = damp(
      g.position.y,
      targetY + (reduced.current ? 0 : Math.sin(time * 1.6) * 0.045),
      5,
      delta
    );
    g.scale.setScalar(damp(g.scale.x, Math.max(0.02, targetS), 8, delta));

    // in the hero he watches the cursor (strong); elsewhere just a soft tilt
    const inHero = seg === HERO_SEG && t < 0.5;
    const faceY = inHero ? state.pointer.x * 0.6 : 0;
    const faceX = inHero ? -state.pointer.y * 0.25 : -state.pointer.y * 0.08;
    g.rotation.y = damp(g.rotation.y, targetR + faceY, 6, delta);
    g.rotation.z = damp(g.rotation.z, velocity.current * 0.06, 5, delta);
    g.rotation.x = damp(g.rotation.x, faceX, 5, delta);

    // music-reactive rim light (~96 BPM pulse while the 23 Theme plays)
    if (rim.current) {
      const beat = playing ? (0.5 + 0.5 * Math.sin(time * Math.PI * 2 * 1.6)) * 26 : 0;
      rim.current.intensity = damp(rim.current.intensity, 14 + beat, 8, delta);
    }
  });

  return (
    <>
      <ambientLight intensity={1.35} />
      <directionalLight position={[2, 4, 3]} intensity={2.4} />
      <pointLight ref={rim} position={[-2.5, 1, -2]} intensity={14} color="#f42a41" />
      <group ref={root}>
        {KEYS.map((key) => (
          <primitive
            key={key}
            object={normalized[key]}
            ref={(v: THREE.Group | null) => {
              wrappers.current[key] = v;
            }}
          />
        ))}
      </group>
    </>
  );
}

export default function Figurine({ playing }: { playing: boolean }) {
  // A dead WebGL context composites this full-screen canvas as opaque white
  // over the whole site, so if the context is lost drop the figurine, not the page.
  const [contextLost, setContextLost] = useState(false);
  if (contextLost) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-20" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        style={{ background: "transparent" }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", () =>
            setContextLost(true)
          );
        }}
      >
        <Cast playing={playing} />
      </Canvas>
    </div>
  );
}
