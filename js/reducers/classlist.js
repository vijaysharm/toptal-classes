'use strict';

import Types from '../constants/types'

const classlist = {
	items: [],
	isLoading: true,
	error: undefined
};

module.exports = function(state=classlist, action) {
	if (Types.CLASSES.ADDED === action.type) {
		return Object.assign({}, state, {
			isLoading: false,
			items: [...state.items, action.item]
		});
	} else if (Types.CLASSES.REMOVED === action.type) {
		const cid = action.item.cid
		const index = state.items.findIndex((item) => {
			return item.cid === cid
		})
		console.log('Found object to delete at index ' + index)
		if (index === -1)
			return state;

		return Object.assign({}, state, {
			isLoading: false,
			items: [
				...state.items.slice(0, index),
				...state.items.slice(index + 1),
			]
		});
	} else if (Types.CLASSES.UPDATED === action.type) {
		const cid = action.item.cid
		const index = state.items.findIndex((item) => {
			return item.cid === cid
		})
		console.log('Found object to update at index ' + index)
		if (index === -1) {
			return Object.assign({}, state, {
				isLoading: false,
				items: [...state.items, action.item]
			});
		}

		return Object.assign({}, state, {
			isLoading: false,
			items: [
				...state.items.slice(0, index),
				action.item,
				...state.items.slice(index + 1),
			]
		});
	}

	return state;
};