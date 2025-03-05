import { getSession } from "@/lib/session";

const apiUrl = `http://${process.env.NEXT_PUBLIC_DJANGO_API_ROOT}/users/delete/`;

async function handler(): Promise<Response> {
  const session = await getSession();
  const token = session?.token;

  if (!token)
    return Response.json({ error: "Unauthorized: no token" }, { status: 401 });

  const formData = new FormData();
  formData.append("token", token);

  try {
    const response = await fetch(apiUrl, {
      body: formData,
      method: "POST",
    })

    if (response.ok)
    {
      session.destroy();
    }
    else {
      return Response.json({ error: "Error when deleting user" }, { status: 500 });
    }
  } catch {
    return Response.json({ error: "Error when fetching the django server" }, { status: 500 });
  }

  return Response.json({ success: "User deleted" }, { status: 200 });
}

export { handler as DELETE };
