import Navbar from '@/components/navbar/Navbar'

export default async function InstrucoesPage() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <section className="px-6 py-24 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-[2rem] bg-white p-8 shadow">
            <h1 className="text-2xl font-semibold mb-6">Instruções</h1>
          </div>
        </div>
      </section>
    </main>  );
}
