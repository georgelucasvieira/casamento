import SlideShow from "./SlideShow";

export default function Hero() {
  return (
    <section className="flex flex-col w-full h-screen justify-center text-center">
      <SlideShow />
      <Content />
    </section>
  );
}

function Content() {
  return (
    <div className="text-white w-full justify-center items-center">
      <h1 className="font-freight">
        <span>Aurora</span><span> &amp; </span><span>George</span>
      </h1>
      <h2>nas ditas linhas em que nos encontramos</h2>
      <span>08 DE AGOSTO DE 2026</span>
      <span> GO</span>
    </div>
  );
}
