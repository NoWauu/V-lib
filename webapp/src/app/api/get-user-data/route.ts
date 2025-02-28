import { getSession } from "@/lib/session";

async function handler(): Promise<Response> {
  const session = await getSession();
  return Response.json({ userData: session?.userData }, { status: 200 });
}

export {handler as GET};
