import Firebase from 'firebase'
import Types from './constants/types'

const firebase = new Firebase('https://toptal-classlist.firebaseio.com');
const database = {
	watchLogin: function(callback) {
		firebase.onAuth(callback)
	},
	login: function(email, password, callback) {
		firebase.authWithPassword({email, password}, callback)
	},
	logout: function(callback) {
		firebase.unauth();
		callback();
	},
	signup: function(email, password, role, callback) {
		firebase.createUser({email,password}, (error, data) => {
			if (!error) {
				var user = {}
				user[data.uid] = {email, role}
				firebase.child('users').update(user)
			}
			callback(error, data)
		});
	},
	watchUser: function(uid, callback) {
		firebase.child('users').child(uid).on('value', (snapshot) => {
			callback(null, snapshot.val())
		}, (error) => {
			callback(error, null)
		})
	},
	watchClasses: function(callback) {
		const classlist = firebase.child('classes');

		classlist.on('child_added', (snapshot) => {
			callback(null, Types.CLASSES.ADDED, snapshot.val())
		}, (error) => {
			callback(error, null, null)
		})

		classlist.on('child_removed', (snapshot) => {
			callback(null, Types.CLASSES.REMOVED, snapshot.val())
		}, (error) => {
			callback(error, null, null)
		})

		classlist.on('child_changed', (snapshot) => {
			callback(null, Types.CLASSES.UPDATED, snapshot.val())
		}, (error) => {
			callback(error, null, null)
		})
	},
	addClass: function(item) {
		const ref = firebase.child('classes').push(item)
		firebase.child('classes').child(ref.key()).update({
			cid: ref.key()
		})
	},
	updateClass: function(cid, changes) {
		const ref = firebase.child('classes').child(cid);
		ref.update(changes)
	}
};

export default database;