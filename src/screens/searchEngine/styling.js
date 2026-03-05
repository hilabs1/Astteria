'use strict';
import { StyleSheet, Platform, Dimensions } from 'react-native';
import { getTextSize, isTablet, getIconHeight } from '../../Cortex';
import * as colors from '../colors';
import { textFont, REM, filterTitleFont, numberFont } from '../styling';

export const searchBar = StyleSheet.create({
	wrapperViewStyle:
	{
		width: Dimensions.get('window').width,
		alignContent: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		...Platform.select({
			ios:
			{
				height: isTablet ? getTextSize(35) : getTextSize(60)
			},
			android:
			{
				height: isTablet ? getTextSize(40) : getTextSize(60)
			}
		})
	},
	viewStyle:
	{
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignContent: 'center',
		alignItems: 'center',
		borderColor: colors.gray,
		borderWidth: 1,
		width: '90%',
		alignSelf: 'center',
		backgroundColor: colors.white,
		height: isTablet ? getTextSize(30) : getTextSize(45)
	},
	textInput:
	{
		height: '100%',
		width: '85%',
		color: colors.searchFieldGray,
		textAlignVertical: 'center',
		padding: getTextSize(5),
		backgroundColor: colors.white,
		textAlign: 'left',
		fontFamily: numberFont,
		...Platform.select({
			android:
			{
				fontSize: isTablet ? getTextSize(10) : getTextSize(13)
			},
			ios:
			{
				fontSize: isTablet ? getTextSize(10) : getTextSize(14)
			}
		})
	},
	searchTouchable:
	{
		backgroundColor: colors.white,
		padding: isTablet ? getTextSize(10) : getTextSize(5),
		width: '15%',
		justifyContent: 'center', // check for phone
		alignContent: 'center', // check for phone
		height: isTablet ? getTextSize(25) : 'auto'
	},
	searchImage:
	{
		alignContent: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		backgroundColor: colors.white,
		resizeMode: 'cover',
		height: isTablet ? getIconHeight() : getTextSize(25),
		width: isTablet ? getIconHeight() : getTextSize(25)
	}
});

export const searchResultStyle = StyleSheet.create({
	viewStyle:
	{
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: colors.white
	},
	resultTextStyle:
	{
		textAlign: 'center',
		alignSelf: 'center',
		fontSize: isTablet ? getTextSize(10) : getTextSize(15),
		fontFamily: numberFont,
		...Platform.select({
			android:
			{
				borderBottomWidth: StyleSheet.hairlineWidth,
				borderBottomColor: colors.lightGray,
				width: '100%',
				backgroundColor: colors.white,
				height: getTextSize(30),
				paddingTop: getTextSize(5),
				paddingBottom: getTextSize(5)
			},
			ios:
			{
				marginBottom: getTextSize(5),
				marginTop: getTextSize(5)
			}
		})
	},
	loaderStyle:
	{
		position: 'absolute',
		top: getTextSize(200),
		alignSelf: 'center',
		backgroundColor: colors.lightGray,
		height: getTextSize(100),
		width: getTextSize(200),
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 40
	},
	loaderTextStyle:
	{
		fontFamily: textFont,
		alignSelf: 'center',
		fontSize: getTextSize(15)
	}
});

export const ImageTableStyle = StyleSheet.create({

	tableStyle:
	{
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		marginBottom: getTextSize(10),
		width: '100%'
	},

	shadowBox:
	{
		justifyContent: isTablet ? 'center' : 'flex-end',
		alignItems: 'center',
		width: Dimensions.get('window').width,
		backgroundColor: colors.white,
		overflow: 'hidden',
		height: isTablet ? (Platform.OS === 'ios' ? getTextSize(110) : getTextSize(130)) : getTextSize(350),
		...Platform.select({
			android:
			{
				borderTopWidth: StyleSheet.hairlineWidth,
				borderTopColor: colors.lightGray
			}
		})
	},

	viewStyle:
	{
		justifyContent: 'center',
		alignSelf: 'center',
		alignItems: 'center',
		width: '100%',
		backgroundColor: colors.white,
		...Platform.select({
			ios:
			{
				shadowColor: colors.whiteBoxShadow,
				shadowOffset: { width: 0, height: isTablet ? getTextSize(-110) : getTextSize(-365) },
				shadowOpacity: getTextSize(90),
				shadowRadius: isTablet ? getTextSize(10) : getTextSize(50)
			},
			android:
			{
				marginBottom: isTablet ? getTextSize(10) : 0
			}
		})
	},

	innerViewStyle: {
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: isTablet ? getTextSize(2) : '2%',
		marginTop: isTablet ? getTextSize(5) : '2%',
		borderWidth: 1
	},
	imageStyle:
	{
		backgroundColor: colors.trans,
		resizeMode: 'cover',
		height: isTablet ? getTextSize(30) : getTextSize(50),
		width: isTablet ? getTextSize(30) : getTextSize(50)
	},
	textStyle:
	{
		fontSize: isTablet ? getTextSize(9) : getTextSize(12),
		fontFamily: textFont,
		lineHeight: isTablet ? getTextSize(10) : getTextSize(30),
		...Platform.select({
			android:
			{
				fontSize: isTablet ? getTextSize(7) : getTextSize(15)
			}
		})
	}
});

