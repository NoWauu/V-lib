const sessionOptions = {
	password: process.env.SECRET_COOKIE_PASSWORD as string,
	cookieName: "session",
	ttl: 60 * 60 * 24 * 2, // 2 days
}

export default sessionOptions;