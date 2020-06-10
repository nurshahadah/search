import React from 'react';
import { mount, shallow } from 'enzyme';
import App from './App';
import SearchBox from './domain/SearchBox/SearchBox';

describe('should render without crashing', () => {
  it('should display searchbox', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(SearchBox)).toHaveLength(1);
  });
});
