import Hero from "@/components/hero/Hero";
import Navbar from "@/components/navbar/Navbar";
import SaveTheDate from "@/components/save-the-date/SaveTheDate";
import CallToActions from "@/components/CallToActions";
import { Localizacao } from "@/components/Localizacao";

export default async function Home() {

  return (
    <>
      <Navbar />
      <Hero />
      <SaveTheDate />
      <CallToActions />
      <div className="w-full bg-white">
          <Localizacao />
      </div>
      <footer className="w-full h-40 bg-white text-center py-20 font-cormorant text-xl text-black/70">
       <p>www.auroraegeorge.com.br</p> 
       <p className="text-base">Desenvolvido por George (o noivo)</p>
      </footer>
    </>
  );
}
