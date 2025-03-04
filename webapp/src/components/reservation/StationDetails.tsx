import {InfoWindow} from "@vis.gl/react-google-maps";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Station} from "@/types/Station";

export default function StationDetails({selectedStation, onClose}: {selectedStation: Station | null, onClose: (() => void)}) {

	return (
		<>
			{selectedStation && (
				<InfoWindow
					position={{ lat: selectedStation.latitude, lng: selectedStation.longitude }}
					onCloseClick={onClose}
				>
					<div>
						<h2 className={"text-lg"}>{selectedStation.name}</h2>
						<p>Capacité : {selectedStation.capacity}</p>

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