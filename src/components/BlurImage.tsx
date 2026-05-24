import { useState } from "react";
import type { CSSProperties } from "react";

type Props = {
  src: string;
  blur: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  imgClassName?: string;
  style?: CSSProperties;
  eager?: boolean;
};

/** Shows the tiny base64 LQIP as a backdrop, then fades the real WebP in on load. */
export default function BlurImage({
  src,
  blur,
  alt,
  width,
  height,
  className = "",
  imgClassName = "",
  style,
  eager = false,
}: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`overflow-hidden bg-cream ${className}`}
      style={{
        backgroundImage: `url(${blur})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        ...style,
      }}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
        onLoad={() => setLoaded(true)}
        className={`block h-full w-full object-cover transition-opacity duration-[900ms] ease-out ${
          loaded ? "opacity-100" : "opacity-0"
        } ${imgClassName}`}
      />
    </div>
  );
}
