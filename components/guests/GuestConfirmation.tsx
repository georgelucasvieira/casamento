"use client";

import { useMemo, useState } from "react";
import type { Guest } from "@/lib/db";

interface GuestConfirmationProps {
  initialGuests: Guest[];
}

export default function GuestConfirmation({ initialGuests }: GuestConfirmationProps) {
  const [query, setQuery] = useState("");
  const [guests, setGuests] = useState(initialGuests);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const suggestions = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    return guests.filter((guest) =>
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

      const updatedGuest = { ...selectedGuest, confirmed };

      setSelectedGuest(updatedGuest);

      setGuests((prev) =>
        prev.map((guest) =>
         guest.id === updatedGuest.id ? updatedGuest : guest
        )
      );
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
    <div className="rounded-[2.5rem] p-10 font-cormorant">
      <div className="max-w-3xl mx-auto">
        <div className="mt-10">
          <input
            value={query}
            onChange={(event) => {
              const val = event.target.value;
              setQuery(val);
              if (selectedGuest) setSelectedGuest(null);
              setStatusMessage(null);
            }}
            className="mt-4 w-full rounded-3xl sm:px-6 py-5 text-4xl sm:text-5xl outline-none caret-[#d29e41] text-center"
            placeholder="Digite seu nome"
          />

          <div className="mt-4 max-h-72 overflow-y-auto rounded-3xl p-4">
            {query.trim().length === 0 ? (
              <p className="text-xl text-black/50">
              </p>
            ) : suggestions.length === 0 ? (
              <p className="text-xl text-black/50 text-center">Convidado não encontrado.</p>
            ) : (
              suggestions.slice(0, 8).map((guest) => (
                <button
                  key={guest.id}
                  type="button"
                  onClick={() => handleSelect(guest)}
                  className="mx-auto mb-3 block w-full alg:w-6/10 rounded-3xl lg:px-4 lg:py-3 text-left text-2xl transition hover:bg-black/5 cursor-pointer"
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
            <p className="text-sm uppercase tracking-[0.25em] text-black/40 font-bold">
              Convidado
            </p>
            <h2 className="mt-4 text-4xl text-center font-semibold text-black">
              {selectedGuest.name}
            </h2>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => handleSubmit(true)}
                disabled={isSaving}
                className="rounded-full bg-black px-8 py-4 text-lg font-semibold text-white transition hover:bg-black/90 cursor-pointer"
              >
                Confirmar presença
              </button>
              <button
                type="button"
                onClick={() => handleSubmit(false)}
                disabled={isSaving}
                className="rounded-full border border-black px-8 py-4 text-lg font-semibold text-black transition hover:bg-black hover:text-white cursor-pointer"
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
