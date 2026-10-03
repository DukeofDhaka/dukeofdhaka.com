import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

/**
 * The three Copilot 3D figurines + the procedural head-rig settings for each.
 * Shared by the splash (preload) and Figurine (render) so both hit the same
 * R3F loader cache — the figurine is ready the moment the visitor enters.
 */

export type ModelKey = "greet" | "sit" | "surf";
export const KEYS: ModelKey[] = ["greet", "sit", "surf"];
export const MODEL_URLS: string[] = KEYS.map((k) => `/models/${k}.glb`);

/**
 * Head rig, in each GLB's own mesh space (Y-up, unit height, centred).
 * Vertices above `neckY` inside an XZ ellipse around the head get skinned to
 * a head bone pivoting at the neck, so the head can turn on its own.
 * Numbers come from slicing the meshes by height (the neck is the narrow band
 * between head and shoulders). Tune visually with `?rig=debug`, which tints
 * head-weighted vertices red. Set a model to `null` to leave it unrigged.
 */
export type RigConfig = {
  /** approximate head centre (x, z); refined from the mesh at load */
  center: [number, number];
  /** XZ radii of the head column — fully weighted inside, fades by 1.5× */
  radius: [number, number];
  /** neck pivot height */
  neckY: number;
  /** vertical falloff below the neck */
  blend: number;
  /** ignore everything left of this x (the surfboard hugs the surfer's head) */
  minX?: number;
  /** max head turn, radians */
  yaw: number;
  pitch: number;
};

export const RIGS: Record<ModelKey, RigConfig | null> = {
  greet: { center: [-0.01, -0.036], radius: [0.08, 0.095], neckY: 0.325, blend: 0.035, yaw: 0.6, pitch: 0.3 },
  sit: { center: [0.185, -0.094], radius: [0.11, 0.12], neckY: 0.29, blend: 0.03, yaw: 0.55, pitch: 0.28 },
  surf: { center: [0.042, -0.05], radius: [0.045, 0.05], neckY: 0.012, blend: 0.016, minX: 0.004, yaw: 0.35, pitch: 0.2 },
};

let draco: DRACOLoader | null = null;
export function withDraco(loader: THREE.Loader) {
  draco ??= new DRACOLoader().setDecoderPath("/draco/");
  (loader as GLTFLoader).setDRACOLoader(draco);
}

/** Start downloading + decoding the figurines. Progress is monotonic 0..1. */
export function preloadModels(onProgress: (p: number) => void): Promise<void> {
  return new Promise((resolve) => {
    const m = THREE.DefaultLoadingManager;
    let best = 0;
    m.onProgress = (_url, loaded, total) => {
      best = Math.max(best, total ? loaded / total : 0);
      onProgress(best);
    };
    m.onLoad = () => {
      onProgress(1);
      resolve();
    };
    m.onError = () => resolve();
    useLoader.preload(GLTFLoader, MODEL_URLS, withDraco);
  });
}
