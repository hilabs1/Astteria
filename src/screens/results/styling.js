'use strict';
import { StyleSheet, Platform, Dimensions } from 'react-native';
import { getTextSize, isTablet, isChinese } from '../../Cortex';
import * as colors from '../colors';
import { textFont, REM, filterTitleFont, numberFont, modalHeight, modalWidth, modalPosition } from '../styling';

const imageModalHeight = 450;

export const shareModal = StyleSheet.create({
	modalView:
	{
		marginTop: Dimensions.get('window').height / 2 - (isTablet ? getTextSize(175) : getTextSize(250)),
		alignSelf: 'center',
		alignItems: 'stretch',
		justifyContent: 'flex-end',
		backgroundColor: colors.white,
		height: getTextSize(500),
		width: isTablet ? getTextSize(300) : modalWidth,
		...Platform.select({
			ios:
			{
				shadowColor: colors.gray,
				shadowOffset: { width: 0, height: 0 },
				shadowOpacity: getTextSize(30),
				shadowRadius: getTextSize(20)
			},
			android:
			{
				elevation: 5,
				borderWidth: isTablet ? StyleSheet.hairlineWidth : 0,
				borderColor: colors.shadowBox
			}
		})
	},
	modalWithoutImageView:
	{
		marginTop: Dimensions.get('window').height / 2 - getTextSize(isTablet ? 100 : 120),
		alignSelf: 'center',
		alignItems: 'stretch',
		justifyContent: 'flex-end',
		backgroundColor: colors.white,
		height: getTextSize(isTablet ? 200 : 240),
		width: isTablet ? getTextSize(100) : modalWidth,
		...Platform.select({
			ios:
			{
				shadowColor: colors.gray,
				shadowOffset: { width: 0, height: 0 },
				shadowOpacity: getTextSize(30),
				shadowRadius: getTextSize(20)
			},
			android:
			{
				elevation: 5
			}
		})
	},
	buttonWrapperView:
	{
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		alignSelf: 'center',
		backgroundColor: colors.lightGray,
		width: '100%',
		height: '10%'
	},
	buttonWrapperWithoutImageView:
	{
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: isTablet ? 'center' : 'space-between',
		alignSelf: 'center',
		backgroundColor: colors.lightGray,
		width: '100%',
		height: isTablet ? '15%' : '20%'
	},
	touchable:
	{
		width: '49.49%',
		height: '100%',
		backgroundColor: colors.popUpButton,
		alignContent: 'center',
		justifyContent: 'center'
	},
	touchableText:
	{
		color: colors.searchFieldGray,
		letterSpacing: getTextSize(0.79),
		fontSize: isTablet ? getTextSize(10) : getTextSize(13),
		fontFamily: textFont,
		textAlign: 'center'
	},
	changePriceView:
	{
		alignSelf: 'center',
		alignItems: 'center',
		backgroundColor: colors.white,
		justifyContent: 'center',
		width: '100%',
		height: '90%'
	},
	changePriceText:
	{
		fontSize: isTablet ? getTextSize(10) : getTextSize(15),
		lineHeight: isTablet ? getTextSize(20) : getTextSize(25),
		alignSelf: 'center',
		fontFamily: numberFont
	},
	switchBox:
	{
		flexDirection: 'row',
		marginTop: getTextSize(20),
		alignItems: 'center',
		alignContent: 'center',
		justifyContent: 'space-around',
		width: getTextSize(isTablet ? 140 : (modalWidth - modalWidth / 3)),
		height: getTextSize(isTablet ? 20 : 35)
	},
	shareTouchable:
	{
		padding: getTextSize(isTablet ? 0 : 7),
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: getTextSize(isTablet ? 60 : 85),
		alignItems: 'center'
	},
	shareImage:
	{
		resizeMode: 'stretch',
		padding: getTextSize(7),
		alignSelf: 'center',
		height: getTextSize(isTablet ? 10 : 15),
		width: getTextSize(isTablet ? 10 : 15)
	},
	footerText:
	{
		fontSize: getTextSize(isTablet ? 15 : 17),
		color: colors.white,
		fontFamily: textFont
	}
});

