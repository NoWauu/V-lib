'use client';

import {APIProvider, Map} from '@vis.gl/react-google-maps';
import {useEffect, useState} from "react";
import {Station} from "@/types/Station";
import StationDetails from "@/components/reservation/StationDetails";
import Markers from "@/components/reservation/Markers";
import {fetch_station_data, fetch_stations} from "@/lib/utils";
import {StationData} from "@/types/StationData";
import LatLngLiteral = google.maps.LatLngLiteral;

export default function Reservation() {

	const [stations, setStations] = useState<Station[]>([]);
	const [selectedStation, setSelectedStation] = useState<Station | null>(null);
	const [stationData, setStationData] = useState<StationData | null>(null);
	const [location, setLocation] = useState<LatLngLiteral | null>(null);
	const radius = 3;


	useEffect(() => {
		if("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition((position) => {
				setLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
			});
		}
	}, []);

	useEffect(() => {
		if (!location) {
			return;
		}
		fetch_stations(location, radius).then((fetched) => setStations(fetched))
	}, [location, radius]);

	async function openWindow(station: Station) {
		const data = await fetch_station_data(station.station_code);
		const stationData = await data.json() as StationData;

		setStationData(stationData);
		setSelectedStation(station);

	}

	return (
		<div className={"w-full h-[calc(100vh-4rem)]"}>
			{!location
				? <p className={"flex justify-center items-center w-full h-[calc(100vh-4rem)]"}>Activez votre localisation pour utiliser nos services !</p>
				:
					<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string} libraries={['marker']}>
						<Map
							mapId={'bf51a910020fa25a'}
							defaultZoom={15}
							minZoom={14}
							maxZoom={20}
							defaultCenter={{lat: location.lat as number, lng: location.lng as number}}
							gestureHandling={'passive'}
							disableDefaultUI={true}
							onCameraChanged={(e) => {
								setLocation(e.detail.center);
								}}
							reuseMaps={true}
						>

							<Markers stations={stations} openWindow={openWindow}/>
							<StationDetails
								selectedStation={selectedStation}
								stationData={stationData as StationData}
								onClose={() => setSelectedStation(null)}
							/>

						</Map>
					</APIProvider>

			}
		</div>
	);
}
