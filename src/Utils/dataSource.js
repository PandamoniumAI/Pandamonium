import axios from "axios";
export const ds = axios.create();

export const api = axios.create({
  baseURL: "https://api-chatbot.vercel.app/api",
});
