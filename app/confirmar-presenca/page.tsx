import GuestConfirmation from "@/components/guests/GuestConfirmation";
import Navbar from "@/components/navbar/Navbar";
import { getGuests } from "@/lib/db";

export default async function ConfirmarPresencaPage() {
  const guests = await getGuests();

  return (
    <main className="relative min-h-1000">
      <Navbar />

      <section className="px-6 py-24 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <GuestConfirmation initialGuests={guests} />
        </div>
      </section>
    </main>
  );
}
