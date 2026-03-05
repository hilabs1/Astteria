import React, { Component } from 'react';
import { Text, View, Image, TextInput, StyleSheet, TouchableWithoutFeedback, Button, ScrollView, BackHandler, StatusBar, KeyboardAvoidingView, Keyboard, Linking, Alert, Platform, TouchableOpacity, Dimensions, ProgressBarAndroid, ProgressViewIOS, Switch, CheckBox } from 'react-native';
// import MailCore from 'react-native-mailcore';

import * as strings from './strings';
import * as colors from './colors';
import * as indices from './indices';
import * as styling from './styling';

import { getTextSize, ITEMS_TO_DOWNLOAD, FIRST_ITEMS_TO_DOWNLOAD, put, get, dataMatrix, gemDataMatrix, IMAGE_PREFIX, CERT_PREFIX, downloadFile, getStyle } from '../Cortex';
var counter;
var denominator;

export default class Offline extends Component {
/**
 * [constructor]
 * @param  <T> props [props passed from parent component
 *                   id: refers to item lotId and only gets a value when user is redirected here from itemDetails || jewelryItemDetails]
 *
 *         states: each textInput is associated with an input state which indicates if user typed sth
 *
 * @return void      [description]
 */
	constructor (props) {
		super(props);
		denominator = ITEMS_TO_DOWNLOAD;// gemDataMatrix.length;// + dataMatrix.length;
		this.state = {
			progressState: strings.download,
			downloading: false,
			onlyFirstPicsState: false,
			progressPercentage: 1 / denominator, // this.getPercentage(this.onlyFirstPicsState),
			displayFinished: styles.invisibleText,
			numeratorDisplay: 0,
			[strings.turnOnOffline]: false, // get(strings.turnOnOffline) ,
			denominator: ITEMS_TO_DOWNLOAD
		};
		this.handleView();
		this.displayFinished();
	}

	handleView () {
		get(strings.turnOnOffline).then((state) => {
			if (state) {
				this.setState({
					[strings.turnOnOffline]: state
				});
			}
		});

	/* get(strings.downloading).then((state) =>
	{
		console.log('offlineMode: TKT_7: downloading state: ' + state);
		if(state)
		{
			this.setState({
				downloading: true,
				progressState: strings.downloading,
			})
			put(strings.finished, false);
		}
	});
	get(strings.onlyFirstPics).then((state) =>
	{
		console.log('offlineMode: TKT_7: first pic state: state: ' + state);
		if(state != null)
		{
			this.setState({
				onlyFirstPicsState: state,
			})
		}
	}) */
	}

	//= ==== android onBackPressed handle
	componentDidMount () {
		// console.log('offlineMode: TKT_3: componentDidMount ~~~~~~~~~~~~~~~~~~~~~~~');
		BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
	}

	handleBackButton () {
		// console.log('offlineMode: TKT_5: handleBackButton ~~~~~~~~~~~~~~~~~~~~~~~');
		return true;
	}
	/* componentWillUnmount()
	{
		//console.log('offlineMode: TKT_7: componentWillUnmount ~~~~~~~~~~~~~~~~~~~~~~~');
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)
	} */

	getProgressBar () {
	// console.log('offlineMode: TKT_7:ITEMS_TO_DOWNLOAD: ' + ITEMS_TO_DOWNLOAD);
	// var progress = 1/ITEMS_TO_DOWNLOAD;
	// progress = 1/progress;

		if (Platform.OS === 'android') {
			if (this.state.downloading) {
			// downloadManager();
				return <ProgressBarAndroid
					style = {styles.progressBarStyle}
					styleAttr = "Horizontal"
					indeterminate={false}
					progress = {this.state.progressPercentage}
					color= {colors.blueButton} />;
			}
		} else {
		// console.log('offlineMode: TKT_7: ios: ITEMS_TO_DOWNLOAD: ' + ITEMS_TO_DOWNLOAD);
			// console.log('offlineMode: TKT_7: ios: FIRST_ITEMS_TO_DOWNLOAD: ' + FIRST_ITEMS_TO_DOWNLOAD);
			if (this.state.downloading) {
			// downloadManager();
				return <ProgressViewIOS
					style = {styles.progressBarStyle}
					styleAttr = "Horizontal"
					indeterminate={false}
					progress = {this.state.progressPercentage}
					color= {colors.blueButton} />;
			}
		}
	}

