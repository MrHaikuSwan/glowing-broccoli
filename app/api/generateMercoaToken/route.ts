import { MercoaClient } from "@mercoa/javascript";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

const mercoa = new MercoaClient({
  token: process.env.API_KEY!,
});

export async function GET(request: NextRequest) {
  const token = await mercoa.entity.getToken(
    request.nextUrl.searchParams.get("entId")!,
    { expiresIn: "1h" }
  );

  return Response.json({
    token,
  });
}
