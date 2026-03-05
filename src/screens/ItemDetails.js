import React, { Component } from 'react';

import { WebView, Modal, Text, TouchableOpacity, View, StyleSheet, Image, Linking, ScrollView, Platform, TouchableWithoutFeedback, TextInput, ActivityIndicator, Keyboard } from 'react-native';
import { scratchedPriceView, send, generatePDF, labRefine, callPhone, getTextSize, ACCESS, getBashariMoreInfo, fixYouTubeLink, getRapPerCentBLow, getStyle, TABLET, LOCATION, TEXT, CURRENCY_SIGN, getDollarSign, writeToClipboard, dev, isRegistered } from '../Cortex';

import Swiper from 'react-native-swiper';

import * as strings from './strings';
import * as colors from './colors';
import * as styling from './styling';

import DetailFooter from './DetailFooter';
import { detailViews, itemViewStyle, guestShareView, contactUsModal, moreInfoModal, shareModal } from './results/styling';
import { isValid, isTextEqual } from '../strings/stringManipulation';
import { shapeIcon, defaultDiamond, getImageArr, linkArr } from './results/Cortex';
import { BlueButton, CloseButton, ModalSwiper, DetailEntry, PriceBox, CallMenu, Phones, FooterButton, PriceEdit, SwitchBox } from './results/components.js';

// images:
import shareIcon from '../assets/pics/share.png';

var CHOSEN_IMAGES = [];
var dataArr;
let priceString;

export default class ItemDetails extends Component {
	/**
	 * [constructor ]
	 * @param  <T> props [props passed from parent component ItemView.js
	 *                   data: refers to a row of item details that was send from searchResult's handleDisplay
	 *                   navigation: refers to parent's this.props.navigation]
	 *
	 *
	 * 			states:  dataArr -> array of item's details
	 * 					 zoomin -> for opening an enlarge photo slide in a modal
	 * 					 openContactUs -> for handling contactUs by phone
	 * 					 				when true: open contactUs modal with phone and email options
	 * 					 				when false: user chooses to call phone; change modal view to display two phone number
	 * 					 menu -> for opening contact us modal and handling phone view in that nodal
	 *
	 * @return void      [description]
	 */
	constructor (props) {
		super(props);
		const { state } = this.props.navigation;
		dataArr = state.params.data;
		const callForPrice = state.params.openContactUs; // not working TODO FIX

		this.state = {
			[strings.rateForSite]: dataArr[strings.rateForSite],
			displayPrice: dataArr.PRICE,
			noTopImage: this.topImageDisplay(),
			includeAllPhotosText: getStyle(styling.styles.idChangePriceModalTextStyle, styling.styles.idTabletChangePriceModalTextStyle),
			includeLogoText: getStyle(styling.styles.idChangePriceModalTextStyle, styling.styles.idTabletChangePriceModalTextStyle),
			shape: dataArr[strings.Shape],
			LAB: labRefine(dataArr[strings.lab]),
			PPC: dataArr[strings.ppc],
			IMG: dataArr.IMG,
			[strings.allocation]: dataArr[strings.allocation],

			zoomIn: false,
			openContactUs: callForPrice,
			menu: true,
			openMoreInfo: false,
			showCost: false,
			loading: false,
			openPriceChange: false,

			valueDisplayPrice: '',
			illegalPriceInput: getStyle(styling.styles.idTextInputStyle, styling.styles.idTabletTextInputStyle),

			videoModal: false,
			modal360: false,
			[strings.includeAllPhotos]: true,
			[strings.includeLogo]: true,

			[strings.link1]: getStyle(styling.styles.idUnchosenChooseImageStyle, styling.styles.idTabletUnchosenChooseImageStyle),
			[strings.link2]: getStyle(styling.styles.idUnchosenChooseImageStyle, styling.styles.idTabletUnchosenChooseImageStyle),
			[strings.link3]: getStyle(styling.styles.idUnchosenChooseImageStyle, styling.styles.idTabletUnchosenChooseImageStyle),
			[strings.link4]: getStyle(styling.styles.idUnchosenChooseImageStyle, styling.styles.idTabletUnchosenChooseImageStyle),
			[strings.link5]: getStyle(styling.styles.idUnchosenChooseImageStyle, styling.styles.idTabletUnchosenChooseImageStyle),
			[strings.link6]: getStyle(styling.styles.idUnchosenChooseImageStyle, styling.styles.idTabletUnchosenChooseImageStyle),
			[strings.link7]: getStyle(styling.styles.idUnchosenChooseImageStyle, styling.styles.idTabletUnchosenChooseImageStyle),
			[strings.link8]: getStyle(styling.styles.idUnchosenChooseImageStyle, styling.styles.idTabletUnchosenChooseImageStyle)
		};
		this.removePhotos(false);
	}

	componentDidMount () {
		priceString = this.state.displayPrice == strings.callForPrice ? '0' : (this.state.displayPrice[0] || this.state.displayPrice[1]);
		dev('ItemDetails', 'componentDidMount', priceString);
	}

