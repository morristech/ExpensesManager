import React from 'react';
import { shallow } from 'enzyme';
import NotFoundPage from './NotFoundPage';

describe('<NotFoundPage />', () => {
  it('should have a header called \'404 Page Not Found\'', () => {
    const wrapper = shallow(<NotFoundPage />);
    const actual = wrapper.find('h4').text();
    const expected = '404 Page Not Found';

    expect(actual).toEqual(expected);
  });

  it('should link to the homepage', () => {
    const wrapper = shallow(<NotFoundPage />);
    const actual = wrapper.findWhere(n => n.prop('to') === '/').length;
    const expected = 1;

    expect(actual).toEqual(expected);
  });
});
