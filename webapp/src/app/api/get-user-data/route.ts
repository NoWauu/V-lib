import { getSession } from "@/lib/session";

export async function GET() {
  const session = await getSession();
  return Response.json({ userData: session?.userData }, { status: 200 });
}

export default GET;
