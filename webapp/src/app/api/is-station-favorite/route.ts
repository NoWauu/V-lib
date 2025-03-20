import { NextRequest } from "next/server";
import { getSession } from "@/lib/session";

async function handler(req: NextRequest): Promise<Response> {
  const apiUrl = `http://${process.env.NEXT_PUBLIC_DJANGO_API_ROOT}/stations/is-favorite/`;

  try {
    const body = await req.json();
    const station_code = body.station_code;

    const session = await getSession();
    const token = session?.token;

    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = new FormData();
    formData.append("token", token);
    formData.append("station_code", station_code);

    const response = await fetch(apiUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      return Response.json({
        error: "Error fetching data",
        status: response.status,
      }, { status: response.status });
    }

    const data = await response.json();

    return Response.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return Response.json({ error: "Error fetching data" }, { status: 500 });
  }
}

export { handler as POST };
