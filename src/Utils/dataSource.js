import axios from "axios";
const BASE_URL = import.meta.env.VITE_URL;

const ds = axios.create({
  baseURL: BASE_URL,
});

export default ds;
