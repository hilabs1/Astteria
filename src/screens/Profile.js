import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet, BackHandler, TextInput, TouchableOpacity, Modal, TouchableWithoutFeedback, Keyboard, Linking, ActivityIndicator, Alert } from 'react-native';
import { put, get, getStyle, getTextSize, ACCESS, EMAIL, COMPANY, updateAccess, TEXT, logger } from '../Cortex';
import { Auth } from 'aws-amplify';
import PhoneInput from 'react-native-phone-input';

import * as strings from './strings';
import * as colors from './colors';
import * as styling from './styling';

// var emailFromDB = await get()

export default class Profile extends Component {
	constructor (props) {
		super(props);
		this.state = {
			userName: '',
			accessLevel: TEXT.ACCESS[ACCESS.toUpperCase()],
			getAccessModal: false,
			chosenAccess: TEXT.wholesale,
			wholesaleStyle: getStyle(styling.styles.profileAccessModalChosenTouchableStyle, styling.styles.tabletProfileGetAccessChosenTouchableStyle),
			asteriaSalesStyle: getStyle(styling.styles.profileAccessModalTouchableStyle, styling.styles.tabletProfileAccessTouchableStyle),
			managerStyle: getStyle(styling.styles.profileAccessModalTouchableStyle, styling.styles.tabletProfileAccessTouchableStyle),
			getAccessButtonText: TEXT.getAccess,
			[strings.phoneNumberState]: '+1',
			email: EMAIL,
			pickerData: '',
			phoneString: '',
			invalidString: TEXT.invalidPhone,
			invalidStyle: getStyle(styling.styles.profileInvalidPhone, styling.styles.tabletProfileInvalidPhone),
			validateModal: false,
			confValue: '',
			loading: false
		};

		this.getUserData();
	}

	selectCountry (country) {
		this.refs.phone.selectCountry(country.iso2);
	}

	updatePhone (text) {
		if (text.length === 0) {
			text = '+1';
		}

		if (this.phone.isValidNumber(text)) {
			this.setState({
				[strings.phoneNumberState]: text,
				invalidStyle: getStyle(styling.styles.profileValidPhone, styling.styles.tabletProfileValidPhone),
				invalidString: TEXT.validPhone
			});
		} else {
			this.setState({
				[strings.phoneNumberState]: text,
				invalidStyle: getStyle(styling.styles.profileInvalidPhone, styling.styles.tabletProfileInvalidPhone),
				invalidString: TEXT.invalidPhone
			});
		}
	}

	//= ==== android onBackPressed handle
	componentDidMount () {
		if (this.phone) {
			this.setState({
				pickerData: this.phone.getPickerData()
			});
		}
		BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
	}

	handleBackButton () {
		return true;
	}

	componentWillUnmount () {
		// BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
	}

	async getUserData () {
		var name = await get(strings.username.toString());
		var access = await get(strings.accessLevel.toString());
		access = TEXT.ACCESS[access.toUpperCase()];
		var buttonText = TEXT.getAccess;
		if (name == strings.guest) {
			access = name;
			buttonText = TEXT.registerWelcome;
		}
		this.setState({
			userName: name,
			accessLevel: access,
			getAccessButtonText: buttonText
		});
	}

	async logout () {
		try {
			await put(strings.accessLevel.toString(), strings.continueAsGuest.toString());
			await put(strings.prevAccess.toString(), ACCESS.toString());
			await Auth.signOut();
			this.props.navigation.navigate('initialLogin');
		} catch (err) {
			// meaning you're not registered
			this.props.navigation.navigate('initialLogin');
		}
	}

	gainAccessModal () {
		return <View key = {'profile'}>
			<Modal
				animationType='none'
				transparent={true}
				onRequestClose={() => console.log('jewelryItemDetails: TKT_57: getContactUsModal(): MODAL CLOSED!')}
				visible={this.state.getAccessModal}>
				<View style ={getStyle(styling.styles.profileModalStyle, styling.styles.tabletProfileModalStyle)} >

					<View style = {styling.styles.idMidViewStyle} >

						{this.chooseAccess()}

						<View style = {getStyle(styling.styles.profileProceedCancelViewStyle, styling.styles.tabletProfileProceedCancelViewStyle)}>
							<TouchableOpacity style = {styling.styles.idCancelProceedButtons}
								onPress={() => this.gainAccess(!this.state.getAccessModal)}>
								<Text style = {getStyle(styling.styles.idCloseButtonText, styling.styles.idTabletCloseButtonText)}
									color = {colors.gray} >{TEXT.cancel}
								</Text>
							</TouchableOpacity>

							<TouchableOpacity style = {styling.styles.idProceedProceedButtons}
								onPress={() => this.sendAccessRequest()}>
								<Text style = {getStyle(styling.styles.idCloseButtonText, styling.styles.idTabletCloseButtonText)}
									color = {colors.gray} >{TEXT.proceed}
								</Text>
							</TouchableOpacity>

						</View>

					</View>
				</View>
			</Modal>

			<TouchableOpacity style = {getStyle(styling.styles.profileGetAccessTouchableStyle, styling.styles.tabletProfileGetAccessTouchableStyle)}
				onPress = {() => this.gainAccess(true) }>
				<Text style = {getStyle(styling.styles.profileGetAccessTextStyle, styling.styles.tabletProfileGetAccessTextStyle)} >{this.state.getAccessButtonText}</Text>
			</TouchableOpacity>

		</View>;
	}