	/**
	* [removePhotos triggered by constructor(), share(), openPricePopup(), flip()
	* 		handles changing values of items in CHOSEN_IMAGES]
	* @param  boolean  onOff  [value to assign all items in CHOSEN_IMAGES]
	* @return void 		     [description]
	*/
	removePhotos (onOff) {
		for (let i = 0; i < this.state.IMG.length; i++) {
			CHOSEN_IMAGES[i] = onOff;
		}
	}

	getTitle = () => (
		<View style={detailViews.titleView}>
			<Image source = { shapeIcon[dataArr[strings.Shape]] || defaultDiamond }
				style = {itemViewStyle.shapeImageStyle} ></Image>
			<Text style={detailViews.titleText}
				onPress = {() => writeToClipboard(dataArr.TITLE)} >{dataArr.TITLE}</Text>
		</View>)

	openLink = (certURL, alt) => { this.props.navigation.navigate('certView', { data: certURL, alt: alt, lab: this.state.LAB, offlineLink: dataArr[strings.offlineCertLink] }); }

	getLabLink = () => (
		isValid(dataArr[strings.certificateLink]) &&
			<BlueButton openLink = {() => this.openLink(dataArr[strings.certificateLink], dataArr[strings.certificateId])} />
	);

	/**
	 * [getViews triggered by render()
	 * 		handles image slider at the top of the page,
	 * 		each image is a Touchable that when pressed opens the photo enlarged in a modal]
	 * @return View []  [array of image touchables that trigger modal when pressed]
	 */
	getViews = () => (
		<View style = {detailViews.imageSwiper}>
			<Modal animationType='none'
				transparent={true}
				visible={this.state.zoomIn}
				onRequestClose={() => {} } >
				<View style = {detailViews.zoomInSwiper}>
					<ModalSwiper IMG = {this.state.IMG}
						height = {'90%'}/>
					<CloseButton onPress={() => this.zoomIn(!this.state.zoomIn)} />
				</View>
			</Modal>

			<ModalSwiper IMG = {this.state.IMG}
				onPressed = {() => this.zoomIn(true)}/>
		</View>
	);

	zoomIn = visible => { this.setState({ zoomIn: visible }); }

	openContactUs = visible => {
		this.setState({
			menu: true,
			openContactUs: visible
		});
	}

	redirectToCall = phone => { this.setState({ menu: false }); }

	redirectToMail = () => {
		var idToSend = dataArr[strings.lotId];
		this.openContactUs(!this.state.openContactUs);
		this.props.navigation.navigate('contactUs', { id: idToSend });
	}

	/**
	 * [share triggered by DetailFooter.js
	 * 		this function is transfered to DetailFooter becuase the share button is located there
	 * 		triggered Cortex.generatePDF()]
	 * @return void [description]
	 */
	share = async () => {
		this.setState({
			loading: true
		}, () => {
			const arrToSend = getImageArr(this.state[strings.includeAllPhotos], this.state.IMG, CHOSEN_IMAGES);
			const newPrice = this.state.valueDisplayPrice ? this.state.valueDisplayPrice : this.state.displayPrice;
			generatePDF(dataArr, newPrice, this.state[strings.includeLogo], arrToSend).then((generated) => {
				send(generated[0], generated[1]);
				this.initChangePriceModal();
				this.removePhotos(false);
			});
		});
	}

	guestShare = () => (
		<TouchableOpacity
			style = {guestShareView.touchableShare}
			onPress = {() => this.share()}>
			<Image style={guestShareView.imageShare}
				source={shareIcon}>
			</Image>
			<Text style={guestShareView.footerTextStyle}>{TEXT.share}</Text>
		</TouchableOpacity>);

	/**
	 * [getContactUsModal triggered by DetailFooter.js
	 * 		this function is transfered to DetailFooter becuase the contactUs button is located there]
	 * @return View [view with the contactUs modal]
	 */
	getContactUsModal = () => (
		!TABLET
			? <View key = {'getContactUsModal'}>
				<Modal
					animationType='none'
					transparent={true}
					visible={this.state.openContactUs}>
					<View style = {contactUsModal.modalStyle} >

						<View style = {contactUsModal.midView} >

							{this.state.menu
								? <CallMenu redirectToCall = {() => this.redirectToCall(strings.phone)}
									redirectToMail = {() => this.redirectToMail()}/>
								: <Phones callPhone = {phone => callPhone(phone)} />}

							<TouchableOpacity style = {contactUsModal.cancelTouchable}
								onPress={() => this.openContactUs(!this.state.openContactUs)}>
								<Text style = {contactUsModal.touchableText}
									color = {colors.gray} >{TEXT.close}
								</Text>
							</TouchableOpacity>

						</View>
					</View>
				</Modal>

				<FooterButton onPressed = {() => this.openContactUs(true)}
					text = {TEXT.contactUs} />
			</View>
			: <FooterButton onPressed = {() => this.redirectToMail()}
				text = {TEXT.contactUs} />)

