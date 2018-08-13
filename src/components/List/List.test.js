import React from 'react';
import 'isomorphic-fetch';

/* global expect */
/* global shallow */

import List from './List';

describe('List component', () => {
  it('renders content', () => {
    const wrapper = shallow(<List/>);
    expect(wrapper.find('div')).to.have.length(2);
  });
});