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
    postal_code: string;
    refreshToken: string;
    updatedAt: string;
    user_type: string;
    uuid: string;
} & TAbstractRes