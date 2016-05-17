import React from 'react-native'
let {Component, ListView, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View} = React

class ClassDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
    	title: props.detail.title || '',
    	description: props.detail.description || ''
    }
  }

  attendClass() {
  	var students = {}
  	students[this.props.user.uid] = {
  		username: this.props.user.username,
  		status: 'pending'
  	}
	this.props.onUpdateClass(this.props.detail.cid, {students})
  }

  saveChanges() {
	console.log('Save changes')
  }

  me() {
  	const uid = this.props.user.uid
  	return this.props.detail.students[uid]
  }

  render() {
  	var title
  	if (this.props.user.role !== 'Student') {
		title = (
  			<View style={styles.titleLabelContainer}>
  				<Text>{'Title: '}</Text>
  				<TextInput
  					onChangeText={(text) => this.setState({title: text})}
					value={this.state.title}
					placeholder={'Class Title'}
					returnKeyType="done"
					enablesReturnKeyAutomatically={true}
					/>
  			</View>
		)
  	} else {
  		title = (
  			<View style={styles.titleLabelContainer}>
  				<Text>{'Title: '}</Text>
  				<Text>{this.state.title}</Text>
  			</View>
		)
  	}

  	var action
  	if (this.props.user.role === 'Teacher') {
  		action = (
  			<TouchableHighlight underlayColor='transparent' onPress={() => this.attendClass()}>
				<Text style={[styles.status, {backgroundColor: '#337ab7'}]}>Save Changes</Text>
			</TouchableHighlight>  
		)
  	} else {
  		const me = this.me()
  		if (me && me.status && me.status !== '') {
  			if (me.status === 'rejected') {
  				action = (
					<Text style={[styles.status, {backgroundColor: '#d9534f'}]}>
						{'Rejected'}
					</Text>
				)
  			} else if (me.status === 'accepted') {
	  			action = (
					<Text style={[styles.status, {backgroundColor: '#5cb85c'}]}>
						{'Accepted'}
					</Text>
				)
  			} else {
	  			action = (
					<Text style={[styles.status, {backgroundColor: '#CCC'}]}>
						{'Request Pending'}
					</Text>
				)  				
  			}
  		} else {
	  		action = (
				<TouchableHighlight underlayColor='transparent' onPress={() => this.attendClass()}>
					<Text style={[styles.status, {backgroundColor: '#337ab7'}]}>Attended course</Text>
				</TouchableHighlight>  			
			)
	  	}
  	}

  	var studentList
  	if (this.props.user.role !== 'Student') {
  		studentList = (
			<View>StudentList</View>
		)
  	} else {
  		studentList = (<View/>)
  	}

  	return (
      <View style={styles.container}>
        <View style={styles.bar}/>
        <View style={styles.navigation}>
        	<Text>{'Class Details'}</Text>
        </View>
        <ScrollView>
    		<View>
    			{title}
    			{action}
    			{studentList}
    		</View>
    	</ScrollView>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bar: {
    backgroundColor: '#555358',
    height: 24
  },
  navigation: {
  	height: 40,
  	backgroundColor: '#777579',
  	justifyContent: 'center',
  	alignItems: 'center'
  },
  titleLabelContainer: {
  	flexDirection: 'row'
  },
  status: {
  	color: '#FFFFFF',
  	textAlign: 'center',
  	paddingTop: 16,
  	paddingBottom: 16
  }
})

export default ClassDetail