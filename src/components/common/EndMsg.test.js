import React from 'react';
/* global expect */
/* global shallow */

import EndMsg from './EndMsg';

describe('EndMsg component', () => {
  it('renders content', () => {
    const wrapper = shallow(<EndMsg/>);
    expect(wrapper.find('p.end-message-text')).to.have.length(1);
  });
});