"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import {
  KEYS,
  MODEL_URLS,
  RIGS,
  withDraco,
  type ModelKey,
  type RigConfig,
} from "@/lib/models";

/**
 * The Duke, played by Tahsin himself: three Copilot 3D figurines
 * (thumbs-up "greet", seated-with-coffee "sit", surfboard "surf") in a
 * fixed full-screen canvas. Scroll choreographs position/scale/rotation
 * per section; crossing into a section with a different figurine swaps
 * models with a quick spin-shrink/pop-in. Each figurine gets a procedural
 * head rig at load, so his head turns to follow the cursor (and nods to the
 * soundtrack). Click him for a 360.
 */

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
  { fx: 0.66, fy: -0.06, scale: 0.95, rotY: -0.3, model: "surf" }, // life: surfer in the open right column
  { fx: 0.5, fy: -0.12, scale: 1.05, rotY: -0.25, model: "sit" }, // contact: seated right
];

// Phones have no spare columns, so the figurine only appears in the hero
// (framed into the `data-hero-band` space below the text) and parks offscreen
// for the rest. The hero entry is recomputed from the band each frame.
const PARKED: Omit<Keyframe, "model"> = { fx: 1.9, fy: 0, scale: 0.02, rotY: 0 };
const KEYFRAMES_MOBILE: Keyframe[] = KEYFRAMES.map((kf, i) =>
  i === 0 ? { ...kf } : { ...PARKED, model: kf.model }
);
const HERO_SEG = 0;
const MOBILE_MAX = 768;

