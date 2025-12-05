import axios from "axios";
const backendUrl = process.env.BACKEND_URL;
export const api = axios.create({
    baseURL: backendUrl,
});
