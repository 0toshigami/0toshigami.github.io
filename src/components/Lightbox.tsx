import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Photo } from "../lib/photos";

type Props = {
  photos: Photo[];
  index: number | null;
  onClose: () => void;
  onIndex: (next: number) => void;
};

export default function Lightbox({ photos, index, onClose, onIndex }: Props) {
  const open = index !== null;
  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (dir: number) => {
      if (index === null) return;
      onIndex((index + dir + photos.length) % photos.length);
    },
    [index, photos.length, onIndex],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, go, onClose]);

  const photo = index !== null ? photos[index] : null;

  return (
    <AnimatePresence>
      {open && photo && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-night/96 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={onClose}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          {/* Close */}
          <button
            aria-label="Đóng"
            onClick={onClose}
            className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full text-paper/80 transition hover:bg-paper/10 hover:text-paper"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          {/* Prev / Next */}
          <NavButton side="left" onClick={(e) => { e.stopPropagation(); go(-1); }} />
          <NavButton side="right" onClick={(e) => { e.stopPropagation(); go(1); }} />

          <AnimatePresence mode="wait">
            <motion.img
              key={photo.id}
              src={photo.full}
              alt={photo.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              draggable={false}
              className="max-h-[86svh] max-w-[90vw] rounded-sm object-contain shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
            />
          </AnimatePresence>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-body text-sm tracking-widest text-paper/70">
            {index + 1} / {photos.length}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NavButton({
  side,
  onClick,
}: {
  side: "left" | "right";
  onClick: (e: React.MouseEvent) => void;
}) {
  return (
    <button
      aria-label={side === "left" ? "Ảnh trước" : "Ảnh sau"}
      onClick={onClick}
      className={`absolute top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full text-paper/75 transition hover:bg-paper/10 hover:text-paper ${
        side === "left" ? "left-3 sm:left-6" : "right-3 sm:right-6"
      }`}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path
          d={side === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
