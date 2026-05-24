import { useMemo } from "react";
import { motion } from "motion/react";
import type { CSSProperties } from "react";
import BlurImage from "./BlurImage";
import { content, featured } from "../data/content";
import { getPhoto } from "../lib/photos";

const ease = [0.22, 1, 0.36, 1] as const;

function Sparkles() {
  const stars = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 4 + Math.random() * 8,
        delay: Math.random() * 3,
        dur: 2.4 + Math.random() * 2.6,
      })),
    [],
  );
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {stars.map((s) => (
        <span
          key={s.id}
          className="twinkle absolute text-gold"
          style={
            {
              top: `${s.top}%`,
              left: `${s.left}%`,
              fontSize: `${s.size}px`,
              animationDuration: `${s.dur}s`,
              animationDelay: `${s.delay}s`,
            } as CSSProperties
          }
        >
          ✦
        </span>
      ))}
    </div>
  );
}

export default function Birthday() {
  const photo = getPhoto(featured.birthday);

  return (
    <section className="grain relative overflow-hidden bg-cream px-6 py-24 sm:py-32">
      <Sparkles />
      <div className="relative z-10 mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-[0.85fr_1fr] md:gap-16">
        {/* Framed photo, tilted like a keepsake */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: -6 }}
          whileInView={{ opacity: 1, y: 0, rotate: -3 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease }}
          className="mx-auto w-full max-w-xs"
        >
          <div className="rounded-[2px] bg-paper p-3 shadow-[var(--shadow-photo)] ring-1 ring-ink/5">
            <BlurImage
              src={photo.full}
              blur={photo.blur}
              alt="Trang Anh"
              className="aspect-[3/4] w-full"
            />
            <p className="mt-3 text-center font-display text-lg italic text-wine">
              em — 20 tháng 05
            </p>
          </div>
        </motion.div>

        {/* Text + the date */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, delay: 0.15, ease }}
          className="text-center md:text-left"
        >
          <p className="eyebrow text-rose">{content.birthday.eyebrow}</p>

          <div className="relative my-4 inline-block">
            <span
              className="glow-pulse absolute -inset-x-8 -inset-y-4 -z-10 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(231,163,104,0.5) 0%, transparent 70%)",
              }}
            />
            <span className="block font-display text-[clamp(4rem,16vw,9rem)] font-semibold leading-none text-wine">
              {content.birthday.date}
            </span>
          </div>

          <h2 className="mt-2 font-display text-[clamp(1.8rem,4vw,2.8rem)] font-medium text-ink">
            {content.birthday.title}
          </h2>

          <div className="ornament my-6 max-w-sm md:mx-0">
            <span className="text-sm">✦</span>
          </div>

          <p className="mx-auto max-w-md font-body text-base leading-relaxed text-ink/75 md:mx-0">
            {content.birthday.message}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
