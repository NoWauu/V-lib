"use client";

import { type Station } from "@/types/Station";
import { type StationData } from "@/types/StationData";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { InfoWindow } from "@vis.gl/react-google-maps";
import { StarOff, Star } from "lucide-react";
import { useEffect, useState } from "react";

import { is_station_favorite } from "@/lib/utils";

export default function StationDetails({
  selectedStation,
  stationData,
  onClose,
}: {
  selectedStation: Station | null;
  stationData: StationData;
  onClose: () => void;
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    async function fetchFavorite() {
      setIsFavorite(await is_station_favorite(selectedStation?.station_code));
    }

    fetchFavorite();
  }, [selectedStation])

  async function setFavorite(station: Station) {
    try {
      const res = await fetch("/api/station-favorite/", {
        method: "POST",
        body: JSON.stringify({ station_id: station.id_station }),
      });

      if (res.ok && selectedStation) {
        setIsFavorite(!isFavorite);
      }
      else {
        toast.error("Une erreur est survenue lors de l'ajout aux favoris");
      }
    }
    catch {
      toast.error("Une erreur est survenue lors de l'ajout aux favoris");
    }
  }

  async function reserve(station: Station) {
    const result = await fetch("/api/reserve/", {
      method: "POST",
      body: JSON.stringify({
        id_station: station.id_station,
      }),
    });

    if (result.ok) {
      toast.success("Réservation enregistrée !");
    } else {
      toast.error("Une erreur est survenue durant l'enregistrement. Avez-vous bien vérifié votre adresse email ?");
    }
  }

  return (
    <>
      {selectedStation && (
        <InfoWindow
          position={{
            lat: selectedStation.latitude,
            lng: selectedStation.longitude,
          }}
          onCloseClick={onClose}
          headerContent={
            <span
              className={"font-semibold flex items-center justify-center gap-2"}
            >
              <button onClick={() => setFavorite(selectedStation)}>
                {isFavorite ? (
                  <Star className="size-5 text-amber-500" />
                ) : (
                  <StarOff className="size-5" />
                )}
              </button>
              {selectedStation.name}
            </span>
          }
        >
          <div>
            <div className={"text-md"}>
              <p>
                Capacité :{" "}
                {stationData.numDocksAvailable + stationData.numBikesAvailable}
              </p>
              <p>Vélos disponibles : {stationData.numBikesAvailable}</p>
            </div>

            <div className={"flex justify-between mt-3 gap-5"}>
              <Button
                onClick={() => {
                  reserve(selectedStation);
                }}
              >
                Réserver
              </Button>

              <Button>
                <Link
                  target={"_blank"}
                  href={`https://www.google.com/maps/dir/?api=1&destination=${selectedStation.latitude},${selectedStation.longitude}`}
                >
                  Y aller
                </Link>
              </Button>
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
}
