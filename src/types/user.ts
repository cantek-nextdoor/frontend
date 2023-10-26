import {TAbstractRes} from "./index.ts";

export type TAuthPayload = {
    email: string;
    password: string;
}


export type TAuthRes = {
    accessToken: string;
    createdAt: string;
    displayName: string;
    email: string;
    points: number;
    postalCode: string;
    refreshToken: string;
    updatedAt: string;
    userType: string;
    uuid: string;
} & TAbstractRes