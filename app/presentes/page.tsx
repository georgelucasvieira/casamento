import GiftsGrid from "@/components/gifts/GiftsGrid";
import Navbar from "@/components/navbar/Navbar";

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
          backgroundImage: "url('/images/PTF-74.jpg')",
        }}
      />

      <Navbar/>

      {/* CONTENT */}
      <section className="px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-350">
          <GiftsGrid />
        </div>
      </section>
    </main>
  );
}