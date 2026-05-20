import { NextResponse } from "next/server";
import { updateGuestStatus } from "@/lib/db";

export async function PATCH(request: Request) {
  const body = await request.json();

  if (
    !body ||
    typeof body.id !== "number" ||
    typeof body.confirmed !== "boolean"
  ) {
    return NextResponse.json(
      { error: "Requisição inválida." },
      { status: 400 }
    );
  }

  await updateGuestStatus(body.id, body.confirmed);
  return NextResponse.json({ success: true });
}
