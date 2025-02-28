import axios from "axios";
// import { getSession } from "next-auth/react";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

export const noAuthInstance = axios.create({
  timeout: 10000,
  baseURL: process.env.REACT_APP_SERVER_URL,
});

export const authInstance = axios.create({
  timeout: 10000,
  baseURL: process.env.REACT_APP_SERVER_URL,
});


// authInstance.interceptors.request.use(
//   async (config) => {
//     const session: any = await getSession();
//     if (session && session.access_token) {
//       
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

authInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      window.location.href = "/login";
    } else if (error.response.status === 404) {
      console.log("데이터가 없습니다. interceptor")
    } else if (error.response.status === 500) {
      console.log("")
    }
    return Promise.reject(error);
  }
);