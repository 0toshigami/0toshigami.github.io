/**
 * Delete photo files that the site never references, so only used images ship.
 *
 * Usage:  bun run scripts/prune-photos.ts [photosDir]
 *   photosDir defaults to ./dist/photos (run after `bun run build`).
 *
 * Used set, derived from src/data/content.ts (single source of truth):
 *   - full/  : gallery picks ∪ hero ∪ story[] ∪ birthday ∪ moon
 *   - thumb/ : gallery picks (the only place thumbnails are shown)
 */
import { readdir, rm } from "node:fs/promises";
import { join } from "node:path";
import { featured } from "../src/data/content";

const photosDir = process.argv[2] ?? join("dist", "photos");

const usedFull = new Set<string>([
  ...featured.gallery,
  featured.hero,
  ...featured.story,
  featured.birthday,
  featured.moon,
]);
const usedThumb = new Set<string>(featured.gallery);

async function prune(sub: "full" | "thumb", keep: Set<string>) {
  const dir = join(photosDir, sub);
  let files: string[];
  try {
    files = await readdir(dir);
  } catch {
    console.warn(`! skipped ${dir} (not found)`);
    return;
  }
  let removed = 0;
  for (const file of files) {
    const id = file.replace(/\.[^.]+$/, ""); // strip extension
    if (!keep.has(id)) {
      await rm(join(dir, file));
      removed++;
    }
  }
  console.log(`${sub}: kept ${files.length - removed}, removed ${removed}`);
}

await prune("full", usedFull);
await prune("thumb", usedThumb);
console.log(`done — ${usedFull.size} full + ${usedThumb.size} thumb in use`);
