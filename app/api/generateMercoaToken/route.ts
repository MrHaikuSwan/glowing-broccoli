import { MercoaClient } from "@mercoa/javascript";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

const mercoa = new MercoaClient({
  token: process.env.API_KEY!,
});

export async function GET(request: NextRequest) {
  const entId = request.nextUrl.searchParams.get("entId")!;
  const userId = request.nextUrl.searchParams.get("userId");

  const options = {
    expiresIn: "1h",
    entity: { enableMercoaPayments: true },
    pages: { paymentMethods: true, representatives: true, notifications: true },
  };

  const token =
    userId === undefined
      ? await mercoa.entity.getToken(entId, options)
      : await mercoa.entity.user.getToken(entId, userId!, options);

  return Response.json({
    token,
  });
}
