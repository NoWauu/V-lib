import { NextRequest } from "next/server";

export async function POST (req: NextRequest) {
  const apiUrl = `http://${process.env.NEXT_PUBLIC_DJANGO_API_ROOT}/users/login/`;

  let email: string;
  let password: string;

  try {
    console.log(req);
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

    // Parse the response from Django API
    const responseData = await response.json();

    // Send the response data back to the client
    return Response.json(responseData);
  } catch (error) {
    console.error("Error submitting form:", error);
    return Response.json({ error: "Error submitting form" }, { status: 500 });
  }
}

export default POST;
