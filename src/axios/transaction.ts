import axios from "axios";
import {refreshUserAccessToken} from "./auth.ts";

const accessInstance = axios.create()

accessInstance.interceptors.request.use(
    async (config) => {
        const res = await refreshUserAccessToken()
        config.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return config;
    },
    (e) => {
        console.log('axios interceptor error', e)
        Promise.reject(e)
    }
);

export const createExchange = (payload: any) => accessInstance.post("/api/transaction/exchange", payload);

