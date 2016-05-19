'use strict';

import Types from '../constants/types'

const classitem = {};

module.exports = function(state=classitem, action) {
	if (Types.CLASSES.SELECT === action.type) {
		return Object.assign({}, state, action.item);
	} else if (Types.CLASSES.UPDATED === action.type) {
		if (state && state.cid === action.item.cid) {
			return Object.assign({}, state, action.item);
		}
	} else if (Types.CLASSES.UNSELECT === action.type) {
		return classitem
	}

	return state;
};