"use client";

import { useState, useEffect } from "react";
import GiftCard from "./GiftCard";
import GiftModal from "./GiftModal";
import type { Gift } from "@/lib/db";

interface GiftsGridProps {
  gifts: Gift[];
}

export default function GiftsGrid({ gifts }: GiftsGridProps) {
  const [giftList, setGiftList] = useState<Gift[]>(gifts);
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);

  useEffect(() => {
    setGiftList(gifts);
  }, [gifts]);

  const handleGiftPurchased = (updatedGift: Gift) => {
    setGiftList((current) =>
      current.map((gift) => (gift.id === updatedGift.id ? updatedGift : gift))
    );
    setSelectedGift(updatedGift);
  };

  return (
    <>
      <div
        className="
          grid grid-cols-2 gap-3 sm:gap-10
          lg:grid-cols-3
          xl:grid-cols-4
        "
      >
        {giftList.map((gift) => (
          <GiftCard
            key={gift.id}
            gift={gift}
            onClick={() => setSelectedGift(gift)}
          />
        ))}
      </div>

      {giftList.length === 0 && (
        <p className="mt-14 text-center text-xl text-black/50">
          Nenhum presente disponível no momento.
        </p>
      )}

      <GiftModal
        gift={selectedGift}
        onClose={() => setSelectedGift(null)}
        onPurchase={handleGiftPurchased}
      />
    </>
  );
}
