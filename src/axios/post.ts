import { accessInstance } from "./index.ts";
import { TPostPayload } from "../types/post.ts";

export const createPostRequest = (payload: TPostPayload) => accessInstance.post("/api/post",payload);
