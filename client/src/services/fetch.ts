import axios, { AxiosRequestConfig } from 'axios';

export const fetch = async ({
  url,
  options,
}: {
  url: string;
  options?: AxiosRequestConfig;
}) => {
  try {
    const response = await axios.get(url, { ...(options && { ...options }) });
    return response.data;
  } catch (error) {
    throw error.message;
  }
};
