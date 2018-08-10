import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import List from './List';

function setup() {
  let renderer = TestUtils.createRenderer();
  renderer.render(<List/>);
  let output = renderer.getRenderOutput();

  return {
    renderer,
    output
  }
}

describe('List component', () => {
  it('renders container div', () => {
    const {output} = setup();
    expect(output.type).toBe('div');
  });
});