"use client";

import {useState} from "react";
import {Station} from "@/types/Station";
import SearchResults from "@/components/reservation/recherche/SearchResults";

export default function SearchBar({openWindow}: { openWindow: ((e: Station) => void) }) {
	const [stations, setStations] = useState<Station[]>([]);

	async function getStationsByRegex(event: React.ChangeEvent<HTMLInputElement>) {

		const search = event.target.value;

		if (search === "") {
			setStations([]);
			return;
		}

		const response = await fetch(`/api/search/`, {
			method: "POST",
			body: JSON.stringify({query: search}),
		});

		if (response.ok) {
			const data = await response.json();
			setStations(data);
		}
	}

	return (
		<div className="absolute left-1/2 transform -translate-x-1/2 top-20 flex flex-col">
			<input
				placeholder="Rechercher une station"
				type="text"
				className="border rounded-md p-2"
				onChange={getStationsByRegex}
			/>

			<SearchResults stations={stations} openWindow={openWindow}/>
		</div>
	);
}
