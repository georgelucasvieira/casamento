"use client";

import { useState } from "react";

export default function GiftForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [qrFile, setQrFile] = useState<File | null>(null);
  const [pixCopyPaste, setPixCopyPaste] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

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
      let imageUrl = null;
      let qrCodeUrl = null;

      if (imageFile) {
        const data = await toDataUrl(imageFile);
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data }),
        });
        const j = await res.json();
        imageUrl = j.url;
      }

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

      const create = await fetch("/api/admin/gifts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price: Number(price),
          image: imageUrl,
          qrCodeImage: qrCodeUrl,
          pixCopyPaste: pixCopyPaste || null,
        }),
      });
      const cj = await create.json();
      if (cj.id) {
        setMessage("Presente criado com sucesso");
        setName("");
        setPrice(0);
        setImageFile(null);
        setQrFile(null);
        setPixCopyPaste("");
      } else {
        setMessage("Erro ao criar presente");
      }
    } catch (e) {
      setMessage(String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold">Nome</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded p-2" />
      </div>
      <div>
        <label className="block text-sm font-semibold">Preço</label>
        <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full rounded p-2" />
      </div>
      <div>
        <label className="block text-sm font-semibold">Imagem</label>
        <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)} />
      </div>
      <div>
        <label className="block text-sm font-semibold">QR Code para pagamento</label>
        <input type="file" accept="image/*" onChange={(e) => setQrFile(e.target.files ? e.target.files[0] : null)} />
      </div>
      <div>
        <label className="block text-sm font-semibold">Pix Copia e Cola</label>
        <textarea
          value={pixCopyPaste}
          onChange={(e) => setPixCopyPaste(e.target.value)}
          className="w-full rounded p-2"
          rows={3}
          placeholder="Cole aqui o código Pix"
        />
      </div>
      <div>
        <button disabled={loading} className="rounded bg-black text-white px-4 py-2">{loading ? "Enviando..." : "Criar presente"}</button>
      </div>
      {message && <p className="text-sm text-black/60">{message}</p>}
    </form>
  );
}
