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
  const [currentImage2, setCurrentImage2] = useState(image);


  const images = [
    image,
    "/images/ptf-74.jpg",
    "/images/ptf-102.jpg",
    "/images/ptf-132.jpg",
    "/images/ptf-102.jpg",
    "/images/ptf-74.jpg",
    "/images/ptf-132.jpg",
    "/images/ptf-6.jpg",
    "/images/ptf-6.jpg",
    "/images/ptf-74.jpg",
    "/images/ptf-102.jpg",
  ];

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const startLoop = (delay: number) => {
      timeout = setTimeout(() => {
        setFlipped((prev) => !prev);
        const randomIndex = Math.floor(Math.random() * images.length);
        console.log(`randomIndex1: ${randomIndex} | randomIndex2: ${images.length - randomIndex}`);
        const randomImage = images[randomIndex];
        const randomImage2 = images[images.length - randomIndex];

        setCurrentImage(randomImage);
        setCurrentImage2(randomImage2);

        // Próximo flip com tempo aleatório
        const nextRandomDelay = Math.random() * 3500 + 4000;

        startLoop(nextRandomDelay);
      }, delay);
    };

    startLoop(initialDelay);

    return () => clearTimeout(timeout);
  }, [initialDelay]);

  return (
    <div className="group relative h-136 w-[20rem] perspective-[2000px]">
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