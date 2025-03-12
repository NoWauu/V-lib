import {RentInfos} from "@/types/RentInfos";
import {format, isPast, parseISO} from "date-fns";
import {Badge} from "@/components/ui/badge";

export default function HistoryTableDetail({history}: { history: RentInfos[] }) {

	function formatDate(dateString: string) {
		return format(parseISO(dateString), 'd/M/u - H:mm')
	}

	return (
		<>
			{history.map((rent: RentInfos, index: number) => (
				<tr key={index}>
					<td className={"text-center "}>{rent.station_name}</td>
					<td className={"text-center "}>{formatDate(rent.start_time)}</td>
					<td className={"text-center "}>{formatDate(rent.end_time)}</td>
					<td className={"text-center "}>
						{isPast(rent.end_time) ? <Badge className="bg-red-600 m-2">Expiré</Badge> :
							<Badge className="m-2">En cours</Badge>}
					</td>
				</tr>

			))}
		</>
	);

}
