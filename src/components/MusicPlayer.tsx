import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Background music with a gentle floating toggle.
 * Browsers block autoplay-with-sound, so we try to play on mount and, if that's
 * refused, start on the visitor's first interaction (click / key / touch).
 */
export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.45;

    // Try right away; most browsers will refuse until there's a gesture.
    audio.play().catch(() => {});

    // Fallback: start on the first user gesture, then stop listening.
    const start = () => {
      audio.play().catch(() => {});
      remove();
    };
    const remove = () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
      window.removeEventListener("touchstart", start);
    };
    window.addEventListener("pointerdown", start);
    window.addEventListener("keydown", start);
    window.addEventListener("touchstart", start);

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      remove();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/wedding-song.mp3" loop preload="auto" />
      <button
        type="button"
        onClick={toggle}
        // Don't let this click bubble to the window "first gesture" starter,
        // or it would start playback and then immediately toggle it off.
        onPointerDownCapture={(e) => e.stopPropagation()}
        onTouchStartCapture={(e) => e.stopPropagation()}
        aria-label={playing ? "Tắt nhạc nền" : "Bật nhạc nền"}
        title={playing ? "Tắt nhạc" : "Bật nhạc"}
        className="fixed bottom-5 left-5 z-40 grid h-12 w-12 place-items-center rounded-full border border-wine/15 bg-paper/80 text-wine shadow-[0_10px_30px_-14px_rgba(60,30,25,0.6)] backdrop-blur-md transition hover:bg-paper hover:text-rose-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-rose"
      >
        {/* Equalizer bars — animate while playing, rest when paused */}
        <span className="flex h-4 items-end gap-[3px]">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-[3px] rounded-full bg-current"
              style={{ height: 5 }}
              animate={
                playing && !reduce
                  ? { height: [5, 16, 8, 14, 6] }
                  : { height: playing ? 12 : 5 }
              }
              transition={
                playing && !reduce
                  ? { duration: 0.9 + i * 0.18, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.3 }
              }
            />
          ))}
        </span>
      </button>
    </>
  );
}
