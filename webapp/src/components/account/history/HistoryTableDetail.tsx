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
				<tr key={index} className="text-sm md:text-base">
					<td className="text-center p-2 whitespace-nowrap">{rent.station_name}</td>
					<td className="text-center p-2 whitespace-nowrap">{formatDate(rent.start_time)}</td>
					<td className="text-center p-2 whitespace-nowrap">{formatDate(rent.end_time)}</td>
					<td className="text-center p-2">
						{isPast(rent.end_time) ? (
							<Badge className="bg-red-600 m-2">Expiré</Badge>
						) : (
							<Badge className="m-2">En cours</Badge>
						)}
					</td>
				</tr>
			))}
		</>
	);
}