export const footerItems = StyleSheet.create({
	touchable:
	{
		padding: isTablet ? getTextSize(10) : getTextSize(7)
	},
	footerText:
	{
		fontSize: isTablet ? getTextSize(15) : getTextSize(17),
		color: colors.white,
		fontFamily: textFont
	}
});

export const phones = StyleSheet.create({
	viewStyle:
	{
		flexDirection: 'row',
		width: '100%',
		height: '70%',
		backgroundColor: colors.white,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center'
	},
	phonesTouchable:
	{
		marginLeft: getTextSize(10),
		marginRight: getTextSize(10)
	},
	phonesTexts:
	{
		height: getTextSize(25),
		fontSize: getTextSize(15),
		lineHeight: getTextSize(25),
		textAlign: 'center',
		fontFamily: numberFont
	}
});

export const callMenu = StyleSheet.create({
	optionMenu:
	{
		flexDirection: 'row',
		alignSelf: 'center',
		alignItems: 'center',
		backgroundColor: colors.white,
		height: isTablet ? '75%' : '70%',
		justifyContent: 'space-around',
		width: '100%'
	},
	imageStyle:
	{
		alignContent: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		resizeMode: 'contain',
		height: getTextSize(30),
		width: getTextSize(30)
	}
});

export const contactUsModal = StyleSheet.create({
	modalStyle:
	{
		marginTop: modalPosition,
		alignSelf: 'center',
		alignItems: 'stretch',
		justifyContent: 'flex-end',
		backgroundColor: colors.white,
		height: isTablet ? '25%' : modalHeight,
		width: isTablet ? '60%' : modalWidth,
		...Platform.select({
			ios:
			{
				shadowColor: colors.gray,
				shadowOffset: { width: 0, height: 0 },
				shadowOpacity: getTextSize(30),
				shadowRadius: getTextSize(20)
			},
			android:
			{
				borderWidth: StyleSheet.hairlineWidth,
				borderColor: colors.lightGray
			}
		})
	},
	midView:
	{
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'space-around',
		width: '100%',
		borderWidth: 1
	},
	cancelTouchable:
	{
		alignItems: 'center',
		justifyContent: 'center',
		height: isTablet ? '25%' : '30%',
		alignSelf: 'center',
		backgroundColor: colors.popUpButton,
		width: '100%'
	},
	touchableText:
	{
		color: colors.searchFieldGray,
		letterSpacing: getTextSize(0.79),
		fontSize: isTablet ? getTextSize(10) : getTextSize(13),
		fontFamily: textFont,
		textAlign: 'center'
	},
	contactUsTouchable:
	{
		padding: isTablet ? getTextSize(10) : getTextSize(7)
	}
});

export const guestShareView = StyleSheet.create({
	touchableShare:
	{
		padding: isTablet ? 0 : getTextSize(7),
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: isTablet ? getTextSize(60) : getTextSize(85),
		alignItems: 'center'
	},
	imageShare:
	{
		resizeMode: 'stretch',
		padding: getTextSize(7),
		alignSelf: 'center',
		height: isTablet ? getTextSize(10) : getTextSize(15),
		width: isTablet ? getTextSize(10) : getTextSize(15)
	},
	footerTextStyle:
	{
		fontSize: isTablet ? getTextSize(15) : getTextSize(17),
		color: colors.white,
		fontFamily: textFont
	}
});

