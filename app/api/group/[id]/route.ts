import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const TGSTAT_API_TOKEN = process.env.TGSTAT_API_TOKEN!;
  const id = params.id;

  const res = await fetch(
    `https://api.tgstat.ru/channels/get?token=${TGSTAT_API_TOKEN}&channelId=${id}`,
    {
      next: { tags: ["tgstat-group-details"] },
    }
  );

  const data = await res.json();

  return NextResponse.json(data);
}
