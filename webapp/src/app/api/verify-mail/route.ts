import { NextRequest } from "next/server";
import { getSession } from "@/lib/session";
import IUserUpdateDataRes from "@/types/IUserUpdateDataRes";

async function handler(req: NextRequest) {
  let apiUrl = `http://${process.env.NEXT_PUBLIC_DJANGO_API_ROOT}/users/verify-email/?email_token=`;

  let token: string;

  try {
    const body = await req.json();
    token = body.email_token;
  } catch {
    return Response.json({ error: "Invalid data" }, { status: 401 });
  }

  apiUrl += token;

  try {
    // Sending a POST request to Django API
    const response = await fetch(apiUrl, {
      method: "GET",
    });

    const resData: IUserUpdateDataRes = await response.json();

    if (response.ok) {
      const session = await getSession();
      if (session.userData) {
        session.userData.is_email_verified = true;
      }
      await session.save();
      return Response.json({ success: "Email verified" });
    } else {
      return Response.json(
        { error: resData.message },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    return Response.json({ error: "Error submitting form" }, { status: 500 });
  }
}

export { handler as POST };
