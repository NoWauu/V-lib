import {RentInfos} from "@/types/RentInfos";
import HistoryTableHeader from "@/components/account/history/HistoryTableHeader";
import HistoryTableDetail from "@/components/account/history/HistoryTableDetail";

export default function AccountHistoryTable({history}: { history: RentInfos[] }) {

	return (
		<>
			<h2 className="text-lg font-semibold p-4">Historique des réservations</h2>
			<table className={"w-full"}>
				<HistoryTableHeader/>
				<tbody>
				<HistoryTableDetail history={history}/>
				</tbody>
			</table>
		</>
	);
}
