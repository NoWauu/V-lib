"use client";

import {useEffect, useState} from "react";
import {RentInfos} from "@/types/RentInfos";
import AccountHistoryTable from "@/components/account/history/AccountHistoryTable";

export default function AccountHistory() {

	const [history, setHistory] = useState<RentInfos[]>();

	useEffect(() => {
		async function fetchHistory() {
			const response = await fetch("/api/get-user-history");
			const data = await response.json();
			const history: RentInfos[] = data.data;
			setHistory(history);
		}

		fetchHistory();
	}, []);


	return (
		<>
			{history ? (
				<AccountHistoryTable history={history}/>
			) : (
				<p>Chargement de l&#39;historique...</p>
			)}
		</>
	);
}
