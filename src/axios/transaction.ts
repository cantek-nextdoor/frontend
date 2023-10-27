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

export interface IGetUserTransactionsRes {
    userTransactions: ITransactions[]
}

export interface ITransactions {
    createdAt: string;
    postPoints: number;
    fromPoints: number;
    toPoints: number;
}

export const createExchange = (payload: any) => accessInstance.post("/api/transaction/exchange", payload);
export const getUserTransactions = (uuid: string) => accessInstance.get<IGetUserTransactionsRes>(`api/transaction/${uuid}`)