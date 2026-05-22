import GiftForm from "@/components/admin/GiftForm";
import QrCodeForm from "@/components/admin/QrCodeForm";
import Navbar from "@/components/navbar/Navbar";
import { getLatestQrCode, QrCode } from "@/lib/db";

export default async function AdminPresentesPage() {
  const qrCode = await getLatestQrCode() as QrCode;

  return (
    <main className="relative min-h-1000">
      <Navbar />
      <section className="px-6 py-24 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-4xl bg-white p-8 shadow">
              <h1 className="text-2xl font-semibold mb-6">Admin Presentes</h1>
              <GiftForm />
            </div>
            <div className="rounded-4xl bg-white p-8 shadow">
              <h1 className="text-2xl font-semibold mb-6">QR Code e Pix global</h1>
              <QrCodeForm initialQrCode={qrCode} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
