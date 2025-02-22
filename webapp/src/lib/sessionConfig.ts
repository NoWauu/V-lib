import {IronSessionOptions} from "iron-session";

export const sessionOptions: IronSessionOptions = {
	password: process.env.SESSION_SECRET_PASSWORD as string,
	cookieName: "session",
	cookieOptions: {
		secure: process.env.NODE_ENV === "production",
	},
	ttl: 60 * 60 * 24 * 2, // 2 days
}