	startDownload () {
		// console.log('offlineMode: TKT_7: startDownload this.state.progressState: '+this.state.progressState);

		if (this.state.progressState == strings.download) {
		// console.log('offlineMode: TKT_7: startDownload in here: ');
			this.setState({
				progressState: strings.downloading,
				downloading: true,
				displayFinished: styles.invisibleText

			});

			this.downloadManager();
		} else { // TODO this should make button disabled, but hold on a sec
		// console.log('offlineMode: TKT_7: startDownload out there: ');
			this.setState({
				progressState: strings.download,
				downloading: false
			});
		}

	// TODO set timeout thingy
	}

	/**
 * [checkboxDef triggered by render (bottom)
 * 		handles picker appearence according to OS]
 * @return Switch/Checkbox [for ios or android respectively]
 */
	checkboxDef (stateName) {
	// console.log('colorWhite: TKT_25: checkboxDef stateName: '+stateName);

		if (Platform.OS === 'ios') {
			return <Switch style={styling.styles.idCheckBoxStyle}
				value={this.state[stateName]}
				onValueChange={() => this.flip(stateName)}
				disabled = {this.state.downloading}/>;
		} else {
			return <CheckBox style={styling.styles.idCheckBoxStyle}
				value={this.state[stateName]}
				onValueChange={() => this.flip(stateName)}
				disabled = {this.state.downloading}/>;
		}
	}

	flip (stateName) {
	// console.log('colorWhite: TKT_25: stateName: '+ stateName);
	// console.log('colorWhite: TKT_25: stateName: '+ stateName);

		this.setState({
			[stateName]: !this.state[stateName]
		}, () => {
			if (stateName == 'onlyFirstPicsState') {
				if (this.state[stateName]) {
				// console.log('colorWhite: TKT_25: FIRST_ITEMS_TO_DOWNLOAD: '+ FIRST_ITEMS_TO_DOWNLOAD);
					this.setState({
						denominator: FIRST_ITEMS_TO_DOWNLOAD
					});
				} else {
				// console.log('colorWhite: TKT_25: ITEMS_TO_DOWNLOAD: '+ ITEMS_TO_DOWNLOAD);
					this.setState({
						denominator: ITEMS_TO_DOWNLOAD
					});
				}
			}
		});
	}

	displayFinished () {
		get(strings.finished).then((ans) => {
			if (ans) {
			// console.log('colorWhite: TKT_25: ans: '+ans);
				this.setState({
					displayFinished: styles.visibleText
				});
			} else {
			// console.log('colorWhite: TKT_25: invisibleText: ');
				this.setState({
					displayFinished: styles.invisibleText
				});
			}
		});
	}

