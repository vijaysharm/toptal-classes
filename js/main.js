import React from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import actions from './actions'
import Login from './login'
import SignUp from './signup'
import ClassList from './class-list'
import ClassDetail from './class-detail'
import ClassDetailStudent from './class-detail-student'

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

  renderScene(route, navigator) {
    if (this.isLoggedIn(this.props.login)) {
    	if (route.name === 'class-detail') {
  		  return (
          <ClassDetail 
            navigator={navigator}
            user={this.props.login}
            detail={this.props.classitem}
            onUpdateClass={this.props.classes.updateClass}
            onLogout={this.props.user.logout}
            onSelectStudent={(uid) => {
              console.log('selected student ' + uid)
              navigator.push({
                name: 'class-detail-student',
                uid: uid
              })
            }}
            />
        )
    	}

    	if (route.name === 'class-detail-student') {
  		  return (
          <ClassDetailStudent 
            navigator={navigator}
            user={this.props.login}
            detail={this.props.classitem}
            onUpdateClass={this.props.classes.updateClass}
            onLogout={this.props.user.logout}
            student={route.uid}
            />
        );
    	}

      return (
        <ClassList 
          navigator={navigator}
          user={this.props.login}
          list={this.props.classlist}
          onAddClass={this.props.classes.addClass}
          onLogout={this.props.user.logout}
          onSelectClass={(item) => {
            this.props.classes.selectClass(item)
            navigator.push({
              name: 'class-detail'
            })
          }}
          />
        );
    }

  	if (route.name === 'sign-up') {
		  return (<SignUp navigator={navigator}/>);
  	}

  	return (<Login navigator={navigator}/>);
  }

  isLoggedIn(user) {
    return user && user.uid && user.role
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
        renderScene={this.renderScene.bind(this)}
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
  return {
    user: bindActionCreators(Object.assign({}, actions.user), dispatch),
    classes: bindActionCreators(Object.assign({}, actions.classes), dispatch)
  }
})(App)
