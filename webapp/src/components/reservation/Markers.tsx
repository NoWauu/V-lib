import {AdvancedMarker} from "@vis.gl/react-google-maps";
import {Station} from "@/types/Station";
import {MapPin} from "lucide-react";

export default function Markers({stations, openWindow}: {stations: Station[], openWindow: ((e: Station) => void)}) {
	return (
		<>
			{stations.map((station) => (
				<AdvancedMarker
					key={station.id_station}
					position={{ lat: station.latitude, lng: station.longitude }}
					title={station.name}
					clickable={true}
					onClick={() => openWindow(station)}
				>
					<MapPin />
				</AdvancedMarker>
			))}
		</>
	);
}