	/**
	 * [getRapPrice triggered by render()
	 * 		handles displaying rap% price for whites only]
	 * @return  View  [view with rap% price]
	 */
	getRapPrice = () => (
		isValid(dataArr[strings.color])
					&& !isTextEqual(dataArr[strings.rap], 0)
						&& !isTextEqual(dataArr[strings.listPrice], 0)
						&& <PriceBox label = {`${strings.rap}%`}
							value = {getRapPerCentBLow(this.state.PPC, dataArr[strings.listPrice])} />)

	/**
	 * [getMoreInfo triggered by render
	 * 		handles displaying cost (for managers) is value != 0]
	 * @return text   [Text component and buttonish that indicates there is cost to view]
	 */
	getMoreInfo = () => (
		(isTextEqual(ACCESS, strings.manager)
					|| isTextEqual(ACCESS, strings.asteriaSalespeople)
					|| isTextEqual(ACCESS, strings.wholesale))
					&& <View key = {'getMoreInfo'}>
						<Modal
							animationType='none'
							transparent={true}
							visible={this.state.openMoreInfo}>
							<View style = {moreInfoModal.modalView} >
								<View style = {moreInfoModal.midView} >
									{this.passwordOrCost() }
									<TouchableOpacity style = {moreInfoModal.closeTouchable}
										onPress={() => this.openPasswordPopup(!this.state.openMoreInfo)}>
										<Text style = {moreInfoModal.closeText}
											color = {colors.gray}>{TEXT.close}
										</Text>
									</TouchableOpacity>
								</View>
							</View>
						</Modal>
						<Text style = {moreInfoModal.moreInfoTextLabel}
							onPress = {() => this.openPasswordPopup(true)}>{TEXT.moreInfo}</Text>
					</View>
	);

	/**
	 * [openPasswordPopup triggered by getMoreInfo()
	 * 		handles opening password popUp to gain access to cost value]
	 * @param  String  totalCost  [total cost in a String representaion]
	 * @return void               [description]
	 */
	openPasswordPopup = visible => {
		this.setState({
			openMoreInfo: visible,
			showCost: !visible
		});
	}

	/**
	 * [passwordOrCost triggered by getMoreInfo()
	 * 		handles 'password' or 'total cost' display]
	 * @param  String  totalCost  [total cost of item in String reperesentation]
	 * @return View               [if !showCost -> display password
	 *                             otherwise -> display totalCost]
	 */
	passwordOrCost = () => (
		!this.state.showCost
			? <View style = {moreInfoModal.costView} >
				<TextInput
					style = {moreInfoModal.passwordTextInput}
					autoCapitalize='none'
					autoCorrect = {false}
					ref = {element => { this.input = element; } }
					onChangeText = {(text) => this.changeInput(text)}
					multiline={false}
					placeholderTextColor={colors.gray}
					placeholder={TEXT.passwordTxt}
					underlineColorAndroid= {colors.trans}
					secureTextEntry ={true}
					borderWidth={StyleSheet.hairlineWidth}/>
			</View>
			: getBashariMoreInfo(dataArr)) // need to clean this up

	/**
	 * [changeInput triggered by passwordOrCost()
	 * 		handles viewing cost after user submits correctPassword]
	 * @param  String  text  [user's input]
	 * @return void          [description]
	 */
	changeInput = text => {
		if ((isTextEqual(text, strings.managerPassword) || isTextEqual(text, strings.password)) && isRegistered()) {
			this.setState({
				showCost: true
			});
		} else {
			// this is when user changes price
			var val;
			if (!text || text == CURRENCY_SIGN) {
				text = this.state.displayPrice;
				val = '';
			} else {
				val = text;
			}
			this.setState({
				valueDisplayPrice: val
			});
		}
	}

	/**
	 * [loadingShare triggered by render()
	 * 		handles showing loader when share is taking a bit longer]
	 * @return View   [activityIndicator]
	 */
	loadingShare = () => (
		this.state.loading
			&& <View style = {detailViews.shareLoaderView}>
				<ActivityIndicator
					aninamting = {this.state.loading}
					size = 'large'
					color = {colors.white}/>
				<Text style = {detailViews.shareLoaderText}>{TEXT.generatingPDF}</Text>
			</View>
	);

