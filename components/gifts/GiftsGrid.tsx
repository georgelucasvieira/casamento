"use client";

import GiftCard from "./GiftCard";
import GiftModal from "./GiftModal";
import { useState } from "react";

const gifts = [
  {
    id: 1,
    title: "Arandelas",
    price: "R$ 90,00",
    image: "/images/gifts/gift-1.jpg",
    purchased: true,
  },
  {
    id: 2,
    title: "Travessas e Refratários",
    price: "R$ 120,00",
    image: "/images/gifts/gift-2.jpg",
    purchased: true,
  },
  {
    id: 3,
    title: "Aparelho de Jantar",
    price: "R$ 600,00",
    image: "/images/gifts/gift-3.jpg",
  },
  {
    id: 4,
    title: "Passagem Lua de Mel",
    price: "R$ 2.500,00",
    image: "/images/gifts/gift-4.jpg",
  },
  {
    id: 5,
    title: "Hospedagem Lua de Mel",
    price: "R$ 1.500,00",
    image: "/images/gifts/gift-5.jpg",
  },
  {
    id: 6,
    title: "Mesa de Jantar",
    price: "R$ 2.000,00",
    image: "/images/gifts/gift-6.jpg",
  },
  {
    id: 7,
    title: "Cadeira de Escritório",
    price: "R$ 650,00",
    image: "/images/gifts/gift-7.jpg",
  },
  {
    id: 8,
    title: "Cota Passagem",
    price: "R$ 500,00",
    image: "/images/gifts/gift-8.jpg",
  },
];

export default function GiftsGrid() {
  const [selectedGift, setSelectedGift] = useState<any>(null);

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

      <GiftModal
        gift={selectedGift}
        onClose={() => setSelectedGift(null)}
      />
    </>
  );
}