import React from 'react';
import ListElement from './ListElement';

/* global expect */
/* global shallow */

describe('ListElement component', () => {
  it('renders content', () => {
    const wrapper = shallow(<ListElement/>);
    expect(wrapper.find('div')).to.have.length(1);
  });
});