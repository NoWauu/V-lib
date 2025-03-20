import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import IUserData from "@/types/IUserData";
import {saveUserSession} from "@/lib/saveUserData";
import {Station} from "@/types/Station";
import IFavoriteRes from "@/types/IFavoriteRes";
import LatLngLiteral = google.maps.LatLngLiteral;
import { toast } from "sonner";

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
      phone_number: responseData.data?.phone_number,
      is_email_verified: responseData.data?.is_email_verified,
    }

    await saveUserSession(responseData.data?.token_data.token, userData);
    return Response.json({ message: "success" }, { status: 200 });
  }

  // Send the response data back to the client
  return Response.json(responseData, { status : response.status });
}

async function fetch_stations(position: LatLngLiteral, radius: number): Promise<Station[]> {
  const response = await fetch("/api/get-surrounding-stations/", {
    method: "POST",
    cache: "force-cache",
    body: JSON.stringify({ "lat": position.lat, "long": position.lng, "radius": radius })
  });

  const data = await response.json();

  if (response.ok) {
    return data.stations;
  }
  else {
    toast.error("Une erreur est survenue lors de la récupération des stations.");
    return [];
  }
}

async function fetch_station_data(station_code: number) {
  const response = await fetch(`/api/get-station-data/?code=${station_code}`, {
    method: "GET",
    cache: "force-cache"
  });

  const data = await response.json();

  return Response.json(data);
}

async function is_station_favorite(station_code: number | undefined) {
  if (!station_code) {
    return false
  }

  const response = await fetch(`/api/is-station-favorite`, {
    method: "POST",
    cache: "force-cache",
    body: JSON.stringify({ station_code: station_code })
  });

  const data: IFavoriteRes = await response.json();

  if (data.is_favorite) {
    return true;
  }
  else {
    return false;
  }
}

export { cn, saveUserData, fetch_stations, fetch_station_data, is_station_favorite };
