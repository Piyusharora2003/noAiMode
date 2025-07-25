import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ROOT_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
