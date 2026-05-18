import FlipCard from "./FlipCard";

export default function SaveTheDateSection() {
  return (
    <section className="relative overflow-hidden bg-[#f4f1ed] px-10 py-32 lg:px-24">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-24 lg:flex-row lg:items-center lg:justify-between">
        {/* LEFT TEXT */}
        <div className="flex-shrink-0">
          <h2
            className="
              font-cormorant
              text-[5rem]
              leading-[0.9]
              tracking-[-0.03em]
              text-black

              md:text-[7rem]
              lg:text-[9rem]
            "
          >
            SAVE
            <br />
            THE
            <br />
            DATE!
          </h2>
        </div>

        {/* CARDS */}
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-10">
          <FlipCard
            image="/images/ptf-1.jpg"
            number="01."
            initialDelay={1000}
          />

          <FlipCard
            image="/images/ptf-2.jpg"
            number="02."
            initialDelay={2000}
          />

          <FlipCard
            image="/images/ptf-3.jpg"
            number="03."
            initialDelay={3000}
          />
        </div>
      </div>
    </section>
  );
}