	/**
	 * [shareModal triggered by DetailsFooter
	 * 		handles price change modal when user presses share]
	 * @return View   [modal of price change]
	 */
	shareModal = () => (
		this.state.IMG.length !== 0
			? (<View key = {'shareModal'}>
				<Modal
					animationType='none'
					transparent={true}
					visible={this.state.openPriceChange}>
					<TouchableWithoutFeedback
						onPress = {() => Keyboard.dismiss() }>
						<View style ={shareModal.modalView} >
							<View style = {moreInfoModal.midView} >
								{this.changePrice()}

								<View style = {shareModal.buttonWrapperView}>
									<TouchableOpacity style = {shareModal.touchable}
										onPress={() => { this.openPricePopup(!this.state.openPriceChange, false); }}>
										<Text style = {shareModal.touchableText}
											color = {colors.gray} >{TEXT.cancel}</Text>
									</TouchableOpacity>
									<TouchableOpacity style = {shareModal.touchable}
										onPress={() => { this.openPricePopup(!this.state.openPriceChange, true); }}>
										<Text style = {shareModal.touchableText}
											color = {colors.gray} >{TEXT.proceed}</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</TouchableWithoutFeedback>
				</Modal>

				<TouchableOpacity
					style = {shareModal.shareTouchable}
					onPress = {() => { this.openPricePopup(true, false); }}>
					<Image style={shareModal.shareImage}
						source={require('../assets/pics/share.png')}>
					</Image>
					<Text style={shareModal.footerText}>{TEXT.share}</Text>
				</TouchableOpacity>
			</View>)
			: (<View key = {'shareModal'}>
				<Modal
					animationType='none'
					transparent={true}
					visible={this.state.openPriceChange}>
					<TouchableWithoutFeedback
						onPress = {() => Keyboard.dismiss() }>
						<View style ={shareModal.modalWithoutImageView} >
							<View style = {moreInfoModal.midView} >
								{this.changePrice() }
								<View style = {shareModal.buttonWrapperWithoutImageView}>
									<TouchableOpacity style = {shareModal.touchable}
										onPress={() => { this.openPricePopup(!this.state.openPriceChange, false); }}>
										<Text style = {shareModal.touchableText}
											color = {colors.gray} >{TEXT.cancel}</Text>
									</TouchableOpacity>

									<TouchableOpacity style = {shareModal.touchable}
										onPress={() => { this.openPricePopup(!this.state.openPriceChange, true); }}>
										<Text style = {shareModal.touchableText}
											color = {colors.gray} >{TEXT.proceed}</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</TouchableWithoutFeedback>
				</Modal>
				<TouchableOpacity
					style = {shareModal.shareTouchable}
					onPress = {() => { this.openPricePopup(true, false); }}>
					<Image style={shareModal.shareImage}
						source={require('../assets/pics/share.png')}>
					</Image>
					<Text style={shareModal.footerText}>{TEXT.share}</Text>
				</TouchableOpacity>
			</View>)
	)

	/**
	 * [changePrice triggered by shareModal
	 * 		handles viewing textInput of price change ]
	 * @return TextInput   []
	 */
	changePrice = () => (
		<View style = {shareModal.changePriceView}>
			<Text style = {shareModal.changePriceText}>{TEXT.price}</Text>
			<PriceEdit style = {this.state.illegalPriceInput}
				changeInput = {text => this.changeInput(text)}
				placeholder = {CURRENCY_SIGN + priceString}
				value = {this.state.valueDisplayPrice}
				editable = {isRegistered()} />

			{this.state.IMG.length !== 0 && this.getChooseImages()}

			{isRegistered() && <SwitchBox value = {this.state[strings.includeLogo]}
				valueChange = {() => this.flip(strings.includeLogo, 'includeLogoText')}
				text = {TEXT.includeLogo}
				textStyle = {this.state.includeLogoText} />}
		</View>);

	/**
	 * [getChooseImages triggered by changePrice()
	 * 		handles showing images for choosing]
	 * @return View   [view of images to choose]
	 */
	getChooseImages = () => (
		<View style = {styling.styles.idChooseImageViewStyle}>
			<SwitchBox value = {this.state[strings.includeAllPhotos]}
				valueChange = {() => this.flip(strings.includeAllPhotos, 'includeAllPhotosText')}
				text = {TEXT.includeAllPhotos}
				textStyle = {this.state.includeAllPhotosText} />
			<View style = {styling.styles.idChooseImageTableViewStyle}>
				{linkArr.map((arr, key) =>
					<View style ={styling.styles.idChooseImageRowViewStyle}
						key = {key}>
						{arr.map((link, i) => this.getImageByNumber(link, (key * 3) + i))}
					</View>)}
			</View>
		</View>);

	/**
	 * [getImageByNumber triggered by getChooseImages()
	 * 		handles showing only existing images, and not all six boxes when some might be blank]
	 * @param  String   state  [state of the corresponding button]
	 * @param  int      number [index of image for the use of CHOSEN_IMAGES and this.state.IMG]
	 * @return Touchable       [button of corresponding image]
	 */
	getImageByNumber = (state, number) => (
		<View key = {state} >
			{number < this.state.IMG.length && (
				Platform.OS === 'android'
					? <TouchableOpacity
						style = {this.state[state]}
						onPress = {() => this.chooseImageForPDF(state, number)} >
						<Image
							style = {styling.styles.idAndroidImageStyle}
							source = {{ uri: this.state.IMG[number], cache: 'force-cache' }}
							resizeMode = 'center'></Image>
					</TouchableOpacity>
					: <TouchableOpacity
						onPress = {() => this.chooseImageForPDF(state, number)} >
						<Image
							style = {this.state[state]}
							source = {{ uri: this.state.IMG[number], cache: 'force-cache' }}
							resizeMode = 'center'></Image>
					</TouchableOpacity>)}
		</View>);