export const moreInfoModal = StyleSheet.create({
	modalView:
	{
		marginTop: Dimensions.get('window').height / 2 - (isTablet ? getTextSize(100) : getTextSize(230)),
		alignSelf: 'center',
		alignItems: 'stretch',
		justifyContent: 'flex-end',
		backgroundColor: colors.white,
		height: isTablet ? getTextSize(210) : getTextSize(350),
		width: isTablet ? getTextSize(200) : modalWidth,
		...Platform.select({
			ios:
			{
				shadowColor: colors.gray,
				shadowOffset: { width: 0, height: 0 },
				shadowOpacity: getTextSize(30),
				shadowRadius: getTextSize(20)
			},
			android:
			{
				elevation: 5,
				borderWidth: isTablet ? StyleSheet.hairlineWidth : 0,
				borderColor: colors.shadowBox
			}
		})
	},
	midView:
	{
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'space-around',
		width: '100%'
	},
	closeTouchable:
	{
		alignItems: 'center',
		justifyContent: 'center',
		height: '15%',
		alignSelf: 'center',
		backgroundColor: colors.popUpButton,
		width: '100%'
	},
	closeText:
	{
		color: colors.searchFieldGray,
		letterSpacing: getTextSize(0.79),
		fontSize: isTablet ? getTextSize(10) : getTextSize(13),
		fontFamily: textFont,
		textAlign: 'center'
	},
	moreInfoTextLabel:
	{
		color: colors.labelColor,
		fontFamily: textFont,
		fontSize: isTablet ? getTextSize(7) : getTextSize(15),
		lineHeight: isTablet ? getTextSize(10) : getTextSize(20), // TODO TABLET do sth should not have lineheight
		backgroundColor: colors.trans,
		alignSelf: 'center',
		padding: getTextSize(5),
		borderWidth: isTablet ? 1 : 0,
		borderColor: colors.labelColor,
		textAlign: 'center',
		width: isTablet ? getTextSize(70) : getTextSize(110)
	},
	costView:
	{
		alignSelf: 'center',
		alignItems: 'center',
		backgroundColor: colors.white,
		height: '85%',
		justifyContent: 'center',
		width: '90%'
	},
	passwordTextInput:
	{
		height: isTablet ? getTextSize(30) : getTextSize(40),
		width: '60%',
		fontSize: isTablet ? getTextSize(10) : getTextSize(15),
		color: colors.searchFieldGray,
		textAlignVertical: 'center',
		padding: getTextSize(7),
		marginTop: getTextSize(5),
		alignSelf: 'center',
		textAlign: 'center',
		fontFamily: numberFont
	},
	rowView:
	{
		flexDirection: 'row',
		alignSelf: 'flex-start',
		alignContent: 'flex-start',
		justifyContent: 'flex-start'
	},
	labelText:
	{
		fontSize: isTablet ? getTextSize(10) : getTextSize(16),
		lineHeight: isTablet ? getTextSize(20) : getTextSize(25),
		alignSelf: isTablet ? 'center' : 'flex-start',
		fontFamily: textFont,
		color: colors.labelColor,
		marginRight: getTextSize(15)
	},
	valueText:
	{
		fontSize: isTablet ? getTextSize(10) : getTextSize(16),
		lineHeight: isTablet ? getTextSize(20) : getTextSize(25),
		alignSelf: 'center',
		fontFamily: numberFont,
		color: colors.black
	}
});

