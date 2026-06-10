/**
 * Vite plugin — auto-discovers images under:
 *   public/images/briefings/<dest>/day<N>/       → briefingImages
 *   public/images/destinations/<dest>/<section>/ → destinationImages
 *
 * Exposed as virtual module: virtual:briefing-images
 *
 * briefingImages shape:
 *   { danang: { 1: ["/images/briefings/danang/day1/photo1.jpg", ...], 2: [...] }, ... }
 *
 * destinationImages shape:
 *   { danang: { places: [...], food: [...], "photo-spots": [...] }, hongkong: {...} }
 *
 * Images are sorted with natural-number ordering (photo2 before photo10).
 * Supported formats: .jpg .jpeg .png .webp (case-insensitive).
 */

import { readdirSync, existsSync, statSync } from "fs";
import { join } from "path";

const VIRTUAL_ID = "virtual:briefing-images";
const RESOLVED_ID = "\0" + VIRTUAL_ID;
const IMAGE_RE = /\.(jpe?g|png|webp)$/i;

function naturalSort(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

function buildBriefingManifest(projectRoot) {
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

      manifest[dest][dayNum] = readdirSync(dayDir)
        .filter((f) => IMAGE_RE.test(f))
        .sort(naturalSort)
        .map((f) => `/images/briefings/${dest}/${dayFolder}/${f}`);
    }
  }

  return manifest;
}

function buildDestinationManifest(projectRoot) {
  const destsDir = join(projectRoot, "public", "images", "destinations");
  const manifest = {};

  if (!existsSync(destsDir)) return manifest;

  for (const dest of readdirSync(destsDir)) {
    const destDir = join(destsDir, dest);
    if (!statSync(destDir).isDirectory()) continue;

    manifest[dest] = {};

    for (const section of readdirSync(destDir)) {
      const sectionDir = join(destDir, section);
      if (!statSync(sectionDir).isDirectory()) continue;

      manifest[dest][section] = readdirSync(sectionDir)
        .filter((f) => IMAGE_RE.test(f))
        .sort(naturalSort)
        .map((f) => `/images/destinations/${dest}/${section}/${f}`);
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
      const briefing     = buildBriefingManifest(projectRoot);
      const destination  = buildDestinationManifest(projectRoot);
      return [
        `export const briefingImages    = ${JSON.stringify(briefing)};`,
        `export const destinationImages = ${JSON.stringify(destination)};`,
      ].join("\n");
    },

    configureServer(server) {
      const watchDirs = [
        join(projectRoot, "public", "images", "briefings"),
        join(projectRoot, "public", "images", "destinations"),
      ];
      for (const dir of watchDirs) {
        if (existsSync(dir)) server.watcher.add(dir);
      }

      function invalidate(changedPath) {
        const normalized = changedPath.replace(/\\/g, "/");
        if (
          !normalized.includes("images/briefings") &&
          !normalized.includes("images/destinations")
        ) return;

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

        server.ws.send({ type: "full-reload" });
      }

      server.watcher.on("add", invalidate);
      server.watcher.on("unlink", invalidate);
      server.watcher.on("change", invalidate);
    },
  };
}