	/**
	 * [openPricePopup triggered by shareModal()
	 * 		handles opening price change popUp to gain access to cost value]
	 * @param  boolean  visible   [true -> modal is visible
	 *                            false -> modal is dismissed & share() if cancel]
	 * @param  boolean  cancel 	  [when user presses CANCEL buton, restore states to init]
	 * @return void               [description]
	 */
	openPricePopup = (visible, proceed) => {
		this.setState({
			openPriceChange: visible
		}, () => {
			!visible && proceed
				? this.share()
				: (this.initChangePriceModal(), this.removePhotos(false));
		});
	}

	/**
	 * [topImageDisplay triggered by render()
	 * 		handles hiding top image slider when no images exist ]
	 * @return style   [idNoImageSliderViewStyle -> for no images
	 *                  idImageSliderViewStyle -> for when images exist]
	 */
	topImageDisplay = () => (dataArr.IMG.length === 0 ? styling.styles.idNoImageSliderViewStyle : styling.styles.idImageSliderViewStyle);

	/**
	 * [flip triggered by SwitchBox()
	 * 		handles toogling/checking the switch/checkbox]
	 * @return {[type]} [description]
	 */
	flip = (state, txtState) => {
		var style;
		var photoStyle = getStyle(styling.styles.idUnchosenChooseImageStyle, styling.styles.idTabletUnchosenChooseImageStyle);

		if (this.state[state]) { // turn off
			style = getStyle(styling.styles.idDontIncludeAllPhotosTextStyle, styling.styles.idTabletDontIncludeAllPhotosTextStyle); // styling.styles.idDontIncludeAllPhotosTextStyle;
			if (state == strings.includeAllPhotos) {
				this.setState({
					[strings.link1]: getStyle(styling.styles.idUnchosenChooseImageStyle, styling.styles.idTabletUnchosenChooseImageStyle),
					[strings.link2]: getStyle(styling.styles.idUnchosenChooseImageStyle, styling.styles.idTabletUnchosenChooseImageStyle),
					[strings.link3]: getStyle(styling.styles.idUnchosenChooseImageStyle, styling.styles.idTabletUnchosenChooseImageStyle),
					[strings.link4]: getStyle(styling.styles.idUnchosenChooseImageStyle, styling.styles.idTabletUnchosenChooseImageStyle),
					[strings.link5]: getStyle(styling.styles.idUnchosenChooseImageStyle, styling.styles.idTabletUnchosenChooseImageStyle),
					[strings.link6]: getStyle(styling.styles.idUnchosenChooseImageStyle, styling.styles.idTabletUnchosenChooseImageStyle),
					[strings.link7]: getStyle(styling.styles.idUnchosenChooseImageStyle, styling.styles.idTabletUnchosenChooseImageStyle),
					[strings.link8]: getStyle(styling.styles.idUnchosenChooseImageStyle, styling.styles.idTabletUnchosenChooseImageStyle)
				});
				this.removePhotos(false);
			}
		} else { // turn on
			style = getStyle(styling.styles.idChangePriceModalTextStyle, styling.styles.idTabletChangePriceModalTextStyle);
			if (state == strings.includeAllPhotos) {
				this.setState({
					[strings.link1]: getStyle(styling.styles.idChosenChooseImageStyle, styling.styles.idTabletChosenChooseImageStyle),
					[strings.link2]: getStyle(styling.styles.idChosenChooseImageStyle, styling.styles.idTabletChosenChooseImageStyle),
					[strings.link3]: getStyle(styling.styles.idChosenChooseImageStyle, styling.styles.idTabletChosenChooseImageStyle),
					[strings.link4]: getStyle(styling.styles.idChosenChooseImageStyle, styling.styles.idTabletChosenChooseImageStyle),
					[strings.link5]: getStyle(styling.styles.idChosenChooseImageStyle, styling.styles.idTabletChosenChooseImageStyle),
					[strings.link6]: getStyle(styling.styles.idChosenChooseImageStyle, styling.styles.idTabletChosenChooseImageStyle),
					[strings.link7]: getStyle(styling.styles.idChosenChooseImageStyle, styling.styles.idTabletChosenChooseImageStyle),
					[strings.link8]: getStyle(styling.styles.idChosenChooseImageStyle, styling.styles.idTabletChosenChooseImageStyle)
				});
				this.removePhotos(true);
			}
		}

		this.setState({
			[state]: !this.state[state],
			[txtState]: style
		});
	}

	/**
 * [chooseImageForPDF triggered by changePrice()
 * 		handles choosing/unchoosing images for pdf]
 * @param  String  photoState  [state of touchable to change]
 * @param  int     index       [index of image to choose]
 * @return void                [description]
 */
	chooseImageForPDF (photoState, index) {
		var style;
		if (CHOSEN_IMAGES[index]) {
			style = getStyle(styling.styles.idUnchosenChooseImageStyle, styling.styles.idTabletUnchosenChooseImageStyle);
			CHOSEN_IMAGES[index] = false;
		} else {
			style = getStyle(styling.styles.idChosenChooseImageStyle, styling.styles.idTabletChosenChooseImageStyle);
			CHOSEN_IMAGES[index] = true;
		}

		var includeAllSwitch = true;
		var includeAllText = getStyle(styling.styles.idChangePriceModalTextStyle, styling.styles.idTabletChangePriceModalTextStyle); // styling.styles.idChangePriceModalTextStyle;
		for (let i = 1; i < CHOSEN_IMAGES.length; i++) { // tttt
			// ttff
			if (CHOSEN_IMAGES[i - 1] != CHOSEN_IMAGES[i]) {
				includeAllSwitch = false;
				includeAllText = getStyle(styling.styles.idDontIncludeAllPhotosTextStyle, styling.styles.idTabletDontIncludeAllPhotosTextStyle);
			}
		}
		this.setState({
			[photoState]: style,
			[strings.includeAllPhotos]: includeAllSwitch,
			includeAllPhotosText: includeAllText
		});
	}

