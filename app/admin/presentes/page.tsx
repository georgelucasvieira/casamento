import GiftForm from "@/components/admin/GiftForm";
import Navbar from "@/components/navbar/Navbar";

export default function AdminPresentesPage() {
  return (
    <main className="relative min-h-1000">
      <Navbar />
      <section className="px-6 py-24 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-[2rem] bg-white p-8 shadow">
            <h1 className="text-2xl font-semibold mb-6">Admin — Presentes</h1>
            <GiftForm />
          </div>
        </div>
      </section>
    </main>
  );
}
