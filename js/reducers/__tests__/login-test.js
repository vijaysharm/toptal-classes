'use strict';

jest.dontMock('../login');
const login = require('../login');

const initial = {
	uid: undefined,
	username: undefined, 
	role: undefined,
	isLogginIn: false,
	error: undefined
};

const user = {
	uid: 'user-id',
	username: 'user-name',
	role: 'teacher'
}

describe('login reducer', () => {
	it('returns initial state with no actions', () => {
    	expect(login(undefined, {}))
    		.toEqual(initial);
  	});

	it('returns loggin in when login is in progress', () => {
    	expect(login(initial, {type: "LOGIN.IN_PROGRESS"}))
    		.toEqual({
    			error: '',
			    isLogginIn: true,
			    role: undefined,
			    uid: undefined,
			    username: undefined
    		});
  	});

  	it('returns error on login error', () => {
    	expect(login(initial, {type: "LOGIN.ERROR", cause: "malpractice"}))
    		.toEqual({
    			error: 'malpractice',
			    isLogginIn: false,
			    role: undefined,
			    uid: undefined,
			    username: undefined
    		});
  	});

	it('returns user on login', () => {
    	expect(login(initial, {
			type: "LOGIN.SUCCESS", 
			uid: 'user-id',
			username: 'user-name',
			role: 'teacher'
		})).toEqual({
			error: '',
		    isLogginIn: false,
		    role: 'teacher',
		    uid: 'user-id',
		    username: 'user-name'
		});
  	});

  	it('returns error on signup error', () => {
    	expect(login(initial, {
    		type: "SIGNUP.ERROR", 
    		cause: "malpractice"
    	})).toEqual({
			error: 'malpractice',
		    isLogginIn: false,
		    role: undefined,
		    uid: undefined,
		    username: undefined
		});
  	});

  	it('returns user on signup', () => {
    	expect(login(initial, {
			type: "SIGNUP.SUCCESS", 
			uid: 'user-id',
			username: 'user-name',
			role: 'teacher'
		})).toEqual({
			error: '',
		    isLogginIn: false,
		    role: 'teacher',
		    uid: 'user-id',
		    username: 'user-name'
		});
  	});

  	it('returns loggin in when signup is in progress', () => {
    	expect(login(initial, {type: "SIGNUP.IN_PROGRESS"}))
    		.toEqual({
    			error: '',
			    isLogginIn: true,
			    role: undefined,
			    uid: undefined,
			    username: undefined
    		});
  	});
});