"use client";

import {useEffect, useState} from "react";
import IFavoriteStation from "@/types/IFavoriteStation";
import FavoriteStations from "./favorites/FavoriteStations";

export default function AccountFavorites() {
    const [stations, setStations] = useState<IFavoriteStation[]>();

    useEffect(() => {
        async function fetchHistory() {
            const response = await fetch("/api/list-favorite-stations");
            const data = await response.json();
            const stationsList: IFavoriteStation[] = data.data;
            setStations(stationsList);
        }

        fetchHistory();
    }, []);


    return (
        <>
            {stations ? (
                <FavoriteStations stationsList={stations}/>
            ) : (
                <p>Chargement des stations favorites...</p>
            )}
        </>
    );
}
