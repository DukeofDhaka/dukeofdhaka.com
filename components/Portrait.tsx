"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Interactive particle portrait. Samples /portrait.jpg into ~10k particles
 * (light background pixels dropped), which scatter away from the cursor and
 * spring back home. If the image is missing, nothing renders — the site
 * works fine without it.
 */

type Cloud = {
  home: Float32Array;
  positions: Float32Array;
  colors: Float32Array;
  count: number;
};

const PAPER = new THREE.Color("#ece7de");
const ACCENT = new THREE.Color("#f42a41");

function buildCloud(img: HTMLImageElement): Cloud | null {
  const SAMPLE = 150;
  const aspect = img.height / img.width;
  const w = SAMPLE;
  const h = Math.round(SAMPLE * aspect);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.drawImage(img, 0, 0, w, h);
  const data = ctx.getImageData(0, 0, w, h).data;

  const home: number[] = [];
  const colors: number[] = [];
  const SIZE = 3.4; // world units across
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const lum =
        (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
      if (lum > 0.84) continue; // drop the light studio background
      const darkness = 1 - lum;
      // engraving on black: darker pixels glow brighter, deepest shadows go red
      const c = PAPER.clone()
        .multiplyScalar(0.25 + 0.75 * darkness)
        .lerp(ACCENT, darkness > 0.8 ? 0.55 : 0.08);
      home.push(
        ((x - w / 2) / w) * SIZE,
        (-(y - h / 2) / w) * SIZE,
        darkness * 0.35 // slight depth relief
      );
      colors.push(c.r, c.g, c.b);
    }
  }
  if (home.length === 0) return null;
  return {
    home: new Float32Array(home),
    positions: new Float32Array(home),
    colors: new Float32Array(colors),
    count: home.length / 3,
  };
}

function ParticleField({ cloud }: { cloud: Cloud }) {
  const points = useRef<THREE.Points>(null);
  const group = useRef<THREE.Group>(null);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(cloud.positions, 3));
    g.setAttribute("color", new THREE.BufferAttribute(cloud.colors, 3));
    return g;
  }, [cloud]);

  useFrame((state) => {
    const { home, positions, count } = cloud;
    // pointer position on the portrait plane, in world units
    const mx = (state.pointer.x * state.viewport.width) / 2;
    const my = (state.pointer.y * state.viewport.height) / 2;
    const RADIUS = 0.55;
    const R2 = RADIUS * RADIUS;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const px = positions[ix];
      const py = positions[ix + 1];
      const dx = px - mx;
      const dy = py - my;
      const d2 = dx * dx + dy * dy;
      if (d2 < R2 && d2 > 0.0001) {
        const d = Math.sqrt(d2);
        const force = ((RADIUS - d) / RADIUS) * 0.09;
        positions[ix] += (dx / d) * force;
        positions[ix + 1] += (dy / d) * force;
      }
      // spring home
      positions[ix] += (home[ix] - positions[ix]) * 0.075;
      positions[ix + 1] += (home[ix + 1] - positions[ix + 1]) * 0.075;
      positions[ix + 2] += (home[ix + 2] - positions[ix + 2]) * 0.075;
    }
    geometry.attributes.position.needsUpdate = true;

    if (group.current) {
      group.current.rotation.y +=
        (state.pointer.x * 0.28 - group.current.rotation.y) * 0.05;
      group.current.rotation.x +=
        (-state.pointer.y * 0.18 - group.current.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={group}>
      <points ref={points} geometry={geometry}>
        <pointsMaterial
          size={0.017}
          vertexColors
          transparent
          opacity={0.95}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export default function Portrait() {
  const [cloud, setCloud] = useState<Cloud | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/portrait.jpg";
    img.onload = () => setCloud(buildCloud(img));
    img.onerror = () => setFailed(true);
  }, []);

  if (failed || !cloud) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 2.4], fov: 50 }}
      dpr={[1, 1.75]}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      style={{ background: "transparent" }}
    >
      <ParticleField cloud={cloud} />
    </Canvas>
  );
}
