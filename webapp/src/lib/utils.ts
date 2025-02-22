import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import IUserData from "@/types/IUserData";
import saveUserSession from "@/lib/saveUserData";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

async function saveUserData(response: Response) {
  const responseData = await response.json();
  if(response.ok && responseData.data) {
    const userData: IUserData = {
      email: responseData.data?.email,
      first_name: responseData.data?.first_name,
      last_name: responseData.data?.last_name,
      phone_number: responseData.data?.phone_number
    }

    await saveUserSession(responseData.data?.token_data.token, userData);
    return Response.json({ message: "success" }, { status: 200 });
  }

  // Send the response data back to the client
  return Response.json(responseData, { status : response.status });
}


export { cn, saveUserData };

