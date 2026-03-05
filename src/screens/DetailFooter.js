import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import * as strings from './strings';
import * as colors from './colors';

import { getTextSize, getStyle, ACCESS } from '../Cortex';
// import colors from './colors';

/**
 * this class handles footer of ItemDetals.js && JewelryItemDetails.js
 */
export default class DetailFooter extends Component {
	constructor (props) {
		super(props);
	}

	getShare () {
		if (ACCESS != strings.continueAsGuest && ACCESS != strings.registered) { return this.props.actionShare(); }
		return this.props.guestShare();
	}

	render () {
		return (

			<View style={getStyle(styles.headerStyle, styles.tabletHeaderStyle)}>

				{/* for some reason, status bar works ok, even without defining it */}

				<View style={styles.headerElementsStyle}>
					{this.props.actionContact()}

					{this.getShare() }

				</View>
			</View>

		);
	}
}

const styles = StyleSheet.create({

	tabletHeaderStyle:
	{
		width: '100%',
		// height: '8%',
		backgroundColor: colors.searchHeaderColor,
		justifyContent: 'center', // 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		// padding: getTextSize(7), //7,
		height: getTextSize(40) // ASPECT_RATIO * 70 //getTextSize(50),

	},

	headerStyle:
	{
		width: '100%',
		backgroundColor: colors.searchHeaderColor,
		justifyContent: 'center',
		flexDirection: 'row',
		alignItems: 'center',
		padding: getTextSize(7), // 7,
		height: getTextSize(50)

	},
	textStyle:
	{
		fontSize: getTextSize(15), // 17,
		color: colors.white,
		fontFamily: 'PlayfairDisplay-Regular'

	},

	touchableStyle:
	{
		padding: getTextSize(7), // 7,
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '25%',
		alignItems: 'center'
	},

	imageStyle:
	{
		resizeMode: 'stretch',
		padding: getTextSize(7), // 7,
		alignSelf: 'center', // 'flex-end',
		height: getTextSize(15), // 15,
		width: getTextSize(15) // 15
	},
	innerView:
	{
		flexDirection: 'row',
		justifyContent: 'space-between',
		height: '10%',
		width: '15%'

	},
	headerElementsStyle:
	{
		// marginTop: 10,
		width: '90%',
		backgroundColor: colors.searchHeaderColor,
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'center'
	}

});
