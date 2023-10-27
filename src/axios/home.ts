import { accessInstance } from "./index.ts";

export const getAllPostRequest = (postalCode:string, distance:number) => accessInstance.get(`/api/post/all/${postalCode}/${distance}`);