	async downloadManager () {
	// console.log('offline: TKT_501: downloadManagers: ');

		// console.log('offline: TKT_503:  downloadManager() alls: '+ (dataMatrix.length + gemDataMatrix.length));

		var addition;
		var allItemLength = dataMatrix.length + gemDataMatrix.length;
		var linkArr = [];
		var offlineLinksArr = [];
		var allItemMat = dataMatrix.concat(gemDataMatrix);
		// console.log('offline: TKT_503:  downloadManager() gemDataMatrix.length '+ allItemMat.length);

		if (this.state.onlyFirstPicsState) {
			linkArr = [indices.link1];//, indices.link2, indices.link3, indices.link4, indices.link5, indices.link6, indices.certificateLink]
			offlineLinksArr = [indices.offlineLink1];
			counter = FIRST_ITEMS_TO_DOWNLOAD;// 52//FIRST_ITEMS_TO_DOWNLOAD;

		// console.log('offline: TKT_501: downloadManager: firstOnly linkArr: '+linkArr);
		} else {
			linkArr = [indices.link1, indices.link2, indices.link3, indices.link4, indices.link5, indices.link6, indices.certificateLink];
			offlineLinksArr = [indices.offlineLink1, indices.offlineLink2, indices.offlineLink3, indices.offlineLink4, indices.offlineLink5, indices.offlineLink6, indices.offlineCertLink];
			counter = ITEMS_TO_DOWNLOAD; // 282;//ITEMS_TO_DOWNLOAD;
		// console.log('offline: TKT_501: downloadManager: firstOnly linkArr: '+linkArr);
		}
		addition = 1 / counter;

		// console.log('offline: TKT_501: downloadManager: linkArr: '+linkArr);

		// while(counter > 0)
		// {
		// console.log('offline: TKT_505:  downloadManager() counter: '+counter);
		// console.log('offline: TKT_505:  downloadManager() allItemMat.length: '+allItemMat.length);
		for (let i = 0; i < allItemLength; i++) { // download for gems for now
			for (let j = 0; j < linkArr.length; j++) {
				var link = allItemMat[i][linkArr[j]];
				// console.log('offline: TKT_505:  downloadManager() linkArr[j]: ' + linkArr[j]);
				// console.log('offline: TKT_505:  downloadManager() link: ' + link);
				var fileName = link;

				if (link && link != strings.none) {
					if (!link.includes('http')) { // handle bashari links
						// fileName = link;
						if (!link.includes('pdf')) { link = IMAGE_PREFIX + link; } else { link = CERT_PREFIX + link; }
						// console.log('offline: TKT_505:  downloadManager() link: '+link);
					}
					// console.log('offline: TKT_505:  downloadManager() link: '+link);
					link = link.replace(/\s/g, '');
					// console.log('offline: TKT_505:  downloadManager() outside link: ' + link);

					if (link.includes('pdf')) {
						// console.log('offline: TKT_505:  downloadManager() pdf file: ');
						// counter  = counter -1;
						// console.log('offline: TKT_505:  asyncDownload() pdf: couner link: '+link );
						// console.log('offline: TKT_505:  asyncDownload() pdf: couner out: '+counter + ' i: ' + i );
						downloadFile(link, fileName, counter).then((path) => {
							if (path) {
								// console.log('offline: TKT_505:  AY pdf' );
								allItemMat[i][offlineLinksArr[j]] = path;

								// this.showProgress(addition);//, i, allItemLength);
							}
							// else
							this.showProgress(addition);
						});
					} else { // images
						// counter  = counter -1;
						// console.log('offline: TKT_505:  asyncDownload() img: couner out: '+counter + ' i: ' + i );
						downloadFile(link, fileName, counter).then((path) => {
							if (path) {
								// console.log('offline: TKT_505:  AY img' );
								// console.log('offline: TKT_505:  asyncDownload() img: fileName: '+fileName );
								allItemMat[i][offlineLinksArr[j]] = path;

								// this.showProgress(addition);//, i, allItemLength);
							}
							// else
							this.showProgress(addition);
						});
					}

					// handle download
				}// if

				// counter 80: alt: 83: alt-counter: 83-80:
			}// for for
			counter--;
		}// for
		// }

		return true;
	}// func

	handleFinished () {
		put(strings.downloading, false);
		put(strings.onlyFirstPics, false);
		put(strings.finished, true);
		// Alert.alert(strings.finished);
		/* Alert.alert(
		'Download Finished!',
		[{text: 'OK', onPress: () => console.log('offline: TKT_505: showProgress ');}]); */
		// Alert.alert('Download Finished!', {text: 'OK', onPress: () => console.log('offline: TKT_505: done ')})

		this.setState({
			progressState: strings.download,
			downloading: false,
			onlyFirstPicsState: false,
			progressPercentage: 1 / denominator, // ITEMS_TO_DOWNLOAD,//1,//this.getPercentage(this.onlyFirstPicsState),
			displayFinished: styles.visibleText
		}, () => {
		// console.log('offline: TKT_505:  n done');
			Alert.alert(
				strings.finished,
				' ',
				[
					{ text: 'OK', onPress: () => this.props.navigation.navigate('welcome') }
				],
				{ cancelable: false }
			);
			return true;
		});
	}

	showProgress (addition) {
		this.setState({
			progressPercentage: (this.state.progressPercentage + addition),
			numeratorDisplay: (this.state.numeratorDisplay + 1)
		}, () => {
			if (this.state.numeratorDisplay == this.state.denominator) { this.handleFinished(); }
		});
	}

