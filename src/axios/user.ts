import { accessInstance } from "./index.ts";


export const getUserDetailRequest = (apiUrl: string) =>  accessInstance.get(apiUrl)

