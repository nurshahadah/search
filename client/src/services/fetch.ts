import axios, { AxiosRequestConfig } from 'axios';
let CancelToken = axios.CancelToken;
let cancel: any;

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

// export async function autocompleteSearchTest(value: string) {
//   if (cancel != undefined) {
//     cancel('Abort request');
//   }
//   return axios
//     .get(`/api/search/`, {
//       cancelToken: new CancelToken(function executor(c) {
//         cancel = c;
//       }),
//       headers: {
//         searchKey: value,
//       },
//     })
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       const result = error;
//       return Promise.reject(result.message);
//     });
// }
