"use client";

import { useEffect, useState } from "react";

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

  const imagePool = images.length > 0 ? images : ["/images/ptf-6.jpg", "/images/ptf-74.jpg", "/images/ptf-102.jpg"];

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const startLoop = (delay: number) => {
      timeout = setTimeout(() => {
        setFlipped((prev) => !prev);
        const pool = imagePool.length > 0 ? imagePool : [initialImage, secondImage];
        const randomIndex1 = Math.floor(Math.random() * pool.length);
        const randomIndex2 = (randomIndex1 + 1) % pool.length;

        setCurrentImage(pool[randomIndex1]);
        setCurrentImage2(pool[randomIndex2]);

        const nextRandomDelay = Math.random() * 3500 + 4000;
        startLoop(nextRandomDelay);
      }, delay);
    };

    startLoop(initialDelay);

    return () => clearTimeout(timeout);
  }, [initialDelay, imagePool, initialImage, secondImage]);

  return (
    <div className="group relative h-136 w-[18rem] perspective-[2000px]">
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