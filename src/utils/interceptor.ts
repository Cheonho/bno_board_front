import axios, { AxiosError, Method } from "axios";
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
    if (response.headers['x-total-elements']) { etcObj.totalElements = Number(response.headers['x-total-elements']) }
    if (response.headers['x-total-page']) { etcObj.totalPage = Number(response.headers['x-total-page']) }
    if (response.headers['x-page-size']) { etcObj.pageSize = Number(response.headers['x-page-size']) }
    if (response.headers['x-page-number']) { etcObj.pageNumber = Number(response.headers['x-page-number']) }
    if (response.headers['x-last-page-number']) { etcObj.lastPageNumber = Number(response.headers['x-last-page-number']) }
    if (response.headers['x-first-page-number']) { etcObj.firstPageNumber = Number(response.headers['x-first-page-number']) }
    if (response.headers['x-current-section']) { etcObj.currentSection = Number(response.headers['x-current-section']) }
    if (Object.keys(etcObj).length === 0) return {...response, data: {...response.data}}
    return {...response, data: {...response.data, pageData: etcObj}};
  },
  async (error: AxiosError) => {
    let returnErrorMessage;

    if (error.response?.status !== 200) {
      const errorMessage = {
        status: error.response?.status,
        message: error.response?.data
      }
  
      console.log(`[Api] - status: ${errorMessage.status} 오류 발생`)
      console.log(error)
  
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

const customApi = async <T>(
  apiUrl: string,
  method: Method,
  opts?: {
    data?: { [key: string]: any } | any;
    params?: any;
    headers?: any;
  },
  etc?: { isAuth?: boolean; responseType?: ResponseType }
) => {
  
  const headers = opts?.headers
    ? { ...opts.headers }
    : { 'Content-Type': 'application/json' }

  return await authInstance<T>({
    method: method,
    url: apiUrl,
    headers: headers,
    data: opts?.data,
    params: opts?.params,
    // responseType: etc?.responseType ? etc?.responseType : 'json',
  })
}

export default customApi;