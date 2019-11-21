import React from 'react';
/* global expect */
/* global shallow */

import ModalMainElement from './ModalMainElement';

describe('ModalMainElement component', () => {
  it('renders content', () => {
    const props = {
      name: 'test-text',
      image: 'test-text',
      tagline: 'test-text',
      ibu: 1.4,
      abv: 1.4,
      ebc: 1.4,
      description: 'test-text'
    };
    const wrapper = shallow(<ModalMainElement {...props} />);
    expect(wrapper.find('section')).to.have.length(1);
  });
});