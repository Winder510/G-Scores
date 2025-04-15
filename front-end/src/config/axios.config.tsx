import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_DOMAIN,
  timeout: 100000000,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": import.meta.env.VITE_API_KEY_SERVER,
  },
});
instance.interceptors.response.use(
  (response) => response?.data,
  (error) => {
    if (error.response) {
      // Handle specific error status codes
      switch (error.response.status) {
        case 401:
          // Handle unauthorized
          break;
        case 404:
          // Handle not found
          break;
        case 500:
          // Handle server error
          break;
      }
    }
    return error?.response?.data ?? Promise.reject(error);
  }
);
export default instance;
