import { NextRequest } from "next/server";
import { saveUserData } from "@/lib/utils";
import { responseData } from "@/types/AuthRes";

async function handler (req: NextRequest) {
  const apiUrl = `http://${process.env.NEXT_PUBLIC_DJANGO_API_ROOT}/users/login/`;

  let email: string;
  let password: string;

  try {
    const body = await req.json();
    email = body.email;
    password = body.password;
  } catch {
    return Response.json({ error: "Invalid data" }, { status: 401 });
  }

  for (const field of [email, password]) {
    if (!field) {
      return Response.json({ error: "Missing field " + field}, { status: 401 });
    }
  }

  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  try {
    // Sending a POST request to Django API
    const response = await fetch(apiUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const resData: responseData = await response.json();
      return Response.json(resData, { status: response.status });
    }

    return await saveUserData(response);

  } catch (error) {
    console.error("Error submitting form:", error);
    return Response.json({ error: "Error submitting form" }, { status: 500 });
  }
}

export {handler as POST};
