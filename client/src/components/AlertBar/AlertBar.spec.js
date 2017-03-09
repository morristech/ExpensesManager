import React from 'react';
import {shallow} from 'enzyme';
import AlertBar from './AlertBar';

describe('<AlertBar />', () => {
  it('should display the error correctly', () => {
    const wrapper = shallow(<AlertBar error="Some error occured." onDismiss={() => {}} />);
    const actual = wrapper.find('p').text();
    const expected = 'Some error occured.';

    expect(actual).toEqual(expected);
  });
});
