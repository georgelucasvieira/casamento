import Navbar from '@/components/navbar/Navbar'

export default async function InstrucoesPage() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <section className="mt-40 px-6 lg:px-12 font-cormorant text-2xl text-center">
        <div className="w-full mx-auto max-w-250 flex flex-col gap-16 items-center justify-center">
          <div className='w-full flex flex-col items-center justify-center'>
            <div>Queridos convidados,</div>
            <div>
              Nossa cerimônia será celebrada em rito religioso, durante a Santa Missa.
              Por isso, pedimos a gentileza de observarem o respeito devido ao ambiente sagrado
              e ao sacramento que estaremos celebrando.
            </div>
          </div>

          <div className='w-full flex flex-col items-center justify-center'>
            <div>Gentilmente pedimos cuidado ao traje escolhido:</div>
            <div>
              Às mulheres, evitem vestidos muito justos, transparências, decotes acentuados ou fendas muito profundas.
              Aos homens, sugerimos trajes compatíveis com a solenidade da ocasião, evitando bermudas, regatas e peças excessivamente informais.
            </div>
          </div>
          
          <div className='w-full text-center'>
            <span className='text-3xl font-cormorant-700'>Traje sugerido: Esporte fino</span>
          </div>
        </div>
      </section>
      <section className="mt-50 px-6 lg:px-12 flex flex-col gap-6 items-center justify-center font-cormorant text-2xl text-center">
        <div className='w-full text-center text-'>
          Abaixo, inspirações para este dia especial:
        </div>
        <div className='w-full flex flex-col items-center justify-center lg:flex-row'>
          <img src="/images/dress-code.png" alt="Dress Code" className='md:w-[62%]'/>
        </div>
      </section>
      <div className='h-25'/>
    </main>);
}
