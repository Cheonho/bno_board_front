import { authInstance } from "utils/interceptor";

export async function getPathListApi() {
  const res = await authInstance.get(`/path/path-list`);
  return res;
}