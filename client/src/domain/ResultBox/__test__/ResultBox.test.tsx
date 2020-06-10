import React from 'react';
import { mount } from 'enzyme';
import ResultBox from '../ResultBox';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));
describe('result', () => {
  const data = [
    {
      id: '1',
      title: 'title 1',
      description: 'description 1',
    },
    {
      id: '2',
      title: 'title 2',
      description: 'description 2',
    },
    {
      id: '3',
      title: 'title 3',
      description: 'description 3',
    },
  ];

  const wrapper = mount(<ResultBox results={data} searchKey='tit' />);

  it('should render result list', () => {
    expect(wrapper.find('.list-item')).toHaveLength(3);
  });

  it('should be clicked', () => {
    wrapper.find('.list-item').first().simulate('click');
    expect(mockHistoryPush).toBeCalled();
  });
});
