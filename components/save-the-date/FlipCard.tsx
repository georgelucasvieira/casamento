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
  const [flipped, setFlipped] = useState(false);
  const initialImage = images[0] ?? "/images/ptf-6.jpg";
  const secondImage = images[1] ?? initialImage;
  const [currentImage, setCurrentImage] = useState(initialImage);
  const [currentImage2, setCurrentImage2] = useState(secondImage);

  const imagePool = images.length > 0 ? images : ["/images/ptf-6.jpg", "/images/ptf-74.jpg", "/images/ptf-108.jpg"];

  const flippedRef = useRef(false);

  useEffect(() => {
    flippedRef.current = flipped;
  }, [flipped]);

  useEffect(() => {
    let cancelled = false;

    const loop = async () => {
      while (!cancelled) {
        const delay = Math.random() * 3500 + 4000;

        await new Promise((r) => setTimeout(r, delay));

        const nextFlipped = !flippedRef.current;

        flippedRef.current = nextFlipped;
        setFlipped(nextFlipped);

        await new Promise((r) => setTimeout(r, 1000));

        const randomImage =
          imagePool[Math.floor(Math.random() * imagePool.length)];

        if (nextFlipped) {
          setCurrentImage(randomImage);
        } else {
          setCurrentImage2(randomImage);
        }
      }
    };

    loop();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="group relative h-120 w-[16rem] perspective-[2000px]">
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
            src={currentImage}
            alt="Couple"
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
            src={currentImage2}
            alt="Couple"
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