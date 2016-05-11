import React from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import actions from './actions'

let {Component, StyleSheet, Text} = React

class TeacherClassDetail extends Component {
  constructor(props) {
    super(props)
  }

  render() {
  	return (<Text>{'TeacherClassDetail'}</Text>)
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default connect((state) => {
	return {}
}, (dispatch) => {
	return {}
})(TeacherClassDetail)