	gainAccess (visible) {
		if (this.state.getAccessButtonText != strings.registerWelcome) {
			this.setState({
				getAccessModal: visible,
				[strings.phoneNumberState]: '+1',
				phoneString: '+1'
			});
		} else {
			this.logout();
		}
	}

	sendAccessRequest () {
		this.gainAccess(!this.state.getAccessModal);

		const subject = 'Astteria App - Access Update';

		let body = `My name is ${this.state.userName},\nI would like to upgrade my access level to ${this.state.chosenAccess}`;

		if (this.state[strings.phoneNumberState]) {
			body += `\nYou can reach me at ${this.state[strings.phoneNumberState]}\nor at ${this.state.email}`;
		}

		Linking.openURL(`mailto:${strings.supportMail}?subject=${subject}&body=${body}`);
	}

	/* selectCountry ()
	{
		this.updatePhone(this.phone.getDialCode());
	} */

	chooseAccess () {
		return <TouchableWithoutFeedback style={styles.scrollViewStyle}
			onPress = {() => Keyboard.dismiss()}>
			<View style = {getStyle(styling.styles.idCostModalViewStyle, styling.styles.idTabletCostModalViewStyle)} >

				<PhoneInput
					style={getStyle(styles.textInputStyle, styles.tabletTextInputStyle)}
					ref={(ref) => { this.phone = ref; }}
					autoFormat = {true}
					clearButtonMode = 'always'
					value = {this.state[strings.phoneNumberState] }
					onChangePhoneNumber={ text => this.updatePhone(text) }
					onSelectCountry = {(iso2) => this.selectCountry() }
					textProps = {{ placeholder: '+x xxx xxx xxxx' }}/>

				<Text style ={this.state.invalidStyle} > {this.state.invalidString} </Text>

				<TextInput
					style={getStyle(styles.textInputStyle, styles.tabletTextInputStyle)}
					clearButtonMode = 'always'
					multiline={false}
					underlineColorAndroid= {colors.trans}
					borderWidth={1}
					keyboardType = {'email-address'}
					placeholderTextColor={colors.darkGray}
					placeholder={EMAIL}
					autoCorrect = {false}
					autoCapitalize='none'
					value = {this.state.email}
					onChangeText = { (text) => this.setState({ email: text }) }/>

				<TouchableOpacity style = {this.state.managerStyle}
					onPress = {() => this.radio('managerStyle', 'wholesaleStyle', 'asteriaSalesStyle', strings.manager) }>
					<Text style = {getStyle(styling.styles.profileAccessModalTextStyle, styling.styles.tabletProfileAccessModalTextStyle)} >{TEXT.manager}</Text>
				</TouchableOpacity>

				<TouchableOpacity style = {this.state.asteriaSalesStyle}
					onPress = {() => this.radio('asteriaSalesStyle', 'wholesaleStyle', 'managerStyle', strings.asteriaSalespeople) }>
					<Text style = {getStyle(styling.styles.profileAccessModalTextStyle, styling.styles.tabletProfileAccessModalTextStyle)} >{TEXT.asteriaSalespeople}</Text>
				</TouchableOpacity>

				<TouchableOpacity style = {this.state.wholesaleStyle}
					onPress = {() => this.radio('wholesaleStyle', 'asteriaSalesStyle', 'managerStyle', strings.wholesale) } >
					<Text style = {getStyle(styling.styles.profileAccessModalTextStyle, styling.styles.tabletProfileAccessModalTextStyle)} >{TEXT.wholesale}</Text>
				</TouchableOpacity>

			</View>
		</TouchableWithoutFeedback>;
	}

