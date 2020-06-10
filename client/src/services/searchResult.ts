import { fetch } from './fetch';
import axios from 'axios';
import { API } from './config';

const CancelToken = axios.CancelToken;
let cancel: any;

export async function getSearchResults(value: string) {
  if (cancel !== undefined) {
    cancel('Abort request');
  }

  const cancelToken = new CancelToken(function executor(c) {
    cancel = c;
  });

  try {
    return await fetch({
      url: `${API.SEARCH}`,
      options: {
        cancelToken,
        headers: {
          searchKey: value,
        },
      },
    });
  } catch (e) {
    throw e;
  }
}
