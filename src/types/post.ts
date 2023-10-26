// import {TAbstractRes} from "./index.ts";
import { status } from "../components/entities/status.ts";

export type TPostPayload = {
    userId: string,
    postId: string;
    title: string;
    imageUrl: string;
    description: string;
    tags: string[];
    points: number;
    numOfLike: number;
    postedDate: Date;
    eventDate: Date;
    status: status;
    likedUserList: string[];
}

// export type TPostRes = {
//     accessToken: string;
//     createdAt: string;
//     displayName: string;
//     email: string;
//     points: number;
//     postalCode: string;
//     refreshToken: string;
//     updatedAt: string;
//     userType: string;
//     uuid: string;
// } & TAbstractRes