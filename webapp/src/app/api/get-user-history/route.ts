import {getSessionData} from "@/lib/session";

async function handler(): Promise<Response> {
	const url = `http://${process.env.NEXT_PUBLIC_DJANGO_API_ROOT}/users/get-user-history/`;

	const session = await getSessionData();

	const formData = new FormData();
	formData.append("token", session.token as string);

	const response = await fetch(url, {
		method: "POST",
		body: formData
	});

	if (!response.ok) {
		console.log(response);
		return Response.json({error: "Error fetching data", status: response.status});
	}

	const data = await response.json();

	return Response.json(data, {status: 200});
}

export {handler as GET};
