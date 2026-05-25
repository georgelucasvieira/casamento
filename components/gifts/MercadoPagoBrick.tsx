"use client";

import {
  initMercadoPago,
  Payment,
} from "@mercadopago/sdk-react";

initMercadoPago(
  process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!,
  {
    locale: "pt-BR",
  }
);

interface Props {
  amount: number;
  giftId: number;
}

export default function MercadoPagoBrick({
  amount,
  giftId,
}: Props) {
  return (
    <div className="w-full max-w-140">
      <Payment
        initialization={{
          amount,
        }}
        customization={{
          paymentMethods: {
            creditCard: "all",
            debitCard: "all",
            ticket: "all",
          },
        }}
        locale="pt-BR"
        onSubmit={async ({ formData }) => {
          const res = await fetch(
            "/api/mercadopago",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                formData,
                amount,
                giftId,
              }),
            }
          );

          const data = await res.json();

          console.log(data);

          return data;
        }}
        onReady={() => {
          console.log("Brick pronto");
        }}
        onError={(error) => {
          // erros de validação do brick
          // normalmente acontecem enquanto o usuário digita

          if (
            error?.type === "non_critical"
          ) {
            return;
          }

          console.warn(
            "Mercado Pago Brick:",
            error
          );
        }}
      />
    </div>
  );
}