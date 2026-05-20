"use client";

import { useState } from "react";
import GiftCard from "./GiftCard";
import GiftModal from "./GiftModal";
import type { Gift } from "@/lib/db";

interface GiftsGridProps {
  gifts: Gift[];
}

export default function GiftsGrid({ gifts }: GiftsGridProps) {
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);

  return (
    <>
      <div
        className="
          grid grid-cols-1 gap-10
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
        "
      >
        {gifts.map((gift) => (
          <GiftCard
            key={gift.id}
            gift={gift}
            onClick={() => setSelectedGift(gift)}
          />
        ))}
      </div>

      {gifts.length === 0 && (
        <p className="mt-14 text-center text-xl text-black/50">
          Nenhum presente disponível no momento.
        </p>
      )}

      <GiftModal gift={selectedGift} onClose={() => setSelectedGift(null)} />
    </>
  );
}
