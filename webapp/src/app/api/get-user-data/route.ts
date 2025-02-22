import { getServerActionSession } from "@/lib/session";

export async function GET() {
  const session = await getServerActionSession();
  return Response.json({ userData: session?.userData }, { status: 200 });
}

export default GET;
