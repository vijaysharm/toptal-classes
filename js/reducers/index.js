'use strict';

import { combineReducers } from 'redux';
import Types from '../constants/types'

const login = {
	uid: undefined,
	username: undefined, 
	role: undefined,
	isLogginIn: false,
	error: undefined
};

const classlist = {
	items: [],
	isLoading: true,
	error: undefined
};

const classitem = {};

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
	classitem: function(state=classitem, action) {
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
	},
	classlist: function(state=classlist, action) {
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
	}
});
