import { useState } from "react";
import { motion } from "motion/react";
import BlurImage from "./BlurImage";
import Lightbox from "./Lightbox";
import { photos } from "../lib/photos";
import { content } from "../data/content";

export default function Gallery() {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="grain relative bg-paper px-4 py-24 sm:px-6 sm:py-32">
      <header className="mx-auto mb-14 max-w-2xl text-center">
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

      <div className="mx-auto max-w-[1500px] columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4 [&>*]:mb-3 sm:[&>*]:mb-4">
        {photos.map((p, i) => (
          <motion.button
            key={p.id}
            type="button"
            onClick={() => setIndex(i)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ duration: 0.6, delay: (i % 5) * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="group relative block w-full break-inside-avoid overflow-hidden rounded-sm shadow-[0_10px_30px_-18px_rgba(60,30,25,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-rose"
          >
            <BlurImage
              src={p.thumb}
              blur={p.blur}
              alt={`Trang Anh — ${p.id}`}
              style={{ aspectRatio: `${p.width} / ${p.height}` }}
              className="w-full"
              imgClassName="transition duration-700 group-hover:scale-[1.05] group-hover:brightness-[1.04]"
            />
            <span className="pointer-events-none absolute inset-0 rounded-sm ring-1 ring-inset ring-paper/0 transition group-hover:ring-paper/30" />
            <span className="pointer-events-none absolute inset-0 bg-wine/0 transition duration-500 group-hover:bg-wine/5" />
          </motion.button>
        ))}
      </div>

      <Lightbox photos={photos} index={index} onClose={() => setIndex(null)} onIndex={setIndex} />
    </section>
  );
}