	radio (on, off, off1, chosenAccessString) {
		Keyboard.dismiss();
		this.setState({
			[on]: getStyle(styling.styles.profileAccessModalChosenTouchableStyle, styling.styles.tabletProfileGetAccessChosenTouchableStyle),
			[off]: getStyle(styling.styles.profileAccessModalTouchableStyle, styling.styles.tabletProfileAccessTouchableStyle),
			[off1]: getStyle(styling.styles.profileAccessModalTouchableStyle, styling.styles.tabletProfileAccessTouchableStyle),
			chosenAccess: chosenAccessString
		});
	}

	getEmail () {
		if (this.state.userName != strings.guest) {
			return <View>
				<View style = {getStyle(styling.styles.profileRowStyle, styling.styles.tabletProfileRowStyle)} >
					<Text style = {getStyle(styling.styles.profileLabelTextStyle, styling.styles.tabletProfileLabelTextStyle)} >{TEXT.emailPlaceHolder}</Text>
					<Text style = {getStyle(styling.styles.profileDetailTextStyle, styling.styles.tabletProfileDetailTextStyle)} >{EMAIL}</Text>
				</View>
				<View style={styling.styles.profileLineSeperator}></View>
			</View>;
		}
	}

	getCompanyName () {
		if (this.state.userName != strings.guest && COMPANY != 'No Company') {
			return <View>
				<View style = {getStyle(styling.styles.profileRowStyle, styling.styles.tabletProfileRowStyle)} >
					<Text style = {getStyle(styling.styles.profileLabelTextStyle, styling.styles.tabletProfileLabelTextStyle)} >{TEXT.companyDisplay}</Text>
					<Text style = {getStyle(styling.styles.profileDetailTextStyle, styling.styles.tabletProfileDetailTextStyle)} >{COMPANY}</Text>
				</View>
				<View style={styling.styles.profileLineSeperator}></View>
			</View>;
		}
	}

	getVerifyEmail () {
		if (this.state.accessLevel == strings.unverified) {
			return <View key = {'verify'}>
				<Modal
					animationType='none'
					transparent={true}
					onRequestClose={() => console.log('jewelryItemDetails: TKT_57: getContactUsModal(): MODAL CLOSED!') }
					visible={this.state.validateModal}>
					<View style ={getStyle(styling.styles.profileConfirmModalStyle, styling.styles.tabletProfileConfirmModalStyle)} >
						<View style = {styling.styles.idMidViewStyle} >
							{this.verifySuccess() }
							<View style = {getStyle(styling.styles.profileVerifyProceedCancelViewStyle, styling.styles.tabletProfileVerifyProceedCancelViewStyle)}>
								<TouchableOpacity style = {styling.styles.idCancelProceedButtons}
									onPress={() => this.setState({ validateModal: !this.state.validateModal })}>
									<Text style = {getStyle(styling.styles.idCloseButtonText, styling.styles.idTabletCloseButtonText)}
										color = {colors.gray} >{TEXT.cancel}
									</Text>
								</TouchableOpacity>

								<TouchableOpacity style = {styling.styles.idProceedProceedButtons}
									onPress={() => this.verifyCode() }>
									<Text style = {getStyle(styling.styles.idCloseButtonText, styling.styles.idTabletCloseButtonText)}
										color = {colors.gray} >{TEXT.proceed}
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</Modal>

				<Text style ={ getStyle(styling.styles.profileVerifyTextStyle, styling.styles.tabletProfileVerifyTextStyle)}
					onPress = {() => this.openModal() }>{TEXT.confirmEmail}</Text>
			</View>;
		}
	}

	async verifyCode () {
		this.setState({
			loading: true,
			validateModal: false

		});
		try {
			await Auth.confirmSignUp(EMAIL, this.state.confValue);
			updateAccess(strings.registered);
			await put(strings.accessLevel.toString(), strings.registered.toString());
			this.setState({
				loading: false,
				accessLevel: strings.registered,
				confValue: ''
			}, () => {
				Alert.alert(TEXT.success,
					TEXT.confirmed,
					[
						{ text: TEXT.ok }
					],
					{ cancelable: false }
				);
			});
		} catch (err) {
			this.setState({
				loading: false,
				validateModal: false,
				confValue: ''
			}, () => {
				Alert.alert(TEXT.errorLogin,
					TEXT.couldntConfirm,
					[
						{ text: TEXT.ok }
					],
					{ cancelable: false }
				);
			});
		}
	}

	verifySuccess () {
		return <View style = {getStyle(styling.styles.idCostModalViewStyle, styling.styles.tabletProfileVerifySuccessViewStyle)} >
			<TextInput
				style={getStyle(styles.textInputStyle, styles.tabletTextInputStyle)}
				clearButtonMode = 'always'
				multiline={false}
				underlineColorAndroid= {colors.trans}
				borderWidth={1}
				keyboardType = {'numeric'}
				placeholderTextColor={colors.darkGray}
				placeholder={TEXT.enterConfCode}
				autoCorrect = {false}
				autoCapitalize='none'
				onChangeText = { (text) => this.setState({ confValue: text }) }/>
		</View>;
	}