export const ImageRowStyle = StyleSheet.create({
	shadowBox:
	{
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'flex-start',
		width: Dimensions.get('window').width,
		backgroundColor: colors.white,
		overflow: 'hidden',
		height: isTablet ? getTextSize(110) : getTextSize(200),
		...Platform.select({
			android:
			{
				borderTopWidth: StyleSheet.hairlineWidth,
				borderTopColor: colors.lightGray
			}
		})
	},
	viewStyle:
	{
		justifyContent: 'center',
		alignSelf: 'center',
		alignItems: 'center',
		width: '100%',
		backgroundColor: colors.white,
		...Platform.select({
			ios:
			{
				shadowColor: colors.whiteBoxShadow,
				shadowOffset: { width: 0, height: isTablet ? getTextSize(-105) : getTextSize(-190) },
				shadowOpacity: getTextSize(90),
				shadowRadius: isTablet ? getTextSize(10) : getTextSize(50)
			},
			android:
			{
				marginBottom: isTablet ? getTextSize(10) : 0
			}
		})
	},
	innerViewStyle: {
		alignItems: 'center',
		justifyContent: 'center', // 'space-between',
		padding: isTablet ? getTextSize(2) : '2%',
		marginTop: isTablet ? getTextSize(5) : '2%',
		borderWidth: 1,
		width: isTablet ? '17%' : '23%',
		height: isTablet ? getTextSize(60) : getTextSize(90)
	}

});

