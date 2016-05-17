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

  componentWillReceiveProps (props) {
  	this.setState({
  		title: props.detail.title || '',
    	description: props.detail.description || ''
  	})
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
  	var {title, description} = this.state
	this.props.onUpdateClass(this.props.detail.cid, {title, description})
  }

  me() {
  	const uid = this.props.user.uid
  	const students = this.props.detail.students || {}
  	return students[uid]
  }

  statusColor(status) {
  	if (status === 'accepted') { return '#5cb85c' }
  	else if (status === 'rejected') { return '#d9534f' }
  	else { return '#ccc' }
  }

  render() {
  	var title
  	if (this.props.user.role !== 'Student') {
		title = (
  			<View style={{padding: 8}}>
  				<Text style={{color: "#ccc"}}>{'Class Title:'}</Text>
  				<TextInput
  					style={styles.textInput}
  					onChangeText={(text) => this.setState({title: text})}
					value={this.state.title}
					returnKeyType="done"
					enablesReturnKeyAutomatically={true}
					/>
				<Text style={{marginTop: 8, color: "#ccc"}}>{'Class Description:'}</Text>
 				<TextInput
 					style={[styles.textInput, {height: 100}]}
  					onChangeText={(text) => this.setState({description: text})}
					value={this.state.description}
					returnKeyType="done"
					enablesReturnKeyAutomatically={true}
					maxLength={200}
					multiline={true}
					/>					
  			</View>
		)
  	} else {
  		title = (
  			<View style={{padding: 8}}>
  				<Text style={{color: "#ccc"}}>{'Title: '}</Text>
  				<Text style={{fontSize: 20}}>{this.state.title}</Text>
				<Text style={{marginTop: 8, color: "#ccc"}}>{'Description: '}</Text>
				<Text style={{fontSize: 20}}>{this.state.description}</Text>  				
  			</View>
		)
  	}

  	var primary
  	if (this.props.user.role !== 'Student') {
  		primary = (
  			<TouchableHighlight style={styles.action} underlayColor='transparent' onPress={() => this.saveChanges()}>
				<Text style={[styles.status, {backgroundColor: '#337ab7'}]}>Save Changes</Text>
			</TouchableHighlight>  
		)
  	} else {
  		primary = (<View/>)
  	}

  	var action
  	if (this.props.user.role === 'Teacher') {
  		action = (<View/>)
  	} else {
  		const me = this.me()
  		if (me && me.status && me.status !== '') {
  			if (me.status === 'rejected') {
  				action = (
					<Text style={[styles.status, {backgroundColor: '#d9534f'}]}>
						{'Attendence status: Rejected'}
					</Text>
				)
  			} else if (me.status === 'accepted') {
	  			action = (
					<Text style={[styles.status, {backgroundColor: '#5cb85c'}]}>
						{'Attendence status: Accepted'}
					</Text>
				)
  			} else {
	  			action = (
					<Text style={[styles.status, {backgroundColor: '#CCC'}]}>
						{'Attendence status: Request Pending'}
					</Text>
				)  				
  			}
  		} else {
	  		action = (
				<TouchableHighlight style={styles.action} underlayColor='transparent' onPress={() => this.attendClass()}>
					<Text style={[styles.status, {backgroundColor: '#337ab7'}]}>I attended this course!</Text>
				</TouchableHighlight>	
			)
	  	}
  	}

	const students = Object.keys(this.props.detail.students || {})
	const studentList = students.map((uid) => {
		const student = this.props.detail.students[uid]
		if (this.props.user.role !== 'Student') {		
			return (
				<TouchableHighlight 
					key={uid}
					underlayColor='transparent' 
					onPress={() => this.props.onSelectStudent(uid)}>
					<View style={{flexDirection: 'row', justifyContent: 'space-around', paddingTop: 16, paddingBottom: 16}}>
						<Text>{student.username}</Text>
						<Text style={{color: this.statusColor(student.status)}}>{student.status}</Text>
					</View>
				</TouchableHighlight>
			)
		} else {
			return (
				<View key={uid} style={{flexDirection: 'row', justifyContent: 'space-around', paddingTop: 16, paddingBottom: 16}}>
					<Text>{student.username}</Text>
				</View>
			)
		}
	})

  	return (
      <View style={{flex: 1}}>
        <View style={styles.bar}/>
        <View style={styles.navigation}>
        	<TouchableHighlight 
        		underlayColor='transparent' 
				onPress={() => this.props.navigator.pop()}>
        		<Text style={styles.navButton}>{'Back'}</Text>
        	</TouchableHighlight>
        	<Text style={styles.navTitle}>{'Class Details'}</Text>
        	<TouchableHighlight 
        		underlayColor='transparent' 
				onPress={() => this.props.onLogout()}>
        		<Text style={styles.navButton}>{'Logout'}</Text>
    		</TouchableHighlight>
        </View>
        <ScrollView>
    		<View>
    			{title}
    			{primary}
    			{action}
    			<Text style={{marginTop: 16, textAlign: 'center'}}>{'Students Attenting this class'}</Text>
    			<View style={{height: 1, backgroundColor: '#ccc', marginTop: 8, marginBottom: 8}}/>
    			{studentList}
    		</View>
    	</ScrollView>
      </View>
    )
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
  status: {
  	color: '#FFFFFF',
  	textAlign: 'center',
  	paddingTop: 16,
  	paddingBottom: 16,
  	margin: 4
  },
  textInput: {
    fontSize: 15,
    flex: 1,
    height: 30,
    color: '#C6CA53',
    marginTop: 4,
    marginBottom: 4,
  },
  action: {
  	margin: 4
  }
})

export default ClassDetail