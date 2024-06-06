import { MercoaClient } from "@mercoa/javascript";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

const mercoa = new MercoaClient({
  token: process.env.API_KEY!,
});

export async function GET(request: NextRequest) {
  const entId = request.nextUrl.searchParams.get("entId")!;
  const userId = request.nextUrl.searchParams.get("userId");

  const token =
    userId === undefined
      ? await mercoa.entity.getToken(entId, {
          expiresIn: "1h",
          pages: { paymentMethods: true },
        })
      : await mercoa.entity.user.getToken(entId, userId!, {
          expiresIn: "1h",
          pages: { paymentMethods: true },
        });

  return Response.json({
    token,
  });
}
