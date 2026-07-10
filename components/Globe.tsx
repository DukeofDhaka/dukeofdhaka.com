"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const R = 1;

function latLonToVec3(lat: number, lon: number, r = R) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

const DHAKA = latLonToVec3(23.81, 90.41);
const MONTREAL = latLonToVec3(45.5, -73.57);

function GlobeScene() {
  const group = useRef<THREE.Group>(null);

  const dots = useMemo(() => {
    // Fibonacci sphere point cloud
    const n = 1500;
    const positions = new Float32Array(n * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = golden * i;
      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(theta) * radius;
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geom;
  }, []);

  const ARC_POINTS = 81;
  const { arcBase, arcBeam } = useMemo(() => {
    const mid = DHAKA.clone().add(MONTREAL).normalize().multiplyScalar(R * 1.5);
    const curve = new THREE.QuadraticBezierCurve3(DHAKA, mid, MONTREAL);
    const points = curve.getPoints(ARC_POINTS - 1);
    const base = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(points),
      new THREE.LineBasicMaterial({ color: "#ff5d6e", transparent: true, opacity: 0.25 })
    );
    const beam = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(points),
      new THREE.LineBasicMaterial({ color: "#ff5d6e", transparent: true, opacity: 0.95 })
    );
    beam.geometry.setDrawRange(0, 0);
    return { arcBase: base, arcBeam: beam };
  }, []);
  const beamProgress = useRef(0);

  const pulse = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const g = group.current;
    if (g) {
      g.rotation.y += delta * 0.07;
      // gentle parallax toward the pointer
      g.rotation.x += (state.pointer.y * 0.22 - g.rotation.x) * 0.04;
    }
    // the bright arc redraws itself Dhaka → Montréal on a loop
    beamProgress.current = (beamProgress.current + delta * 0.35) % 1.25;
    const visible = Math.min(1, beamProgress.current);
    arcBeam.geometry.setDrawRange(0, Math.floor(visible * ARC_POINTS));
    if (pulse.current) {
      const s = 1 + 0.5 * Math.sin(state.clock.elapsedTime * 2.4);
      pulse.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={group} rotation={[0.28, 2.2, 0]}>
      <points geometry={dots}>
        <pointsMaterial
          color="#8f8a81"
          size={0.011}
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
      <primitive object={arcBase} />
      <primitive object={arcBeam} />
      {[DHAKA, MONTREAL].map((v, i) => (
        <mesh key={i} position={v}>
          <sphereGeometry args={[0.022, 16, 16]} />
          <meshBasicMaterial color="#f42a41" />
        </mesh>
      ))}
      <mesh ref={pulse} position={DHAKA}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshBasicMaterial color="#f42a41" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

export default function Globe() {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.55], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      style={{ background: "transparent" }}
    >
      <GlobeScene />
    </Canvas>
  );
}
