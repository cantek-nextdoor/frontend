import axios from "axios";

// TODO: add types
export const loginUser = (payload: any) => axios.post("/api/auth/login", payload)
export const registerUser = (payload: any) => axios.post("/api/auth/register", payload)
