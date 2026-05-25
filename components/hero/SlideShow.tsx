"use client";

import { useEffect, useMemo, useState } from "react";

type SlideShowProps = {
  images?: string[];
};

export default function SlideShow({
  images,
}: SlideShowProps) {
  const fallback = ["/images/PTF-6.jpg"];

  const slideshowImages = useMemo(() => {
    return images && images.length > 0
      ? images
      : fallback;
  }, [images]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slideshowImages.length <= 1)
      return;

    const interval = setInterval(() => {
      setIndex((current) =>
        (current + 1) %
        slideshowImages.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [slideshowImages.length]);

  return (
    <div
      className="
        fixed top-0 left-0
        w-full h-screen
        overflow-hidden
        -z-5
        after:absolute
        after:top-0
        after:left-0
        after:w-full
        after:h-full
        after:bg-black
        after:opacity-42.5
      "
    >
      <div className="relative -z-2 h-screen w-full">
        {slideshowImages.map(
          (image, imageIndex) => (
            <img
              key={image}
              src={image}
              alt=""
              loading={
                imageIndex === 0
                  ? "eager"
                  : "lazy"
              }
              decoding="async"
              className={`
              absolute inset-0
              h-full w-full
              object-cover
              object-center
              md:object-[center_25%]
              ${imageIndex === index
                  ? "opacity-100"
                  : "opacity-0"
                }
              `}
            />
          )
        )}
      </div>
    </div>
  );
}