import Hero from "@/components/hero/Hero";
import Navbar from "@/components/navbar/Navbar";
import SaveTheDate from "@/components/save-the-date/SaveTheDate";
import CallToActions from "@/components/CallToActions";
import { getHeroSlots } from "@/lib/db";
import { Localizacao } from "@/components/Localizacao";

export default async function Home() {
  const slots = await getHeroSlots();
  const heroImages = slots.hero_main?.map((item) => item.image).filter(Boolean) as string[] | undefined;
  const flipcards = {
    1: slots.flipcard_1?.map((item) => item.image).filter(Boolean) as string[] | undefined,
    2: slots.flipcard_2?.map((item) => item.image).filter(Boolean) as string[] | undefined,
    3: slots.flipcard_3?.map((item) => item.image).filter(Boolean) as string[] | undefined,
  };
  const churchImageSlot = slots.church?.map((item) => item.image).filter(Boolean) as string[] | undefined;

  return (
    <>
      <Navbar />
      <Hero heroImages={heroImages} />
      <SaveTheDate flipcards={flipcards} />
      <CallToActions />
      <div className="w-full bg-white">
          <Localizacao churchImageSlot={churchImageSlot}/>
      </div>
      <footer className="w-full h-40 bg-white text-center py-20 font-cormorant text-xl text-black/70">
       <p>www.auroraegeorge.com.br</p> 
       <p className="text-base">Desenvolvido por George (o noivo)</p>
      </footer>
    </>
  );
}
