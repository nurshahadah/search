import axios, { AxiosRequestConfig } from 'axios';

export const fetch = ({
  url,
  options,
}: {
  url: string;
  options?: AxiosRequestConfig;
}) => {
  return axios
    .get(url, { ...(options && { ...options }) })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.message));
};
