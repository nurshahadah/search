import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import DetailPage from '../DetailPage';
import * as service from '../../../services/fetch';
import { act } from 'react-dom/test-utils';

jest.mock('react-router', () => ({
  useParams: jest.fn().mockReturnValue({ id: '2' }),
}));

describe('display loading', () => {
  let wrapper: ReactWrapper;

  it('should', async () => {
    await act(async () => {
      jest.spyOn(service, 'fetch').mockImplementationOnce(() =>
        Promise.resolve({
          id: 2,
          title: 'Missed patrol at site Bravo Romeo',
          description:
            'Patrol scheduled at 4pm on site Bravo Romeo has not yet started.',
          type: 'Patrol',
          category: 'Service',
          status: 'Not started',
          venue: 'Charlie Alpha',
          dateTime: '2020-05-23 15:55:50',
        }),
      );
      wrapper = mount(<DetailPage />);
      expect(wrapper.find('span').first().text()).toContain('loading');
    });
  });

  it('should display details page', () => {
    act(() => {
      wrapper.update();
      expect(wrapper.find('.item-title')).toHaveLength(3);
    });
  });

  it('should display no result', async () => {
    await act(async () => {
      jest
        .spyOn(service, 'fetch')
        .mockImplementationOnce(() => Promise.resolve(undefined));
      wrapper = mount(<DetailPage />);
    });

    act(() => {
      wrapper.update();

      expect(wrapper.find('span').first().text()).toEqual(
        'No available data yet',
      );
    });
  });
});
