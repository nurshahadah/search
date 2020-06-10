import axios from 'axios';
import * as service from '../searchResult';
import { API } from '../config';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('get search results', () => {
  it('should get data', async () => {
    jest
      // @ts-ignore
      .spyOn(mockedAxios, 'CancelToken')
      .mockResolvedValue({
        promise: Promise.resolve({ message: 'request aborted' }),
        cancel: jest.fn(),
        throwIfRequested: Promise.reject({ message: 'request aborted' }),
      });

    const mockToken = new mockedAxios.CancelToken(jest.fn());

    service.getSearchResults('hello').catch((error) => error);

    expect(mockedAxios.get).toHaveBeenCalledWith(`${API.SEARCH}`, {
      cancelToken: mockToken,
      headers: {
        searchKey: 'hello',
      },
    });
  });
});
