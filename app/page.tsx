import Hero from "@/components/hero/Hero";
import Navbar from "@/components/navbar/Navbar";
import SaveTheDate from "@/components/save-the-date/SaveTheDate";
import { getHeroSlots } from "@/lib/db";

export default async function Home() {
  const slots = await getHeroSlots();
  const heroImages = slots.hero_main?.map((item) => item.image).filter(Boolean) as string[] | undefined;
  const flipcards = {
    1: slots.flipcard_1?.map((item) => item.image).filter(Boolean) as string[] | undefined,
    2: slots.flipcard_2?.map((item) => item.image).filter(Boolean) as string[] | undefined,
    3: slots.flipcard_3?.map((item) => item.image).filter(Boolean) as string[] | undefined,
  };

  return (
    <>
      <Navbar />
      <Hero heroImages={heroImages} />
      <SaveTheDate flipcards={flipcards} />

      <div className="w-full h-400 bg-white" />
    </>
  );
}
