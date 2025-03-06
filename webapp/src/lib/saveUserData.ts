import { getSession } from "@/lib/session";
import IUserData from "@/types/IUserData";

const saveUserSession = async (
  token: string,
  userData: IUserData
): Promise<void> => {
  const session = await getSession();

  session.token = token;
  session.userData = userData;

  await session.save();
};

const updateUserSession = async (newSession: IUserData) => {
  const session = await getSession();

  session.userData = newSession;

  await session.save();
}

export {saveUserSession, updateUserSession};
