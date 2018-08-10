import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Header from './Header';

function setup() {
  let renderer = TestUtils.createRenderer();
  renderer.render(<Header/>);
  let output = renderer.getRenderOutput();

  return {
    renderer,
    output
  }
}

describe('Header component', () => {
  it('renders header and h1', () => {
    const {output} = setup();
    expect(output.type).toBe('header');
    const h1 = output.props.children.props.children;
    expect(h1.type).toBe('h1');
  });
});