	turnOnOffline () {
	// console.log('offline: TKT_505:  this.state[strings.turnOnOffline]: '+ this.state[strings.turnOnOffline]);
		if (this.state[strings.turnOnOffline]) {
			put(strings.turnOnOffline, true);
			return <View style = {getStyle(styles.innerViewStyle, styles.tabletInnerViewStyle)} >

				<View style = {getStyle(styling.styles.idCheckBoxViewStyle, styling.styles.idTabletCheckBoxViewStyle)}>

					{this.checkboxDef('onlyFirstPicsState')}
					<Text style = {getStyle(styling.styles.idChangePriceModalTextStyle, styling.styles.idTabletChangePriceModalTextStyle)}>{strings.onlyFirstPics}</Text>

				</View>

				<TouchableOpacity style ={styles.certificateButton}
					disabled = {this.state.downloading}
					onPress = {() => this.startDownload() } >
					<Text style = {styles.whiteTextStyle}>{this.state.progressState}</Text>
				</TouchableOpacity>

				{/* this.getProgressBar() */}

				<Text style = {styles.visibleText}>{this.state.numeratorDisplay}/{this.state.denominator}</Text>

				<Text style = {this.state.displayFinished}>{strings.finished}</Text>

			</View>;
		} else {
			put(strings.turnOnOffline, false);
		}
	}

	//= ============================
	// consider <KeyboardAvoidingView style={styles.keyboardView}> as overall view
	render () {
		return (
			<View style = {styles.viewStyle}>

				<Text style ={getStyle(styles.titleTextStyle, styles.tabletTitleTextStyle)} >{strings.offlineMode}</Text>

				<View style = {getStyle(styling.styles.idCheckBoxViewStyle, styling.styles.idTabletCheckBoxViewStyle)}>

					{this.checkboxDef(strings.turnOnOffline)}
					<Text style = {getStyle(styling.styles.idChangePriceModalTextStyle, styling.styles.idTabletChangePriceModalTextStyle)}>{strings.turnOnOffline}</Text>

				</View>

				{this.turnOnOffline()}

			</View>
		);
	}
}

const styles = StyleSheet.create({

	invisibleText:
	{
		fontSize: getTextSize(15), // 17,
		lineHeight: getTextSize(25),
		marginTop: getTextSize(30),
		color: colors.trans,
		// marginBottom: getTextSize(5),
		// backgroundColor: 'green',
		alignSelf: 'center',
		// color: colors.white,
		fontFamily: styling.numberFont

	},

	visibleText:
	{
		fontSize: getTextSize(15), // 17,
		lineHeight: getTextSize(25),
		marginTop: getTextSize(30),
		// color: colors.trans,
		// marginBottom: getTextSize(5),
		// backgroundColor: 'green',
		alignSelf: 'center',
		// color: colors.white,
		fontFamily: styling.numberFont

	},

	innerViewStyle:
	{
		// backgroundColor: 'pink',
		width: '90%',
		alignItems: 'center',
		height: '30%',
		marginTop: getTextSize(70)
		// justifyContent: 'center'
	},

	tabletInnerViewStyle:
	{
		// backgroundColor: 'pink',
		width: '90%',
		alignItems: 'center',
		height: '30%',
		marginTop: getTextSize(70)
		// justifyContent: 'center'
	},

	progressBarStyle:
	{
		width: '100%',
		// backgroundColor: 'red',
		marginTop: getTextSize(30),

		alignSelf: 'center'

		// color:
	},

	whiteTextStyle:
	{
		fontSize: getTextSize(15), // 15,
		textAlignVertical: 'center',
		textAlign: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		color: colors.white,
		fontFamily: styling.textFont
		// lineHeight: 15,
	},

	certificateButton:
	{ // getLabLink()
	// for certificate button

		height: getTextSize(40), // 40,
		width: getTextSize(200), // '30%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.blueButton,
		borderWidth: 1,
		borderColor: colors.gray,
		marginTop: getTextSize(20)
		// marginBottom: ''
	},

	titleTextStyle:
	{
		fontSize: getTextSize(15), // 15,
		letterSpacing: getTextSize(6.64), // 6.64,
		lineHeight: getTextSize(30), // 30,
		textAlign: 'center',
		alignSelf: 'center',
		color: colors.black,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: '5%',
		// marginBottom: '5%',
		// backgroundColor: 'green',
		// paddingTop: '1%',
		// paddingBottom: '1%',
		fontFamily: styling.textFont // 'PlayfairDisplay-Regular',
	},

	tabletTitleTextStyle:
	{
		marginTop: getTextSize(10), // '5%',
		// height: '7%',
		fontSize: getTextSize(16),
		// alignSelf: 'center',
		color: colors.black,
		letterSpacing: getTextSize(1.25), // 1.25,
		textAlign: 'center',
		fontFamily: styling.textFont // 'PlayfairDisplay-Regular',
		// backgroundColor: 'pink'
	},

	viewStyle:
	{
		flex: 1,
		alignItems: 'center',
		backgroundColor: colors.white
	}

});
