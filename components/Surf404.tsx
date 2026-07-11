"use client";

import { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

function Surfer() {
  const gltf = useLoader(GLTFLoader, "/models/surf.glb", (loader) => {
    const d = new DRACOLoader();
    d.setDecoderPath("/draco/");
    (loader as GLTFLoader).setDRACOLoader(d);
  });
  const group = useRef<THREE.Group>(null);

  const scene = gltf.scene;
  const box = new THREE.Box3().setFromObject(scene);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  scene.position.copy(center.negate());
  const s = 2.2 / Math.max(size.x, size.y, size.z);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.5;
      group.current.position.y = Math.sin(state.clock.elapsedTime * 1.4) * 0.08;
    }
  });

  return (
    <group ref={group} scale={s}>
      <primitive object={scene} />
    </group>
  );
}

export default function Surf404() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.2], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={1.9} />
      <directionalLight position={[2, 4, 3]} intensity={2.6} />
      <pointLight position={[-2.5, 1, -2]} intensity={18} color="#f42a41" />
      <Surfer />
    </Canvas>
  );
}