function useReducedMotion() {
  const ref = useRef(false);
  useEffect(() => {
    ref.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);
  return ref;
}

const smoothstep = (a: number, b: number, x: number) => {
  const t = THREE.MathUtils.clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

/** Skin a figurine's single mesh to a two-bone (root → head) skeleton. */
function rigFigurine(scene: THREE.Object3D, cfg: RigConfig, debug: boolean) {
  let mesh: THREE.Mesh | undefined;
  scene.traverse((o) => {
    if (!mesh && (o as THREE.Mesh).isMesh) mesh = o as THREE.Mesh;
  });
  if (!mesh || !mesh.parent) return null;
  if ((mesh as THREE.SkinnedMesh).isSkinnedMesh) {
    return (mesh as THREE.SkinnedMesh).skeleton.bones[1] ?? null; // already rigged
  }

  const geo = mesh.geometry as THREE.BufferGeometry;
  const pos = geo.attributes.position;
  const n = pos.count;
  const [rx, rz] = cfg.radius;
  const keep = (x: number) =>
    cfg.minX === undefined ? 1 : smoothstep(cfg.minX - 0.004, cfg.minX + 0.004, x);

  // refine the head column centre from the vertices clearly above the neck
  let [cx, cz] = cfg.center;
  let sx = 0;
  let sz = 0;
  let cnt = 0;
  for (let i = 0; i < n; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    if (pos.getY(i) < cfg.neckY + cfg.blend) continue;
    if (Math.hypot((x - cx) / rx, (z - cz) / rz) > 1.2 || keep(x) < 1) continue;
    sx += x;
    sz += z;
    cnt++;
  }
  if (cnt > 50) {
    cx = sx / cnt;
    cz = sz / cnt;
  }

  const skinIndex = new Uint16Array(n * 4);
  const skinWeight = new Float32Array(n * 4);
  const tint = debug ? new Float32Array(n * 3) : null;
  for (let i = 0; i < n; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const vertical = smoothstep(cfg.neckY - cfg.blend, cfg.neckY + cfg.blend * 0.6, pos.getY(i));
    const lateral = 1 - smoothstep(1.0, 1.5, Math.hypot((x - cx) / rx, (z - cz) / rz));
    const w = vertical * lateral * keep(x);
    skinIndex[i * 4] = 0;
    skinIndex[i * 4 + 1] = 1;
    skinWeight[i * 4] = 1 - w;
    skinWeight[i * 4 + 1] = w;
    if (tint) tint.set([0.35 + 0.65 * w, 0.35 * (1 - w), 0.35 * (1 - w)], i * 3);
  }
  geo.setAttribute("skinIndex", new THREE.Uint16BufferAttribute(skinIndex, 4));
  geo.setAttribute("skinWeight", new THREE.Float32BufferAttribute(skinWeight, 4));
  if (tint) geo.setAttribute("color", new THREE.Float32BufferAttribute(tint, 3));

  // debug: unlit weight map (grey = body, red = head) instead of the texture
  const material = tint
    ? new THREE.MeshBasicMaterial({ vertexColors: true })
    : mesh.material;
  const skinned = new THREE.SkinnedMesh(geo, material);
  skinned.position.copy(mesh.position);
  skinned.quaternion.copy(mesh.quaternion);
  skinned.scale.copy(mesh.scale);
  skinned.frustumCulled = false;

  const root = new THREE.Bone();
  const head = new THREE.Bone();
  head.position.set(cx, cfg.neckY, cz);
  root.add(head);
  skinned.add(root);
  skinned.updateMatrixWorld(true);
  skinned.bind(new THREE.Skeleton([root, head]));

  mesh.parent.add(skinned);
  mesh.parent.remove(mesh);
  return head;
}

function Cast({ playing }: { playing: boolean }) {
  const gltfs = useLoader(GLTFLoader, MODEL_URLS, withDraco);

  const root = useRef<THREE.Group>(null);
  const rim = useRef<THREE.PointLight>(null);
  const wrappers = useRef<Record<ModelKey, THREE.Group | null>>({
    greet: null,
    sit: null,
    surf: null,
  });

  const { viewport, camera, size } = useThree();
  const reduced = useReducedMotion();

  const panelTops = useRef<number[]>([]);
  const heroBand = useRef<{ top: number; height: number } | null>(null);
  const lastScroll = useRef(0);
  const velocity = useRef(0);
  const shown = useRef<ModelKey>("greet");
  const swapT = useRef(0); // 0 = fully shown, 1 = fully shrunk mid-swap
  const spinClock = useRef(0);
  const lastPointer = useRef({ x: 0, y: 0, at: -10 });
  const headWorld = useMemo(() => new THREE.Vector3(), []);

  // normalize each figurine to ~1.8 units tall, centered at origin, and rig it
  const { normalized, heads } = useMemo(() => {
    const debug =
      typeof window !== "undefined" && window.location.search.includes("rig=debug");
    const out = {} as Record<ModelKey, THREE.Group>;
    const bones = {} as Record<ModelKey, THREE.Bone | null>;
    KEYS.forEach((key, i) => {
      const scene = gltfs[i].scene;
      const box = new THREE.Box3().setFromObject(scene);
      const sz = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const cfg = RIGS[key];
      bones[key] = cfg ? rigFigurine(scene, cfg, debug) : null;
      const s = 1.8 / Math.max(sz.x, sz.y, sz.z);
      const g = new THREE.Group();
      scene.position.sub(center);
      g.add(scene);
      g.scale.setScalar(s);
      out[key] = g;
    });
    return { normalized: out, heads: bones };
  }, [gltfs]);

  useEffect(() => {
    const measure = () => {
      panelTops.current = Array.from(
        document.querySelectorAll<HTMLElement>("main > div")
      ).map((el) => el.offsetTop);
      const band = document.querySelector<HTMLElement>("[data-hero-band]");
      heroBand.current = band
        ? {
            top: band.getBoundingClientRect().top + window.scrollY,
            height: band.offsetHeight,
          }
        : null;
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
  const clamp = THREE.MathUtils.clamp;
  const ease = (t: number) => t * t * (3 - 2 * t);

  useFrame((state, delta) => {
    const g = root.current;
    if (!g) return;
    const calm = reduced.current;
    const tops = panelTops.current;
    const y = window.scrollY;
    const vh = window.innerHeight;
    const time = state.clock.elapsedTime;
    const halfW = viewport.width / 2;
    const halfH = viewport.height / 2;
    const mobile = size.width < MOBILE_MAX;

    velocity.current = calm
      ? 0
      : damp(velocity.current, Math.min(1.5, Math.abs(y - lastScroll.current) / 28), 6, delta);
    lastScroll.current = y;

    let seg = 0;
    let t = 0;
    if (tops.length >= 2) {
      seg = tops.length - 1;
      for (let i = 0; i < tops.length - 1; i++) {
        if (y < tops[i + 1] - vh * 0.3) {
          seg = i;
          const span = Math.max(1, tops[i + 1] - tops[i]);
          t = clamp((y - tops[i]) / span, 0, 1);
          break;
        }
      }
    }

    const frames = mobile ? KEYFRAMES_MOBILE : KEYFRAMES;
    if (mobile && heroBand.current) {
      // frame the bust so his head starts at the band's top and his chest fills it
      const band = heroBand.current;
      const bandTop = halfH - (band.top / vh) * viewport.height;
      const bandH = Math.max(0.2, (Math.min(band.height, vh - band.top) / vh) * viewport.height);
      const scale = Math.min(bandH / (1.8 * 0.55), (viewport.width * 0.95) / (1.8 * 0.5));
      const centerY = bandTop - 0.04 - 0.9 * scale;
      frames[0].scale = scale;
      frames[0].fy = centerY / (halfH * 0.85);
    }
    const a = frames[Math.min(seg, frames.length - 1)];
    const b = frames[Math.min(seg + 1, frames.length - 1)];
    const k = ease(t);

    // which figurine should be on stage?
    const desired: ModelKey = t < 0.5 ? a.model : b.model;
    const swapRate = calm ? 1 : delta / 0.22;
    if (desired !== shown.current) {
      swapT.current = Math.min(1, swapT.current + swapRate);
      if (swapT.current >= 1) shown.current = desired;
    } else {
      swapT.current = Math.max(0, swapT.current - swapRate);
    }
    KEYS.forEach((key) => {
      const w = wrappers.current[key];
      if (w) w.visible = key === shown.current;
    });

    // placement
    const targetX = lerp(a.fx, b.fx, k) * halfW * 0.82;
    const targetY = lerp(a.fy, b.fy, k) * halfH * 0.85;
    const swapShrink = 1 - 0.92 * ease(swapT.current);
    const targetS = lerp(a.scale, b.scale, k) * swapShrink;
    const spin = spinClock.current > 0 ? (1 - ease(spinClock.current)) * Math.PI * 2 : 0;
    if (spinClock.current > 0) spinClock.current = Math.max(0, spinClock.current - delta / 0.9);
    const targetR =
      lerp(a.rotY, b.rotY, k) +
      (calm ? 0 : Math.sin(time * 0.6) * 0.08) + // idle sway
      velocity.current * 0.35 + // lean into the scroll
      (calm ? 0 : ease(swapT.current) * Math.PI) + // swap spin
      spin;

    const follow = calm ? 30 : 5;
    g.position.x = damp(g.position.x, targetX, follow, delta);
    g.position.y = damp(
      g.position.y,
      targetY + (calm ? 0 : Math.sin(time * 1.6) * 0.045),
      follow,
      delta
    );
    const sc = damp(g.scale.x, Math.max(0.02, targetS), calm ? 30 : 8, delta);
    const breath = calm ? 0 : Math.sin(time * 1.5) * 0.006;
    g.scale.set(sc * (1 - breath * 0.4), sc * (1 + breath), sc * (1 - breath * 0.4));

    // the body only leans toward the cursor in the hero — the head does the looking
    const inHero = seg === HERO_SEG && t < 0.5;
    const bodyYaw = inHero ? state.pointer.x * 0.18 : 0;
    g.rotation.y = damp(g.rotation.y, targetR + bodyYaw, 6, delta);
    g.rotation.z = damp(g.rotation.z, velocity.current * 0.06, 5, delta);
    g.rotation.x = damp(g.rotation.x, -state.pointer.y * (inHero ? 0.06 : 0.04), 5, delta);

    // head: look at the cursor from wherever he is on screen
    const head = heads[shown.current];
    const cfg = RIGS[shown.current];
    if (head && cfg) {
      const p = state.pointer;
      if (p.x !== lastPointer.current.x || p.y !== lastPointer.current.y) {
        lastPointer.current = { x: p.x, y: p.y, at: time };
      }
      let yaw: number;
      let pitch: number;
      if (spinClock.current > 0 || swapT.current > 0.02) {
        yaw = 0; // mid-spin / mid-swap: face forward
        pitch = 0;
      } else if (time - lastPointer.current.at > 2.5 && !calm) {
        // nobody's steering (or it's a phone): idle look-around
        yaw = Math.sin(time * 0.5) * cfg.yaw * 0.6;
        pitch = Math.sin(time * 0.37) * 0.08;
      } else {
        head.getWorldPosition(headWorld);
        const ndc = headWorld.clone().project(camera);
        const LOOK_DEPTH = 2.5; // how far in front of him the "screen" is, world units
        const yawWorld = Math.atan2((p.x - ndc.x) * halfW, LOOK_DEPTH);
        const pitchWorld = -Math.atan2((p.y - ndc.y) * halfH, LOOK_DEPTH);
        yaw = yawWorld - g.rotation.y; // relative to where his body faces
        pitch = pitchWorld - g.rotation.x;
      }
      yaw = clamp(yaw, -cfg.yaw, cfg.yaw);
      pitch = clamp(pitch, -cfg.pitch, cfg.pitch);
      // a small nod on the ~96 BPM beat while the 23 Theme plays
      if (playing && !calm) pitch += Math.max(0, Math.sin(time * Math.PI * 2 * 1.6)) * 0.06;
      head.rotation.y = damp(head.rotation.y, yaw, 7, delta);
      head.rotation.x = damp(head.rotation.x, pitch, 7, delta);
    }

    // music-reactive rim light (~96 BPM pulse while the 23 Theme plays)
    if (rim.current) {
      const beat = playing && !calm ? (0.5 + 0.5 * Math.sin(time * Math.PI * 2 * 1.6)) * 26 : 0;
      rim.current.intensity = damp(rim.current.intensity, 14 + beat, 8, delta);
    }
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[2, 4, 3]} intensity={2.2} />
      <directionalLight position={[-3, 1, 2]} intensity={0.6} color="#cfd8ff" />
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

/** Soft studio reflections from three's built-in RoomEnvironment (no network). */
function applyStudioEnv(gl: THREE.WebGLRenderer, scene: THREE.Scene) {
  const pmrem = new THREE.PMREMGenerator(gl);
  scene.environment?.dispose();
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.55;
  pmrem.dispose();
}

export default function Figurine({ playing }: { playing: boolean }) {
  // A dead WebGL context composites this full-screen canvas as opaque white
  // over the whole site. On loss: hide it and wait for the browser to restore
  // the context; if that doesn't happen soon, drop the figurine, not the page.
  const [status, setStatus] = useState<"ok" | "lost" | "dead">("ok");
  if (status === "dead") return null;
  return (
    <div
      className={`pointer-events-none fixed inset-0 z-20 ${status === "lost" ? "invisible" : ""}`}
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        // Listen for the pointer on the page itself: without an eventSource R3F
        // gives this full-screen canvas `pointer-events: auto`, and it would
        // swallow every click on the site beneath it
        eventSource={document.body}
        eventPrefix="client"
        style={{ background: "transparent" }}
        onCreated={({ gl, scene }) => {
          applyStudioEnv(gl, scene);
          let giveUp: ReturnType<typeof setTimeout> | undefined;
          gl.domElement.addEventListener("webglcontextlost", (e) => {
            e.preventDefault(); // lets the browser restore the context
            setStatus("lost");
            giveUp = setTimeout(() => setStatus("dead"), 4000);
          });
          gl.domElement.addEventListener("webglcontextrestored", () => {
            clearTimeout(giveUp);
            applyStudioEnv(gl, scene); // the env map's render target died with the context
            setStatus("ok");
          });
        }}
      >
        <Cast playing={playing} />
      </Canvas>
    </div>
  );
}
