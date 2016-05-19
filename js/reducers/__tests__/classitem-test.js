'use strict';

jest.dontMock('../classitem');
const classitem = require('../classitem');

const initial = {};

describe('class item reducer', () => {
	it('returns initial state with no actions', () => {
    	expect(classitem(undefined, {}))
    		.toEqual(initial);
  	});

  	it('returns initial on unselect', () => {
    	expect(classitem({bogus: 'bogus'}, {type: 'UNSELECT_CLASS'}))
    		.toEqual(initial);
  	});

  	it('returns initial on unselect', () => {
    	expect(classitem({}, {type: 'SELECT_CLASS', item: initial}))
    		.toEqual(initial);
  	});

	it('returns current state on update without class id', () => {
    	expect(classitem({bogus: 'bogus'}, {type: 'CLASSES_UPDATED', item: initial}))
    		.toEqual({bogus: 'bogus'});
  	});

  	it('returns updated state on update with class id', () => {
    	expect(classitem({bogus: 'bogus', cid: '123'}, {type: 'CLASSES_UPDATED', item: {cid: '123', prop: 'property'}}))
    		.toEqual({bogus: 'bogus', cid: '123', prop: 'property'});
  	});
});
