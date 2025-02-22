import { getSession } from "@/lib/session";
import IUserData from "@/types/IUserData";

const saveUserSession = async (token: string, userData: IUserData) : Promise<void> => {

	const session = await getSession();

	session.token = token;
	session.userData = userData;

	await session.save();
}

export default saveUserSession;
