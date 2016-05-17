import React from 'react-native'

let {Component, StyleSheet, Text} = React

class ClassDetailStudent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
  	return (<Text>{'ClassDetailStudent'}</Text>)
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default ClassDetailStudent