export const detailViews = StyleSheet.create({
	entryRow:
	{
		flexDirection: 'row',
		alignItems: 'center',
		width: '70%',
		height: isTablet ? getTextSize(20) : getTextSize(30)
	},
	labelStyle:
	{
		color: colors.labelColor,
		fontFamily: textFont,
		fontSize: isTablet ? getTextSize(10) : getTextSize(15),
		backgroundColor: colors.trans,
		width: isTablet ? getTextSize(60) : getTextSize(65),
		alignSelf: 'flex-start'
	},
	jewelryLabel:
	{
		color: colors.labelColor,
		fontFamily: textFont,
		fontSize: isTablet ? getTextSize(10) : getTextSize(15),
		backgroundColor: colors.trans,
		width: isTablet ? getTextSize(90) : getTextSize(110),
		alignSelf: 'flex-start'
	},
	valueStyle:
	{
		color: colors.black,
		fontFamily: numberFont,
		alignSelf: 'flex-start',
		width: getTextSize(110),
		...Platform.select({
			ios:
			{
				fontSize: isTablet ? getTextSize(10) : getTextSize(16)
			},
			android:
			{
				fontSize: isTablet ? getTextSize(10) : getTextSize(15)
			}
		})
	},
	blueButtonText:
	{
		fontSize: isTablet ? getTextSize(10) : getTextSize(13),
		textAlignVertical: 'center',
		textAlign: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		color: colors.white,
		fontFamily: textFont
	},
	blueButton:
	{
		height: isTablet ? getTextSize(25) : getTextSize(40),
		width: isTablet ? getTextSize(80) : getTextSize(100),
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.blueButton,
		borderWidth: 1,
		borderColor: colors.gray,
		marginBottom: isTablet ? getTextSize(10) : getTextSize(5)
	},
	titleView:
	{
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: '95%',
		alignSelf: 'center',
		alignContent: 'center',
		height: isTablet ? getTextSize(40) : getTextSize(70)
	},
	titleText:
	{
		fontSize: isTablet ? getTextSize(15) : getTextSize(18),
		letterSpacing: getTextSize(1),
		textAlign: 'left',
		justifyContent: 'center',
		alignSelf: 'center',
		width: '80%',
		color: colors.black,
		fontFamily: numberFont
	},
	imageSwiper:
	{
		backgroundColor: colors.white,
		height: getTextSize(200),
		width: '100%'
	},
	zoomInSwiper:
	{
		alignSelf: 'center',
		alignItems: 'stretch',
		justifyContent: 'space-between',
		backgroundColor: colors.white,
		height: isTablet ? getTextSize(300) : getTextSize(imageModalHeight),
		width: '90%',
		...Platform.select({
			ios:
			{
				shadowColor: colors.gray,
				shadowOffset: { width: 0, height: 0 },
				shadowOpacity: getTextSize(30),
				shadowRadius: getTextSize(20),
				marginTop: isTablet ? getTextSize(90) : (Dimensions.get('window').height - REM * imageModalHeight) / 2
			},
			android:
			{
				elevation: 5,
				borderWidth: StyleSheet.hairlineWidth,
				borderColor: colors.shadowBox,
				marginTop: isTablet ? getTextSize(150) : (Dimensions.get('window').height - REM * imageModalHeight) / 2
			}
		})
	},
	modalSwiper:
	{
		backgroundColor: colors.white,
		width: '100%',
		height: '100%'
	},
	closeButton:
	{
		alignItems: 'center',
		justifyContent: 'center',
		height: '10%',
		backgroundColor: colors.popUpButton,
		width: '100%',
		position: 'absolute',
		bottom: 0
	},
	closeButtonText:
	{
		color: colors.searchFieldGray,
		letterSpacing: getTextSize(0.79),
		fontSize: isTablet ? getTextSize(10) : getTextSize(13),
		fontFamily: textFont,
		textAlign: 'center'
	},
	swiperImage:
	{
		alignSelf: 'center',
		height: '100%',
		width: '90%'
	},
	priceShadowBox:
	{
		justifyContent: 'center',
		alignItems: 'flex-start',
		alignContent: 'flex-start',
		backgroundColor: colors.white,
		width: Dimensions.get('window').width,
		overflow: 'hidden',
		alignSelf: 'center',
		height: isTablet ? getTextSize(50) : getTextSize(90),
		...Platform.select({
			android:
			{
				borderWidth: StyleSheet.hairlineWidth,
				borderColor: colors.lightGray
			}
		})
	},
	priceViewWrapper:
	{
		flexDirection: 'row',
		backgroundColor: colors.white,
		paddingLeft: '5%',
		alignItems: 'center',
		width: '100%',
		height: getTextSize(50),
		...Platform.select({
			ios:
			{
				shadowColor: colors.whiteBoxShadow,
				shadowOffset: { width: 0, height: isTablet ? getTextSize(-40) : getTextSize(-65) },
				shadowOpacity: getTextSize(90),
				shadowRadius: getTextSize(10)
			}
		})
	},
	priceBox:
	{
		alignSelf: 'flex-start', // in charge of pinning itself to top of priceViewWrapper
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		width: getTextSize(100)
		// backgroundColor: 'green'
	},
	priceLabel:
	{
		color: colors.labelColor,
		fontFamily: textFont,
		fontSize: isTablet ? getTextSize(10) : getTextSize(15),
		backgroundColor: colors.trans,
		width: isTablet ? getTextSize(60) : '100%',
		alignSelf: 'flex-start'
	},
	priceValue:
	{
		textAlign: 'left',
		fontWeight: '300',
		fontFamily: textFont,
		...Platform.select({
			ios:
			{
				fontSize: isTablet ? getTextSize(10) : getTextSize(17)
			},
			android:
			{
				fontSize: isTablet ? getTextSize(10) : getTextSize(15)
			}
		})
	},
	crossedValue:
	{
		textAlign: 'left',
		fontWeight: '300',
		color: colors.searchFieldGray,
		fontFamily: textFont,
		textDecorationLine: 'line-through',
		textDecorationStyle: 'solid',
		...Platform.select({
			ios:
			{
				fontSize: isTablet ? getTextSize(8) : getTextSize(14)
			},
			android:
			{
				fontSize: isTablet ? getTextSize(8) : getTextSize(12)
			}
		})
	},
	shareLoaderView:
	{
		position: 'absolute',
		top: Dimensions.get('window').height / 3,
		backgroundColor: colors.blueButton,
		height: getTextSize(100),
		width: getTextSize(200),
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 40
	},
	shareLoaderText:
	{
		fontFamily: textFont,
		alignSelf: 'center',
		color: colors.white,
		fontSize: getTextSize(15)
	}

});

