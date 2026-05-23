'use client';

import { Countdown } from "./Countdown";
import SlideShow from "./SlideShow";

type HeroProps = {
  heroImages?: string[];
};

export default function Hero({ heroImages }: HeroProps) {
  return (
    <>
      <section className="flex flex-col w-full h-screen justify-center text-center items-center">
        <SlideShow images={heroImages} />
        <Content />
      </section>
      <Countdown />
    </>
  );
}

function Content() {
  return (
    <div className="text-white w-full flex flex-col justify-center items-center">
      <h1 className="relative font-cormorant mb-3 pb-3 flex flex-col
          md:text-[84px] md:flex-row md:gap-6 
          after:absolute after:-bottom-5 after:left-1/2 after:-translate-x-1/2 after:h-px after:w-2/12 after:bg-white">
        <span>AURORA</span><span> &amp; </span><span>GEORGE</span>
      </h1>
      <br />
      <h2 className="font-cormorant-700 italic">na simplicidade de um encontro, uma vida inteira</h2>
      <br />
      <span className="text-3xl font-cormorant">08/08/2026</span>
    </div>
  );
}