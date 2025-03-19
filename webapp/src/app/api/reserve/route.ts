import {NextRequest} from "next/server";
import { getSession } from "@/lib/session";

async function handler(req: NextRequest): Promise<Response> {
	const apiUrl = `http://${process.env.NEXT_PUBLIC_DJANGO_API_ROOT}/users/add-rent/`;

	try {
		const body = await req.json();
		const id_station = body.id_station;

		const session = await getSession();
		const token = session.token;

		if (!token) {
			return Response.json({status: "error", message: "Unauthorized"}, {status: 401});
		}

		const formData = new FormData();
		formData.append("token", token);
		formData.append("id_station", id_station);

		const response = await fetch(apiUrl, {
			method: "POST",
			body: formData,
		});

		return Response.json(response, {status: response.status});


	} catch {
		return Response.json({status: "error", message: "An error occured"});
	}
}

export {handler as POST};