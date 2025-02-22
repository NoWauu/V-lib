import { NextRequest } from "next/server";
import {saveUserData} from "@/lib/utils";

export async function POST (req: NextRequest) {
  const apiUrl = `http://${process.env.NEXT_PUBLIC_DJANGO_API_ROOT}/users/register/`;

  let email: string;
  let password: string;
  let firstname: string;
  let lastname: string;
  let phone_number: string;

  try {
    const body = await req.json();
    email = body.email;
    password = body.password;
    firstname = body.first_name;
    lastname = body.last_name;
    phone_number = body.phone_number;
  } catch (error) {
    console.log("Error parsing request body:", error);
    return Response.json({ error: "Invalid data" }, { status: 401 });
  }

  for (const field of [email, password, firstname, lastname, phone_number]) {
    if (!field) {
      return Response.json({ error: "Missing field " + field}, { status: 401 });
    }
  }

  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  formData.append("first_name", firstname);
  formData.append("last_name", lastname);
  formData.append("phone_number", phone_number);

  try {
    // Sending a POST request to Django API
    const response = await fetch(apiUrl, {
      method: "POST",
      body: formData,
    });

    return await saveUserData(response);

  } catch (error) {
    console.error("Error submitting form:", error);
    return Response.json({ error: "Error submitting form" }, { status: 500 });
  }
}

export default POST;
