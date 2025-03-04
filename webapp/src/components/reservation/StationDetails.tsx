import {InfoWindow} from "@vis.gl/react-google-maps";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Station} from "@/types/Station";
import {StationData} from "@/types/StationData";

export default function StationDetails({selectedStation, stationData, onClose}: {selectedStation: Station | null, stationData: StationData, onClose: (() => void)}) {

	return (
		<>
			{selectedStation && (
				<InfoWindow
					position={{ lat: selectedStation.latitude, lng: selectedStation.longitude }}
					onCloseClick={onClose}
				>
					<div>
						<h2 className={"text-lg"}>{selectedStation.name}</h2>
						<p className={"text-md"}>Capacité : {stationData.numDocksAvailable + stationData.numBikesAvailable}</p>
						<p className={"text-md"}>Nombre de vélos disponibles : {stationData.numBikesAvailable}</p>

						<div className={"flex justify-between"}>
							<Button>
								<Link href={`/reservation/${selectedStation.id_station}`}>Réserver</Link>
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
