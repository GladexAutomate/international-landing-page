/**
 * Vite plugin — auto-discovers images under public/images/briefings/
 * and exposes them as a virtual module: virtual:briefing-images
 *
 * Generated manifest shape:
 * {
 *   danang:   { 1: ["/images/briefings/danang/day1/photo1.jpg", ...], 2: [...], ... },
 *   hongkong: { 1: [...], ... },
 * }
 *
 * Images are sorted with natural-number ordering (photo2 before photo10).
 * Supported formats: .jpg .jpeg .png .webp (case-insensitive).
 */

import { readdirSync, existsSync, statSync } from "fs";
import { join } from "path";

const VIRTUAL_ID = "virtual:briefing-images";
const RESOLVED_ID = "\0" + VIRTUAL_ID;
const IMAGE_RE = /\.(jpe?g|png|webp)$/i;

function buildManifest(projectRoot) {
  const briefingsDir = join(projectRoot, "public", "images", "briefings");
  const manifest = {};

  if (!existsSync(briefingsDir)) return manifest;

  for (const dest of readdirSync(briefingsDir)) {
    const destDir = join(briefingsDir, dest);
    if (!statSync(destDir).isDirectory()) continue;

    manifest[dest] = {};

    for (const dayFolder of readdirSync(destDir)) {
      const match = dayFolder.match(/^day(\d+)$/i);
      if (!match) continue;
      const dayNum = parseInt(match[1], 10);
      const dayDir = join(destDir, dayFolder);
      if (!statSync(dayDir).isDirectory()) continue;

      const images = readdirSync(dayDir)
        .filter((f) => IMAGE_RE.test(f))
        // Natural sort: photo2.jpg before photo10.jpg
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
        .map((f) => `/images/briefings/${dest}/${dayFolder}/${f}`);

      manifest[dest][dayNum] = images;
    }
  }

  return manifest;
}

export function briefingImagesPlugin() {
  let projectRoot = process.cwd();

  return {
    name: "briefing-images",

    configResolved(config) {
      projectRoot = config.root;
    },

    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
    },

    load(id) {
      if (id !== RESOLVED_ID) return;
      const manifest = buildManifest(projectRoot);
      return `export const briefingImages = ${JSON.stringify(manifest)};`;
    },

    configureServer(server) {
      // Watch the briefings folder so HMR triggers when images are added/removed
      const watchDir = join(projectRoot, "public", "images", "briefings");
      if (existsSync(watchDir)) server.watcher.add(watchDir);

      function invalidate(changedPath) {
        if (!changedPath.replace(/\\/g, "/").includes("images/briefings")) return;

        // Vite 6: getModuleById can miss virtual modules — scan idToModuleMap as fallback
        const byId = server.moduleGraph.getModuleById(RESOLVED_ID);
        if (byId) {
          server.moduleGraph.invalidateModule(byId);
        } else {
          for (const [, m] of server.moduleGraph.idToModuleMap) {
            if (m.id && m.id.includes("briefing-images")) {
              server.moduleGraph.invalidateModule(m);
            }
          }
        }

        // Always trigger a full reload so the browser fetches the regenerated manifest
        server.ws.send({ type: "full-reload" });
      }

      server.watcher.on("add", invalidate);
      server.watcher.on("unlink", invalidate);
      server.watcher.on("change", invalidate);
    },
  };
}
