import Navbar from "@/components/navbar/Navbar";
import { getChurchSlots } from "@/lib/db";

export default async function LocalizacaoPage() {
    const slots = await getChurchSlots();
    const churchImageSlot = slots.church?.map((item) => item.image).filter(Boolean) as string[] | undefined;
    const churchImage = churchImageSlot && churchImageSlot.length > 0 ? churchImageSlot[0] : "";

    return (
        <main className="relative min-h-screen">
            <Navbar />
           <section className="px-6 py-16 lg:py-24 lg:px-12 font-cormorant">
                <div className="mx-auto max-w-7xl">
                    <div className="rounded-[2.5rem] px-8">

                        <div className='flex gap-8 justify-center'>
                            <div className='h-full hidden lg:block'>
                                <img src={churchImage} alt="Paróquia Santa Genoveva" className='w-full h-full object-contain rounded-4xl' />
                            </div>

                            <div className="flex flex-col mt-6 lg:mt-2 items-center gap-4 lg:min-w-100">
                                <div>
                                    <span className="w-full lmt-6 text-2xl text-center lg:text-4xl lg:text-start font-bold text-black">
                                        Localização da Cerimônia
                                    </span>
                                </div>

                                <div className='h-full block lg:hidden'>
                                    <img src={churchImage} alt="Paróquia Santa Genoveva" className='w-full h-full object-contain rounded-4xl' />
                                </div>

                                <div className="rounded-4xl bg-white p-8 shadow-[0_15px_40px_rgba(0,0,0,0.08)]">
                                    <div>
                                        <p className="text-sm uppercase tracking-[0.25em] text-black">
                                            Endereço
                                        </p>
                                        <span className="mt-4 text-3xl font-semibold text-black">
                                            Paróquia Santa Genoveva, Av. Brasil, s/n, Setor Santa Genoveva
                                        </span>
                                        <p className="mt-3 text-lg text-black">
                                            Goiânia, Goiás
                                        </p>
                                        <p className="mt-3 text-2xl font-bold text-black/70">
                                            Dia 08 de Agosto 2026 às 17:30
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-3 rounded-4xl bg-white p-8 shadow-[0_15px_40px_rgba(0,0,0,0.08)]">
                                    <div>
                                        <p className="text-sm uppercase tracking-[0.25em] text-black">
                                            Observação
                                        </p>
                                        <p className="text-lg text-black/70">
                                            A cerimônia terá início pontualmente. Pedimos a gentileza de se programarem para chegar com antecedência.
                                        </p>
                                    </div>
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
            </section>        </main>
    );
}
