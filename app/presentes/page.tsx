import GiftsGrid from "@/components/gifts/GiftsGrid";
import Navbar from "@/components/navbar/Navbar";
import { getGifts } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function PresentesPage() {
  const gifts = await getGifts();

  return (
    <main className="relative min-h-1000">
      <Navbar />

      <div className="lg:hidden absolute w-full top-0 left-0 translate-y-5 text-2xl font-cormorant-700 font-bold text-center">
        Lista de Presentes
      </div>

      <section className="px-6 py-20 my-20 lg:px-12">
        <div className="mx-auto max-w-350">
          <GiftsGrid gifts={gifts} />
        </div>
      </section>
    </main>
  );
}
