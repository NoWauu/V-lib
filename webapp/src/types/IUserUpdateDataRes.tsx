import IUserData from "@/types/IUserData";

export default interface IUserUpdateDataRes {
  status: string;
  message: string;
  data?: IUserData
}
