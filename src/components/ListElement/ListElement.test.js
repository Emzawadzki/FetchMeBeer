import React from 'react';
/* global expect */
/* global shallow */

import ListElement from './ListElement';

describe('ListElement component', () => {
  it('renders content', () => {
    const wrapper = shallow(<ListElement/>);
    expect(wrapper.find('div')).to.have.length(1);
  });
});