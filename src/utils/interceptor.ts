import axios, { Axios, AxiosError, Method } from "axios";
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
    const etcObj: any = {}
    if (response.headers['x-total-elements']) { etcObj.totalElements = response.headers['x-total-elements'] }
    if (response.headers['x-total-page']) { etcObj.totalPage = response.headers['x-total-page'] }
    if (response.headers['x-page-size']) { etcObj.pageSize = response.headers['x-page-size'] }
    if (response.headers['x-page-number']) { etcObj.pageNumber = response.headers['x-page-number'] }
    if (response.headers['x-last-page-number']) { etcObj.lastPageNumber = response.headers['x-last-page-number'] }
    if (response.headers['x-first-page-number']) { etcObj.firstPageNumber = response.headers['x-first-page-number'] }
    if (response.headers['x-current-section']) { etcObj.currentSection = response.headers['x-current-section'] }
    return {...response, data: {...response.data, pageData: etcObj}};
  },
  async (error: AxiosError) => {
    let returnErrorMessage;

    if (error.response?.status !== 200) {
      const errorMessage = {
        status: error.response?.status,
        message: error.response?.data
      }
  
      console.log(`[Api] : status: ${errorMessage.status} 오류 발생`)
  
      if (errorMessage.status === 401) {
        window.location.href = "/login";
      }
      returnErrorMessage = errorMessage
    } else {
      console.log(`[Error] : ${error}`)
      returnErrorMessage = error
    }

    return Promise.reject(returnErrorMessage);
  }
);

// 만들기만 하고 사용 X
export const useApi = async <T>(
  apiUrl: string,
  opts: {
    method: Method;
    data?: { [key: string]: any } | any;
    params?: any;
    headers?: any;
  },
  etc?: { isAuth?: boolean; responseType?: ResponseType }
) => {
  
  const headers = opts.headers
    ? { ...opts.headers }
    : { 'Content-Type': 'application/json' }

  return await authInstance<T>({
    method: opts.method,
    url: apiUrl,
    headers: headers,
    data: opts.data,
    params: opts.params,
    // responseType: etc?.responseType ? etc?.responseType : 'json',
  })
}