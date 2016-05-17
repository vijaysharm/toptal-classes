import Types from '../constants/types'
import database from '../database'

const doLogin = (database, dispatch, username, password) => {
	database.login(username, password, (error, data) => {
		if (error) {
			dispatch({
				type: Types.LOGIN.ERROR,
				cause: error.message
			})
		} else {
			console.log('login success')
			console.log(data)
			database.watchUser(data.uid, (error, user) => {
				dispatch({
					type: Types.LOGIN.SUCCESS,
					uid: data.uid,
					username: user.email,
					role: user.role
				})
			})
		}
	})
}

const watchLogin = () => {
	return (dispatch, getState) => {
		database.watchLogin((data) => {
			console.log('Got login data')
			console.log(data)
			// if (data && data.uid) {
			// 	database.watchUser(data.uid, (error, user) => {
			// 		dispatch({
			// 			type: Types.LOGIN.SUCCESS,
			// 			uid: data.uid,
			// 			username: user.email,
			// 			role: user.role
			// 		})
			// 	})
			// }
		})
	}
}

const login = (username, password) => {
	return (dispatch) => {
		dispatch({
			type: Types.LOGIN.IN_PROGRESS
		})

		doLogin(database, dispatch, username, password);
	}
}

const signup = (username, password, role) => {
	return (dispatch) => {
		console.log('signup ' + username + ' with role ' + role)
		dispatch({
			type: Types.SIGNUP.IN_PROGRESS
		})

		database.signup(username, password, role, (error, data) => {
			if (error) {
				dispatch({
					type: Types.SIGNUP.ERROR,
					cause: error.message
				})
			} else {
				console.log('signup success')
				console.log(data)
				doLogin(database, dispatch, username, password);
			}
		});
	}
}

const logout = () => {
	return (dispatch) => {
		dispatch({
			type: Types.LOGIN.LOGOUT
		})
	}
}

export default {
	watchLogin, login, signup, logout
}