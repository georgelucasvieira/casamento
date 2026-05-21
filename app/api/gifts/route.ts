import { NextResponse } from "next/server";
import { updateGiftPurchased } from "@/lib/db";

export async function PATCH(request: Request) {
  const body = await request.json();

  if (!body || typeof body.id !== "number" || typeof body.purchased !== "boolean") {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  await updateGiftPurchased(body.id, body.purchased);
  return NextResponse.json({ success: true });
}
