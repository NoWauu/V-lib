"use server";

import {getIronSession, getServerActionIronSession, IronSessionData} from "iron-session";

import {cookies} from "next/headers";
import IUserData from "@/types/IUserData";
import {sessionOptions} from "@/lib/sessionConfig";

declare module "iron-session" {
	interface IronSessionData {
		token?: string;
		userData?: IUserData;
	}
}

const getSession = async (req: Request, res: Response) => {
	return getIronSession<IronSessionData>(req, res, sessionOptions);
}

const getServerActionSession = async () => {
	return getServerActionIronSession<IronSessionData>(sessionOptions, await cookies());
}

export { getSession, getServerActionSession };