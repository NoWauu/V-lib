import {NextRequest} from "next/server";

async function handler(req: NextRequest) : Promise<Response> {
	const apiUrl = `http://${process.env.NEXT_PUBLIC_DJANGO_API_ROOT}/stations/get-station-data/`;

	try {
		// get the station_code from the GET request
		const station_code = req.nextUrl.searchParams.get("code");

		const url = `${apiUrl}?code=${station_code}`;

		const response = await fetch(url, {
			method: "GET",
		});

		if (!response.ok) {
			return Response.json({ error: "Error fetching data", status: response.status });
		}

		const data = await response.json();

		return Response.json(data, { status: 200 });

	} catch (error) {
		console.error("Error fetching data:", error);
		return Response.json({ error: "Error fetching data", status: 500 });
	}
}

export { handler as GET };