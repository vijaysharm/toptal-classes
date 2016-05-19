'use strict';

jest.dontMock('../classlist');
const classlist = require('../classlist');

const initial = {
	error: undefined,
    isLoading: true,
    items: []
};

describe('class list reducer', () => {
	it('returns initial state with no actions', () => {
    	expect(classlist(undefined, {}))
    		.toEqual(initial);
  	});

	it('adds class items', () => {
    	expect(classlist(undefined, {
    		type: 'CLASSES_ADDED',
    		item: {bogus: 'bogus'}
    	})).toEqual({
			error: undefined,
    		isLoading: false,
    		items: [{bogus: 'bogus'}]
		});
  	});
});