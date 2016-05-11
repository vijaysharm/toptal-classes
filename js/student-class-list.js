import React from 'react-native'
import {connect} from 'react-redux'

let {Component, StyleSheet, Text} = React

class StudentClassList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
  	return (<Text>{'StudentClassList'}</Text>)
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
})(StudentClassList)