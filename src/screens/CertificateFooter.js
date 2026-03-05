import React, { Component } from 'react';
import { Text, Image, Button, StyleSheet, View, Platform, StatusBar, TouchableOpacity, Modal } from 'react-native';
import * as strings from './strings';
import * as colors from './colors';
import * as styling from './styling';

import { getTextSize, generateCertPDF, send, getStyle, ASPECT_RATIO, TEXT } from '../Cortex';
// import colors from './colors';

/**
 * this class handles footer of ItemDetals.js && JewelryItemDetails.js
 */
export default class CertificateFooter extends Component {
	constructor (props) {
		super(props);
		// console.log('certificateFooter: TKT_0: constructor(): this.props.linkURL: '+ this.props.linkURL);
		// console.log('certificateFooter: TKT_1: constructor(): this.props.alt: '+ this.props.alt);
	}

	dummy () {
		return 'certificateFooter: TKT_4: dummy';
	}

	/* componentDidMount()
	{
    	console.log('certificateFooter: TKT: componentDidMount(): ');
 	}
 	*/

	async shareCert () {
		/* let filePath = await generateCertPDF(this.props.linkURL, this.props.alt);
 		console.log('certificateFooter: TKT_371: send shareCert filePath: '+filePath);

 		send(filePath, false); */

		if (this.props.offline) {
			send(this.props.linkURL, false);
		} else {
			var generated = generateCertPDF(this.props.linkURL, this.props.alt, this.props.lab).then((generated) => {
				send(generated, false);
			});
		}
	}

	render () {
		return (

			<View style={getStyle(styles.headerStyle, styles.tabletHeaderStyle)}>

				{/* for some reason, status bar works ok, even without defining it */}

				<TouchableOpacity
					style = {getStyle(styles.touchableStyle, styles.tabletTouchableStyle)}
					onPress = {() => this.shareCert() } >
					<Image style={getStyle(styles.imageStyle, styles.tabletImageStyle)}
						source={require('../assets/pics/share.png')}>
					</Image>

					<Text style={getStyle(styles.textStyle, styles.tabletTextStyle)}>{TEXT.share}</Text>

				</TouchableOpacity>

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
		// height: '8%',
		backgroundColor: colors.searchHeaderColor,
		justifyContent: 'center',
		flexDirection: 'row',
		alignItems: 'center',
		padding: getTextSize(7), // 7,
		height: getTextSize(50)

	},
	textStyle:
	{
		fontSize: getTextSize(20), // 17,
		color: colors.white,
		fontFamily: styling.textFont // 'PlayfairDisplay-Regular'

	},

	tabletTextStyle:
	{
		fontSize: getTextSize(15), // 17,
		color: colors.white,
		fontFamily: styling.textFont// 'PlayfairDisplay-Regular'

	},

	touchableStyle:
	{
		// backgroundColor: 'red',
		// padding: getTextSize(7), //7,
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '20%',
		alignItems: 'center'
		// marginLeft: 20,
		// marginRight: 20
	},

	tabletTouchableStyle:
	{
		// backgroundColor: 'red',
		// padding: getTextSize(7), //7,
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '18%',
		alignItems: 'center'
		// marginLeft: 20,
		// marginRight: 20
	},

	imageStyle:
	{
		resizeMode: 'stretch',
		padding: getTextSize(7), // 7,
		alignSelf: 'center', // 'flex-end',
		// backgroundColor: 'pink',
		height: getTextSize(20), // 15,
		width: getTextSize(20) // 15
	},

	tabletImageStyle:
	{
		resizeMode: 'stretch',
		padding: getTextSize(7), // 7,
		alignSelf: 'center', // 'flex-end',
		// backgroundColor: 'pink',
		height: getTextSize(10), // 15,
		width: getTextSize(10) // 15
	}

});
