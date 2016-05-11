import Types from '../constants/types'
import database from '../database'

const watchLogin = () => {
	return (dispatch, getState) => {
		database.watchLogin((data) => {
			console.log('Got login data')
			console.log(data)
		})
	}
}

const login = (username, password) => {
	return (dispatch) => {
		dispatch({
			type: Types.LOGIN.IN_PROGRESS
		})

		database.login(username, password, (error, data) => {
			if (error) {
				dispatch({
					type: Types.LOGIN.ERROR,
					cause: error.message
				})
			} else {
				console.log('login success')
				console.log(data)
				dispatch({
					type: Types.LOGIN.SUCCESS,
					uid: undefined,
					username: undefined,
					role: undefined
				})
			}
		})
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
				database.login(username, password, (error, data) => {
					if (error) {
						dispatch({
							type: Types.LOGIN.ERROR,
							cause: error.message
						})
					} else {
						console.log('login success')
						console.log(data)
						dispatch({
							type: Types.LOGIN.SUCCESS,
							username: username,
							role: role
						})
					}
				})
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