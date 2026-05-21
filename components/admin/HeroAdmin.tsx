"use client";

import { useState } from "react";

type SlotItem = { position: number; image?: string };

interface Props {
  slots: Record<string, SlotItem[]>;
}

export default function HeroAdmin({ slots }: Props) {
  const [message, setMessage] = useState<string | null>(null);

  const toDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleUpload = async (slot: string, position: number, file: File) => {
    setMessage(null);
    try {
      const data = await toDataUrl(file);
      const up = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });
      const uj = await up.json();
      const url = uj.url;
      await fetch("/api/admin/hero", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slot, position, image: url }),
      });
      setMessage("Imagem atualizada");
    } catch (e) {
      setMessage(String(e));
    }
  };

  return (
    <div className="space-y-6">
      {Object.entries(slots).map(([slot, arr]) => (
        <div key={slot} className="rounded p-4 border">
          <h3 className="font-semibold">{slot}</h3>
          <div className="mt-3 grid gap-4 grid-cols-1 md:grid-cols-3">
            {arr.map((s) => (
              <div key={s.position} className="space-y-2">
                <div className="h-36 w-full bg-gray-100 flex items-center justify-center">
                  {s.image ? (
                    // eslint-disable-next-line jsx-a11y/img-redundant-alt
                    <img src={s.image} alt={`${slot}-${s.position}`} className="h-full object-cover" />
                  ) : (
                    <span className="text-sm">Sem imagem</span>
                  )}
                </div>
                <input type="file" accept="image/*" onChange={(e) => e.target.files && handleUpload(slot, s.position, e.target.files[0])} />
              </div>
            ))}
          </div>
        </div>
      ))}
      {message && <p className="text-sm text-black/60">{message}</p>}
    </div>
  );
}
