import { fetch } from './fetch';
import axios from 'axios';
import { API } from './config';

let CancelToken = axios.CancelToken;
let cancel: any;

export async function getSearchResults(value: string) {
  if (cancel != undefined) {
    cancel('Abort request');
  }

  return fetch({
    url: `${API.SEARCH}`,
    options: {
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      }),
      headers: {
        searchKey: value,
      },
    },
  });
}
