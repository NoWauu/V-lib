import {RentInfos} from "@/types/RentInfos";
import HistoryTableHeader from "@/components/account/history/HistoryTableHeader";
import HistoryTableDetail from "@/components/account/history/HistoryTableDetail";

export default function AccountHistoryTable({history}: { history: RentInfos[] }) {

	return (
		<>
			<h2 className="text-lg font-semibold p-4">Historique des réservations</h2>
			{history.length ? (
				<div className="overflow-x-auto">
					<table className="w-full min-w-[600px]">
						<HistoryTableHeader />
						<tbody>
						<HistoryTableDetail history={history} />
						</tbody>
					</table>
				</div>
			) : (
				<p>Aucune réservation pour le moment</p>
			)}
		</>
	);
}