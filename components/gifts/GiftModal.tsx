"use client";

import { useEffect, useState } from "react";
import type { Gift } from "@/lib/db";
import MercadoPagoBrick from "./MercadoPagoBrick";

interface GiftModalProps {
  gift: Gift | null;
  onClose: () => void;
  onPurchase?: (gift: Gift) => void;
}

export default function GiftModal({
  gift,
  onClose,
  onPurchase,
}: GiftModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<
    "pix" | "card" | null
  >(null);

  const [showPaymentDetails, setShowPaymentDetails] =
    useState(false);

  const [copyStatus, setCopyStatus] = useState<
    "idle" | "copied"
  >("idle");

  const [loadingPayment, setLoadingPayment] =
    useState(false);

  const [paymentConfirmed, setPaymentConfirmed] =
    useState(false);

  useEffect(() => {
    setSelectedMethod(null);
    setShowPaymentDetails(false);
    setCopyStatus("idle");
    setLoadingPayment(false);
    setPaymentConfirmed(false);
  }, [gift]);

  useEffect(() => {
    if (!gift) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [gift]);

  if (!gift) return null;

  const handleRealizarPagamento = () => {
    if (!selectedMethod) return;
    setShowPaymentDetails(true);
  };

  const handleCopyPix = async () => {
    if (!gift.pixCopyPaste) return;

    await navigator.clipboard.writeText(
      gift.pixCopyPaste
    );

    setCopyStatus("copied");

    window.setTimeout(() => {
      setCopyStatus("idle");
    }, 2000);
  };

  const handleConfirmPayment = async () => {
    if (!gift || gift.purchased) return;

    setLoadingPayment(true);

    try {
      const res = await fetch("/api/gifts", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: gift.id,
          purchased: true,
        }),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        const updatedGift = {
          ...gift,
          purchased: true,
        };

        onPurchase?.(updatedGift);
        setPaymentConfirmed(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingPayment(false);
    }
  };

  return (
    <div
      className="
        fixed inset-0 z-50
        bg-black/30
        p-6
        backdrop-blur-md
        overflow-y-auto
      "
      onClick={onClose}
    >
      <div className="flex min-h-full justify-center p-6 py-10">
        <div
          className="
            relative
            w-full max-w-6xl
            rounded-[2.5rem]
            bg-white
            shadow-2xl
            flex flex-col
          "
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full flex">
            {/* CONTENT */}
            <div
              className="
                flex flex-col justify-center
                pb-4 px-10 pt-16
                lg:px-20
              "
            >
              <h2
                className="
                  text-4xl uppercase
                  tracking-[0.15em]
                  text-black/90
                  font-cormorant
                "
              >
                {gift.title}
              </h2>

              <p
                className="
                  mt-6 sm:mt-12
                  font-cormorant
                  text-2xl sm:text-5xl
                  text-black/60
                "
              >
                Seu presente: {gift.price}
              </p>

              <div className="mt-5 sm:mt-10">
                <p className="mb-4 text-sm uppercase tracking-[0.2em] text-black/60">
                  Escolha o método de pagamento
                </p>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedMethod("pix")
                    }
                    className={`rounded-full border px-6 py-3 text-sm sm:text-base font-semibold transition ${selectedMethod === "pix"
                        ? "border-black bg-black text-white"
                        : "border-black/20 bg-white text-black hover:border-black"
                      }`}
                  >
                    PIX
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedMethod("card")
                    }
                    className={`rounded-full border px-6 py-3 text-sm sm:text-base font-semibold transition ${selectedMethod === "card"
                        ? "border-black bg-black text-white"
                        : "border-black/20 bg-white text-black hover:border-black"
                      }`}
                  >
                    Cartão / Boleto
                  </button>
                </div>
              </div>

              {selectedMethod === "pix" && (
                <div className="mt-5 sm:mt-10">
                  <button
                    type="button"
                    disabled={
                      !selectedMethod ||
                      gift.purchased
                    }
                    onClick={
                      handleRealizarPagamento
                    }
                    className="rounded-full border border-black/30 bg-black px-10 py-4 font-cormorant text-xl sm:text-3xl italic text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Realizar pagamento
                  </button>
                </div>
              )}

              {selectedMethod === "card" && (
                <div className="">
                  <MercadoPagoBrick
                    giftId={gift.id}
                    amount={Number(
                      gift.price
                        .replace("R$", "")
                        .replace(/\./g, "")
                        .replace(",", ".")
                        .trim()
                    )}
                  />
                </div>
              )}
            </div>

            {/* PIX DETAILS */}
            {showPaymentDetails && (
              <div className="w-full mx-auto max-w-100 p-6">
                <p className="text-sm text-center uppercase tracking-[0.2em] text-black/50">
                  QR Code
                </p>

                {gift.qrCodeImage ? (
                  <img
                    src={gift.qrCodeImage}
                    alt="QR Code PIX"
                    className="sm:mt-4 mx-auto w-full max-w-70 object-contain"
                  />
                ) : (
                  <p className="mt-4 text-sm text-center text-black/50">
                    QR code não fornecido para este presente.
                  </p>
                )}

                <div className="sm:mt-4 flex items-center justify-between">
                  <p className="text-sm w-full text-center uppercase tracking-[0.2em] text-black/50">
                    Pix Copia e Cola
                  </p>

                  <button
                    type="button"
                    onClick={handleCopyPix}
                    disabled={!gift.pixCopyPaste}
                    className="rounded-full border border-black/20 bg-white px-4 py-2 text-sm transition hover:border-black disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {copyStatus === "copied"
                      ? "Copiado"
                      : "Copiar"}
                  </button>
                </div>

                <pre className="sm:mt-4 whitespace-pre-wrap break-all rounded-3xl bg-white p-4 text-sm text-black/70">
                  {gift.pixCopyPaste ||
                    "Nenhum código Pix disponível."}
                </pre>

                <div className="sm:my-12 flex flex-col items-center gap-3">
                  <button
                    type="button"
                    onClick={
                      handleConfirmPayment
                    }
                    disabled={
                      gift.purchased ||
                      paymentConfirmed ||
                      loadingPayment
                    }
                    className="rounded-full bg-black px-8 py-4 text-white font-cormorant text-xl transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {paymentConfirmed
                      ? "Pagamento registrado"
                      : loadingPayment
                        ? "Registrando..."
                        : "Realizei o pagamento"}
                  </button>

                  <p className="text-sm text-black/60 text-justify w-[86%]">
                    Depois de finalizar o PIX,
                    clique em "Realizei o pagamento"
                    para registrar o presente.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* CLOSE */}
          <button
            onClick={onClose}
            className="
              absolute right-6 top-6
              text-3xl text-black/50
              transition-all
              hover:rotate-90
            "
          >
            ×
          </button>

          {gift.purchased &&
            !paymentConfirmed && (
              <p className="mt-8 text-sm font-semibold text-emerald-700">
                Este presente já foi marcado
                como pago.
              </p>
            )}
        </div>
      </div>
    </div>
  );
}