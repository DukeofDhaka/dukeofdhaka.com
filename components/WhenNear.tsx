"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Mounts its children only once this spot is within `margin` of the viewport
 * (and, if given, while `media` matches). Keeps heavy canvases — the matter.js
 * ball pit, the WebGL globe — out of the first load, and stops a hidden globe
 * from spinning up a WebGL context on phones at all.
 */
export default function WhenNear({
  children,
  margin = "800px",
  media,
  className,
  style,
}: {
  children: React.ReactNode;
  margin?: string;
  media?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || show) return;
    let io: IntersectionObserver | null = null;
    const watch = () => {
      io?.disconnect();
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setShow(true);
            io?.disconnect();
          }
        },
        { rootMargin: margin }
      );
      io.observe(el);
    };
    if (!media) {
      watch();
      return () => io?.disconnect();
    }
    const mq = window.matchMedia(media);
    const onChange = () => (mq.matches ? watch() : io?.disconnect());
    onChange();
    mq.addEventListener("change", onChange);
    return () => {
      mq.removeEventListener("change", onChange);
      io?.disconnect();
    };
  }, [margin, media, show]);

  return (
    <div ref={ref} className={className} style={style}>
      {show ? children : null}
    </div>
  );
}
