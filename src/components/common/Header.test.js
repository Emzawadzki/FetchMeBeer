import React from 'react';
/* global expect */
/* global shallow */

import Header from './Header';

describe('Header component', () => {
  it('renders header', () => {
    const wrapper = shallow(<Header/>);
    expect(wrapper.find('header')).to.have.length(1);
  });

  it('renders h1', () => {
    const wrapper = shallow(<Header/>);
    expect(wrapper.find('h1')).to.have.length(1);
  });
});