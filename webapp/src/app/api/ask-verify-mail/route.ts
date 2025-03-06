import { NextRequest } from "next/server";
import { getSession } from "@/lib/session";
import IUserUpdateDataRes from "@/types/IUserUpdateDataRes";

async function handler (req: NextRequest) {
  const apiUrl = `http://${process.env.NEXT_PUBLIC_DJANGO_API_ROOT}/users/verify-email/`;

  const session = getSession();
  const token = (await session).token;
  if (!token) {
    return Response.json({ error: "Unauthorized: no token" }, { status: 401 });
  }

  const formData = new FormData();
  formData.append("user_token", token);

  try {
    // Sending a POST request to Django API
    const response = await fetch(apiUrl, {
      method: "POST",
      body: formData,
    });

    const resData: IUserUpdateDataRes = await response.json();

    if (response.ok){
      return Response.json({ success: "Email sent" });
    }
    else {
      return Response.json({ error: resData.message }, { status: response.status });
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    return Response.json({ error: "Error submitting form" }, { status: 500 });
  }
}

export {handler as GET};
