import axios from "axios";
import {TAuthPayload, TAuthRes} from "../types/user.ts";

export const loginUser = (payload: TAuthPayload) => axios.post<TAuthRes>("/api/auth/login", payload)
export const registerUser = (payload: TAuthPayload) => axios.post<TAuthRes>("/api/auth/register", payload)

