import GiftsGrid from "@/components/gifts/GiftsGrid";
import Navbar from "@/components/navbar/Navbar";

export default function PresentesPage() {
  return (
    <main className="relative min-h-1000">
      {/* HERO BLUR BACKGROUND */}      
      <Navbar/>

      {/* CONTENT */}
      <section className="px-6 py-20 my-20 lg:px-12">
        <div className="mx-auto max-w-350">
          <GiftsGrid />
        </div>
      </section>

    </main>
  );
}