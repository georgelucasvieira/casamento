interface GiftModalProps {
  gift: any;
  onClose: () => void;
}

export default function GiftModal({
  gift,
  onClose,
}: GiftModalProps) {
  if (!gift) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/30
        p-6
        backdrop-blur-md
      "
      onClick={onClose}
    >
      <div
        className="
          relative grid max-w-6xl
          grid-cols-1 overflow-hidden
          rounded-[2.5rem]
          bg-[#f5f2ee]
          shadow-2xl
          lg:grid-cols-2
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* IMAGE */}
        <div className="flex items-center justify-center p-12">
          <img
            src={gift.image}
            alt={gift.title}
            className="max-h-150 object-contain"
          />
        </div>

        {/* CONTENT */}
        <div
          className="
            flex flex-col justify-center
            px-10 py-16
            lg:px-20
          "
        >
          <h2
            className="
              text-4xl uppercase
              tracking-[0.15em]
              text-black/90
            "
          >
            {gift.title}
          </h2>

          <p
            className="
              mt-12
              font-cormorant
              text-5xl
              text-black/60
            "
          >
            Seu presente: {gift.price}
          </p>

          <button
            className="
              mt-12 w-fit rounded-full
              border border-black/30
              px-10 py-4
              font-cormorant
              text-3xl italic
              transition-all duration-300

              hover:bg-black hover:text-white
            "
          >
            Faça o pagamento
          </button>

          {/* PAYMENT ICONS */}
          <div className="mt-10 flex items-center gap-5 text-black/50">
            <span>Mastercard</span>
            <span>Visa</span>
            <span>PIX</span>
          </div>

          <p className="mt-6 text-lg italic text-black/40">
            Parcelamento disponível
          </p>
        </div>

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="
            absolute right-6 top-6
            text-3xl text-black/50
            transition-all
            hover:rotate-90
          "
        >
          ×
        </button>
      </div>
    </div>
  );
}