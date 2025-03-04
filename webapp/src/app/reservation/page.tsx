'use client';

import {APIProvider, Map} from '@vis.gl/react-google-maps';
import {useEffect, useState} from "react";
import {Station} from "@/types/Station";
import StationDetails from "@/components/reservation/StationDetails";
import Markers from "@/components/reservation/Markers";
import {fetch_stations} from "@/lib/utils";

export default function Test() {

	const position = {
		lat: 48.8566,
		lng: 2.3522
	};

	const [stations, setStations] = useState<Station[]>([]);
	const [selectedStation, setSelectedStation] = useState<Station | null>(null);

	useEffect(() => {
		fetch_stations(position, 4).then((fetched) => setStations(fetched))
	}, []);

	function openWindow(station: Station): void {
		setSelectedStation(station);
	}

	return (
		<div className={"w-full h-[calc(100vh-4rem)]"}>
			<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string} libraries={['marker']}>
				<Map
					mapId={'bf51a910020fa25a'}
					defaultZoom={15}
					minZoom={14}
					maxZoom={20}
					defaultCenter={position}
					gestureHandling={'greedy'}
					disableDefaultUI={true}
				>

					<Markers stations={stations} openWindow={openWindow} />
					<StationDetails selectedStation={selectedStation} onClose={() => setSelectedStation(null)} />

				</Map>
			</APIProvider>
		</div>
	);
}