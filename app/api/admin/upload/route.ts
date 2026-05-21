import { NextResponse } from "next/server";
import { uploadBase64 } from "@/lib/cloudinary";

export async function POST(request: Request) {
  const body = await request.json();
  if (!body?.data) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  try {
    const url = await uploadBase64(body.data, body.folder || "casamento");
    return NextResponse.json({ url });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
