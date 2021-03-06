import React from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Picker from './components/picker'
import actions from './actions'

let {Component, StyleSheet, Text, TextInput, TouchableHighlight, View} = React

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: props.login.username ? props.login.username : '',
      password: '',
      role: props.login.role ? props.login.role : 'Student'
    }
  }

  login() {
    this.props.user.logout();
    this.props.navigator.pop();
  }

  signup() {
    if (this.props.login.isLogginIn)
      return;

    this.props.user.signup(this.state.email, this.state.password, this.state.role);
  }

  render() {
  	return (
      <View style={{flex: 1, backgroundColor:'#555358'}}>
        <View style={{flex: 6, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.title}>{'Toptal Classes'}</Text>
          <View>
          <TextInput 
            style={[styles.textInput]}
            onChangeText={(text) => this.setState({email: text})}
            value={this.state.email}
            placeholder={'Email'}
          autoCapitalize={'none'}
          keyboardType={'email-address'}
          autoCorrect={false}
            />
          </View>
          <View>
          <TextInput 
            style={[styles.textInput]}
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            placeholder={'password'}
            secureTextEntry={true}
            />
          </View>
          <Picker
            style={{width: 240, marginBottom: 16}}
            selectedValue={this.state.role}
            onValueChange={(role) => this.setState({role: role})}
            values={['Admin', 'Student', 'Teacher']}
            />
          {this.props.login.error ? <Text style={styles.error}>{this.props.login.error}</Text> : null}
          <TouchableHighlight onPress={this.signup.bind(this)} underlayColor='transparent'>
            <View style={styles.loginButton}>
              {
                this.props.login.isLogginIn ?
                <Text style={{color: '#555358'}}>{'Signing Up...'}</Text> :
                <Text style={{color: '#555358'}}>{'Sign Up'}</Text>
              }
            </View>
          </TouchableHighlight>
          <View style={styles.signupButton}>
            <TouchableHighlight onPress={this.login.bind(this)} underlayColor='transparent'>
              <Text style={{fontWeight: '200', color: '#C6CA53'}}>{'Login'}</Text>
            </TouchableHighlight>
          </View>
        </View> 
        <View style={{flex: 4}}/>
      </View>
  )
  }
}

let styles = StyleSheet.create({
  title: {
    color: '#C6CA53',
    fontSize: 20,
    fontWeight: '200',
    padding: 16,
  },
  textInput: {
    height: 40,
    width: 260,
    color: '#C6CA53',
    marginTop: 4,
    marginBottom: 4
  },
  loginButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 260,
    borderRadius: 2,
    backgroundColor: '#C9DCB3',
    marginTop: 4,
  },
  signupButton: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 40,
    width: 260,
  },
  error: {
    color: '#F4442E',
    width: 260,
    textAlign: 'center',
    padding: 16
  }
})

export default connect((state) => {
	return {login} = state
}, (dispatch) => {
	return {user: bindActionCreators(Object.assign({}, actions.user), dispatch)}
})(SignUp)
