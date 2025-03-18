export default function HistoryTableHeader() {
	return (
		<thead>
		<tr className="underline underline-offset-4 text-sm md:text-base">
			<th className="p-2">Nom de la station</th>
			<th className="p-2">Début de la réservation</th>
			<th className="p-2">Fin de la réservation</th>
			<th className="p-2">Statut</th>
		</tr>
		</thead>
	);
}