export const colorTable = StyleSheet.create({

	overtoneStyle:
	{
		flexDirection: 'row',
		alignSelf: 'center',
		width: '100%',
		marginTop: getTextSize(10),
		marginBottom: getTextSize(10)
	},

	rowStyle:
	{
		flexDirection: 'row',
		width: '100%',
		height: isTablet ? getTextSize(30) : getTextSize(65),
		justifyContent: 'space-between',
		alignItems: 'center',
		alignSelf: 'center',
		backgroundColor: colors.trans
	},

	subTitleTextStyle:
	{
		fontSize: isTablet ? getTextSize(12) : getTextSize(15),
		padding: isTablet ? getTextSize(2) : getTextSize(10),
		color: colors.fancyColorSubGray,
		lineHeight: getTextSize(30),
		fontFamily: textFont,
		alignSelf: 'flex-start'

	},

	fancyContainerStyle:
	{
		alignItems: 'center',
		width: '95%',
		justifyContent: 'center',
		...Platform.select({
			ios:
			{
				marginTop: isTablet ? getTextSize(10) : getTextSize(20),
				height: isTablet ? getTextSize(250) : getTextSize(360)
			},
			android:
			{
				marginTop: getTextSize(10),
				height: isTablet ? getTextSize(270) : getTextSize(330)
			}
		})
	},

	whiteRowViewStyle:
	{
		paddingTop: isTablet ? getTextSize(20) : getTextSize(20),
		paddingBottom: isTablet ? 0 : getTextSize(20),
		width: '95%',
		alignSelf: 'center'
	},

	fancyScrollView:
	{
		flexDirection: 'row',
		width: isTablet ? getTextSize(800) : getTextSize(950),
		alignItems: 'center',
		alignSelf: 'center',
		marginTop: isTablet ? getTextSize(5) : 0,
		marginBottom: isTablet ? getTextSize(10) : 0,
		...Platform.select({
			ios:
			{
				height: isTablet ? getTextSize(30) : getTextSize(55)
			},
			android:
			{
				height: isTablet ? getTextSize(45) : getTextSize(60)
			}
		})
	},

	scrollViewStyle:
	{
		flexDirection: 'row',
		alignItems: 'center',
		width: isTablet ? getTextSize(510) : getTextSize(950),
		alignSelf: 'center',
		justifyContent: 'center',
		...Platform.select({
			ios:
			{
				height: isTablet ? getTextSize(30) : getTextSize(50)
			},
			android:
			{
				height: isTablet ? getTextSize(45) : getTextSize(60)
			}
		})
	},
	whiteViewStyle:
	{
		justifyContent: 'flex-start', // todo consider rvert to start
		alignSelf: 'center',
		width: '100%',
		paddingBottom: isTablet ? getTextSize(15) : getTextSize(5),
		paddingTop: isTablet ? 0 : getTextSize(6),
		backgroundColor: colors.white,
		height: isTablet ? getTextSize(100) : ( Platform.OS === 'ios' ? getTextSize(150) : getTextSize(160)),
		...Platform.select({
			ios:
			{
				shadowColor: colors.whiteBoxShadow,
				shadowOffset: { width: 0, height: isTablet ? getTextSize(-135) : getTextSize(-235) },
				shadowOpacity: getTextSize(90),
				shadowRadius: isTablet ? getTextSize(10) : getTextSize(50)
			}
		})
	},
	fancyViewStyle:
	{
		justifyContent: 'flex-start',
		alignSelf: 'center',
		alignItems: 'center',
		width: '100%',
		paddingBottom: isTablet ? getTextSize(15) : getTextSize(5),
		paddingTop: isTablet ? 0 : getTextSize(6),
		backgroundColor: colors.white,
		// height: isTablet ? (Platform.OS === 'ios' ? getTextSize(320) : getTextSize(320)) : getTextSize(470),
		...Platform.select({
			ios:
			{
				shadowColor: colors.whiteBoxShadow,
				shadowOffset: { width: 0, height: isTablet ? getTextSize(-355) : getTextSize(-550) },
				shadowOpacity: getTextSize(90),
				shadowRadius: isTablet ? getTextSize(10) : getTextSize(50),
				height: isTablet ? getTextSize(320) : getTextSize(470)
			},
			android:
			{
				height: isTablet ? getTextSize(320) : getTextSize(410)
			}
		})
	},
	shadowBox:
	{
		justifyContent: 'flex-start',
		alignItems: 'center',
		alignContent: 'flex-start',
		backgroundColor: colors.white,
		width: Dimensions.get('window').width,
		overflow: 'hidden',
		...Platform.select({
			android:
			{
				borderTopWidth: StyleSheet.hairlineWidth,
				borderTopColor: colors.lightGray
			},
			ios:
			{
				marginTop: '5%'
			}
		})
	}
});

export const searchEngineStyle = StyleSheet.create({
	viewStyle:
	{
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: '100%',
		backgroundColor: colors.black
	},
	textStyle:
	{
		fontSize: getTextSize(15),
		letterSpacing: getTextSize(6.64),
		lineHeight: getTextSize(30),
		textAlign: 'center',
		color: colors.black,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: '3%',
		marginBottom: '5%',
		fontFamily: textFont
	},
	jewelryTypeContainer:
	{
		height: isTablet ? (Platform.OS === 'ios' ? 300 : 170) : 200
	},
	shapeTypeContainer:
	{
		// height: isTablet ? (Platform.OS === 'ios' ? 350 : 220) : 390
		...Platform.select({
			ios: { height: isTablet ? getTextSize(350) : getTextSize(390) },
			android: { height: isTablet ? getTextSize(220) : getTextSize(370) }
		})
		// height: Platform.OS === 'ios' ? 350 : 390
	},
	scrollViewStyle:
	{
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.white,
		paddingTop: getTextSize(20),
		marginBottom: getTextSize(40),
		...Platform.select({
			ios:
			{
				paddingBottom: getTextSize(80)
			},
			android:
			{
				//flexGrow: 1
				//paddingBottom: getTextSize(30)
			}
		})
	},
	searchBarStyle:
	{
		justifyContent: 'center',
		alignItems: 'center',
		...Platform.select({
			android:
			{
				elevation: getTextSize(5)
			}
		})

	},
	shadowBox:
	{
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'flex-start',
		backgroundColor: colors.white,
		width: Dimensions.get('window').width,
		overflow: 'hidden',
		borderTopColor: colors.lightGray,
		borderTopWidth: StyleSheet.hairlineWidth,
		height: isTablet ? getTextSize(40) : getTextSize(60)
	},
	innerBox:
	{
		justifyContent: 'center',
		alignSelf: 'center',
		width: '95%',
		backgroundColor: colors.white,
		...Platform.select({
			ios:
			{
				shadowColor: colors.whiteBoxShadow,
				shadowOffset: { width: 0, height: isTablet ? getTextSize(-35) : getTextSize(-45) },
				shadowOpacity: getTextSize(90),
				shadowRadius: isTablet ? getTextSize(10) : getTextSize(15)
			}
		})
	},
	subtitleTextStyle:
	{
		fontSize: isTablet ? getTextSize(12) : getTextSize(16),
		color: colors.black,
		fontFamily: textFont,
		textAlign: 'center',
		backgroundColor: colors.trans,
		letterSpacing: getTextSize(1.42)
	}
});