	openModal () {
		this.sendVerificationCode();
		this.setState({ validateModal: true });
	}

	async sendVerificationCode () {
		const username = this.state.email;
		await Auth.resendSignUp(username)
			.then()
			.catch(err => logger(`E:P:${err.message}`));
	}

	/**
	 * [loadingData triggered by render()
	 * 		handles showing loader for six mins(for now) until all data loads ]
	 * @return View   [activityIndicator]
	 */
	loadingData () {
		if (this.state.loading) {
			return <View style = {getStyle(styles.loaderStyle, styles.tabletLoaderStyle)}>
				<ActivityIndicator
					aninamting = {this.state.loading}
					size = 'large'
					color = {colors.blueButton} />
				<Text style = {styles.loaderTextStyle} >{TEXT.loadingText}</Text>
			</View>;
		}
	}

	render () {
		return (<View style={styles.viewStyle}>
			<StatusBar
				hidden = {false}
				barStyle='light-content'
				backgroundColor = {colors.searchHeaderColor}/>

			<View style ={styling.styles.profileInnerViewStyle} >
				<Text style = {getStyle(styling.styles.profileTitleTextStyle, styling.styles.tabletProfileTitleTextStyle)} >{TEXT.myProfile}</Text>

				<View style = {getStyle(styling.styles.profileRowStyle, styling.styles.tabletProfileRowStyle)} >
					<Text style = { getStyle(styling.styles.profileLabelTextStyle, styling.styles.tabletProfileLabelTextStyle)} >{TEXT.username}</Text>
					<Text style = {getStyle(styling.styles.profileDetailTextStyle, styling.styles.tabletProfileDetailTextStyle)} >{this.state.userName}</Text>
				</View>

				<View style={styling.styles.profileLineSeperator}></View>

				<View style = {getStyle(styling.styles.profileRowStyle, styling.styles.tabletProfileRowStyle)} >
					<Text style = {getStyle(styling.styles.profileLabelTextStyle, styling.styles.tabletProfileLabelTextStyle)} >{TEXT.accessLevel}</Text>
					<Text style = {getStyle(styling.styles.profileDetailTextStyle, styling.styles.tabletProfileDetailTextStyle)} >{this.state.accessLevel}</Text>
				</View>

				<View style={styling.styles.profileLineSeperator}></View>

				{this.getEmail()}

				{this.getCompanyName()}

				{this.gainAccessModal()}

				{this.getVerifyEmail()}

				{this.loadingData()}
			</View>
		</View>
		);
	}
}
const styles = StyleSheet.create({
	loaderTextStyle:
	{
		fontFamily: styling.textFont,
		alignSelf: 'center',
		fontSize: getTextSize(15)
	},
	loaderStyle:
	{
		position: 'absolute',
		top: getTextSize(200),
		alignSelf: 'center',
		backgroundColor: colors.popUpButton,
		height: getTextSize(120),
		width: getTextSize(260),
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 20

		// display: 'flex',
	},

	tabletLoaderStyle:
	{
		position: 'absolute',
		top: getTextSize(200),
		alignSelf: 'center',
		backgroundColor: colors.popUpButton,
		height: getTextSize(100),
		width: getTextSize(200),
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 40

		// display: 'flex',
	},

	verifyTextInput:
	{
		// backgroundColor: '',
		height: '100%',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center'
	},

	viewStyle:
	{
		width: '100%' // Dimensions.get('window').width //'100%',
	},
	textInputStyle:
{
	height: getTextSize(40), // '7.6%',
	fontFamily: styling.numberFont,
	width: '80%',
	fontSize: getTextSize(15), // 15,
	color: colors.black,
	textAlignVertical: 'center',
	padding: getTextSize(5), // 5,
	margin: getTextSize(5), // getPercentage(2), //'2%',
	borderColor: colors.gray,
	borderWidth: StyleSheet.hairlineWidth
	// textAlign: 'center'
},

	tabletTextInputStyle:
	{

		height: getTextSize(25), // ASPECT_RATIO * (50),//'7.6%',
		fontFamily: styling.numberFont,
		width: '90%',
		fontSize: getTextSize(10), // ASPECT_RATIO * (20), //15,
		color: colors.black,
		textAlignVertical: 'center',
		padding: getTextSize(5), // 5,
		margin: getTextSize(5), // ASPECT_RATIO * (15), //getPercentage(2), //'2%',
		borderColor: colors.gray,
		borderWidth: StyleSheet.hairlineWidth
	}
});
