import Navbar from "@/components/navbar/Navbar";

export default function LocalizacaoPage() {
  return (
    <main className="relative min-h-1000">
      <Navbar />
      <section className="px-6 py-24 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-[2.5rem] bg-[#f5f2ee] px-8 py-12 shadow-[0_20px_70px_rgba(0,0,0,0.08)]">
            <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr]">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-black/50">
                  Localização
                </p>
                <h1 className="mt-6 text-5xl font-semibold text-black">
                  Onde será o casamento
                </h1>
                <p className="mt-6 max-w-2xl text-lg text-black/70">
                  Um espaço elegante e acolhedor para celebrarmos juntos. Navegue pelo mapa e encontre o endereço facilmente.
                </p>
              </div>

              <div className="space-y-6 rounded-[2rem] bg-white p-8 shadow-[0_15px_40px_rgba(0,0,0,0.08)]">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-black/40">
                    Endereço
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold text-black">
                    Rua do Amor, 123
                  </h2>
                  <p className="mt-3 text-lg text-black/70">
                    Cidade do Evento, Estado • Horário da cerimônia
                  </p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-black/40">
                    Observação
                  </p>
                  <p className="mt-3 text-lg text-black/70">
                    Use o GPS com o endereço acima. Estacionamento e acesso são fáceis para todos os convidados.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 overflow-hidden rounded-[2rem] border border-black/10 shadow-[0_20px_70px_rgba(0,0,0,0.08)]">
              <iframe
                title="Mapa do local"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-46.6375%2C-23.5580%2C-46.6285%2C-23.5490&layer=mapnik&marker=-23.5535%2C-46.6330"
                className="h-96 w-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
