import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { CSSProperties } from "react";
import { content, featured } from "../data/content";
import { getPhoto } from "../lib/photos";

const ease = [0.22, 1, 0.36, 1] as const;

function Stars() {
  const stars = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 1 + Math.random() * 2.4,
        dur: 2 + Math.random() * 3,
        delay: Math.random() * 4,
      })),
    [],
  );
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {stars.map((s) => (
        <span
          key={s.id}
          className="twinkle absolute rounded-full bg-paper"
          style={
            {
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDuration: `${s.dur}s`,
              animationDelay: `${s.delay}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

export default function LoveNote() {
  const [open, setOpen] = useState(false);
  const photo = getPhoto(featured.moon);

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-night px-6 py-28 text-center text-paper">
      {/* Her portrait, dim, gazing upward */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `url(${photo.full})`,
          backgroundSize: "cover",
          backgroundPosition: "center 20%",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-night/70 via-plum/70 to-night" />
      <Stars />

      {/* The moon */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease }}
        className="absolute left-1/2 top-[12%] -translate-x-1/2"
      >
        <div className="relative">
          <span
            className="glow-pulse absolute -inset-10 -z-10 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(231,205,150,0.45) 0%, transparent 65%)",
            }}
          />
          <div
            className="h-24 w-24 rounded-full sm:h-28 sm:w-28"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, #fbf2d8, #e7cd96 55%, #c9a766)",
              boxShadow: "0 0 60px 8px rgba(231,205,150,0.35)",
            }}
          />
        </div>
      </motion.div>

      <div className="relative z-10 mt-24 flex w-full max-w-2xl flex-col items-center">
        <p className="eyebrow text-blush/90">{content.love.eyebrow}</p>

        <AnimatePresence mode="wait">
          {!open ? (
            <motion.button
              key="teaser"
              type="button"
              onClick={() => setOpen(true)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16, scale: 0.96 }}
              transition={{ duration: 0.6, ease }}
              className="group mt-10 flex flex-col items-center gap-6"
            >
              <p className="font-display text-2xl italic text-cream/85">
                {content.love.teaser}
              </p>
              <motion.span
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="text-5xl drop-shadow-[0_0_24px_rgba(231,205,150,0.5)]"
              >
                💌
              </motion.span>
              <span className="eyebrow rounded-full border border-paper/30 px-6 py-2.5 text-paper/90 transition group-hover:border-paper/70 group-hover:bg-paper/10">
                {content.love.openCta}
              </span>
            </motion.button>
          ) : (
            <motion.div
              key="message"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease }}
              className="mt-10 flex flex-col items-center"
            >
              <motion.h2
                initial={{ opacity: 0, letterSpacing: "0.25em" }}
                animate={{ opacity: 1, letterSpacing: "0.01em" }}
                transition={{ duration: 1.4, ease, delay: 0.2 }}
                className="font-display text-[clamp(2rem,6vw,3.6rem)] font-medium leading-tight text-paper"
              >
                {content.love.headline}
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="ornament my-7 w-full max-w-sm text-gold"
              >
                <span className="text-base">☾</span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.9 }}
                className="max-w-md font-display text-xl italic text-cream/90"
              >
                {content.love.vi}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="mt-8 eyebrow text-blush"
              >
                {content.love.sign}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
