import {TAbstractRes} from "./index.ts";

export type TAuthPayload = {
    email: string;
    password: string;
}

export type TAuthRes = {
    access_token: string;
    createdAt: string;
    display_name: string;
    email: string;
    points: number;
    postal_code: string;
    refresh_token: string;
    updatedAt: string;
    user_type: string;
    uuid: string;
} & TAbstractRes