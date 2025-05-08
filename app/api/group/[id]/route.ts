import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const TGSTAT_API_TOKEN = process.env.TGSTAT_API_TOKEN!;
  const res = await fetch(
    `https://api.tgstat.ru/channels/get?token=${TGSTAT_API_TOKEN}&channelId=${id}`,
    {
      next: { tags: ["tgstat-group-details"] },
    }
  );

  const data = await res.json();
  return NextResponse.json(data);
}
