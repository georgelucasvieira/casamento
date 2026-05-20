import Navbar from "@/components/navbar/Navbar";

export default function LocalizacaoPage() {
    return (
        <main className="relative min-h-screen">
            <Navbar />
            <section className="px-6 py-24 lg:px-12 font-cormorant">
                <div className="mx-auto max-w-5xl">
                    <div className="rounded-[2.5rem] px-8 py-12">
                        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr]">
                            <div>
                                <p className="text-sm uppercase tracking-[0.35em] text-black/50">
                                    Localização
                                </p>
                                <h1 className="mt-6 text-5xl font-semibold text-black">
                                    Onde será o casamento
                                </h1>
                                <p className="mt-6 max-w-2xl text-lg text-black/70">
                                    Nosso casamento será celebrado na Paróquia Santa Genoveva em Goiânia com Missa.
                                </p>
                            </div>

                            <div className="space-y-6 rounded-[2rem] bg-white p-8 shadow-[0_15px_40px_rgba(0,0,0,0.08)]">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.25em] text-black/40">
                                        Endereço
                                    </p>
                                    <h2 className="mt-4 text-3xl font-semibold text-black">
                                        Av. Brasil, Santa Genoveva
                                    </h2>
                                    <p className="mt-3 text-lg text-black/70">
                                        Goiânia, Goiás 74670-010 • 18:00
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm uppercase tracking-[0.25em] text-black/40">
                                        Observação
                                    </p>
                                    <p className="mt-3 text-lg text-black/70">
                                        A celebração será realizada pontualmente com o Padre, favor chegar com antecedência.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 overflow-hidden rounded-[2rem] border border-black/10 shadow-[0_20px_70px_rgba(0,0,0,0.08)]">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3822.876032462632!2d-49.23729068918337!3d-16.632989684064945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ef2570a94f4c3%3A0xd1fd030a4c400177!2sPar%C3%B3quia%20Santa%20Genoveva!5e0!3m2!1spt-BR!2sbr!4v1779293799287!5m2!1spt-BR!2sbr"
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
