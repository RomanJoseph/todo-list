import { User } from "@/types/User";

export interface ILoginResponse {
    token: string;
    user: User;
}