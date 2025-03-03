import { getSession } from "@/lib/session";

async function handler(): Promise<Response> {
  const session = await getSession();
  await session.destroy();

  return Response.json({"status": "success", "message": "User logged out."}, { status: 200 });
}

export {handler as GET};
