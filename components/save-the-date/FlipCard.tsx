"use client";

import { useEffect, useState } from "react";

interface FlipCardProps {
  image: string;
  number: string;
  initialDelay?: number;
}

export default function FlipCard({
  image,
  number,
  initialDelay = 0,
}: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [currentImage, setCurrentImage] = useState(image);

  const images = [
    image,
    "/images/ptf-74.jpg",
    "/images/ptf-102.jpg",
    "/images/ptf-132.jpg",
  ];

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const startLoop = (delay: number) => {
      timeout = setTimeout(() => {
        setFlipped((prev) => !prev);

        // Troca imagem aleatoriamente
        const randomImage =
          images[Math.floor(Math.random() * images.length)];

        setCurrentImage(randomImage);

        // Próximo flip com tempo aleatório
        const nextRandomDelay = Math.random() * 3500 + 2000;

        startLoop(nextRandomDelay);
      }, delay);
    };

    startLoop(initialDelay);

    return () => clearTimeout(timeout);
  }, [initialDelay]);

  return (
    <div className="group relative h-[34rem] w-[20rem] perspective-[2000px]">
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
            rounded-t-[12rem]
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
            flex items-center justify-center
            rounded-t-[12rem]
            border border-black/10
            bg-[#f4f1ed]
            rotate-y-180
            backface-hidden
          "
        >
          <div className="text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.5em] text-black/40">
              Save The Date
            </p>

            <h3 className="font-cormorant text-6xl text-black">
              29
            </h3>

            <p className="mt-2 uppercase tracking-[0.3em] text-black/60">
              Junho 2026
            </p>
          </div>
        </div>
      </div>

      {/* NUMBER */}
      <span className="absolute -bottom-4 right-[-2rem] font-cormorant text-7xl text-black">
        {number}
      </span>

      {/* GOLD LINE */}
      <div className="absolute left-1/2 top-full h-32 w-[1px] -translate-x-1/2 bg-[#c8a46b]" />
    </div>
  );
}