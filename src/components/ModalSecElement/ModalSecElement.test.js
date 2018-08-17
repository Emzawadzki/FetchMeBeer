import React from 'react';
/* global expect */
/* global shallow */

import ModalSecElement from './ModalSecElement';

describe('ModalSecElement component', () => {
  it('renders content', () => {
    const props = {
      name: 'test-text',
      image: 'test-text',
      id: 1
    };
    const wrapper = shallow(<ModalSecElement/>);
    expect(wrapper.find('div')).to.have.length(1);
  });
});