	/**
	 * [initChangePriceModal triggered by share(), openPricePopup()
	 * 			handles initializing states of components in shareModal]
	 * @return {[type]} [description]
	 */
	initChangePriceModal () {
		this.setState({
			loading: false,
			displayPrice: dataArr.PRICE,
			valueDisplayPrice: '',
			[strings.includeAllPhotos]: true,
			[strings.includeLogo]: true,
			includeAllPhotosText: getStyle(styling.styles.idChangePriceModalTextStyle, styling.styles.idTabletChangePriceModalTextStyle),
			includeLogoText: getStyle(styling.styles.idChangePriceModalTextStyle, styling.styles.idTabletChangePriceModalTextStyle),
			[strings.link1]: getStyle(styling.styles.idUnchosenChooseImageStyle, styling.styles.idTabletUnchosenChooseImageStyle),
			[strings.link2]: getStyle(styling.styles.idUnchosenChooseImageStyle, styling.styles.idTabletUnchosenChooseImageStyle),
			[strings.link3]: getStyle(styling.styles.idUnchosenChooseImageStyle, styling.styles.idTabletUnchosenChooseImageStyle),
			[strings.link4]: getStyle(styling.styles.idUnchosenChooseImageStyle, styling.styles.idTabletUnchosenChooseImageStyle),
			[strings.link5]: getStyle(styling.styles.idUnchosenChooseImageStyle, styling.styles.idTabletUnchosenChooseImageStyle),
			[strings.link6]: getStyle(styling.styles.idUnchosenChooseImageStyle, styling.styles.idTabletUnchosenChooseImageStyle),
			[strings.link7]: getStyle(styling.styles.idUnchosenChooseImageStyle, styling.styles.idTabletUnchosenChooseImageStyle),
			[strings.link8]: getStyle(styling.styles.idUnchosenChooseImageStyle, styling.styles.idTabletUnchosenChooseImageStyle)
		});
	}

	/**
	 * [getCut triggered by render
	 * 		handles displaying cut only for white round items]
	 * @return View   [view of cut details]
	 */
	getCut = () => (
		isValid(dataArr[strings.cut])
		&& <DetailEntry
			label = {TEXT.cut}
			value = {dataArr[strings.cut]}/>
	);

	displayCertificateId = () => (
		(dataArr[strings.lotId] != dataArr[strings.certificateId] && isValid(dataArr[strings.certificateId]))
		&& <DetailEntry
			label = {TEXT.certDisplay}
			value = {dataArr[strings.certificateId]}/>
	);

	displayFluor () {
		return <DetailEntry
			label = {TEXT.fluorDisplay}
			value = {dataArr[strings.fluorescenceColorIntensity]}/>;
	}

	/**
 * [getGiaLink triggered by render()
 * 		handles lab link; if item has a lab link, display view cert online button
 * 							otherwise, shows nothing]
 * @return Touchable 	[View Certificate button, or nothing]
 */
	getGiaLink () {
		if (this.state.LAB == strings.gia && dataArr[strings.lotId] != dataArr[strings.certificateId]) {
			var newURL = strings.giaLink + dataArr[strings.certificateId];
			return <TouchableOpacity style ={getStyle(styling.styles.idCertificateButton, styling.styles.idTabletCertificateButton)}
				onPress = {() => this.viewCertOnline(newURL)} >
				<Text style = {getStyle(styling.styles.idWhiteTextStyle, styling.styles.idTabletWhiteTextStyle)}>{TEXT.viewOnline}</Text>
			</TouchableOpacity>;
		}
	}

	/**
 * [viewCertOnline triggered by getGiaLink()
 * 		handles redirecting user to GIA web to view certificate online]
 * @param  String  url  [link to cert online]
 * @return void         [description]
 */
	viewCertOnline (url) {
		Linking.canOpenURL(url).then(supported => {
			if (supported) {
				Linking.openURL(url);
			}
		});
	}

