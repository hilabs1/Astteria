import React, { Component } from 'react';

import { WebView, TouchableOpacity, View, StyleSheet, Image, Dimensions, ScrollView, Platform } from 'react-native';
import { getTextSize } from '../Cortex';

import * as strings from './strings';
import * as colors from './colors';
import CertificateFooter from './CertificateFooter';

var offline = false;

export default class CertView extends Component {
/**
 * [constructor]
 * @param  <T> props [props passed from parent component
 *                   action: refers to parent's openLink()]
 *
 *         states: data -> contains certificate url
 *
 * @return void      [description]
 */
	constructor (props) {
		super(props);
		// this.share = this.share.bind(this);
		this.state = {
			loading: false,
			[strings.offlineMode]: this.props.navigation.getParam('offlineLink', strings.none)
		};
	}

	static defaultProps = {
		doAnimateZoomReset: false,
		maximumZoomScale: 3,
		minimumZoomScale: 1,
		zoomHeight: Dimensions.get('window').height,
		zoomWidth: Dimensions.get('window').width
	}

	/**
 * [handleResetZoomScale triggered by touchable's onPress]
 * 		handles zoom in & zoom out
 * @param  zooming event  [the even when a user zooms in or out]
 * @return void           [description]
 */
	handleResetZoomScale = (event) => {
	// console.log('certView: TKT_1: handleResetZoomScale ~~~~~~~~~~~~~~~~~~~~~~~');
		this.scrollResponderRef.scrollResponderZoomTo({
			x: 0,
			y: 0,
			width: this.props.zoomWidth,
			height: this.props.zoomHeight,
			animated: true
		});
	}

/**
 * [setZoomRef triggered by scrollview's ref
 * 		handles accessing zooming of scrollview]
 * @param  Node node     [?]
 * @return void       	 [description]
 */
setZoomRef = node => { // the ScrollView has a scrollResponder which allows us to access more methods to control the ScrollView component
	if (node) {
		this.zoomRef = node;
		this.scrollResponderRef = this.zoomRef.getScrollResponder();
	}
}

/**
 * [getView triggered by render
 * 		handles different types of certificate links
 * 		PDF -> shown in a WebView
 * 		png/jpg -> shown in an Image component]
 * @return {[type]} [description]
 */
getView () {
	// certUrl that works: http://dtol-cert-images.s3-website-us-east-1.amazonaws.com/GIA_jpg/2175189103.jpg
	// console.log('certView: TKT_3: getView ~~~~~~~~~~~~~~~~~~~~~~~');
	var certURL = this.props.navigation.getParam('data', strings.unlisted); // 'https://mediaen.asteriadiamonds.com/certs/1179040659.pdf'; //this.props.navigation.getParam('data', strings.unlisted); //getting url from props
	var alt = this.props.navigation.getParam('alt', strings.unlisted);
	var lab = this.props.navigation.getParam('lab', strings.unlisted);

	var certDisplay = certURL;

	if (certURL != strings.unlisted) {
		if (certURL.toUpperCase().includes('PDF')) { // pdf workd for ios
			if (Platform.OS === 'ios') {
				return <View
					style = {styles.webViewWrapperStyle}>
					<WebView
						source = {{ uri: certDisplay }}
						style={styles.pdfViewStyle}>
					</WebView>

					<CertificateFooter linkURL = {certURL}
						alt = {alt}
						lab = {lab}
						offline = {offline}/>

				</View>;
			} else {
				return <View style = {styles.webViewWrapperStyle} >
					<WebView style = {styles.pdfViewStyle}
						source = {{ uri: 'http://docs.google.com/gview?embedded=true&url=' + certDisplay }}></WebView>

					<CertificateFooter linkURL = {certDisplay}
						alt = {alt}
						lab = {lab}
						offline = {offline}/>
				</View>;
			}
		} else { // images work for both android && ios
			if (Platform.OS === 'android') { /// TODO ANDROID SHARE!!!!
				return <View style = {styles.webViewWrapperStyle} >
					<Image style = {styles.androidImageStyle}
						source = {{ uri: certDisplay }}
						resizeMode = 'contain'></Image>

					<CertificateFooter linkURL = {certDisplay}
						alt = {alt}
						lab = {lab}
						offline = {offline}/>
				</View>;
			} else {
				return <View style = {styles.webViewWrapperStyle} >
					<ScrollView
						contentContainerStyle = {styles.scrollViewStyle}
						maximumZoomScale={this.props.maximumZoomScale}
						minimumZoomScale={this.props.minimumZoomScale}
						showsHorizontalScrollIndicator={false}
						showsVerticalScrollIndicator={false}
						ref={this.setZoomRef} // helps us get a reference to this ScrollView instance
						style={{ overflow: 'hidden' }}>
						<TouchableOpacity style = {styles.temp}
							onPress={this.handleResetZoomScale}>
							<Image style = {styles.imageStyle}
								source = {{ uri: /* CERT_PREFIX + */ certDisplay }}
								resizeMode = 'contain'></Image>
						</TouchableOpacity>
					</ScrollView>

					<CertificateFooter linkURL = {certURL}
						alt = {alt}
						lab = {lab}
						offline = {offline}/>

				</View>;
			}
		}
	}
}

render () {
 	return (
 		this.getView()
 	);
}
}

const styles = StyleSheet.create({

	loaderTextStyle:
	{
		fontFamily: 'PlayfairDisplay-Regular',
		alignSelf: 'center',
		color: colors.white,
		fontSize: getTextSize(15)
	},

	loaderStyle:
	{
		position: 'absolute',
		top: Dimensions.get('window').height / 3,
		alignSelf: 'center',
		backgroundColor: colors.blueButton,
		height: getTextSize(100),
		width: getTextSize(200),
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 40,
		overflow: 'hidden'
	},

	webViewWrapperStyle:
	{
		flex: 1,
		height: Dimensions.get('window').height,
		width: Dimensions.get('window').width
	},

	pdfViewStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.trans
	},

	androidImageStyle:
	{
		flex: 1,
		alignSelf: 'stretch',
		height: undefined,
		width: undefined

	},

	imageStyle:
	{
		flex: 1,
		alignSelf: 'flex-start',
		height: Dimensions.get('window').height,
		width: Dimensions.get('window').width
	},
	scrollViewStyle:
	{
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		height: '100%',
		backgroundColor: colors.cert
		// backgroundColor: 'green'
	},
	temp:
	{
		backgroundColor: colors.cert,
		// backgroundColor: 'red',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		height: '90%'
	}
});
