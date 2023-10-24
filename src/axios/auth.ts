import axios from "axios";
import {TAuthPayload, TAuthRes} from "../types/user.ts";
import Cookies from 'js-cookie';

const accessInstance = axios.create({
        headers: {authorization: "Bearer " + Cookies.get('accessToken')}
    }
)

const refreshInstance = axios.create({
        headers: {authorization: "Bearer " + Cookies.get('refreshToken')}
    }
)

export const loginUser = (payload: TAuthPayload) => axios.post<TAuthRes>("/api/auth/login", payload)
export const registerUser = (payload: TAuthPayload) => axios.post<TAuthRes>("/api/auth/register", payload)


export const jwtTest = () => accessInstance.get("/api/user/test");
export const getRankedUsers = () => accessInstance.get("/api/user/ranking");
export const refreshUserAccessToken = () => refreshInstance.post<{ accessToken: string }>("/api/auth/refresh")