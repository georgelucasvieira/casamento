import FlipCard from "./FlipCard";

export default function SaveTheDateSection() {
  return (
    <section className="relative overflow-hidden bg-white px-10 py-32 lg:px-24">
      <div className="mx-auto flex max-w-400 flex-col gap-24 lg:flex-row lg:items-center lg:justify-between">
        {/* LEFT TEXT */}
        <div className="shrink-0">
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
            image="/images/ptf-6.jpg"
            number="01."
            initialDelay={500}
          />

          <FlipCard
            image="/images/ptf-74.jpg"
            number="02."
            initialDelay={1000}
          />

          <FlipCard
            image="/images/ptf-102.jpg"
            number="03."
            initialDelay={1500}
          />
        </div>
      </div>
    </section>
  );
}