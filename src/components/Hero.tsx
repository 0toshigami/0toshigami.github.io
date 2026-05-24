import { motion } from "motion/react";
import BlurImage from "./BlurImage";
import { content, featured } from "../data/content";
import { getPhoto } from "../lib/photos";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const photo = getPhoto(featured.hero);

  return (
    <section className="relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-night">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease }}
      >
        <BlurImage
          src={photo.full}
          blur={photo.blur}
          alt="Nguyễn Ngọc Trang Anh"
          eager
          className="h-full w-full"
          // Face sits mid-frame here; anchor so it stays clear of the name overlay.
          imgClassName="xl:object-[50%_38%]"
        />
      </motion.div>

      {/* Cinematic darkening for legibility + warm vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-night/45 via-transparent to-night/90" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(125% 85% at 50% 28%, transparent 42%, rgba(22,15,21,0.6) 100%)",
        }}
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-[14vh] text-center text-paper">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease }}
          className="eyebrow text-blush"
        >
          {content.hero.eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.6, ease }}
          className="mt-5 font-display text-[clamp(2.6rem,8.5vw,6.5rem)] font-medium leading-[0.95] drop-shadow-[0_2px_24px_rgba(0,0,0,0.5)]"
        >
          {content.hero.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.1, delay: 1.1, ease }}
          className="ornament mt-6 w-full max-w-xs"
        >
          <span className="text-sm">❀</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.4 }}
          className="mt-5 max-w-xl font-display text-[clamp(1.1rem,2.6vw,1.65rem)] italic text-cream/90"
        >
          {content.hero.tagline}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-paper/85"
      >
        <div className="scroll-nudge flex flex-col items-center gap-2">
          <span className="eyebrow text-[0.58rem]">{content.hero.scrollCue}</span>
          <svg width="16" height="24" viewBox="0 0 18 26" fill="none">
            <path
              d="M9 1v20M2 15l7 7 7-7"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