	/**
 * [getVideoModal triggered by render()
 * 		handles video link; if item has a video link, display View video button
 * 							otherwise, shows nothing]
 * @return Touchable 	[View Certificate button, or nothing]
 */
	getVideoModal () {
		var index = strings.videoen;
		if (LOCATION == strings.inChina) { index = strings.videocn; }

		if (dataArr.VIDEO != strings.fluorBlank) {
			return <View key={'videoModal'}
				style = {styling.styles.idVideoModalOuterViewStyle}>
				<Modal animationType='none'
					transparent={true}
					visible={this.state.videoModal}
					onRequestClose={() => { console.log('itemDetails: TKT_21: getVideoModal(): MODAL CLOSED!'); }}>
					<View style = {getStyle(styling.styles.idVideoModalInnerViewStyle, styling.styles.idTabletVideoModalInnerViewStyle)}>

						{this.displayVideo()}

						<TouchableOpacity
							style = {styling.styles.idCloseButtonStyle}
							onPress={() => {
								this.displayVideoModal(!this.state.videoModal);
							}}>
							<Text style = {getStyle(styling.styles.idCloseButtonText, styling.styles.idTabletCloseButtonText)}>
								{TEXT.close}
							</Text>
						</TouchableOpacity></View></Modal>

				<TouchableOpacity style ={getStyle(styling.styles.idCertificateButton, styling.styles.idTabletCertificateButton)}
					onPress = {() => this.displayVideoModal(true)} >
					<Text style = {getStyle(styling.styles.idWhiteTextStyle, styling.styles.idTabletWhiteTextStyle)}>Video</Text>
				</TouchableOpacity>
			</View>;
		}
	}

	/**
 * [displayVideoModal triggered by getVideoModal
 * 		changes this.state.videoModal state]
 * @param  boolean  visible  [true -> open modal
 *                           otherwise -> close modal]
 * @return void              [description]
 */
	displayVideoModal (visible) {
		this.setState({
			videoModal: visible
		});
	}

	/**
 * [displayVideo truggered by getVideoModal()
 * 		handles displaying video in modal]
 * @return View   [View with webView of youtube link]
 */
	displayVideo () {
		var link = fixYouTubeLink(dataArr.VIDEO);
		return <View style ={styling.styles.idDisplayVideoView} >
			<WebView
				style= {styling.styles.idDisplayVideoView}
				javaScriptEnabled={true}
				source={{ uri: link }}/>

		</View>;
	}

	/**
 * [getReserved triggered by render
 * 		handles displaying RESERVED for reserved items
 * 		-> when allocation is not none]
 * @param  String   where   [where was the function called:
 *                          images -> from under the image swiper view
 *                          title -> from under the title view ]
 * @return Text             [the reserved text component]
 */
	getReserved (where) {
		if (dataArr[strings.allocation] != strings.none && dataArr[strings.allocation] != strings.fluorBlank) {
			if (where == 'title' && this.state.IMG.length == 0) {
				return <Text style = {styling.styles.idReservedTextNoImageStyle} >RESERVED</Text>;
			}

			if (where == 'images' && this.state.IMG.length != 0) {
				return <Text style = {styling.styles.idReservedTextStyle} >RESERVED</Text>;
			}
		}
	}

	/**
 * [get360 triggered by render()
 * 		handles 360; if item has a lab link, display View Certificate button
 * 							otherwise, shows nothing]
 * @return Touchable 	[View Certificate button, or nothing]
 */
	get360Modal () {
		if (dataArr[strings.has360] == strings.yes) {
			return <View key={'360Modal'}
				style = {styling.styles.idVideoModalOuterViewStyle}>
				<Modal animationType='none'
					transparent={true}
					visible={this.state.modal360}
					onRequestClose={() => { console.log('itemDetails: TKT_21: getViews(): MODAL CLOSED!'); }}>
					<View style = {getStyle(styling.styles.idVideoModalInnerViewStyle, styling.styles.idTabletVideoModalInnerViewStyle)}>

						{this.display360()}

						<TouchableOpacity style = {styling.styles.idCloseButtonStyle}
							onPress={() => {
								this.display360Modal(!this.state.modal360);
							}}>
							<Text style = {getStyle(styling.styles.idCloseButtonText, styling.styles.idTabletCloseButtonText)}>
								{TEXT.close}
							</Text>
						</TouchableOpacity></View></Modal>

				<TouchableOpacity style ={getStyle(styling.styles.idCertificateButton, styling.styles.idTabletCertificateButton)}
					onPress = {() => this.display360Modal(true)} >
					<Text style = {getStyle(styling.styles.idWhiteTextStyle, styling.styles.idTabletWhiteTextStyle)}>{TEXT.view360}</Text>
				</TouchableOpacity>
			</View>;
		}
	}

	/**
 * [display360Modal triggered by get360Modal
 * 		changes this.state.modal360 state]
 * @param  boolean  visible  [true -> open modal
 *                           otherwise -> close modal]
 * @return void              [description]
 */
	display360Modal (visible) {
		this.setState({
			modal360: visible
		});
	}

	display360 () {
		var link = strings.international360; // 'https://mediaen.asteriadiamonds.com/v360/Vision360.html?d=';
		if (LOCATION == strings.inChina) { link = strings.china360; }

		link = link + dataArr[strings.lotId];
		return <View style ={styling.styles.idDisplay360View} >
			<WebView
				style= {styling.styles.idDisplay360View}
				javaScriptEnabled={true}
				source={{ uri: link }}/>
		</View>;
	}

