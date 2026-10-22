import { NextResponse } from "next/server";
import { replyToMessage } from "@/features/chat/chatService";

export async function POST(request: Request) {
  const body = (await request.json()) as { message?: unknown };
  if (typeof body.message !== "string") return NextResponse.json({ error: "El mensaje es obligatorio." }, { status: 400 });
  return NextResponse.json({ ...replyToMessage(body.message), simulated: true });
}

