import { useState } from "react";
import { motion } from "motion/react";
import BlurImage from "./BlurImage";
import Lightbox from "./Lightbox";
import { getPhoto, type Photo } from "../lib/photos";
import { content, featured } from "../data/content";

// The 24 hand-picked scrapbook photos, in display order (defined in content.ts).
const picks: Photo[] = featured.gallery.map(getPhoto);

// Handwritten-style captions — one per polaroid, in picked order.
const CAPTIONS = [
  "ngày đầu",
  "em cười",
  "nắng sớm",
  "dịu dàng",
  "khoảnh khắc",
  "bình yên",
  "thương em",
  "nhẹ nhàng",
  "mùa hoa nở",
  "ánh mắt em",
  "tựa nắng mai",
  "em của anh",
  "chiều nghiêng",
  "lặng lẽ",
  "ngọt ngào",
  "yêu thương",
  "trong veo",
  "mong manh",
  "e ấp",
  "duyên dáng",
  "an yên",
  "rạng rỡ",
  "mãi bên em",
  "của riêng anh",
];

/** Deterministic value in [-1,1] so the scatter stays stable across renders. */
function jitter(seed: number) {
  return Math.sin(seed * 12.9898);
}

export default function Gallery() {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="grain relative bg-paper px-4 py-24 sm:px-6 sm:py-32">
      <header className="mx-auto mb-12 max-w-2xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="eyebrow text-rose"
        >
          {content.gallery.eyebrow}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-3 font-display text-[clamp(2.2rem,6vw,4rem)] font-medium text-wine"
        >
          {content.gallery.title}
        </motion.h2>
        <div className="ornament my-6">
          <span className="text-sm">❀</span>
        </div>
        <p className="font-body text-sm text-ink/55">{content.gallery.hint}</p>
      </header>

      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-2 gap-y-8 px-2 py-6 sm:gap-x-6">
        {picks.map((p, i) => {
          const rot = jitter(i + 1) * 5; // -5deg..5deg resting tilt
          const showTape = i % 3 !== 0;
          const caption = CAPTIONS[i % CAPTIONS.length];
          return (
            <motion.button
              key={p.id}
              type="button"
              onClick={() => setIndex(i)}
              initial={{ opacity: 0, y: 26, rotate: rot * 1.6 }}
              whileInView={{ opacity: 1, y: 0, rotate: rot }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              style={{ marginTop: i % 2 ? "1.5rem" : 0 }}
              className="group relative block w-[44%] max-w-[230px] bg-paper p-2 pb-9 shadow-[var(--shadow-photo)] transition-[transform,box-shadow] duration-500 hover:z-10 hover:!rotate-0 hover:-translate-y-2 hover:shadow-[0_34px_70px_-26px_rgba(60,30,25,0.7)] focus:outline-none focus-visible:ring-2 focus-visible:ring-rose sm:w-[30%]"
            >
              {showTape ? (
                <span className="tape left-1/2 -top-3 -translate-x-1/2 -rotate-3" />
              ) : (
                <span className="absolute left-1/2 top-1 z-10 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-rose-deep shadow-[0_2px_4px_rgba(60,30,25,0.4)]" />
              )}
              <BlurImage
                src={p.thumb}
                blur={p.blur}
                alt={`Trang Anh — ${p.id}`}
                style={{ aspectRatio: "4 / 5" }}
                className="w-full"
                imgClassName="transition duration-700 group-hover:brightness-[1.04]"
              />
              <span className="absolute inset-x-0 bottom-2 text-center font-display text-lg italic text-ink/70">
                {caption}
              </span>
            </motion.button>
          );
        })}
      </div>

      <Lightbox photos={picks} index={index} onClose={() => setIndex(null)} onIndex={setIndex} />
    </section>
  );
}
