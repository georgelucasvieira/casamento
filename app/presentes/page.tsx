import GiftsGrid from "@/components/gifts/GiftsGrid";

export default function PresentesPage() {
  return (
    <main className="min-h-screen bg-[#ece7e2]">
      {/* HERO BLUR BACKGROUND */}
      <div
        className="
          fixed inset-0 -z-10
          bg-cover bg-center
          blur-xl scale-110 opacity-40
        "
        style={{
          backgroundImage: "url('/images/casal-bg.jpg')",
        }}
      />

      {/* NAVBAR */}
      <header
        className="
          sticky top-0 z-40
          border-b border-black/5
          bg-[#f5f2ee]/90
          backdrop-blur-md
        "
      >
        <div
          className="
            mx-auto flex h-24 max-w-[1600px]
            items-center justify-between
            px-6 lg:px-12
          "
        >
          {/* LOGO */}
          <div className="flex items-center gap-4">
            <div
              className="
                flex h-14 w-14 items-center justify-center
                rounded-full border border-black/20
                text-xl
              "
            >
              AG
            </div>
          </div>

          {/* MENU */}
          <nav className="hidden items-center gap-12 lg:flex">
            <a className="text-sm uppercase tracking-[0.3em]">Início</a>
            <a className="text-sm uppercase tracking-[0.3em]">
              Confirme presença
            </a>

            <a
              className="
                font-cormorant
                text-4xl italic
              "
            >
              presentes
            </a>

            <a className="text-sm uppercase tracking-[0.3em]">
              Dicas e instruções
            </a>

            <a className="text-sm uppercase tracking-[0.3em]">
              Álbum de fotos
            </a>

            <a className="text-sm uppercase tracking-[0.3em]">
              Nossa história
            </a>
          </nav>
        </div>
      </header>

      {/* CONTENT */}
      <section className="px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <GiftsGrid />
        </div>
      </section>
    </main>
  );
}