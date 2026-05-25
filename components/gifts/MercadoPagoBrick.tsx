// components/payments/MercadoPagoBrick.tsx
"use client";

import {
  initMercadoPago,
  Payment,
} from "@mercadopago/sdk-react";

initMercadoPago(
  process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!
);

interface Props {
  amount: number;
}

export default function MercadoPagoBrick({
  amount,
}: Props) {
  return (
    <div className="mt-8">
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
        onSubmit={async ({ formData }) => {
          console.log(formData);

          // sem backend
          // sem webhook
          // apenas simula sucesso

          alert(
            "Pagamento enviado ao Mercado Pago."
          );

          return new Promise((resolve) => {
            setTimeout(resolve, 1000);
          });
        }}
        onReady={() => {
          console.log("Brick ready");
        }}
        onError={(error) => {
          console.error(error);
        }}
      />
    </div>
  );
}