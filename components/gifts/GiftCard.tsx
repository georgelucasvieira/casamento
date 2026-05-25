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
        bg-[#ffffff70]
        p-4 sm:p-8
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
          loading="lazy"
          decoding="async"
          className="
            h-36 w-36 sm:h-56 sm:w-56 object-cover
            transition-transform duration-700
            group-hover:scale-105
          "
        />
      </div>

      {/* CONTENT */}
      <div className="pt-4 text-center">
        <h3
          className="
            text-sm sm:text-xl uppercase
            tracking-[0.15em]
            text-black/90
          "
        >
          {gift.title}
        </h3>

        <p className="mt-3 sm:mt-6 text-lg sm:text-3xl font-semibold text-black">
          {gift.price}
        </p>

        {/* BUTTON */}
        <button
          onClick={onClick}
          disabled={gift.purchased}
          className="
            mt-4 sm:mt-8 rounded-full
            border border-black/30
            px-5 sm:px-10 py-2 sm:py-4
            font-cormorant
            text-lg sm:text-3xl italic
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