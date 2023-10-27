import { accessInstance } from "./index.ts";


export const getUserRankingRequest = (apiUrl: string) =>  accessInstance.get(apiUrl)