	getDiscount = () => {
		let price = null;
		let beforeDiscount = '';

		if (!this.state.displayPrice[0] || this.state.displayPrice[0] == 0) {
			price = getDollarSign(this.state.displayPrice[1]);
		} else {
			price = `\n${getDollarSign(this.state.displayPrice[0])}`;
			beforeDiscount = scratchedPriceView(detailViews.crossedValue, this.state.displayPrice[1]);
		}

		return <Text style={detailViews.priceValue}>{beforeDiscount}{price}</Text>;
	}

	priceByAvailability = () => (
		!isTextEqual(dataArr[strings.availability], strings.consumed)
			&& <View style={detailViews.priceShadowBox} >
				<View style={detailViews.priceViewWrapper} >
					<PriceBox label = {TEXT.ppc}
						value = {getDollarSign(this.state.PPC)} />

					<PriceBox label = {TEXT.totalDisplay}
						value = {this.getDiscount()} />

					{this.getRapPrice()}
				</View>
			</View>)

	getPriceBox = () => {
		// isTextEqual(this.state.displayPrice, strings.callForPrice);
		if (this.state.displayPrice != strings.callForPrice) {
			return this.priceByAvailability();
		}
		return <View style={getStyle(styling.styles.idPriceShadowBox, styling.styles.idTabletPriceShadowBox)}>
			<View style={detailViews.priceViewWrapper} >
				<Text style={getStyle(styling.styles.idPriceTitleTextStyle, styling.styles.idTabletPriceTitleTextStyle)}>{strings.callForPrice}</Text>
			</View>
		</View>;
	}

	render () {
		return (<View style = {styling.styles.idViewStyle}>
			<ScrollView contentContainerStyle = {styling.styles.idScrollViewStyle} >
				{dataArr.IMG.length !== 0
					&& <View style = {detailViews.imageSwiper}>
						<Swiper containerStyle = {detailViews.imageSwiper}
							loop = {true} >
							{this.getViews()}
						</Swiper>
					</View>}

				{/* <ImageSwiper
					imageArr = { this.state.IMG }
					isZoomIn = {this.state.zoomIn}
					zoomInOut = {(state) => this.zoomIn(state)} /> */}

				{this.getReserved('images')}

				<View style = {styling.styles.idDetailViewStyle} >
					<View style={getStyle(styling.styles.idTitleShadowBox, styling.styles.idTabletTitleShadowBox)} >
						<View style={getStyle(styling.styles.idTitleInnerShadowBox, styling.styles.idTabletTitleInnerShadowBox)} >
							{this.getTitle()}
						</View>
						{this.getReserved('title')}
					</View>

					{/*	price */}

					{this.getPriceBox()}

					{/*	detail & title */}
					<View style ={getStyle(styling.styles.idDiamondDetailShadowBox, styling.styles.idTabletDiamondDetailShadowBox)} >
						<View style = {getStyle(styling.styles.idInnerShadowBoxStyle, styling.styles.idTabletInnerShadowBoxStyle)} >
							{/* detail title */}
							<View style = {getStyle(styling.styles.idLabViewStyle, styling.styles.idTabletLabViewStyle)} >
								<Text style = {getStyle(styling.styles.idDiamondDetailTitleTextStyle, styling.styles.idTabletDiamondDetailTitleTextStyle)}>{TEXT.diamondDetails.toUpperCase()}</Text>
								{this.getVideoModal()}
							</View>

							{/* just details */}
							<View style = {getStyle(styling.styles.idDiamondDetailViewStyle, styling.styles.idTabletDiamondDetailViewStyle)}>
								<View style = {styling.styles.idDiamondDetailsLeft} >

									<DetailEntry
										label = {TEXT.Shape}
										value = {this.state.shape}/>

									{this.getCut()}

									<DetailEntry
										label = {TEXT.polish}
										value = {dataArr[strings.polish]}/>

									<DetailEntry
										label = {TEXT.symm}
										value = {dataArr[strings.symmetry]}/>

									{this.displayFluor()}

									<DetailEntry
										label = {TEXT.depth}
										value = {dataArr[strings.depth]}/>

									<DetailEntry
										label = {TEXT.table}
										value = {dataArr[strings.table]}/>

									<DetailEntry
										label = {TEXT.lab}
										value = {this.state.LAB}/>

									<DetailEntry
										label = {TEXT.mmDisplay}
										value = {dataArr[strings.measurements]}/>

									<DetailEntry
										label = {strings.sku}
										value = {dataArr[strings.lotId]}/>

									{this.displayCertificateId()}
								</View>

								<View style = {getStyle(styling.styles.idDiamondDetailsRight, styling.styles.idTabletDiamondDetailsRight)} >
									{this.getGiaLink()}
									{this.getLabLink()}
									{this.get360Modal()}
								</View>

							</View>

							{this.getMoreInfo()}

						</View>
					</View>

				</View>

				{this.loadingShare()}

			</ScrollView>

			<DetailFooter
				ref = {DetailFooter => { this.DetailFooter = DetailFooter; }}
				navigation = {this.props.navigation}
				actionContact = {this.getContactUsModal} // you are here
				actionShare = {this.shareModal}
				guestShare = {this.guestShare}/>

		</View>);
	}
}
