import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const TGSTAT_API_TOKEN = process.env.TGSTAT_API_TOKEN!;
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json(
      { error: "Missing query parameter ?q=" },
      { status: 400 }
    );
  }

  const url = `https://api.tgstat.ru/channels/search?token=${TGSTAT_API_TOKEN}&q=${encodeURIComponent(
    query
  )}&limit=10&country=ru`;

  const res = await fetch(url, {
    next: { tags: ["tgstat-search"] },
  });

  const data = await res.json();

  return NextResponse.json(data);
}
