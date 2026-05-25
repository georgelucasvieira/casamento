// components/save-the-date/FlipCard.tsx
"use client";

import { useEffect, useRef, useState } from "react";

interface FlipCardProps {
  images: string[];
  number: string;
  initialDelay?: number;
}

export default function FlipCard({
  images,
  number,
  initialDelay = 0,
}: FlipCardProps) {
  const imagePool =
    images.length > 0
      ? images
      : ["/images/ptf-6.jpg", "/images/ptf-74.jpg", "/images/ptf-102.jpg"];

  const [flipped, setFlipped] = useState(false);

  // FRONT/BACK image indexes
  const [frontIndex, setFrontIndex] = useState(0);
  const [backIndex, setBackIndex] = useState(
    imagePool.length > 1 ? 1 : 0
  );

  const flippedRef = useRef(false);
  const visibleRef = useRef(true);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    flippedRef.current = flipped;
  }, [flipped]);

  /**
   * Pause animation outside viewport
   */
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  /**
   * Preload all images once
   */
  useEffect(() => {
    imagePool.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [imagePool]);

  /**
   * Sequential flip loop
   */
  useEffect(() => {
    let cancelled = false;

    const sleep = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    const loop = async () => {
      if (initialDelay > 0) {
        await sleep(initialDelay);
      }

      let nextIndex = 2;

      while (!cancelled) {
        // pause if offscreen
        if (!visibleRef.current) {
          await sleep(1000);
          continue;
        }

        const delay = 2000;

        await sleep(delay);

        const nextFlipped = !flippedRef.current;

        flippedRef.current = nextFlipped;
        setFlipped(nextFlipped);

        await sleep(1000);

        // sequential iteration
        const normalizedIndex = nextIndex % imagePool.length;

        if (nextFlipped) {
          setFrontIndex(normalizedIndex);
        } else {
          setBackIndex(normalizedIndex);
        }

        nextIndex++;
      }
    };

    loop();

    return () => {
      cancelled = true;
    };
  }, [imagePool, initialDelay]);

  return (
    <div
      ref={containerRef}
      className="group relative h-120 w-[16rem] perspective-[2000px]"
    >
      <div
        className={`
          relative h-full w-full
          transition-transform duration-1000
          transform-style-preserve-3d
          ${flipped ? "rotate-y-180" : ""}
        `}
      >
        {/* FRONT */}
        <div
          className="
            absolute inset-0
            overflow-hidden
            rounded-[12rem]
            backface-hidden
          "
        >
          <img
            src={imagePool[frontIndex]}
            alt="Couple"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover grayscale"
          />
        </div>

        {/* BACK */}
        <div
          className="
            absolute inset-0
            overflow-hidden
            rounded-[12rem]
            rotate-y-180
            backface-hidden
          "
        >
          <img
            src={imagePool[backIndex]}
            alt="Couple"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover grayscale"
          />
        </div>
      </div>

      {/* NUMBER */}
      <span className="absolute -bottom-4 -right-8 font-cormorant text-7xl text-black">
        {number}
      </span>
    </div>
  );
}