export const searchFooter = StyleSheet.create({

	headerStyle:
	{
		width: '100%',
		backgroundColor: colors.searchHeaderColor,
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		padding: getTextSize(7),
		height: isTablet ? getTextSize(40) : getTextSize(50)
	},
	headerElementsStyle:
	{
		width: '100%',
		backgroundColor: colors.searchHeaderColor,
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center'
	},
	touchableStyle:
	{
		padding: isTablet ? getTextSize(5) : getTextSize(7)
	},
	textResetStyle:
	{
		fontSize: isTablet ? getTextSize(10) : getTextSize(15),
		color: colors.white,
		fontFamily: textFont
	},
	textSearchStyle:
	{
		fontSize: isTablet ? getTextSize(15) : getTextSize(20),
		color: colors.white,
		fontFamily: textFont,
		letterSpacing: getTextSize(1.43)

	},
	invisibleTextStyle:
	{
		fontSize: isTablet ? getTextSize(10) : getTextSize(15),
		color: colors.searchHeaderColor,
		padding: getTextSize(7)
	}

});

export const filterViews = StyleSheet.create({

	viewStyle:
	{
		justifyContent: 'center',
		alignSelf: 'center',
		width: '95%',
		backgroundColor: colors.white,
		...Platform.select({
			ios:
			{
				marginTop: isTablet ? getTextSize(10) : 0,
				height: isTablet ? getTextSize(30) : getTextSize(50),
				shadowColor: colors.whiteBoxShadow,
				shadowOffset: { width: 0, height: isTablet ? getTextSize(-80) : getTextSize(-135) },
				shadowOpacity: getTextSize(90),
				shadowRadius: isTablet ? getTextSize(10) : getTextSize(50)
			}
		})
	},
	colorViewStyle:
	{
		alignItems: 'center',
		justifyContent: 'center',
		width: '95%',
		alignSelf: 'center',
		...Platform.select({
			ios:
			{
				marginTop: isTablet ? getTextSize(10) : getTextSize(20),
				height: isTablet ? getTextSize(30) : getTextSize(50)
			},
			android:
			{
				marginTop: getTextSize(10),
				height: isTablet ? 0 : getTextSize(60)
			}
		})

	},
	scrollViewStyle:
	{
		flexDirection: 'row',
		alignItems: 'center',
		width: isTablet ? getTextSize(510) : getTextSize(650),
		alignSelf: 'center',
		justifyContent: 'center',
		...Platform.select({
			ios:
			{
				height: isTablet ? getTextSize(30) : getTextSize(50)
			},
			android:
			{
				height: isTablet ? getTextSize(45) : getTextSize(60)
			}
		})
	},
	rowViewStyle:
	{
		flexDirection: 'row',
		alignSelf: 'center',
		alignItems: 'center',
		width: '100%',
		height: isTablet ? getTextSize(30) : getTextSize(50)
	},
	filterBlacktextStyle:
	{
		fontSize: isTablet ? REM * 11 : REM * 15,
		textAlignVertical: 'center',
		textAlign: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		color: colors.black,
		fontFamily: textFont
	},
	filterWhiteTextStyle:
	{
		fontSize: isTablet ? getTextSize(11) : getTextSize(15),
		textAlignVertical: 'center',
		textAlign: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		color: colors.white,
		fontFamily: textFont
	}
});

