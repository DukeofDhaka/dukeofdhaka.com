"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * The Duke — an original low-poly character (black suit, red tie, glasses)
 * living in a fixed full-screen canvas. Scroll position choreographs him:
 * he greets you in the hero, then walks, sits and leans his way down the
 * page, section by section. Head follows the cursor.
 */

type Pose = "stand" | "wave" | "sit" | "lean";

type Keyframe = {
  fx: number; // horizontal, -1 (left edge) … 1 (right edge)
  fy: number; // vertical, -1 (bottom) … 1 (top)
  scale: number;
  rotY: number;
  pose: Pose;
};

// one keyframe per page panel: hero, about, career, works, skills, life, contact
const KEYFRAMES: Keyframe[] = [
  { fx: 0.5, fy: -0.28, scale: 1.05, rotY: -0.2, pose: "wave" },
  { fx: 0.62, fy: 0.28, scale: 0.55, rotY: -0.2, pose: "sit" },
  { fx: 0.55, fy: -0.25, scale: 0.9, rotY: -0.45, pose: "lean" },
  { fx: 0.65, fy: 0.3, scale: 0.5, rotY: -0.25, pose: "sit" },
  { fx: -0.55, fy: -0.25, scale: 0.9, rotY: 0.5, pose: "stand" },
  { fx: 0.5, fy: -0.22, scale: 0.85, rotY: -0.35, pose: "lean" },
  { fx: 0.5, fy: -0.3, scale: 1.0, rotY: -0.15, pose: "sit" },
];

// joint angle targets per pose:
// [thighL, shinL, thighR, shinR, shoulderL, elbowL, shoulderR, elbowR, torso]
const POSES: Record<Pose, number[]> = {
  stand: [0, 0, 0, 0, 0.08, -0.15, -0.08, -0.15, 0],
  wave: [0, 0, 0, 0, 0.08, -0.15, 0, 0, 0], // right arm handled separately
  sit: [-1.5, 1.45, -1.5, 1.45, -0.85, -0.5, -0.85, -0.5, -0.08],
  lean: [-0.12, 0.1, 0.25, -0.05, -1.15, -1.3, -1.15, -1.3, 0.06],
};

const SUIT = "#17171b";
const SHIRT = "#f5f2ea";
const TIE = "#f42a41";
const SKIN = "#b97a56";
const HAIR = "#16120f";
const DARK = "#101014";

