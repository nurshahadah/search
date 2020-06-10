import * as service from '../fetch';
import axios from 'axios';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetch data from api', () => {
  it('should get data', async () => {
    const data = { name: 'test', id: 'testId' };
    const mockUrl = 'api/link';

    mockedAxios.get.mockImplementationOnce(() => Promise.resolve({ data }));

    await expect(
      service.fetch({
        url: mockUrl,
      }),
    ).resolves.toEqual(data);

    expect(mockedAxios.get).toHaveBeenCalledWith(mockUrl, {});
  });

  it('should log error', async () => {
    const errorMessage = 'Network Error';

    mockedAxios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );

    try {
      const result = await service.fetch({
        url: 'mockUrl',
      });
      return result;
    } catch (e) {
      expect(e).toEqual(errorMessage);
    }
  });
});
