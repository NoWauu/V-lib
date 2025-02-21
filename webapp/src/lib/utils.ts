import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {responseData} from "@/types/AuthRes";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

async function registerToken(fromData: responseData): Promise<void>{
  if(!fromData.data) {
    return;
  }

  const tokenValue = fromData.data.token_data.token;
  sessionStorage.setItem('token', tokenValue);
}

export { cn, registerToken };

