import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const TGSTAT_API_TOKEN = process.env.TGSTAT_API_TOKEN!;
  const { searchParams } = new URL(req.url);
  const input = searchParams.get("q");

  if (!input) {
    return NextResponse.json({ error: "Missing query ?q=" }, { status: 400 });
  }

  const url = `https://api.tgstat.ru/channels/get?token=${TGSTAT_API_TOKEN}&channelId=${encodeURIComponent(
    input
  )}`;

  const res = await fetch(url, {
    next: { tags: ["tgstat-search-direct"] },
  });

  const data = await res.json();

  return NextResponse.json(data);
}
