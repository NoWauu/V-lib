const sessionOptions = {
	password: process.env.SESSION_SECRET_PASSWORD as string,
	cookieName: "session",
	ttl: 60 * 60 * 24, // 1 day
}

export default sessionOptions;