import React from 'react';
/* global expect */
/* global shallow */

import Modal, {
  fetchBeer,
	fetchRelatedBeers,
	getRelatedBeersData,
	getRelatedBeers,
	getRandomNum,
  randomizeUniqueElements
} from './Modal';



describe('Modal component', () => {
  it('renders content', () => {
    const wrapper = shallow(
      <Modal
        match={{params: {id: "1"}}}
      />
    );
    expect(wrapper.find('section')).to.have.length(2);
  });
});

/* Unit function tests */

describe('Modal get random number function', () => {
  it('returns value from within range', () => {
    const min = -5;
    const max = 5;
    expect(getRandomNum(min, max)).to.be.at.least(min);
    expect(getRandomNum(min, max)).to.be.at.most(max);
  });

  it('returns integer value', () => {
    const min = -5234;
    const max = 6643;
    expect(Number.isInteger(getRandomNum(min, max))).to.be.equal(true);
  });
});

describe('Modal randomize unique elements function', () => {
  it('returns false for incorrect arguments', () => {
    expect(randomizeUniqueElements([], 'test')).to.be.equal(false);
    expect(randomizeUniqueElements([{id: 3}], 2)).to.be.equal(false);
  });

  it('returns correct value with no parameter provided', () => {
    const array = [
      { id: 1 },
      { id: 5 },
      { id: 24 },
      { id: 34 },
      { id: 54 },
      { id: 67 }
    ];
    const number = 3;
    expect(randomizeUniqueElements(array, number)).to.have.length(number);
  });

  it('returns correct value with parameter provided', () => {
    const array = [
      { elseId: 65 },
      { elseId: 345 },
      { elseId: 7765 },
      { elseId: 456 },
      { elseId: 675 },
      { elseId: 44 }
    ];
    const number = 4;
    const par = "elseId";
    expect(randomizeUniqueElements(array, number, par)).to.have.length(number);
  });
});

describe('Modal get related beers data', () => {
  it('returns expected object values', () => {
    const data = [
      {
        abv: 6.4,
        ibu: 25,
        ebc: 33
      }
    ];
    const result = getRelatedBeersData(data);
    expect(result.abvMin).to.equal(3);
    expect(result.abvMax).to.equal(8);
    expect(result.ibuMin).to.equal(18);
    expect(result.ibuMax).to.equal(32);
    expect(result.ebcMin).to.equal(23);
    expect(result.ebcMax).to.equal(43);
  });

  it('returns expected object values', () => {
    const data = [
      {
        abv: 1,
        ibu: 3,
        ebc: -6
      }
    ];
    const result = getRelatedBeersData(data);
    expect(result.abvMin).to.equal(0);
    expect(result.abvMax).to.equal(2);
    expect(result.ibuMin).to.equal(0);
    expect(result.ibuMax).to.equal(10);
    expect(result.ebcMin).to.equal(0);
    expect(result.ebcMax).to.equal(0);
  });
});