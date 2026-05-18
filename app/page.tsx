import Hero from "@/components/hero/Hero";
import Navbar from "@/components/navbar/Navbar";
import SaveTheDate from "@/components/save-the-date/SaveTheDate";


export default function Home() {
  return (
    <>
      <Navbar/>
      <Hero/>
      <SaveTheDate/>

    <div className="w-full h-400 bg-white"/>
    </>
  );
}
