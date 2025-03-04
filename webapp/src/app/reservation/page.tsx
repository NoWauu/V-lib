'use client';

import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import {useEffect, useState} from "react";
import {Station} from "@/types/Station";

export default function Test() {

	const position = {
		lat: 48.8566,
		lng: 2.3522
	};


	async function fetch_stations(): Promise<Station[]> {
		const response = await fetch("/api/get-surrounding-stations/", {
			method: "POST",
			cache: "no-store",
			body: JSON.stringify({ "lat": position.lat, "long": position.lng, "radius": 2 })
		});
		const data = await response.json();
		return data.stations;
	}

	const [stations, setStations] = useState<Station[]>([]);

	useEffect(() => {
		fetch_stations().then((fetched) => setStations(fetched))
	}, [fetch_stations]);


	return (
		<div className={"w-full h-[calc(100vh-4rem)]"}>
			<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
				<Map
					mapId={'bf51a910020fa25a'}
					defaultZoom={13}
					defaultCenter={position}
					gestureHandling={'greedy'}
					disableDefaultUI={true}
				>

					{stations.map((station) => (
						<Marker
							key={station.id_station}
							position={{ lat: station.latitude, lng: station.longitude }}
							label={station.capacity.toString()}
							title={station.name}
							optimized={true}
							clickable={true}
							icon={"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLW1hcC1waW4iPjxwYXRoIGQ9Ik0yMCAxMGMwIDQuOTkzLTUuNTM5IDEwLjE5My03LjM5OSAxMS43OTlhMSAxIDAgMCAxLTEuMjAyIDBDOS41MzkgMjAuMTkzIDQgMTQuOTkzIDQgMTBhOCA4IDAgMCAxIDE2IDAiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEwIiByPSIzIi8+PC9zdmc+"}

						/>
					))}
				</Map>
			</APIProvider>
		</div>
	);
}