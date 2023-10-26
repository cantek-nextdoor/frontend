import { accessInstance } from "./index.ts";

export const getAllPostRequest = () => accessInstance.get("/api/post/all");
