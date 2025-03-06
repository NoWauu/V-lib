import { NextRequest } from "next/server";
import { updateUserSession } from "@/lib/saveUserData";
import { responseData } from "@/types/AuthRes";
import { getSession } from "@/lib/session";
import IUserUpdateDataRes from "@/types/IUserUpdateDataRes";

async function handler (req: NextRequest) {
  const apiUrl = `http://${process.env.NEXT_PUBLIC_DJANGO_API_ROOT}/users/update/`;

  let field: string;
  let newValue: string;

  try {
    const body = await req.json();
    field = body.field;
    newValue = body.newValue;
  } catch {
    return Response.json({ error: "Invalid data" }, { status: 401 });
  }

  for (const fieldValue of [field, newValue]) {
    if (!fieldValue) {
      return Response.json({ error: "Missing field."}, { status: 401 });
    }
  }

  const session = await getSession();
  const token = session?.token;
  if (!token) {
    return Response.json({ error: "Unauthorized: no token" }, { status: 401 });
  }

  const formData = new FormData();
  formData.append("field", field);
  formData.append("new_value", newValue);
  formData.append("token", token);

  try {
    // Sending a POST request to Django API
    const response = await fetch(apiUrl, {
      method: "POST",
      body: formData,
    });

    const resData: IUserUpdateDataRes = await response.json();

    if (!response.ok || !resData.data) {
      
      return Response.json(resData, { status: response.status });
    }

    await updateUserSession(resData.data)

    return Response.json({ success: "User updated." });
  } catch (error) {
    console.error("Error submitting form:", error);
    return Response.json({ error: "Error submitting form" }, { status: 500 });
  }
}

export {handler as POST};
