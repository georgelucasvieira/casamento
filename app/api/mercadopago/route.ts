import { NextRequest, NextResponse } from "next/server";

import {
  MercadoPagoConfig,
  Payment,
} from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken:
    process.env.MP_ACCESS_TOKEN!,
});

export async function POST(
  req: NextRequest
) {
  try {
    const body = await req.json();

    const {
      formData,
      amount,
    } = body;

    const payment = new Payment(client);

    const result = await payment.create({
      body: {
        transaction_amount: Number(amount),

        token: formData.token,

        description:
          "Presente de casamento",

        installments: Number(
          formData.installments
        ),

        payment_method_id:
          formData.payment_method_id,

        issuer_id: formData.issuer_id,

        payer: {
          email: formData.payer.email,
        },
      },
    });

    return NextResponse.json({
      id: result.id,
      status: result.status,
      status_detail:
        result.status_detail,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Erro ao processar pagamento",
      },
      {
        status: 500,
      }
    );
  }
}