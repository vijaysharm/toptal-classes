import React from 'react-native'

let {Component, ScrollView, StyleSheet, Text, TouchableHighlight, View} = React

class ClassDetailStudent extends Component {
  constructor(props) {
    super(props)
  }

  setStatus(status) {
  	const student = this.props.detail.students[this.props.student]
	this.props.onUpdateClass(this.props.detail.cid, this.props.student, {
		username: student.username,
		status: status
	})
  }

  statusColor(status) {
  	if (status === 'accepted') { return '#5cb85c' }
  	else if (status === 'rejected') { return '#d9534f' }
  	else { return '#ccc' }
  }

  render() {
  	const student = this.props.detail.students[this.props.student]
  	return (
        <View style={{flex: 1}}>
        	<View style={styles.bar}/>
        	<View style={styles.navigation}>
	    		<TouchableHighlight 
	    			underlayColor='transparent' 
					onPress={() => this.props.navigator.pop()}>
	    			<Text style={styles.navButton}>{'Back'}</Text>
	    		</TouchableHighlight>
          		<Text style={styles.navTitle}>{'Classes'}</Text>
      			<TouchableHighlight 
        			underlayColor='transparent' 
    				onPress={() => this.props.onLogout()}>
        			<Text style={styles.navButton}>{'Logout'}</Text>
          		</TouchableHighlight>
      		</View>
	        <ScrollView style={{flex: 1}}>
		        <View style={{flex: 1}}>
		        	<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 16, paddingTop: 16}}>
		        		<Text style={{fontSize: 24}}>{student.username}</Text>
		        		<View style={{flexDirection: 'row'}}>
		        			<Text style={{fontSize: 14, marginBottom: 8}}>Attendence Status: </Text>
		        			<Text style={{fontSize: 14, color: this.statusColor(student.status)}}>
		        				{student.status}
		    				</Text>
		        		</View>
		        	</View>
			        <View style={{flexDirection: 'row', flex: 1}}>
			        	<TouchableHighlight
			        		style={{flex: 1}}
			        		underlayColor='transparent' 
		            		onPress={() => this.setStatus('accepted')}>
			        		<Text style={{color: '#FFFFFF', backgroundColor: '#5cb85c', textAlign: 'center', paddingTop: 16, paddingBottom: 16}}>
			        			{'Accept'}
		        			</Text>
			        	</TouchableHighlight>
			        	<TouchableHighlight
			        		style={{flex: 1}}
			        		underlayColor='transparent' 
		            		onPress={() => this.setStatus('rejected')}>
			        		<Text style={{color: '#FFFFFF', backgroundColor: '#d9534f', textAlign: 'center', paddingTop: 16, paddingBottom: 16}}>
		        				{'Reject'}
		    				</Text>
			        	</TouchableHighlight>
			        </View>
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
  }
})

export default ClassDetailStudent