export const jewelryViewStyle = StyleSheet.create({
	titleViewStyle:
	{
		flexDirection: 'row',
		alignItems: 'center',
		width: '90%',
		alignSelf: 'center',
		alignContent: 'center',
		height: isTablet ? getTextSize(40) : getTextSize(70),
		marginBottom: isTablet ? getTextSize(5) : getTextSize(10)
	},
	priceTextStyle:
	{
		textAlign: 'left',
		fontFamily: textFont,
		letterSpacing: getTextSize(0.5),
		lineHeight: isTablet ? getTextSize(12) : getTextSize(24),
		color: colors.black,
		fontSize: isTablet ? getTextSize(8) : getTextSize(15)
	}
});

export const itemViewStyle = StyleSheet.create({

	shadowBox:
	{
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center',
		backgroundColor: colors.white,
		width: Dimensions.get('window').width,
		overflow: 'hidden',
		height: isTablet ? getTextSize(150) : getTextSize(320),
		borderWidth: isTablet ? 1 : 0,
		borderColor: colors.lightGray,
		...Platform.select({
			android:
			{
				borderTopWidth: StyleSheet.hairlineWidth,
				borderTopColor: colors.lightGray,
				marginBottom: isTablet ? 0 : getTextSize(10)
			}
		})
	},
	viewStyle:
	{
		width: Dimensions.get('window').width,
		backgroundColor: colors.trans,
		alignSelf: 'flex-start',
		justifyContent: 'flex-end',
		height: '100%',
		...Platform.select({
			ios:
			{
				shadowColor: colors.whiteBoxShadow,
				shadowOffset: { width: 0, height: isTablet ? getTextSize(-280) : getTextSize(-310) },
				shadowOpacity: getTextSize(90),
				shadowRadius: getTextSize(10)
			}
		})
	},
	tableStyle:
	{
		flexDirection: 'row',
		justifyContent: 'flex-start',
		paddingLeft: isTablet ? '2%' : '5%',
		paddingBottom: '2%',
		width: isTablet ? '100%' : '100%',
		alignSelf: 'center',
		backgroundColor: isTablet ? colors.trans : colors.white,
		height: isTablet ? getTextSize(80) : getTextSize(220)
	},
	columnStyle:
	{
		justifyContent: 'center',
		width: isTablet ? 'auto' : '55%'
	},
	rowStyle:
	{
		flexDirection: 'row',
		width: isTablet ? '90%' : '85%',
		alignItems: 'baseline'
	},
	labelStyle:
	{
		color: colors.labelColor,
		fontFamily: textFont,
		fontSize: isTablet ? getTextSize(9) : getTextSize(14),
		lineHeight: isTablet ? getTextSize(15) : getTextSize(26),
		width: '35%',
		alignSelf: 'flex-start',
		...Platform.select({
			android:
			{
				fontWeight: 'bold'
			}
		})
	},
	detailTextStyle:
	{
		textAlign: 'left',
		color: colors.black,
		fontFamily: numberFont,
		lineHeight: isTablet ? getTextSize(15) : getTextSize(26),
		letterSpacing: getTextSize(0.5),
		...Platform.select({
			ios:
			{
				fontSize: isTablet ? getTextSize(8) : getTextSize(14)
			},
			android:
			{
				fontSize: isTablet ? getTextSize(8) : getTextSize(12),
				fontWeight: 'bold'
			}
		})
	},
	callForPriceBox:
	{
		justifyContent: 'center',
		alignItems: 'center', // check for phone
		backgroundColor: isTablet ? colors.priceGray : colors.white,
		width: isTablet ? '30%' : getTextSize(120),
		flexDirection: 'row', // check for phone
		paddingLeft: isTablet ? 0 : getTextSize(15),
		height: isTablet ? '75%' : getTextSize(50),
		alignSelf: 'center',
		...Platform.select({
			ios:
			{
				shadowColor: colors.whiteBoxShadow,
				shadowOffset: { width: 0, height: 0 },
				shadowOpacity: getTextSize(10),
				shadowRadius: isTablet ? getTextSize(10) : getTextSize(30)
			},
			android:
			{
				borderWidth: StyleSheet.hairlineWidth,
				borderColor: colors.lightGray
			}
		})
	},
	priceLabelStyle:
	{
		fontSize: isTablet ? getTextSize(10) : getTextSize(15),
		textAlign: 'left',
		fontFamily: textFont,
		color: colors.labelColor,
		letterSpacing: getTextSize(0.7),
		paddingBottom: getTextSize(4),
		paddingTop: getTextSize(6),
		lineHeight: isTablet ? getTextSize(10) : getTextSize(26),
		...Platform.select({
			android:
			{
				fontWeight: 'bold'
			}
		})
	},
	priceTextStyle:
	{
		textAlign: 'left',
		fontFamily: textFont,
		letterSpacing: getTextSize(0.5),
		lineHeight: isTablet ? getTextSize(12) : getTextSize(15),
		color: colors.black,
		...Platform.select({
			ios:
			{
				fontSize: isTablet ? getTextSize(8) : getTextSize(17)
			},
			android:
			{
				fontSize: isTablet ? getTextSize(8) : getTextSize(14),
				fontWeight: 'bold'
			}
		})
	},
	titleViewStyle:
	{
		flexDirection: 'row',
		alignItems: 'center',
		width: isTablet ? '90%' : '100%',
		alignSelf: 'center',
		alignContent: 'center',
		height: isTablet ? getTextSize(40) : getTextSize(70),
		marginBottom: isTablet ? getTextSize(5) : getTextSize(10)
	},
	titleTextStyle:
	{
		fontSize: isTablet ? getTextSize(13) : getTextSize(18),
		letterSpacing: getTextSize(1),
		textAlign: 'left',
		justifyContent: 'center',
		alignSelf: 'center',
		width: Dimensions.get('window').width - getTextSize(70),
		color: colors.black,
		fontFamily: textFont,
		paddingLeft: isTablet ? getTextSize(10) : 0
	},
	jewelryTitleStyle:
	{
		// for tablet items that need to look like jewelry
		fontSize: getTextSize(12),
		letterSpacing: getTextSize(1),
		textAlign: 'left',
		justifyContent: 'center',
		alignSelf: 'center',
		width: getTextSize(170),
		color: colors.black,
		fontFamily: textFont
	},
	shapeImageStyle:
	{
		backgroundColor: colors.trans,
		height: isTablet ? getTextSize(30) : getTextSize(60),
		width: isTablet ? getTextSize(30) : getTextSize(60),
		resizeMode: 'contain'
	},
	priceBoxStyle:
	{
		alignItems: isTablet ? 'center' : 'flex-start',
		justifyContent: 'flex-start',
		alignSelf: 'center',
		backgroundColor: colors.priceGray,
		width: isChinese ? '35%' : '30%',
		flexDirection: isTablet ? 'row' : 'column',
		height: isTablet ? '75%' : '85%',
		padding: getTextSize(5),
		...Platform.select({
			ios:
			{
				shadowColor: colors.whiteBoxShadow,
				shadowOffset: { width: 0, height: 0 },
				shadowOpacity: getTextSize(10),
				shadowRadius: getTextSize(10)
			},
			android:
			{
				borderWidth: StyleSheet.hairlineWidth,
				borderColor: colors.lightGray
			}
		})
	},
	priceWhiteBox:
	{
		justifyContent: isTablet ? 'flex-start' : 'flex-start',
		alignItems: 'flex-start',
		height: isTablet ? '80%' : 'auto',
		width: isTablet ? '33%' : '100%',
		paddingLeft: isTablet ? 0 : getTextSize(10)
	},
	crossedTextStyle:
	{
		fontSize: isTablet ? getTextSize(7) : getTextSize(13),
		textAlign: 'left',
		fontFamily: textFont,
		color: isTablet ? colors.labelColor : colors.searchFieldGray,
		paddingBottom: isTablet ? 0 : getTextSize(6),
		paddingTop: isTablet ? 0 : getTextSize(6),
		textDecorationLine: 'line-through',
		textDecorationStyle: 'solid',
		alignItems: 'baseline'
	},
	jewelryShadowBox:
	{
		justifyContent: 'flex-start',
		alignItems: 'center',
		alignContent: 'center',
		backgroundColor: colors.white,
		width: Dimensions.get('window').width / 2,
		overflow: 'hidden',
		height: getTextSize(270)
	},
	jewelryViewStyle:
	{
		justifyContent: 'flex-start',
		width: '100%',
		backgroundColor: colors.trans,
		alignSelf: 'center',
		paddingTop: getTextSize(20)
	},
	pictureBox:
	{
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		alignContent: 'center',
		borderWidth: 1,
		borderColor: colors.lightGray,
		backgroundColor: colors.white,
		height: isTablet ? getTextSize(170) : getTextSize(150),
		width: isTablet ? getTextSize(170) : getTextSize(150),
		marginBottom: getTextSize(10),
		...Platform.select({
			ios:
			{
				shadowColor: colors.whiteBoxShadow,
				shadowOffset: { width: 0, height: 0 },
				shadowOpacity: getTextSize(10),
				shadowRadius: getTextSize(10)
			},
			android:
			{
				borderWidth: StyleSheet.hairlineWidth,
				borderColor: colors.lightGray
			}
		})
	},
	jewelryEntryRow:
	{
		flexDirection: 'row',
		width: getTextSize(170),
		alignSelf: 'center'
	},
	jewelryDetailText:
	{
		textAlign: 'left',
		color: colors.labelColor,
		fontFamily: textFont,
		fontSize: getTextSize(10),
		lineHeight: getTextSize(20)
	}
});
