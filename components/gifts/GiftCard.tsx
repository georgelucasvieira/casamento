interface GiftCardProps {
  gift: any;
  onClick: () => void;
}

export default function GiftCard({
  gift,
  onClick,
}: GiftCardProps) {
  return (
    <div
      className="
        group relative overflow-hidden
        rounded-4xl
        border border-black/5
        bg-[#f5f2ee]/90
        p-8
        shadow-[0_10px_40px_rgba(0,0,0,0.08)]
        backdrop-blur-md
        transition-all duration-500
        hover:-translate-y-2
        hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]
      "
    >
      {/* IMAGE */}
      <div className="overflow-hidden rounded-2xl">
        <img
          src={gift.image}
          alt={gift.title}
          className="
            h-56 w-full object-cover
            transition-transform duration-700
            group-hover:scale-105
          "
        />
      </div>

      {/* CONTENT */}
      <div className="pt-8 text-center">
        <h3
          className="
            text-xl uppercase
            tracking-[0.15em]
            text-black/90
          "
        >
          {gift.title}
        </h3>

        <p className="mt-6 text-3xl font-semibold text-black">
          {gift.price}
        </p>

        {/* BUTTON */}
        <button
          onClick={onClick}
          disabled={gift.purchased}
          className="
            mt-8 rounded-full
            border border-black/30
            px-10 py-4
            font-cormorant
            text-3xl italic
            transition-all duration-300

            hover:bg-black hover:text-white

            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {gift.purchased ? "Comprado" : "Ver detalhes"}
        </button>
      </div>
    </div>
  );
}