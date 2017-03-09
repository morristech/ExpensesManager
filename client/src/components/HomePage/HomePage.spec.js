import React from 'react';
import { shallow } from 'enzyme';
import HomePage from './HomePage';

describe('<HomePage />', () => {
  it('should have a header called \'About\'', () => {
    const wrapper = shallow(<HomePage />);
    const actual = wrapper.find('h1').text();
    const expected = 'Expenses Manager';

    expect(actual).toEqual(expected);
  });
});
