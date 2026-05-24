/**
 * Image pipeline: turns the ~460MB of raw photoshoot JPGs into web-ready WebP.
 *
 * For each source image it writes:
 *   public/photos/full/<id>.webp   (~1800px wide  — lightbox / hero / cinematic)
 *   public/photos/thumb/<id>.webp  (~700px wide   — gallery grid)
 * and a tiny base64 LQIP blur, collected into src/data/photos.json.
 *
 * Run with:  bun run optimize
 */
import sharp from "sharp";
import { readdir, mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dir, "..");
const SRC = path.join(ROOT, "165_13h_nguyen_ngoc_trang_anh");
const THUMB_DIR = path.join(ROOT, "public", "photos", "thumb");
const FULL_DIR = path.join(ROOT, "public", "photos", "full");
const MANIFEST = path.join(ROOT, "src", "data", "photos.json");

const THUMB_W = 700;
const FULL_W = 1800;

type Photo = {
  id: string;
  thumb: string;
  full: string;
  width: number;
  height: number;
  blur: string;
};

async function ensure(dir: string) {
  if (!existsSync(dir)) await mkdir(dir, { recursive: true });
}

async function main() {
  await Promise.all([ensure(THUMB_DIR), ensure(FULL_DIR), ensure(path.dirname(MANIFEST))]);

  const files = (await readdir(SRC)).filter((f) => /\.jpe?g$/i.test(f)).sort();
  console.log(`Found ${files.length} images in ${SRC}`);

  const manifest: Photo[] = [];
  let i = 0;
  for (const file of files) {
    i++;
    const id = file.replace(/\.[^.]+$/, "").replace(/\s+/g, "-"); // "HDK 5384" -> "HDK-5384"
    const inPath = path.join(SRC, file);
    const name = `${id}.webp`;

    const meta = await sharp(inPath).metadata();
    // sharp .rotate() bakes in EXIF orientation; swap dims if the photo is rotated.
    const rotated = meta.orientation && meta.orientation >= 5;
    const width = (rotated ? meta.height : meta.width) ?? 800;
    const height = (rotated ? meta.width : meta.height) ?? 1200;

    await sharp(inPath)
      .rotate()
      .resize({ width: FULL_W, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(path.join(FULL_DIR, name));

    await sharp(inPath)
      .rotate()
      .resize({ width: THUMB_W, withoutEnlargement: true })
      .webp({ quality: 76 })
      .toFile(path.join(THUMB_DIR, name));

    const blurBuf = await sharp(inPath)
      .rotate()
      .resize({ width: 24 })
      .webp({ quality: 40 })
      .toBuffer();

    manifest.push({
      id,
      thumb: `/photos/thumb/${name}`,
      full: `/photos/full/${name}`,
      width,
      height,
      blur: `data:image/webp;base64,${blurBuf.toString("base64")}`,
    });

    process.stdout.write(`\r  [${i}/${files.length}] ${id}        `);
  }

  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2));
  console.log(`\nWrote ${manifest.length} entries -> ${path.relative(ROOT, MANIFEST)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
