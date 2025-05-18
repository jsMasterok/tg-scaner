import { NextRequest, NextResponse } from "next/server";
import { searchFakeGroups } from "../../utils/searchFakeData";

export async function GET(req: NextRequest) {
  const TGSTAT_API_TOKEN = process.env.TGSTAT_API_TOKEN!;
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query || query.trim().length < 3) {
    return NextResponse.json(
      { error: "Missing or too short query (?query=...)" },
      { status: 400 }
    );
  }

  // 1. Поиск по фейковым группам
  const fakeResults = searchFakeGroups(query);
  if (fakeResults.length > 0) {
    return NextResponse.json({
      data: fakeResults,
    });
  }

  // 2. Поиск через TGStat API
  const url = `https://api.tgstat.ru/channels/search?token=${TGSTAT_API_TOKEN}&q=${encodeURIComponent(
    query
  )}&search_by_description=1&peer_type=all&country=ru&limit=5`;

  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();

  return NextResponse.json({
    data: data.response.items,
  });
}
