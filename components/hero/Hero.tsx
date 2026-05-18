import SlideShow from "./SlideShow";

export default function Hero() {
  return (
    <>
    <section className="flex flex-col w-full h-screen justify-center text-center items-center">
      <SlideShow />
      <Content />
    </section>
    <Countdown />
    </>
  );
}

function Content() {
  return (
    <div className="text-white w-full justify-center items-center">
      <h1 className="relative font-cormorant mb-3 pb-3 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-px after:w-1/12 after:bg-white">
        <span>AURORA</span><span> &amp; </span><span>GEORGE</span>
      </h1>
      <br />
      <h2 className="font-cormorant-700 italic">nas ditas linhas em que nos encontramos</h2>
      <br />
      <span className="text-xl">08 DE AGOSTO DE 2026</span>
      <span className="text-xl"> | GO</span>
    </div>
  );
}

function Countdown() {
  return (
    <section className="font-cormorant flex justify-center h-150 text-white text-3xl text-center relative after:absolute 
                        after:bg-transparent after:bg-[url(/images/ripped-bg-3.png)] after:bg-no-repeat after:bg-bottom 
                        after:bg-contain after:w-full after:h-full">
      <div >  
        <div >
          <div >Casados há:</div>
          <div className="flex gap-20">
            <div>
              <div className="text-9xl font-cormorant-300" >10</div>
              <div >MESES</div>
            </div>
            <div>
              <div className="text-9xl font-cormorant-300">22</div>
              <div >DIAS</div>
            </div>
            <div>
              <div className="text-9xl font-cormorant-300">22</div>
              <div >HORAS</div>
            </div>
            <div>
              <div className="text-9xl font-cormorant-300">27</div>
              <div >MINUTOS</div>
            </div>
            <div >
              <div className="text-9xl font-cormorant-300">44</div>
              <div >SEGUNDOS</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

}