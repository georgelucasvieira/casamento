import { NextResponse } from "next/server";
import { getHeroSlots, updateHeroSlot } from "@/lib/db";

export async function GET() {
  try {
    const slots = await getHeroSlots();
    return NextResponse.json({ slots });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const { slot, position, image } = body || {};
  if (!slot || typeof position !== "number") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  try {
    await updateHeroSlot(slot, position, image);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