function DukeRig() {
  const root = useRef<THREE.Group>(null);
  const torso = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const thighL = useRef<THREE.Group>(null);
  const thighR = useRef<THREE.Group>(null);
  const shinL = useRef<THREE.Group>(null);
  const shinR = useRef<THREE.Group>(null);
  const shoulderL = useRef<THREE.Group>(null);
  const shoulderR = useRef<THREE.Group>(null);
  const elbowL = useRef<THREE.Group>(null);
  const elbowR = useRef<THREE.Group>(null);

  const panelTops = useRef<number[]>([]);
  const waveClock = useRef(0);
  const lastScroll = useRef(0);
  const velocity = useRef(0);
  const { viewport } = useThree();

  useEffect(() => {
    const measure = () => {
      panelTops.current = Array.from(
        document.querySelectorAll<HTMLElement>("main > div")
      ).map((el) => el.offsetTop);
    };
    measure();
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 1200); // re-measure after images/fonts settle
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);

  const lerp = THREE.MathUtils.lerp;
  const damp = THREE.MathUtils.damp;
  const ease = (t: number) => t * t * (3 - 2 * t); // smoothstep

  useFrame((state, delta) => {
    const g = root.current;
    if (!g) return;
    const tops = panelTops.current;
    const y = window.scrollY;
    const vh = window.innerHeight;

    // scroll velocity → walk-cycle blend
    velocity.current = damp(
      velocity.current,
      Math.min(1.5, Math.abs(y - lastScroll.current) / 28),
      6,
      delta
    );
    lastScroll.current = y;

    // which panel gap are we in?
    let seg = 0;
    let t = 0;
    if (tops.length >= 2) {
      seg = tops.length - 1;
      t = 0;
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

    // root placement (viewport-relative → world units)
    const halfW = viewport.width / 2;
    const halfH = viewport.height / 2;
    const targetX = lerp(a.fx, b.fx, k) * halfW * 0.82;
    const targetY = lerp(a.fy, b.fy, k) * halfH * 0.85;
    const targetS = lerp(a.scale, b.scale, k);
    const targetR = lerp(a.rotY, b.rotY, k);

    g.position.x = damp(g.position.x, targetX, 5, delta);
    g.position.y = damp(g.position.y, targetY + Math.sin(state.clock.elapsedTime * 1.7) * 0.02, 5, delta);
    g.scale.setScalar(damp(g.scale.x, targetS, 5, delta));
    g.rotation.y = damp(g.rotation.y, targetR + velocity.current * 0.15, 5, delta);

    // pose blending
    const pa = POSES[a.pose];
    const pb = POSES[b.pose];
    const joints = [thighL, shinL, thighR, shinR, shoulderL, elbowL, shoulderR, elbowR, torso];
    const time = state.clock.elapsedTime;
    const walk = velocity.current;
    const swing = Math.sin(time * 9);

    joints.forEach((j, i) => {
      if (!j.current) return;
      let target = lerp(pa[i], pb[i], k);
      // walk cycle overlays the legs & arms while scrolling
      if (walk > 0.05) {
        if (i === 0) target += swing * 0.55 * walk;
        if (i === 2) target += -swing * 0.55 * walk;
        if (i === 1) target += Math.max(0, -swing) * 0.7 * walk;
        if (i === 3) target += Math.max(0, swing) * 0.7 * walk;
        if (i === 4) target += -swing * 0.3 * walk;
        if (i === 6) target += swing * 0.3 * walk;
      }
      j.current.rotation.x = damp(j.current.rotation.x, target, 8, delta);
    });

    // greeting wave: right arm raised, forearm oscillating (hero + contact)
    const waving = a.pose === "wave" || (seg >= KEYFRAMES.length - 2 && t > 0.5) || waveClock.current > 0;
    if (waveClock.current > 0) waveClock.current -= delta;
    if (shoulderR.current && elbowR.current && waving && walk < 0.3) {
      shoulderR.current.rotation.z = damp(shoulderR.current.rotation.z, -2.2, 6, delta);
      shoulderR.current.rotation.x = damp(shoulderR.current.rotation.x, 0, 6, delta);
      elbowR.current.rotation.z = Math.sin(time * 7) * 0.45;
      elbowR.current.rotation.x = 0;
    } else if (shoulderR.current && elbowR.current) {
      shoulderR.current.rotation.z = damp(shoulderR.current.rotation.z, -0.08, 6, delta);
      elbowR.current.rotation.z = damp(elbowR.current.rotation.z, 0, 6, delta);
    }

    // head tracks the cursor
    if (head.current) {
      head.current.rotation.y = damp(head.current.rotation.y, state.pointer.x * 0.45 - g.rotation.y * 0.5, 5, delta);
      head.current.rotation.x = damp(head.current.rotation.x, -state.pointer.y * 0.25, 5, delta);
    }
  });

  // kick off a hello wave on mount
  useEffect(() => {
    waveClock.current = 2.8;
  }, []);

  const mat = useMemo(
    () => ({
      suit: new THREE.MeshStandardMaterial({ color: SUIT, roughness: 0.75 }),
      shirt: new THREE.MeshStandardMaterial({ color: SHIRT, roughness: 0.9 }),
      tie: new THREE.MeshStandardMaterial({ color: TIE, roughness: 0.6 }),
      skin: new THREE.MeshStandardMaterial({ color: SKIN, roughness: 0.85 }),
      hair: new THREE.MeshStandardMaterial({ color: HAIR, roughness: 0.95 }),
      dark: new THREE.MeshStandardMaterial({ color: DARK, roughness: 0.5 }),
      glass: new THREE.MeshStandardMaterial({ color: "#dddcd6", roughness: 0.25, metalness: 0.6 }),
    }),
    []
  );

  /* proportions: total ≈ 1.8 units tall; hips at y=0 */
  return (
    <group ref={root}>
      {/* legs */}
      {[-1, 1].map((side) => (
        <group
          key={side}
          ref={side < 0 ? thighL : thighR}
          position={[side * 0.13, 0, 0]}
        >
          <mesh material={mat.suit} position={[0, -0.2, 0]}>
            <capsuleGeometry args={[0.09, 0.28, 4, 8]} />
          </mesh>
          <group ref={side < 0 ? shinL : shinR} position={[0, -0.42, 0]}>
            <mesh material={mat.suit} position={[0, -0.18, 0]}>
              <capsuleGeometry args={[0.075, 0.26, 4, 8]} />
            </mesh>
            {/* shoe */}
            <mesh material={mat.dark} position={[0, -0.38, 0.05]}>
              <boxGeometry args={[0.14, 0.09, 0.26]} />
            </mesh>
          </group>
        </group>
      ))}

      {/* torso */}
      <group ref={torso} position={[0, 0.06, 0]}>
        {/* suit body */}
        <mesh material={mat.suit} position={[0, 0.32, 0]}>
          <capsuleGeometry args={[0.24, 0.38, 4, 12]} />
        </mesh>
        {/* shirt V */}
        <mesh material={mat.shirt} position={[0, 0.42, 0.17]}>
          <boxGeometry args={[0.16, 0.26, 0.1]} />
        </mesh>
        {/* tie */}
        <mesh material={mat.tie} position={[0, 0.38, 0.235]} rotation={[0.06, 0, 0]}>
          <boxGeometry args={[0.07, 0.3, 0.03]} />
        </mesh>
        <mesh material={mat.tie} position={[0, 0.545, 0.235]}>
          <boxGeometry args={[0.1, 0.06, 0.035]} />
        </mesh>

        {/* arms */}
        {[-1, 1].map((side) => (
          <group
            key={side}
            ref={side < 0 ? shoulderL : shoulderR}
            position={[side * 0.3, 0.5, 0]}
          >
            <mesh material={mat.suit} position={[0, -0.16, 0]}>
              <capsuleGeometry args={[0.075, 0.2, 4, 8]} />
            </mesh>
            <group ref={side < 0 ? elbowL : elbowR} position={[0, -0.32, 0]}>
              <mesh material={mat.suit} position={[0, -0.13, 0]}>
                <capsuleGeometry args={[0.065, 0.16, 4, 8]} />
              </mesh>
              <mesh material={mat.skin} position={[0, -0.28, 0]}>
                <sphereGeometry args={[0.075, 12, 12]} />
              </mesh>
            </group>
          </group>
        ))}

        {/* head */}
        <group ref={head} position={[0, 0.78, 0]}>
          <mesh material={mat.skin}>
            <sphereGeometry args={[0.21, 20, 20]} />
          </mesh>
          {/* hair cap */}
          <mesh material={mat.hair} position={[0, 0.075, -0.02]} rotation={[-0.25, 0, 0]}>
            <sphereGeometry args={[0.215, 20, 12, 0, Math.PI * 2, 0, Math.PI * 0.52]} />
          </mesh>
          {/* beard hint */}
          <mesh material={mat.hair} position={[0, -0.13, 0.13]} rotation={[0.5, 0, 0]}>
            <boxGeometry args={[0.16, 0.08, 0.08]} />
          </mesh>
          {/* glasses */}
          {[-1, 1].map((side) => (
            <mesh
              key={side}
              material={mat.glass}
              position={[side * 0.085, 0.02, 0.185]}
              rotation={[0, 0, 0]}
            >
              <torusGeometry args={[0.055, 0.008, 8, 20]} />
            </mesh>
          ))}
          <mesh material={mat.glass} position={[0, 0.02, 0.2]}>
            <boxGeometry args={[0.06, 0.008, 0.008]} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

export default function Duke() {
  return (
    <div className="pointer-events-none fixed inset-0 z-20" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.75} />
        <directionalLight position={[2, 4, 3]} intensity={1.4} />
        <pointLight position={[-2, 1, -2]} intensity={2.2} color={TIE} />
        <DukeRig />
      </Canvas>
    </div>
  );
}
