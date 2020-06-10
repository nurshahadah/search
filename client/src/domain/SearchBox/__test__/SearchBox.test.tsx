import React from 'react';
import { shallow, mount, ReactWrapper } from 'enzyme';
import SearchBox from '../SearchBox';
import InputBox from '../../../components/FormElements/TextInputBox/TextInputBox';
import * as service from '../../../services/searchResult';
import TestRenderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import * as debounceFunc from 'use-debounce';

// const mock = [jest.fn];
// jest.mock('use-debounce', () => ({
//   useDebouncedCallback: jest.fn().mockImplementation(() => [jest.fn]),
// }));
jest.useFakeTimers();

describe('debounces', () => {
  let wrapper: ReactWrapper;
  it('something', () => {
    jest.spyOn(service, 'getSearchResults').mockImplementationOnce(() =>
      Promise.resolve([
        {
          id: '2',
          title: 'Missed patrol at site Bravo Romeo',
          description:
            'Patrol scheduled at 4pm on site Bravo Romeo has not yet started.',
          type: 'Patrol',
          category: 'Service',
          status: 'Not started',
          venue: 'Charlie Alpha',
          dateTime: '2020-05-23 15:55:50',
        },
      ]),
    );
    wrapper = mount(<SearchBox />);
    jest.runAllTimers();
    wrapper.find('input').simulate('change', {
      target: {
        value: 'test',
      },
    });

    act(() => {
      wrapper.update();
      expect(wrapper.find(InputBox).prop('value')).toEqual('test');
    });
  });
});
