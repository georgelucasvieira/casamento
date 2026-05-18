import Hero from "@/components/hero/Hero";
import Navbar from "@/components/navbar/Navbar";
import SaveTheDate from "@/components/save-the-date/SaveTheDate";


export default function Home() {
  return (
    <>
      <Navbar/>
      <Hero/>
      <SaveTheDate/>

      <div className="w-full h-200"></div>
      <main className="w-full text-center text-black">
        <section className="w-full h-56 flex flex-col justify-center bg-white"><h2>CONTENT</h2></section>
        <section className="w-full h-56 flex flex-col justify-center bg-white"><h2>CONTENT</h2></section>
        <section className="w-full h-56 flex flex-col justify-center bg-white"><h2>CONTENT</h2></section>
        <section className="w-full h-56 flex flex-col justify-center bg-white"><h2>CONTENT</h2></section>
        <section className="w-full h-56 flex flex-col justify-center bg-white"><h2>CONTENT</h2></section>
        <section className="w-full h-56 flex flex-col justify-center bg-white"><h2>CONTENT</h2></section>
        <section className="w-full h-56 flex flex-col justify-center bg-white"><h2>CONTENT</h2></section>

      </main>
      <footer></footer>
    </>
  );
}
