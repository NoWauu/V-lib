import {NextRequest} from "next/server";

async function handler(req: NextRequest): Promise<Response> {

	const apiUrl = `http://${process.env.NEXT_PUBLIC_DJANGO_API_ROOT}/stations/search/`;

	try {
		const body = await req.json();
		const query = body.query;

		const formData = new FormData();
		formData.append("query", query);

		const response = await fetch(apiUrl, {
			method: "POST",
			body: formData,
		});

		if (!response.ok) {
			return Response.json({error: "Error fetching data", status: response.status});
		}

		const data = await response.json();

		return Response.json(data, {status: response.status});

	} catch {
		return Response.json({status: "error", message: "An error occured"});
	}
}

export {handler as POST};