import React from 'react-native'
import {connect} from 'react-redux'

import Login from './login'
import SignUp from './signup'
import AdminMenu from './admin-menu'
import TeacherClassList from './teacher-class-list'
import TeacherClassDetail from './teacher-class-detail'
import TeacherClassDetailStudent from './teacher-class-detail-student'
import StudentClassList from './student-class-list'
import StudentClassDetail from './student-class-detail'

let {
  Component,
  Navigator,
  Platform,
  StyleSheet,
  Text
} = React

// TODO: Hook up Firebase events to firing actions (??)
class App extends Component {
  constructor(props) {
    super(props)
  }

  componentWillReceiveProps (props) {
  	console.log('will receive ' + props);
  }

  renderScene(route, navigator) {
  	if (route.name === 'admin-menu') {
		return (<AdminMenu navigator={navigator}/>);
  	}

  	if (route.name === 'student-class-list') {
		return (<StudentClassList navigator={navigator}/>);
  	}

	if (route.name === 'student-class-detail') {
		return (<StudentClassDetail navigator={navigator}/>);
  	}

  	if (route.name === 'teacher-class-list') {
		return (<TeacherClassList navigator={navigator}/>);
  	}

  	if (route.name === 'teacher-class-detail') {
		return (<TeacherClassDetail navigator={navigator}/>);
  	}

  	if (route.name === 'teacher-class-detail-student') {
		return (<TeacherClassDetailStudent navigator={navigator}/>);
  	}

  	if (route.name === 'sign-up') {
		return (<SignUp navigator={navigator}/>);
  	}

  	return (<Login navigator={navigator}/>);
  }

  configureScene(route) {
	if (Platform.OS === 'android') {
		return Navigator.SceneConfigs.FloatFromBottomAndroid;
	} else {
		return Navigator.SceneConfigs.FloatFromRight;
	}
  }

  render() {
    return (
      <Navigator
      	ref='navigator'
        style={styles.container}
        configureScene={this.configureScene}
        renderScene={this.renderScene}
        initialRoute={{}}
      />
    )
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default connect((state) => {
	return {login} = state
}, (dispatch) => {
	return {}
})(App)
