"use client";

import { fetch_station_data } from "@/lib/utils";
import IFavoriteStation from "@/types/IFavoriteStation";
import { StationData } from "@/types/StationData";
import { Bike, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getSessionData } from "@/lib/session";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function StationDetails({
  stationDetails,
}: {
  stationDetails: IFavoriteStation;
}) {
  const [stationData, setStationData] = useState<StationData | null>(null);

  async function reserve(id_station: number | string) {
    const result = await fetch("/api/reserve/", {
      method: "POST",
      body: JSON.stringify({
        id_station: id_station,
      }),
    });

    if (result.ok) {
      toast.success("Réservation enregistrée !");
    } else {
      toast.error("Une erreur est survenue durant l'enregistrement. Avez-vous bien vérifié votre adresse email ?");
    }
  }

  useEffect(() => {
    async function fetchStationData() {
      const data = await fetch_station_data(
        parseInt(stationDetails.station_code)
      );
      const stationData = (await data.json()) as StationData;
      setStationData(stationData);
    }

    fetchStationData();
  }, []);

  return (
    <div className="mt-2 py-2 px-6 flex flex-col md:flex-row gap-4 items-center justify-between w-full rounded-lg border-gray-100 border-[1px] shadow-md">
      <p className="flex items-center gap-4 w-full mt-2 md:mt-0">
        <Bike />
        <span>{stationDetails.name}</span>
      </p>

      <p className="w-full md:text-center mt-2">
        Capacité / Vélos disponibles :{" "}
        <br className="block md:hidden" />
        <span>
          {(stationData?.numDocksAvailable ?? 0) +
            (stationData?.numBikesAvailable ?? 0) || ""} {" "}
          / {stationData?.numBikesAvailable}
        </span>
      </p>

      <div className="w-full flex items-center justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-md md:hover:bg-gray-200 ps-3 p-2 bg-primary md:bg-transparent text-background md:text-primary mb-2 md:mb-0">
            <span>Actions</span>
            <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => reserve(stationDetails.id_station)}>Réserver</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/dir/?api=1&destination=${stationDetails.latitude},${stationDetails.longitude}`,
                  "_blank"
                )
              }
            >
              Y aller
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
