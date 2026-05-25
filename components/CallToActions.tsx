import Link from "next/link";

const actions = [
  {
    href: "/confirmar-presenca",
    title: "Confirme sua presença",
    description: "Cada presença tornará este dia ainda mais especial.",
  },
  {
    href: "/presentes",
    title: "Lista de presentes",
    description: "Cada presente ajudará a construir nosso novo lar com amor e carinho.",
  },
  {
    href: "/instrucoes",
    title: "Dicas e Instruções",
    description: "Aqui você encontra orientações e dicas importantes sobre o grande dia.",
  },
];

export default function CallToActions() {
  return (
    <section className="bg-[#f8f4ef] px-6 py-12 lg:py-16 sm:px-10 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-3 lg:gap-6 lg:grid-cols-3">
          {actions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="group block rounded-4xl border border-black/10 bg-white px-8 py-4 lg:px-8 lg:py-8 text-left transition-all duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
            >
              {/* <span className="text-sm uppercase tracking-[0.35em] text-black/40">{action.title}</span> */}
              <h3 className="mt-3 lg:mt-6 text-2xl lg:text-4xl font-cormorant-700 text-black/90">{action.title}</h3>
              <p className="mt-3 lg:mt-4 text-base leading-7 text-black/60">{action.description}</p>
              <span className="mt-5 lg:mt-8 inline-flex items-center text-base lg:text-lg font-semibold text-black/80 transition-colors duration-300 group-hover:text-black">
                Abrir página →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