export const views = StyleSheet.create({
	// weight, priceFilter, shapeTable, colorTable, symmetry, fluor, cut, polish, symm, clarity, jewelryType
	filterTitleViewStyle:
	{
		flexDirection: 'row',
		alignItems: 'flex-start',
		alignSelf: 'flex-start',
		backgroundColor: colors.trans
	},
	filterTitleStyle:
	{
		fontSize: isTablet ? getTextSize(10) : getTextSize(16),
		color: colors.black,
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		textAlign: 'left',
		alignSelf: 'center',
		backgroundColor: colors.trans,
		padding: '3%',
		marginBottom: isTablet ? 0 : getTextSize(5), // for x button alignment
		marginTop: isTablet ? 0 : '5%', // for x button alignment
		fontFamily: filterTitleFont
	},
	shadowBox:
	{
		justifyContent: isTablet ? 'center' : 'center',
		alignItems: 'center',
		alignContent: isTablet ? 'center' : 'flex-start',
		backgroundColor: colors.white,
		width: Dimensions.get('window').width,
		overflow: 'hidden',
		height: isTablet ? getTextSize(80) : getTextSize(140),
		...Platform.select({
			android:
			{
				borderTopWidth: StyleSheet.hairlineWidth,
				borderTopColor: colors.lightGray
			}
		})
	},
	viewStyle:
	{
		justifyContent: 'center',
		alignSelf: 'center',
		width: '100%',
		backgroundColor: colors.white,
		...Platform.select({
			ios:
			{
				shadowColor: colors.whiteBoxShadow,
				shadowOffset: {
					width: 0,
					height: isTablet ? getTextSize(-75) : getTextSize(-160)
				},
				shadowOpacity: getTextSize(90),
				shadowRadius: isTablet ? getTextSize(10) : getTextSize(50)
			},
			android:
			{
				marginBottom: isTablet ? getTextSize(10) : getTextSize(10)
			}
		})
	},
	rowStyle:
	{
		flexDirection: 'row',
		width: '95%',
		height: isTablet ? getTextSize(30) : getTextSize(65),
		justifyContent: 'space-between',
		alignItems: 'center',
		alignSelf: 'center',
		backgroundColor: colors.trans
	}
});

export const buttons = StyleSheet.create({
// weight, priceFilter, shapeTable, colorTable, symmetry, fluor, cut, polish, symm, clarity, jewelryType
	cancelTouchableStyle:
	{
		alignSelf: 'center',
		alignItems: 'center',
		marginTop: isTablet ? 0 : '5%',
		marginBottom: isTablet ? 0 : REM * 4,
		padding: isTablet ? '2%' : 7
	},
	cancelImageStyle:
	{
		backgroundColor: colors.trans,
		resizeMode: 'contain',
		width: isTablet ? REM * 10 : REM * 19,
		height: isTablet ? REM * 10 : REM * 19
	},
	filterButton:
	{
		height: isTablet ? getTextSize(30) : getTextSize(50),
		width: isTablet ? getTextSize(40) : getTextSize(50),
		marginLeft: getTextSize(1.5),
		marginRight: getTextSize(1.5),
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1
	},
	radioButton:
	{
		height: isTablet ? getTextSize(30) : getTextSize(60),
		width: '48.5%',
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: colors.gray
	}
});

export const weight = StyleSheet.create({

	textToStyle:
	{

		padding: isTablet ? 0 : getTextSize(5),
		backgroundColor: colors.trans,
		fontFamily: textFont,
		fontSize: isTablet ? getTextSize(13) : getTextSize(15)
	},
	textInputStyle:
	{
		width: '45%',
		borderColor: colors.gray,
		fontSize: isTablet ? getTextSize(10) : getTextSize(15),
		color: colors.black,
		borderWidth: 1,
		textAlignVertical: 'center',
		backgroundColor: colors.trans,
		height: isTablet ? getTextSize(30) : getTextSize(60),
		textAlign: 'center',
		fontFamily: numberFont,
		alignSelf: isTablet ? 'flex-end' : 'auto'
	}
});

export const bashariLocation = StyleSheet.create({
	textInputStyle:
	{
		width: '95%',
		borderColor: colors.gray,
		fontSize: isTablet ? getTextSize(10) : getTextSize(15),
		color: colors.black,
		borderWidth: 1,
		textAlignVertical: 'center',
		backgroundColor: colors.trans,
		height: isTablet ? getTextSize(30) : getTextSize(60),
		textAlign: 'left',
		fontFamily: numberFont,
		alignSelf: 'center',
		paddingLeft: getTextSize(10)
	}
});

export const price = StyleSheet.create({

	textToStyle:
	{
		padding: isTablet ? 0 : getTextSize(5),
		backgroundColor: colors.trans,
		fontFamily: textFont,
		fontSize: isTablet ? getTextSize(13) : getTextSize(15)
	}
});
