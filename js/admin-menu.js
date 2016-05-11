import React from 'react-native'
import {connect} from 'react-redux'

let {Component, StyleSheet, Text} = React

class AdminMenu extends Component {
  constructor(props) {
    super(props)
  }

  render() {
  	return (<Text>{'AdminMenu'}</Text>)
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
})(AdminMenu)