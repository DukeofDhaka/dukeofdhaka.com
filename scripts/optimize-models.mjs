/**
 * One-shot optimizer for the Copilot 3D figurines.
 * Raw exports are ~7 MB / ~145K triangles each; the site ships the
 * welded + simplified + webp + draco versions this script emits.
 *
 * Usage: node scripts/optimize-models.mjs <src-dir>
 */
import { NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import {
  weld,
  simplify,
  prune,
  dedup,
  textureCompress,
  draco,
} from "@gltf-transform/functions";
import { MeshoptSimplifier } from "meshoptimizer";
import draco3d from "draco3dgltf";
import sharp from "sharp";
import { mkdirSync, statSync } from "fs";
import path from "path";

const srcDir = process.argv[2];
if (!srcDir) {
  console.error("usage: node scripts/optimize-models.mjs <src-dir>");
  process.exit(1);
}

const MODELS = [
  { src: "ec4363a6-Copilot3Db1285166d9e14b379eaf9bd9eb036c50.glb", out: "greet.glb" },
  { src: "ad39e0cb-Copilot3D2e9e1001129e4e1cb255f8aa2c265c72.glb", out: "sit.glb" },
  { src: "e6fe6e8e-Copilot3Da074090f3a124a7eb48bb44d125434f3.glb", out: "surf.glb" },
];

const io = new NodeIO()
  .registerExtensions(ALL_EXTENSIONS)
  .registerDependencies({
    "draco3d.encoder": await draco3d.createEncoderModule(),
    "draco3d.decoder": await draco3d.createDecoderModule(),
  });

mkdirSync("public/models", { recursive: true });

for (const { src, out } of MODELS) {
  const before = statSync(path.join(srcDir, src)).size;
  const doc = await io.read(path.join(srcDir, src));
  await doc.transform(
    dedup(),
    weld(),
    simplify({ simplifier: MeshoptSimplifier, ratio: 0.35, error: 0.001 }),
    textureCompress({ encoder: sharp, targetFormat: "webp", resize: [1024, 1024] }),
    prune(),
    draco()
  );
  const dest = path.join("public/models", out);
  await io.write(dest, doc);
  const after = statSync(dest).size;
  console.log(`${out}: ${(before / 1e6).toFixed(1)} MB → ${(after / 1e6).toFixed(2)} MB`);
}
