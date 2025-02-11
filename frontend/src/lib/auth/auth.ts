import { api } from "../api";
import { ILoginRequest } from "./request/ILoginRequest";
import { IRegisterRequest } from "./request/IRegisterRequest";
import { ILoginResponse } from "./response/ILoginResponse";

export const loginUser = async (
  data: ILoginRequest
): Promise<ILoginResponse> => {
  const response = await api.post<ILoginResponse>("/login", data);
  return response.data;
};

export const registerUser = async (data: IRegisterRequest) => {
  const response = await api.post("/register", data);
  return response;
};
