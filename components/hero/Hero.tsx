import SlideShow from "./SlideShow";

export default function Hero() {
  return (
    <section className="flex flex-col w-full h-screen justify-center text-center items-center">
      <SlideShow />
      <Content />
      <Countdown />
    </section>
  );
}

function Content() {
  return (
    <div className="relative text-white w-full justify-center items-center">
      <h1 className="font-cormorant after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-px after:w-1/12 after:bg-white">
        <span>AURORA</span><span> &amp; </span><span>GEORGE</span>
      </h1>
      <h2>nas ditas linhas em que nos encontramos</h2>
      <span>08 DE AGOSTO DE 2026</span>
      <span> GO</span>
    </div>
  );
}

function Countdown() {
  return (
    <section className="font-cormorant text-white text-5xl relative after:absolute after:bg-transparent after:bg-[url(/images/ripped-bg-3.png)] after:bg-no-repeat after:bg-bottom after:bg-contain after:w-full after:h-full">
      <div >  
        <div >
          <div >Casados há:</div>
          <div className="flex gap-3">
            <div>
              <div >10</div>
              <div >Meses</div>
            </div>
            <div>
              <div >22</div>
              <div >Dias</div>
            </div>
            <div>
              <div >22</div>
              <div >Horas</div>
            </div>
            <div>
              <div >27</div>
              <div >Minutos</div>
            </div>
            <div >
              <div >44</div>
              <div >Segundos</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

}

// background: url(/countdown/ripped-bg-3.png);
// background-color: transparent;
// background-size: contain;
// background-repeat: no-repeat;
// background-position: bottom;
// position: absolute;
// content: "";
// width: 100%;
// height: 100%;