import axios, { Axios, AxiosError } from "axios";
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

// type 선언
authInstance.interceptors.response.use(
  (response) => {
    const etcObj: any = {}
    if (response.headers['x-total-elements']) { etcObj.totalElements = response.headers['x-total-elements'] }
    if (response.headers['x-total-page']) { etcObj.totalPage = response.headers['x-total-page'] }
    if (response.headers['x-page-size']) { etcObj.pageSize = response.headers['x-page-size'] }
    if (response.headers['x-page-number']) { etcObj.pageNumber = response.headers['x-page-number'] }
    if (response.headers['x-last-page-number']) { etcObj.lastPageNumber = response.headers['x-last-page-number'] }
    if (response.headers['x-first-page-number']) { etcObj.firstPageNumber = response.headers['x-first-page-number'] }
    if (response.headers['x-current-section']) { etcObj.currentSection = response.headers['x-current-section'] }
    return {...response, data: {...response.data, etcObj}};
  },
  async (error: AxiosError) => {
    if (error.response) {
      const errorMessage = {
        status: error.response?.status,
        message: error.response?.data
      }
  
      console.log(`[Api] : ${errorMessage} 오류 발생`)
  
      if (errorMessage.status === 401) {
        window.location.href = "/login";
      }
    } else {
      console.log(`[Error] : ${error}`)
    }

    return Promise.reject(error);
  }
);