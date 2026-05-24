import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import BlurImage from "./BlurImage";
import { content, featured } from "../data/content";
import { getPhoto } from "../lib/photos";

// On wide (>=1280px) screens these full-bleed portraits get cropped to a
// centered horizontal band, which hides the face. Anchor each one higher so
// the face stays in frame. Aligned 1:1 with featured.story; "" = default center.
const STORY_FOCUS = [
  "xl:object-[50%_15%]", // HDK-5410 — full body, head near top
  "xl:object-[50%_30%]", // HDK-5450 — close-up beauty
  "",
  "",
];

function StoryBeat({
  id,
  line,
  index,
  eyebrow,
  focus,
}: {
  id: string;
  line: string;
  index: number;
  eyebrow?: string;
  focus?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);
  const textY = useTransform(scrollYProgress, [0, 0.5, 1], [70, 0, -70]);
  const textOpacity = useTransform(scrollYProgress, [0.12, 0.34, 0.66, 0.9], [0, 1, 1, 0]);

  const photo = getPhoto(id);
  const fromLeft = index % 2 === 1;

  return (
    <div ref={ref} className="relative h-[100svh] min-h-[560px] w-full overflow-hidden">
      <motion.div style={{ y: imgY }} className="absolute -top-[9%] left-0 h-[118%] w-full">
        <BlurImage
          src={photo.full}
          blur={photo.blur}
          alt=""
          className="h-full w-full"
          imgClassName={focus}
        />
      </motion.div>

      <div className="absolute inset-0 bg-night/35" />
      <div
        className="absolute inset-0"
        style={{
          background: fromLeft
            ? "linear-gradient(90deg, rgba(22,15,21,0.7) 0%, transparent 60%)"
            : "linear-gradient(270deg, rgba(22,15,21,0.7) 0%, transparent 60%)",
        }}
      />

      <div
        className={`relative z-10 flex h-full items-center px-[8vw] py-[12vh] ${
          fromLeft ? "justify-start text-left" : "justify-end text-right"
        }`}
      >
        <motion.div style={{ y: textY, opacity: textOpacity }} className="max-w-2xl">
          {eyebrow && <p className="eyebrow mb-5 text-blush">{eyebrow}</p>}
          <p className="font-display text-[clamp(1.9rem,4.8vw,3.6rem)] font-medium italic leading-[1.12] text-paper drop-shadow-[0_2px_20px_rgba(0,0,0,0.45)]">
            {line}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function CinematicStory() {
  return (
    <section className="bg-night">
      {content.story.lines.map((line, i) => (
        <StoryBeat
          key={i}
          id={featured.story[i % featured.story.length]}
          line={line}
          index={i}
          eyebrow={i === 0 ? content.story.eyebrow : undefined}
          focus={STORY_FOCUS[i]}
        />
      ))}
    </section>
  );
}
