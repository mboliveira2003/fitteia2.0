import Axios, { AxiosRequestConfig } from "axios";
import {auth} from "../firebase";
//import { Cookies } from 'react-cookie'

//const cookies = new Cookies();

export const AXIOS_INSTANCE = Axios.create({
  baseURL: "https://api.dev.studenthub.pt",
});

AXIOS_INSTANCE.interceptors.request.use(async (config) => {
  // TODO : rewrite this to store the api key in a cookie

  const api_key = await auth.currentUser?.getIdToken();

  if (api_key && config?.headers) {
    config.headers.Authorization = `Bearer ${api_key}`;
  }

  return config;
});

export const instance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({ ...config, cancelToken: source.token }).then(
    ({ data }) => data,
  );
  return promise;
};
