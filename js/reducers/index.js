'use strict';

import { combineReducers } from 'redux';
import Types from '../constants/types'

const login = {
	uid: undefined
	username: undefined, 
	role: undefined,
	isLogginIn: false,
	error: undefined
};

const classlist = {
	items: [],
	isLoading: false,
	error: undefined
};

module.exports = combineReducers({
	login: function(state = login, action) {
		if (Types.LOGIN.IN_PROGRESS === action.type || Types.SIGNUP.IN_PROGRESS === action.type) {
			return Object.assign({}, state, {
				isLogginIn: true,
				error: ''
			});
		} else if (Types.LOGIN.SUCCESS === action.type || Types.SIGNUP.SUCCESS === action.type) {
			return Object.assign({}, state, {
				uid: action.uid,
				username: action.username,
				role: action.role,
				isLogginIn: false,
				error: ''
			});
		} else if (Types.LOGIN.ERROR === action.type || Types.SIGNUP.ERROR === action.type) {
			return Object.assign({}, state, {
				isLogginIn: false,
				error: action.cause
			});
		} else if (Types.LOGIN.LOGOUT === action.type) {
			return Object.assign({}, state, login);
		}

		return state;
	},
	classitem: function(state={}, action) {
		return state;
	},
	classlist: function(state=classlist, action) {
		return state;
	}
});
