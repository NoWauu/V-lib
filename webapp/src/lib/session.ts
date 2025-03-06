"use server";

import {getIronSession, IronSessionData} from "iron-session";

import {cookies} from "next/headers";
import IUserData from "@/types/IUserData";
import sessionOptions from "@/lib/sessionOptions";

declare module "iron-session" {
	interface IronSessionData {
		token?: string;
		userData?: IUserData;
	}
}

const getSession = async () => {
	return await getIronSession<IronSessionData>(await cookies(), sessionOptions);
}

const getSessionData = async () => {
	const session = await getSession();
	return {
		data: session.userData,
		token: session.token,
	};
}

export {getSession, getSessionData};