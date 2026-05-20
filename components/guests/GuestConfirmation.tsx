"use client";

import { useMemo, useState } from "react";
import type { Guest } from "@/lib/db";

interface GuestConfirmationProps {
  initialGuests: Guest[];
}

export default function GuestConfirmation({ initialGuests }: GuestConfirmationProps) {
  const [query, setQuery] = useState("");
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const suggestions = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    return initialGuests.filter((guest) =>
      guest.name.toLowerCase().includes(normalized)
    );
  }, [initialGuests, query]);

  const handleSelect = (guest: Guest) => {
    setSelectedGuest(guest);
    setQuery(guest.name);
    setStatusMessage(null);
  };

  const handleSubmit = async (confirmed: boolean) => {
    if (!selectedGuest) return;
    setIsSaving(true);
    setStatusMessage(null);

    try {
      const response = await fetch("/api/guests", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: selectedGuest.id, confirmed }),
      });

      if (!response.ok) {
        throw new Error("Falha ao salvar");
      }

      setSelectedGuest({ ...selectedGuest, confirmed });
      setStatusMessage(
        confirmed
          ? "Presença confirmada com sucesso!"
          : "Resposta registrada. Obrigado!"
      );
    } catch (error) {
      setStatusMessage("Erro ao atualizar. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="rounded-[2.5rem] bg-[#f5f2ee] p-10 shadow-[0_20px_70px_rgba(0,0,0,0.08)]">
      <div className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-black/50">
          Confirmação de presença
        </p>
        <h1 className="mt-6 text-5xl font-semibold text-black">
          Quem é você?
        </h1>
        <p className="mt-4 text-lg text-black/70">
          Digite seu nome e escolha o convidado para confirmar sua presença.
        </p>

        <div className="mt-10">
          <label className="block text-sm font-semibold text-black/75">
            Buscar por nome
          </label>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="mt-4 w-full rounded-3xl border border-black/10 bg-white/90 px-6 py-5 text-lg outline-none transition focus:border-black"
            placeholder="Digite o nome do convidado"
          />

          <div className="mt-4 max-h-72 overflow-y-auto rounded-3xl border border-black/10 bg-white/90 p-4 shadow-sm">
            {query.trim().length === 0 ? (
              <p className="text-sm text-black/50">
                Digite ao menos um caractere para buscar seu nome.
              </p>
            ) : suggestions.length === 0 ? (
              <p className="text-sm text-black/50">Nenhum convidado encontrado.</p>
            ) : (
              suggestions.slice(0, 8).map((guest) => (
                <button
                  key={guest.id}
                  type="button"
                  onClick={() => handleSelect(guest)}
                  className="mb-3 block w-full rounded-3xl px-4 py-3 text-left transition hover:bg-black/5"
                >
                  <span className="font-medium text-black">{guest.name}</span>
                  <span className="ml-3 text-sm text-black/50">
                    {guest.confirmed ? "Confirmado" : "Não confirmado"}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>

        {selectedGuest && (
          <div className="mt-10 rounded-[2rem] bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
            <p className="text-sm uppercase tracking-[0.25em] text-black/40">
              Convidado selecionado
            </p>
            <h2 className="mt-4 text-4xl font-semibold text-black">
              {selectedGuest.name}
            </h2>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => handleSubmit(true)}
                disabled={isSaving}
                className="rounded-full bg-black px-8 py-4 text-lg font-semibold text-white transition hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Confirmar presença
              </button>
              <button
                type="button"
                onClick={() => handleSubmit(false)}
                disabled={isSaving}
                className="rounded-full border border-black px-8 py-4 text-lg font-semibold text-black transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Não comparecerei
              </button>
            </div>
          </div>
        )}

        {statusMessage && (
          <p className="mt-6 rounded-3xl bg-white/90 px-6 py-4 text-center text-base text-black/70 shadow-sm">
            {statusMessage}
          </p>
        )}
      </div>
    </div>
  );
}
