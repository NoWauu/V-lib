import {Station} from "@/types/Station";

export default function SearchResults({stations, openWindow}: {
	stations: Station[],
	openWindow: ((e: Station) => void)
}) {
	return (
		<>
			{stations.length
				? stations.map((station) => (
					<div className={"bg-white"} key={station.id_station}>
						<p className={"border hover:cursor-pointer hover:bg-gray-200"}
						   onClick={() => openWindow(station)}>{station.name}</p>
					</div>
				))
				: <></>
			}
		</>
	);
}