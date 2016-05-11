import Firebase from 'firebase'

const firebase = new Firebase('https://toptal-classlist.firebaseio.com');
const database = {
	watchLogin: function(callback) {
		firebase.onAuth(callback)
	},
	login: function(email, password, callback) {
		firebase.authWithPassword({email, password}, callback)
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
		firebase.child('users').child('uid').on('value', (snapshot) => {
			callback(null, snapshot.val())
		}, (error) => {
			callback(error, null)
		})
	}
};

export default database;