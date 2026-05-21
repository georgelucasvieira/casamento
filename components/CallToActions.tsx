import Link from "next/link";

const actions = [
  {
    href: "/confirmar-presenca",
    title: "Confirme sua presença",
    description: "Dê o sim e nos ajude a preparar cada detalhe com carinho.",
  },
  {
    href: "/presentes",
    title: "Lista de presentes",
    description: "Escolha um presente e faça parte da nossa celebração.",
  },
  {
    href: "/localizacao",
    title: "Localização",
    description: "Veja onde será a cerimônia e como chegar ao nosso dia.",
  },
];

export default function CallToActions() {
  return (
    <section className="bg-[#f8f4ef] px-6 py-16 sm:px-10 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-3">
          {actions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="group block rounded-4xl border border-black/10 bg-white p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
            >
              <span className="text-sm uppercase tracking-[0.35em] text-black/40">{action.title}</span>
              <h3 className="mt-6 text-2xl font-semibold text-black/90">{action.title}</h3>
              <p className="mt-4 text-base leading-7 text-black/60">{action.description}</p>
              <span className="mt-8 inline-flex items-center text-sm font-semibold text-black/80 transition-colors duration-300 group-hover:text-black">
                Abrir página →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
