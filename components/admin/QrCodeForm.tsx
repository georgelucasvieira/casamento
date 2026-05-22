"use client";

import Image from "next/image";
import { useState } from "react";
import type { QrCode } from "@/lib/db";

interface QrCodeFormProps {
  initialQrCode?: QrCode | null;
}

export default function QrCodeForm({ initialQrCode }: QrCodeFormProps) {
  const [qrFile, setQrFile] = useState<File | null>(null);
  const [pixCopyPaste, setPixCopyPaste] = useState(initialQrCode?.pixPasteCopy || "");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentQrCode, setCurrentQrCode] = useState<QrCode | null>(initialQrCode ?? null);

  const toDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      let qrCodeUrl = currentQrCode?.qrCodeImageUrl;

      if (qrFile) {
        const data = await toDataUrl(qrFile);
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data }),
        });
        const j = await res.json();
        qrCodeUrl = j.url;
      }

      const res = await fetch("/api/admin/qr-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          qrCodeImageUrl: qrCodeUrl || null,
          pixPasteCopy: pixCopyPaste || null,
        }),
      });

      const json = await res.json();
      if (json.id) {
        setMessage("QR Code salvo com sucesso.");
        setCurrentQrCode({
          id: json.id,
          qrCodeImageUrl: qrCodeUrl ?? undefined,
          pixPasteCopy: pixCopyPaste,
          dateCreated: new Date().toISOString(),
        });
        setQrFile(null);
      } else {
        setMessage("Erro ao salvar QR Code.");
      }
    } catch (error) {
      setMessage(String(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {currentQrCode?.qrCodeImageUrl && (
        <div>
          <p className="text-sm font-semibold">QR Code atual</p>
          <div className="mt-3 max-h-64 w-full overflow-hidden rounded-xl border">
            <Image
              src={currentQrCode.qrCodeImageUrl}
              alt="QR Code atual"
              width={600}
              height={600}
              className="h-full w-full object-contain"
              unoptimized
            />
          </div>
        </div>
      )}
      <div>
        <label className="block text-sm font-semibold">Novo QR Code</label>
        <input type="file" accept="image/*" onChange={(e) => setQrFile(e.target.files ? e.target.files[0] : null)} />
      </div>
      <div>
        <label className="block text-sm font-semibold">Pix Copia e Cola</label>
        <textarea
          value={pixCopyPaste}
          onChange={(e) => setPixCopyPaste(e.target.value)}
          className="w-full rounded p-2"
          rows={4}
          placeholder="Cole aqui o código Pix"
        />
      </div>
      <div>
        <button disabled={loading} className="rounded bg-black text-white px-4 py-2">
          {loading ? "Salvando..." : "Salvar QR Code global"}
        </button>
      </div>
      {message && <p className="text-sm text-black/60">{message}</p>}
    </form>
  );
}
