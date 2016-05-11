import React from 'react-native'

let {Component, StyleSheet, Text, TouchableHighlight, View} = React;

export default class Picker extends Component {
	render() {
		return (
			<View style={styles.container}>
				{this.items()}
			</View>
		)
	}
	items() {
		var {selectedValue} = this.props;
		onValueChange = this.onValueChange.bind(this);
		return this.props.values.map(function (value) {
			return (
				<TouchableHighlight underlayColor='transparent' key={value} onPress={() => onValueChange(value)}>
					<View style={styles.itemContainer}>
						<Text style={value === selectedValue ? styles.selectedItem : styles.item}>{value}</Text>
					</View>
				</TouchableHighlight>
			)
		});
	}
	onValueChange(value) {
		this.props.onValueChange(value);
	}
}

let styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingTop: 8,
		paddingBottom: 8
	},
	itemContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	item: {
		color: '#C6CA53',
		textAlign: 'center',
		paddingRight: 8,
		paddingLeft: 8,
		padding: 8,
		fontWeight: '200',
	},
	selectedItem: {
		color: '#C6CA53',
		textAlign: 'center',
		paddingRight: 8,
		paddingLeft: 8,
		padding: 8,
		borderWidth: 1,
		borderColor: '#7B7263',
	}
});