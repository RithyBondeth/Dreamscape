import { cp, mkdir, readdir, rename, rm } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const openNextDirectory = path.join(projectRoot, ".open-next");
const distDirectory = path.join(projectRoot, "dist");
const serverDirectory = path.join(distDirectory, "server");

await rm(distDirectory, { recursive: true, force: true });
await mkdir(serverDirectory, { recursive: true });

for (const entry of await readdir(openNextDirectory, { withFileTypes: true })) {
  if (entry.name === "assets") continue;

  await cp(
    path.join(openNextDirectory, entry.name),
    path.join(serverDirectory, entry.name),
    { recursive: true },
  );
}

await rename(
  path.join(serverDirectory, "worker.js"),
  path.join(serverDirectory, "index.js"),
);
await cp(path.join(openNextDirectory, "assets"), path.join(distDirectory, "assets"), {
  recursive: true,
});

// Keep the editable source GLBs locally while shipping only their optimized variants.
await Promise.all(
  ["villa.glb", "car-bmw.glb"].map((filename) =>
    rm(path.join(distDirectory, "assets", "assets", "models", filename), {
      force: true,
    }),
  ),
);
