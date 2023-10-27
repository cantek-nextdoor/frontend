import {accessInstance} from "./index.ts";


export const getUserDetailRequest = (apiUrl: string) =>  accessInstance.get(apiUrl)
export const getUserDetail = (uuid: string) =>  accessInstance.get(`/api/user/details/${uuid}`)

