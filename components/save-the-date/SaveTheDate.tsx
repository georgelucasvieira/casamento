import FlipCard from "./FlipCard";

type FlipcardSlotMap = Partial<Record<number, string[] | undefined>>;

type SaveTheDateProps = {
  flipcards?: FlipcardSlotMap;
};

const defaultFlipcards: Record<number, string[]> = {
  1: ["/images/ptf-6.jpg", "/images/ptf-74.jpg", "/images/ptf-102.jpg"],
  2: ["/images/ptf-74.jpg", "/images/ptf-102.jpg", "/images/ptf-132.jpg"],
  3: ["/images/ptf-102.jpg", "/images/ptf-6.jpg", "/images/ptf-74.jpg"],
};

export default function SaveTheDateSection({ flipcards }: SaveTheDateProps) {
  const cardImages1 = flipcards?.[1] && flipcards[1]?.length > 0 ? flipcards[1] : defaultFlipcards[1];
  const cardImages2 = flipcards?.[2] && flipcards[2]?.length > 0 ? flipcards[2] : defaultFlipcards[2];
  const cardImages3 = flipcards?.[3] && flipcards[3]?.length > 0 ? flipcards[3] : defaultFlipcards[3];

  return (
    <section className="relative overflow-hidden bg-white px-10 py-32 lg:px-24">
      <div className="mx-auto
        flex flex-col-reverse items-center gap-24
        md:justify-center
        lg:flex-row lg:items-start">
        {/* LEFT TEXT */}
        <div>
          <div className="text-[8rem] leading-40 font-cormorant-300 bg-linear-to-l from-[#eee] to-[#111] bg-clip-text text-transparent">
            <div>SAVE</div>
            <div>THE</div>
            <div>DATE!</div>
          </div>
          <div></div>
        </div>

        {/* CARDS */}
        <div className="flex flex-col font-cormorant items-center gap-12 lg:flex-row lg:gap-10">
          <div className="flex flex-col items-center gap-6">
            <FlipCard images={cardImages1} number="01." initialDelay={500} />
            <div className="h-10 w-0.75 bg-linear-to-b from-[#d39f42] from-10% to-white"></div>
            <div className="uppercase text-center">
              <span className="text-[#aaa] text-lg cursor-pointer tracking-[4px] font-cormorant-700">09 SET 2025</span>
              <h3 className="text-[32px] text-[#777] tracking-[2px]">O COMEÇO</h3>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6">
            <FlipCard images={cardImages2} number="02." initialDelay={1000} />
            <div className="h-10 w-0.75 bg-linear-to-b from-[#d39f42] from-10% to-white"></div>
            <div className="uppercase text-center">
              <span className="text-[#aaa] text-lg cursor-pointer tracking-[4px] font-cormorant-700">19 FEV 2026</span>
              <h3 className="text-[32px] text-[#777] tracking-[2px]">O PEDIDO</h3>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6">
            <FlipCard images={cardImages3} number="03." initialDelay={1500} />
            <div className="h-10 w-0.75 bg-linear-to-b from-[#d39f42] from-10% to-white"></div>
            <div className="uppercase text-center">
              <span className="text-[#aaa] text-lg cursor-pointer tracking-[4px] font-cormorant-700">08 AGO 2026</span>
              <h3 className="text-[32px] text-[#777] tracking-[2px]">O CASAMENTO</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
