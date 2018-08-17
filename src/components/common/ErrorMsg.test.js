import React from 'react';
/* global expect */
/* global shallow */

import ErrorMsg from './ErrorMsg';

describe('ErrorMsg component', () => {
  it('renders content', () => {
    const wrapper = shallow(<ErrorMsg/>);
    expect(wrapper.find('div')).to.have.length(1);
  });
});