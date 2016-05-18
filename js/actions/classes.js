import Types from '../constants/types'
import database from '../database'

const watchClasses = () => {
	return (dispatch, getState) => {
		dispatch({
			type: Types.CLASSES.LOADING
		})
		database.watchClasses((error, action, item) => {
			console.log('got class item ' + action)
			console.log(item)
			if (item.cid) {
				dispatch({
					type: action,
					item: item
				})
			}
		})
	}
}

const addClass = (item) => {
	return (dispatch, getState) => {
		database.addClass(item)
	}
}

const updateClass = (cid, changes) => {
	return (dispatch, getState) => {
		database.updateClass(cid, changes)
	}
}

const updateStudentInClass = (cid, uid, changes) => {
	return (dispatch, getState) => {
		database.updateStudentInClass(cid, uid, changes)
	}
}

const selectClass = (item) => {
	return (dispatch, getState) => {
		dispatch({
			type: Types.CLASSES.SELECT,
			item: item
		})
	}
}

const unselectClass = () => {
	return (dispatch, getState) => {
		dispatch({
			type: Types.CLASSES.UNSELECT
		})
	}
}

export default {
	watchClasses, 
	addClass, 
	updateClass, 
	updateStudentInClass, 
	selectClass, 
	unselectClass
}