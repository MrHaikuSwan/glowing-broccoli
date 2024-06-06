export const dynamic = "force-dynamic"; // defaults to auto

// TODO: Is there really no way to do this with server actions? Research
export async function GET(request: Request) {
  return Response.json({ message: "hello" });
}
