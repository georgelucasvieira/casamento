import Navbar from "@/components/navbar/Navbar";
import HeroAdmin from "@/components/admin/HeroAdmin";
import { getHeroSlots } from "@/lib/db";

export default async function AdminHeroPage() {
  const slots = await getHeroSlots();

  return (
    <main className="relative min-h-1000">
      <Navbar />
      <section className="px-6 py-24 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-[2rem] bg-white p-8 shadow">
            <h1 className="text-2xl font-semibold mb-6">Admin Hero</h1>
            <HeroAdmin slots={slots} />
          </div>
        </div>
      </section>
    </main>
  );
}
