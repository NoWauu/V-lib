"use client";

import {InfoWindow} from "@vis.gl/react-google-maps";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Station} from "@/types/Station";
import {StationData} from "@/types/StationData";
import {toast} from "sonner";
import { getSession } from "@/lib/session";

export default function StationDetails({selectedStation, stationData, onClose}: {selectedStation: Station | null, stationData: StationData, onClose: (() => void)}) {

	async function reserve(station: Station) {
		const session = await getSession();
		const token = session.token;
		console.log("token: " + token);

		const result = await fetch("/api/reserve/", {
			method: "POST",
			body: JSON.stringify({
				"token": token,
				"id_station": station.id_station
			})
		});

		if(result.ok) {
			toast.success("Réservation enregistrée !");
		} else {
			toast.error("Une erreur est survenue durant l'enregistrement");
		}
	}

	return (
		<>
			{selectedStation && (
				<InfoWindow
					position={{ lat: selectedStation.latitude, lng: selectedStation.longitude }}
					onCloseClick={onClose}
					headerContent={<span className={"underline font-semibold"}>{selectedStation.name}</span>}
				>
					<div>
						<div className={"text-md"}>
							<p>Capacité : {stationData.numDocksAvailable + stationData.numBikesAvailable}</p>
							<p>Vélos disponibles : {stationData.numBikesAvailable}</p>
						</div>

						<div className={"flex justify-between mt-3 gap-5"}>
							<Button onClick={() => {
								reserve(selectedStation);
							}}>
								Réserver
							</Button>

							<Button>
								<Link target={"_blank"} href={`https://www.google.com/maps/dir/?api=1&destination=${selectedStation.latitude},${selectedStation.longitude}`}>Y aller</Link>
							</Button>
						</div>
					</div>
				</InfoWindow>
			)}
		</>
	);
}
