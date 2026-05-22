import { NextResponse } from "next/server";
import { createQrCode } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json();
  const { qrCodeImageUrl, pixPasteCopy } = body || {};

  if (typeof qrCodeImageUrl !== "string" && typeof pixPasteCopy !== "string") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  try {
    const id = await createQrCode(qrCodeImageUrl, pixPasteCopy);
    return NextResponse.json({ id });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
