import FlipCard from "./FlipCard";

type FlipcardSlotMap = Partial<Record<number, string[] | undefined>>;

type SaveTheDateProps = {
  flipcards?: FlipcardSlotMap;
};

const defaultFlipcards: Record<number, string[]> = {
  1: ["/images/flipcard_1_1.jpg", "/images/flipcard_1_2.jpg"],
  2: ["/images/flipcard_2_1.jpg", "/images/flipcard_2_2.jpg"],
  3: ["/images/flipcard_3_1.jpg", "/images/flipcard_3_2.jpg"],
};

export default function SaveTheDateSection({ flipcards }: SaveTheDateProps) {
  const cardImages1 = flipcards?.[1] && flipcards[1]?.length > 0 ? flipcards[1] : defaultFlipcards[1];
  const cardImages2 = flipcards?.[2] && flipcards[2]?.length > 0 ? flipcards[2] : defaultFlipcards[2];
  const cardImages3 = flipcards?.[3] && flipcards[3]?.length > 0 ? flipcards[3] : defaultFlipcards[3];

  return (
    <section className="relative overflow-hidden bg-white px-10 pb-10 lg:px-24">
      <div className="mx-auto
        flex flex-col items-center gap-16 lg:gap-24
        md:justify-center lg:flex-col">
        {/* LEFT TEXT */}
        <div className="text-4xl lg:text-5xl text-center font-cormorant-300 bg-linear-to-l from-[#dcdcdc] to-[#111] bg-clip-text text-transparent">
          De todos os destinos, o nosso
        </div>

        {/* CARDS */}
        <div className="flex flex-col font-cormorant items-center gap-12 lg:flex-row lg:gap-24">
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
