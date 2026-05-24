import { useMemo } from "react";
import type { CSSProperties } from "react";

const COLORS = ["#eccab7", "#e7b9c2", "#f0d9c4", "#e9b4a8", "#dcc7b0"];

/** Soft flower petals drifting down over the whole page. */
export default function Petals({ count = 16 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const size = 7 + Math.random() * 13;
        return {
          id: i,
          left: Math.random() * 100,
          width: size,
          height: size * 0.8,
          color: COLORS[i % COLORS.length],
          duration: 13 + Math.random() * 16,
          delay: -Math.random() * 30,
          drift: (4 + Math.random() * 9) * (Math.random() > 0.5 ? 1 : -1),
          opacity: 0.35 + Math.random() * 0.45,
        };
      }),
    [count],
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={
            {
              left: `${p.left}vw`,
              width: `${p.width}px`,
              height: `${p.height}px`,
              borderRadius: "100% 0 100% 100%",
              background: `radial-gradient(circle at 30% 25%, ${p.color}, color-mix(in srgb, ${p.color} 55%, #b9655e))`,
              boxShadow: "0 1px 3px rgba(120,60,55,0.15)",
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              "--petal-drift": `${p.drift}vw`,
              "--petal-opacity": p.opacity,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
