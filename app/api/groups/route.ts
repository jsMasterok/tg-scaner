// app/api/groups/route.ts
import { NextResponse } from "next/server";

const TGSTAT_API_TOKEN = process.env.TGSTAT_API_TOKEN!;
const TGSTAT_API_URL = `https://api.tgstat.ru/channels/search?token=${TGSTAT_API_TOKEN}&q=чат&limit=6&country=ru`;

export async function GET() {
  const res = await fetch(TGSTAT_API_URL, {
    next: { tags: ["tgstat"] },
  });

  const data = await res.json();
  return NextResponse.json(data);
}
