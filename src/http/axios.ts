import axios from "axios";


export const http = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL ?? "http://localhost:6868"
});
