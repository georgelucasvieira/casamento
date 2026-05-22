import { NextResponse } from "next/server";
import { createGift } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, price, image } = body || {};
  if (!name || typeof price !== "number") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  try {
    const id = await createGift(name, price, image);
    return NextResponse.json({ id });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
