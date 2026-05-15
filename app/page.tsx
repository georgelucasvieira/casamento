import Image from "next/image";
import PresentesPage from "./presentes/page";

export default function Home() {
  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-1/6 bg-amber-200"></nav>
      <header className="relative w-full">
        <div className="fixed top-30 left-0 bg-blue-200 w-full h-200 -z-10">

        </div>
        <section className="absolute top-0 left-0 flex flex-col w-full">
          <div className="text-black w-full justify-center items-center">
            <h1>
              <span>Amábilly</span><span>&amp;</span><span>Gabriel</span>
            </h1>
            <h2>nas ditas linhas em que nos encontramos</h2>
            <span>29 DE JUNHO DE 2024</span>
            <span>MG<span>–</span>SP</span>
            <br/><br/><br/><br/>
          </div>
            <div className="text-black w-full justify-center items-center">
            <h1>
              <span>Amábilly</span><span>&amp;</span><span>Gabriel</span>
            </h1>
            <h2>nas ditas linhas em que nos encontramos</h2>
            <span>29 DE JUNHO DE 2024</span>
            <span>MG<span>–</span>SP</span>
            <br/><br/><br/><br/>
          </div>
        </section>
      </header>
      <div className="w-full h-150"></div>
      <main className="w-full text-center">
        <section className="w-full h-56"><h2>CONTENT</h2></section>
        <section className="w-full h-56"><h2>CONTENT</h2></section>
        <section className="w-full h-56"><h2>CONTENT</h2></section>
        <section className="w-full h-56"><h2>CONTENT</h2></section>
        <section className="w-full h-56"><h2>CONTENT</h2></section>
        <section className="w-full h-56"><h2>CONTENT</h2></section>
        <section className="w-full h-56"><h2>CONTENT</h2></section>

      </main>
      <footer></footer>
    </>
  );
}
