import React from 'react-native'
let {Component, ListView, StyleSheet, Text, TextInput, TouchableHighlight, View} = React

class ClassList extends Component {
  constructor(props) {
    super(props)

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    })

    this.state = {
      classname: '',
      dataSource: dataSource.cloneWithRows(props.list.items)
    }
  }

  componentWillReceiveProps(props) {
    const {dataSource} = this.state;
    this.setState({
      dataSource: dataSource.cloneWithRows(props.list.items)
    });
  }

  addClass() {
    const {classname} = this.state;
    this.setState({classname: ''})
    this.props.onAddClass({
      title: classname
    })
  }

  render() {
    if (this.props.list.error) {
      return (
        <View style={styles.loading}>
          <Text>Failed to load class list</Text>
        </View>
      )
    }

    var header;
    if (this.props.user.role === 'Student') {
      header = (<View/>)
    } else {
      header = (
        <View style={styles.textInputContainer}>
          <TextInput
            style={[styles.textInput]}
            onChangeText={(text) => this.setState({classname: text})}
            value={this.state.classname}
            placeholder={'Add class'}
            returnKeyType="done"
            enablesReturnKeyAutomatically={true}
            onEndEditing={this.addClass.bind(this)}
            />
        </View>
      )
    }

    var body;
    if (this.props.list.items && this.props.list.items.length && this.props.list.items.length > 0) {
      body = (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          style={styles.listView}/>
      )
    } else {
        body = (<View style={styles.emptyList}><Text>{'There are no classes'}</Text></View>)
    }

  	return (
      <View style={styles.container}>
        <View style={styles.bar}/>
        <View style={styles.navigation}>
          <Text style={styles.navTitle}>{'Classes'}</Text>
          <TouchableHighlight 
            underlayColor='transparent' 
            onPress={() => this.props.onLogout()}>
            <Text style={styles.navButton}>{'Logout'}</Text>
          </TouchableHighlight>
        </View>
        {header}
        {body}
      </View>
    )
  }

  renderRow(item, _, index) {
    var students = item.students || {}
    var count = Object.keys(students).length
    var label = count === 1 ? `${count} student` : `${count} students`
    return (
      <TouchableHighlight underlayColor='transparent' onPress={() => this.selectItem(item, index)}>
        <View style={styles.row}>
          <Text style={styles.rowTitle}>{item.title}</Text>
          <Text style={{paddingRight: 8}}>{label}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  selectItem(item, index) {
    console.log('Item at index: ' + index + ' clicked')
    this.props.onSelectClass(item)
  }
}

let styles = StyleSheet.create({
  bar: {
    backgroundColor: '#555358',
    height: 24
  },
  navigation: {
    height: 40,
    backgroundColor: '#777579',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  },
  navTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#FFFFFF'
  },
  navButton: {
    textAlign: 'center',
    color: '#FFFFFF',
    paddingRight: 8,
    paddingLeft: 8
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1
  },
  textInputContainer: {
    padding: 3,
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#777579'
  },
  textInput: {
    fontSize: 15,
    flex: 1,
    height: 30,
    color: '#C6CA53',
    marginTop: 4,
    marginBottom: 4,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listView: {

  },
  row: {
    height: 48,
    borderWidth: 1,
    borderColor: '#555358',
    borderRadius: 4,
    marginTop: 2,
    marginBottom: 2,
    marginRight: 4,
    marginLeft: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  rowTitle: {
    paddingLeft: 8,
    flex: 1
  }
})

export default ClassList