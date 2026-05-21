"use client";

import { useEffect, useState } from "react";

type SlideShowProps = {
  images?: string[];
};

export default function SlideShow({ images }: SlideShowProps) {
  const fallback = ["/images/PTF-6.jpg"];
  const slideshowImages = images && images.length > 0 ? images : fallback;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slideshowImages.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % slideshowImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slideshowImages.length]);

  return (
    <div className="fixed top-0 left-0 w-full h-screen overflow-hidden -z-5 after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-black after:opacity-42.5">
      <div className="relative -z-2 h-screen w-full">
        <img
          src={slideshowImages[index]}
          className="absolute h-full w-full inset-0 object-cover object-center md:object-[center_25%] bg-transparent opacity-100"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}
