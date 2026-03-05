'use strict';
import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import * as colors from './colors';
import { getTextSize, isTablet } from '../Cortex';
export const REM = Dimensions.get('window').width / 380;
export const modalWidth = Dimensions.get('window').width - 50;
export const modalHeight = 150;
export const modalPosition =
  Dimensions.get('window').height / 2 - modalHeight / 2;

const costModalHeight = 160;
const imageModalHeight = 450;
export const iconDim = {
  TABLET: getTextSize(20),
  MOBILE: getTextSize(25),
};
export const textInputIphone = 15;
export const textInputIpad = 20;
export const titleIphone = 20;
export const titleIpad = 30;
export const imageIphoneResize = 'cover';
export const imageIpadResize = 'contain';

export const textFont = 'Agenda-Light';
export const filterTitleFont = 'Agenda-Light';
export const numberFont = 'Agenda-Light';
export const profileFont = 'Prompt-Light';
export const profileTitleFont = 'Prompt-Medium';

export const contactUs = StyleSheet.create({
  keyboardViewRedirected: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: colors.white,
  },
  scrollViewStyle: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.white,
    height: '100%',
  },
  contactUsTitleStyleRedirected: {
    marginTop: isTablet ? getTextSize(10) : '5%',
    fontSize: isTablet ? getTextSize(16) : getTextSize(20),
    color: colors.black,
    letterSpacing: getTextSize(1.25),
    textAlign: 'center',
    fontFamily: textFont,
  },
  lineSeperatorStyleRedirected: {
    marginTop: '3%',
    marginBottom: '5%',
    width: '120%',
  },
  labelStyle: {
    width: '90%',
    margin: '1%',
    color: colors.cuLabel,
    fontSize: getTextSize(14),
    textAlign: 'left',
    fontFamily: textFont,
  },
});

export const styles = StyleSheet.create({
  // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  // GuestLogin.js
  guestLoginConfirmImageBackgroundStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  guestLoginConfirmView: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    // backgroundColor: '',
    marginTop: REM * 50,
    // height: REM*500,
  },

  imCompanyViewStyle: {
    width: '100%',
    alignItems: 'center',
  },

  plusTouchableStyle: {
    width: REM * 50,
    height: REM * 45,
    borderWidth: REM * 1,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: REM * 10,
  },

  plusTextStyle: {
    color: colors.white,
    fontFamily: textFont,
    fontSize: REM * 30,
  },

  passwordPolicyTextStyle: {
    color: colors.white,
    fontFamily: textFont,
    fontSize: REM * 13,
    width: '70%',
    textAlign: 'left',
    marginBottom: REM * 10,
  },

  imCompanyTextStyle: {
    color: colors.white,
    fontFamily: textFont,
    fontSize: REM * 17,
  },

  companyOptionViewStyle: {
    flexDirection: 'row',
    height: REM * 45,
    alignItems: 'center',
    // backgroundColor: '',
    justifyContent: 'flex-start',
    marginTop: REM * 20,
    marginBottom: REM * 30,
    width: '70%',
    // width: '100%'
  },

  guestLoginForgotPassTextStyle: {
    color: colors.white,
    fontFamily: textFont,
    // position: 'absolute',
    letterSpacing: REM * 1,
    // bottom: REM*15,
    // backgroundColor: 'pink',
    // marginTop: REM*5,
    marginBottom: REM * 10,
    padding: REM * 15,
    ...Platform.select({
      ios: {
        fontSize: REM * 15,
      },
      android: {
        fontSize: REM * 12,
      },
    }),
  },

  tabletGuestLoginForgotPassTextStyle: {
    color: colors.white,
    fontFamily: textFont,
    fontSize: REM * 10, // ASPECT_RATIO * 20,
    letterSpacing: REM * 1,
    // marginTop: REM*10, //ASPECT_RATIO * 20,
    padding: REM * 10,
  },

  guestLoginConfirmTextStyle: {
    color: colors.white,
    fontFamily: textFont,
    // position: 'absolute',
    letterSpacing: REM * 1,
    // bottom: REM*15,
    // backgroundColor: 'pink',
    // marginTop: REM*15,
    // marginBottom: REM*20,
    padding: REM * 15,
    ...Platform.select({
      ios: {
        fontSize: REM * 15,
      },
      android: {
        fontSize: REM * 12,
      },
    }),
  },

  tabletGuestLoginConfirmTextStyle: {
    color: colors.white,
    fontFamily: textFont,
    fontSize: REM * 10, // ASPECT_RATIO * 20,
    letterSpacing: REM * 1,
    // backgroundColor: 'pink',
    // marginTop: REM*10, //ASPECT_RATIO * 20,
    padding: REM * 10,
  },

  guestLoginRegisterTextStyle: {
    color: colors.white,
    fontFamily: textFont,
    // position: 'absolute',
    letterSpacing: REM * 1,
    // bottom: REM*15,
    // backgroundColor: 'pink',
    marginTop: REM * 15,
    marginBottom: REM * 20,
    padding: REM * 15,
    ...Platform.select({
      ios: {
        fontSize: REM * 15,
      },
      android: {
        fontSize: REM * 12,
      },
    }),
  },

  tabletGuestLoginRegisterTextStyle: {
    color: colors.white,
    fontFamily: textFont,
    fontSize: REM * 10, // ASPECT_RATIO * 20,
    letterSpacing: REM * 1,
    // backgroundColor: 'pink',
    marginTop: REM * 10, // ASPECT_RATIO * 20,
    padding: REM * 10,
  },

  guestLoginContinueAsGuestTextStyle: {
    color: colors.sendButton,
    fontFamily: textFont,

    letterSpacing: REM * 1,
    // backgroundColor: 'pink',
    marginTop: REM * 20,
    padding: REM * 10,
    ...Platform.select({
      ios: {
        fontSize: REM * 15,
      },
      android: {
        fontSize: REM * 11,
      },
    }),
  },

  tabletGuestLoginContinueAsGuestTextStyle: {
    color: colors.sendButton,
    fontFamily: textFont,
    fontSize: REM * 12, // ASPECT_RATIO * 20,
    letterSpacing: REM * 1,
    // backgroundColor: 'pink',
    marginTop: REM * 10, // ASPECT_RATIO * 20,
    padding: REM * 10,
  },

  guestLoginEnterTextStyle: {
    color: colors.black,
    fontFamily: textFont,
    fontSize: REM * 15,
    letterSpacing: REM * 1,
  },

  tabletGuestLoginEnterTextStyle: {
    color: colors.black,
    fontFamily: textFont,
    fontSize: REM * 10, // ASPECT_RATIO * 20, //getTextSize(15),
    letterSpacing: REM * 1,
  },

  guestLoginEnterViewStyle: {
    height: REM * 50, // this should be respective to font size
    width: '75%',
    backgroundColor: colors.sendButton,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabletGuestLoginEnterViewStyle: {
    height: REM * 35, // getTextSize(10), //ASPECT_RATIO * 70, //this should be respective to font size
    width: '70%',
    backgroundColor: colors.sendButton,
    alignItems: 'center',
    justifyContent: 'center',
  },

  guestLoginTextInputStyle: {
    height: REM * 50, // this should be respective to font size
    width: '75%',
    fontSize: REM * 15,
    color: colors.black,
    textAlignVertical: 'center',
    padding: REM * 10,
    marginBottom: REM * 10,
    fontFamily: textFont,
    backgroundColor: colors.white,
    // letterSpacing: getTextSize(1)
    // 'PlayfairDisplay-Regular',

    // backgroundColor: colors.gray,
    // justifyContent: 'flex-start',
  },

  tabletGuestLoginTextInput: {
    height: REM * 35, // ASPECT_RATIO * 70, //getTextSize(50), //this should be respective to font size
    width: '70%',
    fontSize: REM * 10, // ASPECT_RATIO * 20,
    color: colors.black,
    textAlignVertical: 'center',
    padding: REM * 10, // ASPECT_RATIO * 20, //getTextSize(10),
    marginBottom: REM * 10,
    fontFamily: textFont,
    backgroundColor: colors.white,
  },

  guestloginWelcomeTextStyle: {
    color: colors.white,
    fontFamily: textFont,
    fontSize: REM * 18,
    letterSpacing: REM * 12.75,
    alignSelf: 'center',
    // width: '100%',

    // backgroundColor: 'pink',
    textAlign: 'center',
    marginBottom: REM * 40,
  },

  tabletGuestLoginWelcomeTextStyle: {
    color: colors.white,
    fontFamily: textFont,
    fontSize: REM * 18,
    letterSpacing: REM * 12.75,
    alignSelf: 'center',
    // width: '100%',

    // backgroundColor: 'pink',
    textAlign: 'center',
    marginBottom: REM * 40,
  },

  guestLoginViewStyle: {
    // flex:1,
    // justifyContent: 'space-around',//goes along with flex:1
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    height: Dimensions.get('window').height, // REM*500,
    // alignSelf: 'flex-end'
    // height: 580,
  },

  registerImageBackgroundStyle: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    // paddingBottom: REM * 20,

    // backgroundColor: 'pink'
  },

  registerScrollView: {
    // flex: 1,
    width: Dimensions.get('window').width,
    alignSelf: 'center', // 'flex-bott'

    // alignItems
  },

  guestLoginImageBackgroundStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',

    // backgroundColor: 'pink'
  },

  /// ///// myProfile /////////////////
  ///

  profileVerifyProceedCancelViewStyle: {
    //
    // width: modalWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // '30%', //height: '12%',   <-- for choose pic //getTextSize(45), //45,
    alignSelf: 'center',
    backgroundColor: colors.white, // '',
    width: '100%', // modalWidth-1,
    ...Platform.select({
      ios: {
        height: '25%',
      },
      android: {
        height: '20%',
      },
    }),
  },

  tabletProfileVerifySuccessViewStyle: {
    // passwordOrCost(), getBashariMoreInfo(),
    // flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    height: '75%', // modalHeight-40,
    // backgroundColor: '',
    justifyContent: 'center', // 'space-around',//space-between when chat is ebabled
    width: '90%',
  },

  tabletProfileVerifyProceedCancelViewStyle: {
    //
    // width: modalWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '25%', // '30%', //height: '12%',   <-- for choose pic //getTextSize(45), //45,
    alignSelf: 'center',
    backgroundColor: colors.white, // '',
    width: '100%', // modalWidth-1,
  },

  profileConfirmModalStyle: {
    marginTop: Dimensions.get('window').height / 2 - REM * 100, //  Dimensions.get('window').heigh/2,
    alignSelf: 'center',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    backgroundColor: colors.white,
    height: REM * 200, // modalHeight,// '30%',
    width: modalWidth,
    ...Platform.select({
      ios: {
        shadowColor: colors.gray,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: REM * 30,
        shadowRadius: REM * 20,
      },
      android: {
        elevation: 5,
        // marginBottom: 10
      },
    }),
  },

  tabletProfileConfirmModalStyle: {
    marginTop: Dimensions.get('window').height / 2 - REM * 100, //  Dimensions.get('window').heigh/2,
    alignSelf: 'center',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    backgroundColor: colors.white,
    height: REM * 100, // modalHeight,// '30%',
    width: REM * 200, // modalWidth,
    ...Platform.select({
      ios: {
        shadowColor: colors.gray,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: REM * 30,
        shadowRadius: REM * 20,
      },
      android: {
        elevation: 5,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.shadowBox,
        // marginBottom: 10
      },
    }),
  },

  profileVerifyTextStyle: {
    color: colors.black,
    fontFamily: textFont,
    // position: 'absolute',
    letterSpacing: REM * 1,
    // bottom: REM*15,
    // backgroundColor: 'pink',
    // marginTop: REM*5,
    marginBottom: REM * 10,
    padding: REM * 15,
    // backgroundColor: '',
    textAlign: 'center',
    ...Platform.select({
      ios: {
        fontSize: REM * 15,
      },
      android: {
        fontSize: REM * 12,
      },
    }),
  },

  tabletProfileVerifyTextStyle: {
    color: colors.black,
    fontFamily: textFont,
    fontSize: REM * 10, // ASPECT_RATIO * 20,
    letterSpacing: REM * 1,
    // marginTop: REM*10, //ASPECT_RATIO * 20,
    padding: REM * 10,
    textAlign: 'center',
  },

  tabletProfileInvalidPhone: {
    color: colors.red,
    fontFamily: textFont,
    fontSize: REM * 7,
    width: '80%',
    textAlign: 'left',
    // backgroundColor: 'pink'
  },

  profileValidPhone: {
    color: colors.green,
    fontFamily: textFont,
    fontSize: REM * 13,
    width: '80%',
    textAlign: 'left',
  },

  tabletProfileValidPhone: {
    color: colors.green,
    fontFamily: textFont,
    fontSize: REM * 7,
    width: '80%',
    textAlign: 'left',
  },

  profileModalStyle: {
    marginTop: Dimensions.get('window').height / 2 - REM * 230, //  Dimensions.get('window').heigh/2,
    alignSelf: 'center',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    backgroundColor: colors.white,
    height: REM * 350, // modalHeight,// '30%',
    width: modalWidth,
    ...Platform.select({
      ios: {
        shadowColor: colors.gray,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: REM * 30,
        shadowRadius: REM * 20,
      },
      android: {
        elevation: 5,
        // marginBottom: 10
      },
    }),
  },

  tabletProfileModalStyle: {
    marginTop: Dimensions.get('window').height / 2 - REM * 150, //  Dimensions.get('window').heigh/2,
    alignSelf: 'center',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    backgroundColor: colors.white,
    height: REM * 210, // modalHeight,// '30%',
    width: REM * 200, // modalWidth,
    ...Platform.select({
      ios: {
        shadowColor: colors.gray,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: REM * 30,
        shadowRadius: REM * 20,
      },
      android: {
        elevation: 5,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.shadowBox,
        // marginBottom: 10
      },
    }),
  },

  profileProceedCancelViewStyle: {
    //
    // width: modalWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // '30%', //height: '12%',   <-- for choose pic //getTextSize(45), //45,
    alignSelf: 'center',
    backgroundColor: colors.white, // '',
    width: '100%', // modalWidth-1,
    ...Platform.select({
      ios: {
        height: '15%',
      },
      android: {
        height: '10%',
      },
    }),
  },

  tabletProfileProceedCancelViewStyle: {
    //
    // width: modalWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '15%', // '30%', //height: '12%',   <-- for choose pic //getTextSize(45), //45,
    alignSelf: 'center',
    backgroundColor: colors.white, // '',
    width: '100%', // modalWidth-1,
  },

  profileGetAccessTextStyle: {
    fontSize: REM * 17,
    color: colors.black,
    fontFamily: profileFont,
    textAlign: 'center',
  },

  tabletProfileGetAccessTextStyle: {
    fontSize: REM * 10,
    color: colors.black,
    fontFamily: profileFont,
    textAlign: 'center',
  },

  profileAccessModalChosenTouchableStyle: {
    borderWidth: 1,
    padding: REM * 10,
    marginTop: REM * 10,
    width: '80%',
    backgroundColor: colors.gray,
  },

  tabletProfileGetAccessChosenTouchableStyle: {
    borderWidth: 1,
    // backgroundColor: 'yellow',
    padding: REM * 1,
    marginTop: REM * 10,
    backgroundColor: colors.gray,
    width: '90%',
  },

  profileAccessModalTouchableStyle: {
    borderWidth: 1,
    padding: REM * 10,
    marginTop: REM * 10,
    width: '80%',
  },

  tabletProfileAccessTouchableStyle: {
    borderWidth: 1,
    // backgroundColor: 'yellow',
    padding: REM * 1,
    marginTop: REM * 10,
    width: '90%',
  },

  profileAccessModalTextStyle: {
    fontSize: REM * 15,
    color: colors.black,
    fontFamily: profileFont,
    textAlign: 'center',
  },

  tabletProfileAccessModalTextStyle: {
    fontSize: REM * 10,
    color: colors.black,
    fontFamily: profileFont,
    textAlign: 'center',
  },

  profileGetAccessTouchableStyle: {
    borderWidth: 1,
    // backgroundColor: 'yellow',
    padding: REM * 20,
    marginTop: REM * 40,
  },

  tabletProfileGetAccessTouchableStyle: {
    borderWidth: 1,
    // backgroundColor: 'yellow',
    padding: REM * 1,
    marginTop: REM * 10,
  },

  profileLineSeperator: {
    borderBottomColor: '#979797',
    borderBottomWidth: 1,
    width: '100%', // getPercentage(20), ///'20%',
    alignSelf: 'center',
    backgroundColor: colors.trans,
  },

  profileRowStyle: {
    flexDirection: 'row',
    paddingTop: REM * 20,
    paddingBottom: REM * 10,
    // backgroundColor: 'yellow',
  },

  tabletProfileRowStyle: {
    flexDirection: 'row',
    paddingTop: REM * 10,
    paddingBottom: REM * 5,
    // backgroundColor: 'yellow',
  },

  profileLabelTextStyle: {
    fontSize: REM * 17,
    color: colors.labelColor,
    fontFamily: profileFont,
    width: '40%',
  },

  tabletProfileLabelTextStyle: {
    fontSize: REM * 10,
    color: colors.labelColor,
    fontFamily: profileFont,
    width: '40%',
  },

  profileDetailTextStyle: {
    fontSize: REM * 17,
    color: colors.black,
    fontFamily: profileFont,
    width: '60%',
    // backgroundColor: 'cyan',
  },

  tabletProfileDetailTextStyle: {
    fontSize: REM * 10,
    color: colors.black,
    fontFamily: profileFont,
    width: '60%',
    // backgroundColor: 'cyan',
  },

  profileTitleTextStyle: {
    fontFamily: profileTitleFont,
    color: colors.black,
    letterSpacing: REM * 3.6,
    fontWeight: '900',
    fontSize: REM * 15,
    // backgroundColor: 'pink',
    paddingTop: REM * 10,
    paddingBottom: REM * 10,
    // marginTop: REM*20
  },
  tabletProfileTitleTextStyle: {
    fontFamily: profileTitleFont,
    color: colors.black,
    letterSpacing: REM * 3.6,
    fontWeight: '900',
    fontSize: REM * 10,
    // backgroundColor: 'pink',
    paddingTop: REM * 10,
    paddingBottom: REM * 10,
    // marginTop: REM*20
  },

  profileInnerViewStyle: {
    // backgroundColor: 'pink',
    marginTop: REM * 30,
    width: '90%',
    alignSelf: 'center',
  },

  /// ///////// drawer styling ///////////////

  drawerLineSeperator: {
    borderBottomColor: colors.white,
    borderBottomWidth: 1,
    width: 50, // getPercentage(20), ///'20%',
    // alignSelf: 'center',
    backgroundColor: 'pink', // colors.trans,
  },

  drawerXimageStyle: {
    // flex: 1,
    // alignSelf: 'stretch',
    height: REM * 15,
    width: REM * 15,
    alignSelf: 'flex-start',
    // resizeMode: 'contain'
    // padding: REM*10
  },

  hambutgerButton: {
    height: REM * 18,
    width: REM * 25,
    marginLeft: REM * 13,
    // backgroundColor: 'pink',
    padding: REM % 10,
  },

  tabletHambutgerButton: {
    height: REM * 30,
    width: REM * 30,
    marginLeft: REM * 10,
  },

  // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  // item/JewelryView ==================================
  //

  idViewStyle: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    backgroundColor: colors.white,
    // backgroundColor: 'cyan'
    // height: '100%',
    // backgroundColor: '',
  },

  idScrollViewStyle: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    ...Platform.select({
      ios: {
        paddingBottom: REM * 20,
      },
      android: {
        paddingBottom: REM * 20,
      },
    }),
  },

  idNoImageSliderViewStyle: {
    // getViews(), render()
    // for images in vv modalSwiper vv

    // backgroundColor:  '', //colors.white,
    height: 0, // 180,
    width: '100%',
  },

  idImageSliderViewStyle: {
    // getViews(), render()
    // for images in vv modalSwiper vv; used also by one touchable and swiper

    backgroundColor: colors.white,
    height: REM * 200, // 180,
    width: '100%',
    // flexDirection: 'row'
  },

  idReservedTextStyle: {
    position: 'absolute',
    borderWidth: 1,
    fontFamily: textFont,
    fontSize: REM * 15,
    width: REM * 100,
    padding: 5,
    textAlign: 'center',
    left: REM * 15,
    top: REM * 15,
    // backgroundColor: 'white'
    // flexWrap: 'wrap'
    // overflow: 'hidden'
  },

  idReservedTextNoImageStyle: {
    // position: 'absolute',
    borderWidth: 1,
    fontFamily: textFont,
    fontSize: REM * 15,
    width: REM * 100,
    padding: 5,
    textAlign: 'center',
    marginLeft: REM * 15,
    marginBottom: REM * 15,
    // top: REM*15,
    // flexWrap: 'wrap'
    // overflow: 'hidden'
  },

  idVideoModalOuterViewStyle: {
    // render()
    // for video modal

    // backgroundColor:  '', //colors.white,
    // height: REM*200, //180,
    // width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  idVideoModalInnerViewStyle: {
    // getViews()
    // slider inside modal that contains zoomed in pictures
    marginTop: REM * 90, // '25%', //imageModalPosition, //////////// xxxxxxx
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,

    height: imageModalHeight, // '70%', //imageModalHeight,
    width: '90%',
    ...Platform.select({
      ios: {
        shadowColor: colors.gray,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: REM * 30, // 30,
        shadowRadius: REM * 20, // 20,
      },
      android: {
        elevation: 5,
      },
    }),
  },

  idTabletVideoModalInnerViewStyle: {
    // getViews()
    // slider inside modal that contains zoomed in pictures
    marginTop: REM * 90, // '25%', //imageModalPosition, //////////// xxxxxxx
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,

    height: REM * 350, // 400,//'70%', //imageModalHeight,
    width: '90%',
    ...Platform.select({
      ios: {
        shadowColor: colors.gray,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: REM * 30, // 30,
        shadowRadius: REM * 20, // 20,
      },
      android: {
        elevation: 5,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.shadowBox,
      },
    }),
  },

  idDisplayVideoView: {
    // backgroundColor: '',
    // flex: 1,
    height: '65%', // '100%',
    alignSelf: 'center',
    width: '100%',
    // borderWidth: 2
  },

  idDisplay360View: {
    // backgroundColor: '',
    // flex: 1,
    height: '100%', // '100%',
    alignSelf: 'center',
    width: '100%',
    // borderWidth: 2
  },

  idWebViewStyle: {
    // borderWidth: 3,
    backgroundColor: 'red',
    width: '100%',
    height: '100%',
  },

  idZoomedInImageSliderView: {
    // getViews()
    /*
		height = h
		x = REM* imageModalHeight
		marginTop = h - x
		 */
    // slider inside modal that contains zoomed in pictures
    marginTop: (Dimensions.get('window').height - REM * imageModalHeight) / 2, // REM*90, //'25%', //imageModalPosition, //////////// xxxxxxx
    alignSelf: 'center',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    // borderWidth: 4,
    height: REM * imageModalHeight, // SSSSS //'70%', //imageModalHeight,
    width: '90%',
    ...Platform.select({
      ios: {
        shadowColor: colors.gray,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: REM * 30, // 30,
        shadowRadius: REM * 20, // 20,
      },
      android: {
        elevation: 5,
      },
    }),
  },

  idTabletZoomedInImageSliderView: {
    // getViews()
    // slider inside modal that contains zoomed in pictures
    // '25%', //imageModalPosition, //////////// xxxxxxx
    alignSelf: 'center',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    // borderWidth: 4,
    height: REM * 300, // imageModalHeight,//SSSSS //'70%', //imageModalHeight,
    width: '90%',
    ...Platform.select({
      ios: {
        shadowColor: colors.gray,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: REM * 30, // 30,
        shadowRadius: REM * 20, // 20,
        marginTop: REM * 90,
      },
      android: {
        elevation: 5,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.shadowBox,
        marginTop: REM * 150,
      },
    }),
  },

  idModalSwiper: {
    // getViews()
    // for the zommed in slider in zoomIn modal

    backgroundColor: colors.white,
    width: '100%',
    height: '100%', // '100%',
    // borderWidth: 3
  },

  idModalMidView: {
    height: '90%',
  },

  idImageStyle: {
    // getViews(), getModalSwiper()
    // style of Image component of top image slider
    flex: 1,
    alignSelf: 'stretch',
    height: undefined,
    width: undefined,
    // borderWidth: 2
    // backgroundColor: ''
  },

  idCloseButtonStyle: {
    // getViews()
    // for close touchable

    alignItems: 'center',
    justifyContent: 'center',
    height: '10%', // REM*45,
    backgroundColor: colors.popUpButton,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },

  idCloseButtonText: {
    // getViews(), getContactUsModal(), changePriceModal()
    // text of buttons of modals

    color: colors.searchFieldGray,
    letterSpacing: REM * 0.79, // 0.79,
    fontSize: REM * 13, // 13,
    fontFamily: textFont,
    textAlign: 'center',
  },

  idTabletCloseButtonText: {
    // getViews(), getContactUsModal(), changePriceModal()
    // text of buttons of modals

    color: colors.searchFieldGray,
    letterSpacing: REM * 0.79, // 0.79,
    fontSize: REM * 10, // 13,
    fontFamily: textFont,
    textAlign: 'center',
  },

  idDetailViewStyle: {
    width: '100%',
    alignSelf: 'flex-start',
  },

  idTitleShadowBox: {
    // flex:1,
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    backgroundColor: colors.white, /// ///////'', //colors.white, //'',
    width: Dimensions.get('window').width,
    overflow: 'hidden',
    alignSelf: 'center',
    height: REM * 120, // 90,

    ...Platform.select({
      android: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.lightGray,
      },
    }),
  },

  idTabletTitleShadowBox: {
    // flex:1,
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    backgroundColor: colors.white, /// ///////'', //colors.white, //'',
    width: Dimensions.get('window').width,
    overflow: 'hidden',
    alignSelf: 'center',
    height: REM * 80, // 90,

    ...Platform.select({
      android: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.lightGray,
      },
    }),
  },

  idTitleInnerShadowBox: {
    backgroundColor: colors.white, /// ///////////'', //colors.white,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    height: REM * 70,
    ...Platform.select({
      ios: {
        shadowColor: colors.whiteBoxShadow,
        shadowOffset: { width: 0, height: REM * -90 },
        shadowOpacity: REM * 90,
        shadowRadius: REM * 17,
      },
    }),
  },

  idTabletTitleInnerShadowBox: {
    backgroundColor: colors.white, /// ///////////'', //colors.white,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    height: REM * 40, // ASPECT_RATIO * (80),
    ...Platform.select({
      ios: {
        shadowColor: colors.whiteBoxShadow,
        shadowOffset: { width: 0, height: REM * -60 },
        shadowOpacity: REM * 90,
        shadowRadius: REM * 10,
      },
    }),
  },

  idJewelryTitleInnerShadowBox: {
    backgroundColor: colors.white, /// ///////////'', //colors.white,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: REM * 70,
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        shadowColor: colors.whiteBoxShadow,
        shadowOffset: { width: 0, height: REM * -90 },
        shadowOpacity: REM * 90,
        shadowRadius: REM * 15,
      },
    }),
  },

  idTabletJewelryTitleInnerShadowBox: {
    backgroundColor: colors.white, /// ///////////'', //colors.white,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: REM * 80,
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        shadowColor: colors.whiteBoxShadow,
        shadowOffset: { width: 0, height: REM * -65 },
        shadowOpacity: REM * 90,
        shadowRadius: REM * 17,
      },
    }),
  },

  idTitleTextStyle: {
    fontSize: REM * 18, // 15,

    letterSpacing: REM * 1,
    textAlign: 'left',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '90%', /// mb rm
    color: colors.black,
    fontFamily: numberFont,
    ...Platform.select({
      ios: {
        // fontWeight: 'bold',// '300',
      },
    }),
  },

  idTabletTitleTextStyle: {
    fontSize: REM * 15, // 15,

    letterSpacing: REM * 1,
    textAlign: 'left',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '90%', /// mb rm
    color: colors.black,
    fontFamily: numberFont,
    ...Platform.select({
      ios: {
        // fontWeight: 'bold',// '300',
      },
    }),
  },

  idJewelryTitleTextStyle: {
    fontSize: REM * 18, // 15,

    letterSpacing: REM * 1,
    textAlign: 'left',
    justifyContent: 'center',
    alignSelf: 'center',
    // width: '0%',
    width: '70%',
    color: colors.black,
    fontFamily: numberFont,
    // backgroundColor: '',
    ...Platform.select({
      ios: {
        // fontWeight: 'bold',// '300',
      },
      android: {},
    }),
  },

  idTabletJewelryTitleTextStyle: {
    fontSize: REM * 15, // 15,
    // backgroundColor: '',
    letterSpacing: REM * 1,
    textAlign: 'left',
    justifyContent: 'center',
    alignSelf: 'center',
    // width: '0%',
    width: '70%',
    color: colors.black,
    fontFamily: numberFont,
    ...Platform.select({
      ios: {
        // fontWeight: 'bold',// '300',
      },
      android: {},
    }),
    // backgroundColor: '',
  },

  idPriceShadowBox: {
    // flex:1,
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    backgroundColor: colors.white, // '',
    width: Dimensions.get('window').width,
    overflow: 'hidden',
    alignSelf: 'center',
    height: REM * 90,

    ...Platform.select({
      android: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.lightGray,
      },
    }),
  },

  idTabletPriceShadowBox: {
    // flex:1,
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    backgroundColor: colors.white, // '',
    width: Dimensions.get('window').width,
    overflow: 'hidden',
    alignSelf: 'center',
    height: REM * 50,

    ...Platform.select({
      android: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.lightGray,
      },
    }),
  },

  idPriceTitleTextStyle: {
    textAlign: 'left',
    fontWeight: '300',
    fontFamily: textFont,
    ...Platform.select({
      ios: {
        fontSize: getTextSize(17), // 15,
      },
      android: {
        fontSize: getTextSize(15), // 15,
      },
    }),
  },

  idCrossedPriceTitleTextStyle: {
    textAlign: 'left',
    fontWeight: '300',
    color: colors.searchFieldGray,
    fontFamily: textFont,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    ...Platform.select({
      ios: {
        fontSize: getTextSize(14), // 15,
      },
      android: {
        fontSize: getTextSize(12), // 15,
      },
    }),
  },

  idTabletPriceTitleTextStyle: {
    fontSize: getTextSize(10), // ASPECT_RATIO * (20), //15,
    textAlign: 'left',
    fontWeight: '300',
    fontFamily: textFont,
  },

  idCrossedTabletPriceTitleTextStyle: {
    fontSize: getTextSize(8), // ASPECT_RATIO * (20), //15,
    textAlign: 'left',
    fontWeight: '300',
    fontFamily: textFont,
    color: colors.searchFieldGray,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },

  idDiamondDetailShadowBox: {
    // borderWidth: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'flex-start',
    backgroundColor: colors.white, // '',
    width: Dimensions.get('window').width,
    overflow: 'hidden',
    height: REM * 490,

    ...Platform.select({
      android: {
        // elevation: 5,
        marginBottom: REM * 10,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: colors.lightGray,
        // paddingTop: '5%',
        // paddingBottom: '10%'
      },
    }),
  },

  idTabletDiamondDetailShadowBox: {
    // borderWidth: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'flex-start',
    backgroundColor: colors.white, // '',
    width: Dimensions.get('window').width,
    overflow: 'hidden',
    height: REM * 340,

    ...Platform.select({
      android: {
        // elevation: 5,
        marginBottom: REM * 10,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: colors.lightGray,
        // paddingTop: '5%',
        // paddingBottom: '10%'
      },
    }),
  },

  idInnerShadowBoxStyle: {
    // render()

    width: '100%',
    alignSelf: 'center',
    height: REM * 410,
    marginTop: REM * 30,
    marginBottom: REM * 20,
    // backgroundColor: ''
  },

  idTabletInnerShadowBoxStyle: {
    // render()

    width: '100%',
    alignSelf: 'center',
    height: REM * 340,
    marginTop: REM * 30,
    marginBottom: REM * 20,
    // backgroundColor: 'brown'
  },

  idLabViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '',
    justifyContent: 'space-between',
    alignSelf: 'center',
    // paddingLeft: '5%',

    // paddingRight: '5%',
    width: '90%',
    height: REM * 40,
  },

  idTabletLabViewStyle: {
    /// XXXXX
    flexDirection: 'row',
    alignItems: 'center',
    /// //backgroundColor: '',
    justifyContent: 'space-between',
    alignSelf: 'center',
    // paddingLeft: '5%',

    // paddingRight: '5%',
    width: '90%',
    height: REM * 25,
  },

  idDiamondDetailTitleTextStyle: {
    // render()
    // for Text component of title
    fontSize: REM * 17,
    letterSpacing: REM * 1.4,
    fontFamily: textFont, // 'PlayfairDisplay-Regular',
    textAlign: 'center',
    justifyContent: 'flex-start',
    // backgroundColor: '',
    alignSelf: 'flex-start',
  },

  idTabletDiamondDetailTitleTextStyle: {
    // render()
    // for Text component of title
    fontSize: REM * 14,
    letterSpacing: REM * 1.4,
    fontFamily: textFont, // 'PlayfairDisplay-Regular',
    textAlign: 'center',
    justifyContent: 'flex-start',
    // backgroundColor: '',
    alignSelf: 'flex-start',
  },

  idCertificateButton: {
    // getLabLink()
    // for certificate button

    height: REM * 40, // 40,
    width: REM * 100, // '30%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blueButton,
    borderWidth: 1,
    borderColor: colors.gray,
    marginBottom: REM * 5,
    // marginBottom: ''
  },

  idTabletCertificateButton: {
    // getLabLink()
    // for certificate button

    height: REM * 25, // 40,
    width: REM * 80, // '30%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blueButton,
    borderWidth: 1,
    borderColor: colors.gray,
    marginBottom: REM * 10,
    // marginBottom: ''
  },

  idViewOnlineButton: {
    // getLabLink()
    // for certificate button

    height: REM * 40, // 40,
    width: REM * 100, // '30%',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blueButton,
    borderWidth: 1,
    borderColor: colors.gray,
    // marginBottom: REM*10 //'7.5%'
  },

  idTabletViewOnlineButton: {
    // getLabLink()
    // for certificate button

    height: REM * 25, // 40,
    width: REM * 80, // '30%',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blueButton,
    borderWidth: 1,
    borderColor: colors.gray,
    marginBottom: REM * 10, // '7.5%'
  },

  idDiamondDetailViewStyle: {
    // render()
    // for the area where all diamond details & labels are
    height: REM * 370,
    // paddingLeft: '5%',
    flexDirection: 'row',
    backgroundColor: colors.white, // '',
    ...Platform.select({
      ios: {
        shadowColor: colors.whiteBoxShadow,
        shadowOffset: { width: 0, height: REM * -435 },
        shadowOpacity: REM * 90,
        shadowRadius: REM * 10,
      },
    }),
  },

  idTabletDiamondDetailViewStyle: {
    // render()
    // for the area where all diamond details & labels are
    height: REM * 260,
    // paddingLeft: '5%',
    flexDirection: 'row',
    backgroundColor: colors.white, // '',
    ...Platform.select({
      ios: {
        shadowColor: colors.whiteBoxShadow,
        shadowOffset: { width: 0, height: REM * -315 },
        shadowOpacity: REM * 90,
        shadowRadius: REM * 10,
      },
    }),
  },

  idDiamondDetailsLeft: {
    // render()
    // the view to the left of idDiamondDetailsRight
    // backgroundColor: '',
    width: '60%',
    // marginLeft: StyleSheet.hairlineWidth,
    marginLeft: '5%',
  },

  idDiamondDetailsRight: {
    // render()
    // for view of two cert link buttons
    // backgroundColor: '',
    width: '30%',
    // marginLeft: StyleSheet.hairlineWidth,
    marginRight: '5%',
    alignItems: 'flex-end',
    // marginTop: '2.5%',
    justifyContent: 'flex-start', // 'space-around',
    height: REM * 150,
  },

  idTabletDiamondDetailsRight: {
    // render()
    // for view of two cert link buttons
    // backgroundColor: '',
    width: '30%',
    // marginLeft: StyleSheet.hairlineWidth,
    marginRight: '5%',
    alignItems: 'flex-end',
    // marginTop: '2.5%',
    justifyContent: 'flex-start', // 'space-around',
    height: REM * 110,
  },

  idDetailTextStyle: {
    // render(),
    // text of item details
    // marginLeft: REM*20,
    // backgroundColor: '',
    color: colors.black,
    fontFamily: numberFont,
    alignSelf: 'flex-start',
    ...Platform.select({
      ios: {
        fontSize: REM * 16,
      },
      android: {
        fontSize: REM * 15,
      },
    }),
  },

  idTabletDetailTextStyle: {
    // render(),
    // text of item details
    // marginLeft: REM*20,
    color: colors.black,
    fontFamily: numberFont,
    fontSize: REM * 10,
    alignSelf: 'flex-start',
    // backgroundColor: ''
  },

  idEntryViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%',
    // height: REM*(30),
    paddingTop: getTextSize(5),
    paddingBottom: getTextSize(5),
    justifyContent: 'flex-start',
  },

  idFancyColorEntryViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%',
    paddingBottom: getTextSize(10),
    // height: REM*(70),
    // backgroundColor: '',
    justifyContent: 'flex-start',
  },

  idTabletEntryViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '',
    width: '70%',
    height: REM * 20,
  },
  idFancyColorTabletEntryViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '',
    width: '70%',
    height: REM * 50,
    justifyContent: 'flex-start',
  },

  idLabelStyle: {
    color: colors.labelColor,
    fontFamily: textFont,
    fontSize: REM * 15, // 15,
    backgroundColor: colors.trans,
    width: REM * 65,
    alignSelf: 'flex-start',
  },

  idPriceLabelStyle: {
    color: colors.labelColor,
    fontFamily: textFont,
    fontSize: REM * 15, // 15,
    backgroundColor: colors.trans,
    width: '100%', // REM*(65),
    alignSelf: 'flex-start',
  },

  idLoosePriceLableStyle: {
    fontSize: getTextSize(14), // 15,
    textAlign: 'left',
    fontFamily: textFont,
    color: colors.labelColor,
    // lineHeight: getTextSize(20),
    letterSpacing: getTextSize(0.7),
    paddingBottom: getTextSize(3),
    paddingTop: getTextSize(6),
    // backgroundColor: '',
    // marginTop: getTextSize(7)
  },
  ivCrossedLoosePriceLableStyle: {
    fontSize: getTextSize(12), // 15,
    textAlign: 'left',
    fontFamily: textFont,
    color: colors.searchFieldGray,
    // lineHeight: getTextSize(20),
    paddingBottom: getTextSize(3),
    paddingTop: getTextSize(6),
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    // backgroundColor: '',
    // marginTop: getTextSize(7)
  },

  idTabletLabelStyle: {
    color: colors.labelColor,
    fontFamily: textFont,
    fontSize: REM * 10, // 15,
    backgroundColor: colors.trans,
    width: REM * 60,
  },

  idJewelryLabelStyle: {
    color: colors.labelColor,
    fontFamily: textFont,
    fontSize: REM * 15, // 15,
    backgroundColor: colors.trans,
    width: REM * 110,
    alignSelf: 'flex-start',
    // textAlign: 'top'
  },

  idTabletJewelryLabelStyle: {
    color: colors.labelColor,
    fontFamily: textFont,
    fontSize: REM * 10, // 15,
    backgroundColor: colors.trans,
    width: REM * 90,
    alignSelf: 'flex-start',
  },

  // --modals---

  idChangePriceModalViewWithImagesStyle: {
    // changePriceModal()
    // change height when not images
    marginTop: Dimensions.get('window').height / 2 - REM * 250, //  Dimensions.get('window').heigh/2,
    alignSelf: 'center',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    backgroundColor: colors.white,
    height: REM * 500, // modalHeight,// '30%',
    width: modalWidth,
    ...Platform.select({
      ios: {
        shadowColor: colors.gray,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: REM * 30,
        shadowRadius: REM * 20,
      },
      android: {
        elevation: 5,
        // marginBottom: 10
      },
    }),
  },

  idTabletChangePriceModalViewWithImagesStyle: {
    // changePriceModal()
    // change height when not images
    marginTop: Dimensions.get('window').height / 2 - REM * 175, //  Dimensions.get('window').heigh/2,
    alignSelf: 'center',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    backgroundColor: colors.white,
    height: REM * 500, // modalHeight,// '30%',
    width: REM * 300, // modalWidth,
    ...Platform.select({
      ios: {
        shadowColor: colors.gray,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: REM * 30,
        shadowRadius: REM * 20,
      },
      android: {
        elevation: 5,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.shadowBox,
        // marginBottom: 10
      },
    }),
  },

  idChangePriceModalViewWithoutImagesStyle: {
    // changePriceModal()
    // change height when not images
    marginTop: Dimensions.get('window').height / 2 - REM * 120, //  Dimensions.get('window').heigh/2,
    alignSelf: 'center',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    backgroundColor: colors.white,
    height: REM * 240, // modalHeight,// '30%',
    width: modalWidth,
    ...Platform.select({
      ios: {
        shadowColor: colors.gray,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: REM * 30,
        shadowRadius: REM * 20,
      },
      android: {
        elevation: 5,
        // marginBottom: 10
      },
    }),
  },

  idTabletChangePriceModalViewWithoutImagesStyle: {
    // changePriceModal()
    // change height when not images
    marginTop: Dimensions.get('window').height / 2 - REM * 100, //  Dimensions.get('window').heigh/2,
    alignSelf: 'center',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    backgroundColor: colors.white,
    height: REM * 200, // modalHeight,// '30%',
    width: REM * 200, // modalWidth,
    ...Platform.select({
      ios: {
        shadowColor: colors.gray,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: REM * 30,
        shadowRadius: REM * 20,
      },
      android: {
        elevation: 5,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.shadowBox,
        // marginBottom: 10
      },
    }),
  },

  idMoreInfoModalStyle: {
    marginTop: Dimensions.get('window').height / 2 - REM * 230, //  Dimensions.get('window').heigh/2,
    alignSelf: 'center',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    backgroundColor: colors.white,
    height: REM * 350, // modalHeight,// '30%',
    width: modalWidth,
    ...Platform.select({
      ios: {
        shadowColor: colors.gray,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: REM * 30,
        shadowRadius: REM * 20,
      },
      android: {
        elevation: 5,
        // marginBottom: 10
      },
    }),
  },

  idTabletMoreInfoModalStyle: {
    marginTop: Dimensions.get('window').height / 2 - REM * 100, //  Dimensions.get('window').heigh/2,
    alignSelf: 'center',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    backgroundColor: colors.white,
    height: REM * 210, // modalHeight,// '30%',
    width: REM * 200, // modalWidth,
    ...Platform.select({
      ios: {
        shadowColor: colors.gray,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: REM * 30,
        shadowRadius: REM * 20,
      },
      android: {
        elevation: 5,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.shadowBox,
        // marginBottom: 10
      },
    }),
  },

  idContactUsModalStyle: {
    marginTop: modalPosition, //  Dimensions.get('window').heigh/2,
    alignSelf: 'center',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    backgroundColor: colors.white,
    height: modalHeight, // '30%',
    width: modalWidth,
    ...Platform.select({
      ios: {
        shadowColor: colors.gray,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: REM * 30,
        shadowRadius: REM * 20,
      },
      android: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.lightGray,
        // marginBottom: 10
      },
    }),
  },

  idTabletContactUsModalStyle: {
    marginTop: modalPosition,
    alignSelf: 'center',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    backgroundColor: colors.white,
    height: '25%', // modalHeight,// '30%',
    width: '60%', // modalWidth,
    ...Platform.select({
      ios: {
        shadowColor: colors.gray,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: REM * 30,
        shadowRadius: REM * 20,
      },
      android: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.lightGray,
        // marginBottom: 10
      },
    }),
  },

  idMidViewStyle: {
    // moreInfo(), changePriceModal(), getContactUsModal
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },

  idChangePriceModalTextStyle: {
    // offline as well
    fontSize: REM * 15, // 17,
    lineHeight: REM * 25,
    // marginBottom: getTextSize(5),
    // backgroundColor: '',
    alignSelf: 'center',
    // color: colors.white,
    fontFamily: numberFont,
  },

  idTabletChangePriceModalTextStyle: {
    // offline as well
    fontSize: REM * 10, // 17,
    lineHeight: REM * 20,
    // marginBottom: getTextSize(5),
    // backgroundColor: '',
    alignSelf: 'center',
    // color: colors.white,
    fontFamily: numberFont,
  },

  idDontIncludeAllPhotosTextStyle: {
    fontSize: REM * 15, // 17,
    lineHeight: REM * 25,
    // marginBottom: getTextSize(5),
    // backgroundColor: '',
    alignSelf: 'center',
    color: colors.gray,
    // color: colors.white,
    fontFamily: numberFont,
  },

  idTabletDontIncludeAllPhotosTextStyle: {
    fontSize: REM * 10, // 17,
    lineHeight: REM * 20,
    // marginBottom: getTextSize(5),
    // backgroundColor: '',
    alignSelf: 'center',
    color: colors.gray,
    // color: colors.white,
    fontFamily: numberFont,
  },

  idCostModalViewStyle: {
    // passwordOrCost(), getBashariMoreInfo(),
    // flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    height: '85%', // modalHeight-40,
    // backgroundColor: '',
    justifyContent: 'center', // 'space-around',//space-between when chat is ebabled
    width: '90%',
  },

  idTabletCostModalViewStyle: {
    // passwordOrCost(), getBashariMoreInfo(),
    // flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    height: '85%', // modalHeight-40,
    // backgroundColor: '',
    justifyContent: 'center', // 'space-around',//space-between when chat is ebabled
    width: '90%',
  },

  idCostModalEntryViewStyle: {
    // getBashariMoreInfo
    flexDirection: 'row',
    // backgroundColor: '',
    alignSelf: 'flex-start',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
  },

  idMoreInfoDetailsLabelTextStyle: {
    // getBashariMoreInfo
    fontSize: REM * 16, // 17,
    lineHeight: REM * 25,
    // marginBottom: getTextSize(5),
    // alignSelf: 'flex-start',
    alignSelf: 'flex-start',
    // color: colors.white,
    fontFamily: textFont,
    color: colors.labelColor,
    marginRight: REM * 15,
  },

  idTabletMoreInfoDetailsLabelTextStyle: {
    // getBashariMoreInfo
    fontSize: REM * 10, // 17,
    lineHeight: REM * 20,
    // marginBottom: getTextSize(5),
    // backgroundColor: '',
    alignSelf: 'center',
    // color: colors.white,
    fontFamily: textFont,
    color: colors.labelColor,
    marginRight: REM * 15,
  },

  idMoreInfoDetailsTextStyle: {
    // getBashariMoreInfo
    fontSize: REM * 16, // 17,
    lineHeight: REM * 25,
    // marginBottom: getTextSize(5),
    // backgroundColor: '',
    alignSelf: 'center',
    // color: colors.white,
    fontFamily: numberFont,
    color: colors.black,
    ...Platform.select({
      ios: {
        // fontWeight: 'bold'
      },
    }),

    // marginRight: REM*15
  },

  idTabletMoreInfoDetailsTextStyle: {
    // getBashariMoreInfo
    fontSize: REM * 10, // 17,
    lineHeight: REM * 20,
    // marginBottom: getTextSize(5),
    // backgroundColor: '',
    alignSelf: 'center',
    // color: colors.white,
    fontFamily: numberFont,
    color: colors.black,
    ...Platform.select({
      ios: {
        // fontWeight: 'bold'
      },
    }),

    // marginRight: REM*15
  },

  idChangePriceModalViewStyle: {
    // NOT IN USE FOR NOW
    // passwordOrCost(), getBashariMoreInfo(), changePrice()
    // flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    height: '80%', // modalHeight-40,
    // backgroundColor: '',
    justifyContent: 'center', // 'space-around',//space-between when chat is ebabled
    width: '100%',
  },

  idChancgePriceModalWithImagesButtonView: {
    //
    // width: modalWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // '30%', //height: '12%',   <-- for choose pic //getTextSize(45), //45,
    alignSelf: 'center',
    backgroundColor: colors.white, // '',
    width: '100%', // modalWidth-1,
    ...Platform.select({
      ios: {
        height: '10%',
      },
      android: {
        height: '10%',
      },
    }),
  },

  idTabletChancgePriceModalWithImagesButtonView: {
    //
    // width: modalWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '10%', // '30%', //height: '12%',   <-- for choose pic //getTextSize(45), //45,
    alignSelf: 'center',
    backgroundColor: colors.white, // '',
    width: '100%', // modalWidth-1,
  },

  idChancgePriceModalWithoutButtonView: {
    // width: modalWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '20%', // '30%', //height: '12%',   <-- for choose pic //getTextSize(45), //45,
    alignSelf: 'center',
    backgroundColor: colors.white, // '',
    width: '100%', // modalWidth-1,
  },

  idTabletChancgePriceModalWithoutButtonView: {
    // width: modalWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '15%', // '30%', //height: '12%',   <-- for choose pic //getTextSize(45), //45,
    alignSelf: 'center',
    backgroundColor: colors.white, // '',
    width: '100%', // modalWidth-1,
  },

  idCancelProceedButtons: {
    width: '50%',
    height: '100%',
    backgroundColor: colors.popUpButton,
    alignContent: 'center',
    justifyContent: 'center',
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: colors.lightGray,
  },

  idProceedProceedButtons: {
    width: '50%',
    backgroundColor: colors.popUpButton,
    alignContent: 'center',
    height: '100%',
    justifyContent: 'center',
    // borderLeftWidth: StyleSheet.hairlineWidth,
    // borderLeftColor: colors.gray
  },

  idMoreInfoCancelStyle: {
    // width: modalWidth,
    alignItems: 'center',
    justifyContent: 'center',
    height: '15%', // 45,
    alignSelf: 'center',
    backgroundColor: colors.popUpButton, // '',
    width: '100%', // modalWidth-1,
  },

  idTabletMoreInfoCancelStyle: {
    // width: modalWidth,
    alignItems: 'center',
    justifyContent: 'center',
    height: '15%', // 45,
    alignSelf: 'center',
    backgroundColor: colors.popUpButton, // '',
    width: '100%', // modalWidth-1,
  },

  idMoreInfoLabelTextStyle: {
    // getMoreInfo()

    // marginRight: 20,
    // textAlign: 'center'
    color: colors.labelColor,
    fontFamily: textFont,
    fontSize: REM * 15, // 15,
    lineHeight: REM * 20, // 30,
    backgroundColor: colors.trans,
    alignSelf: 'center',
    padding: REM * 5,
  },

  idTabletMoreInfoLabelTextStyle: {
    // getMoreInfo()

    // marginRight: 20,
    // textAlign: 'center'
    color: colors.labelColor,
    fontFamily: textFont,
    fontSize: REM * 7, // 15,
    // lineHeight: REM*(10), //30,
    backgroundColor: colors.trans,
    alignSelf: 'center',
    padding: REM * 5,
    width: REM * 70,
    textAlign: 'center',
    borderColor: colors.labelColor,
    borderWidth: 1,
  },

  idContactUsImageStyle: {
    // menuOrPhone()
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    resizeMode: 'contain',
    height: REM * 30,
    width: REM * 30,
    // margin:10,
  },

  idImageViewStyle: {
    // menuOrPhone
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    height: '70%', // modalHeight-40,
    // backgroundColor: '',
    justifyContent: 'space-around', // space-between when chat is ebabled
    width: '100%',
    // marginTop: 40,
  },

  idTabletImageViewStyle: {
    // menuOrPhone
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    height: '75%', // modalHeight-40,
    // backgroundColor: '',
    justifyContent: 'space-around', // space-between when chat is ebabled
    width: '100%',
    // marginTop: 40,
  },

  idCancelButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '30%', // getTextSize(45), //45,
    alignSelf: 'center',
    backgroundColor: colors.popUpButton, // '',
    width: '100%', // modalWidth-1,
  },

  idTabletCancelButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '25%', // getTextSize(45), //45,
    alignSelf: 'center',
    backgroundColor: colors.popUpButton, // '',
    width: '100%', // modalWidth-1,
  },

  idContactUsButton: {
    // getContactUsModal()
    // button of contactUs; this actually viewed in footer, but written in itemDetails cuz of modal
    padding: REM * 7, // 7,
  },

  idTabletContactUsButton: {
    // getContactUsModal()
    // button of contactUs; this actually viewed in footer, but written in itemDetails cuz of modal
    padding: REM * 10, // REM*7, //7,
    // backgroundColor: '',
    // width: REM*(70),
    // padding: ASPECT_RATIO * (10), //7
  },

  idLoaderStyle: {
    position: 'absolute',
    top: Dimensions.get('window').height / 3,
    // alignSelf: 'center',
    backgroundColor: colors.blueButton,
    height: REM * 100,
    width: REM * 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    // display: 'flex',
  },

  idLoaderTextStyle: {
    fontFamily: textFont,
    alignSelf: 'center',
    color: colors.white,
    fontSize: REM * 15,
  },

  idWhiteTextStyle: {
    fontSize: REM * 13, // 15,
    textAlignVertical: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    color: colors.white,
    fontFamily: textFont,
    // lineHeight: 15,
  },

  idTabletWhiteTextStyle: {
    fontSize: REM * 10, // 15,
    textAlignVertical: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    color: colors.white,
    fontFamily: textFont,
    // lineHeight: 15,
  },

  idPhoneView: {
    // flex:1,
    flexDirection: 'row',
    width: '100%',
    height: '70%',
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // marginTop: 50,
    // marginBottom: 60,
  },

  idPhoneWrapperStyle: {
    marginLeft: REM * 10, // 10,
    marginRight: REM * 10, // 10
  },

  idPhoneTextStyle: {
    height: REM * 25, // 25,
    fontSize: REM * 15, // 15,

    // letterSpacing: 0.5,
    lineHeight: REM * 25, // 25,
    textAlign: 'center',
    fontFamily: numberFont,
    ...Platform.select({
      ios: {
        // fontWeight: 'bold'
      },
    }),
    // backgroundColor: '',
    // borderWidth:1
  },

  idTextInputStyle: {
    // passwordOrCost(), openPricePopup
    height: REM * 40, // this should be respective to font size
    width: '60%',
    fontSize: REM * 15, // 14,
    color: colors.searchFieldGray,
    textAlignVertical: 'center',
    padding: REM * 7,
    // backgroundColor: '',
    marginTop: REM * 5, // colors.white,
    alignSelf: 'center',
    // lineHeight: 30,
    textAlign: 'center',
    // backgroundColor: '',

    fontFamily: numberFont,
  },

  idTabletTextInputStyle: {
    // passwordOrCost(), openPricePopup
    height: REM * 30, // this should be respective to font size
    width: '60%',
    fontSize: REM * 10, // 14,
    color: colors.searchFieldGray,
    textAlignVertical: 'center',
    padding: REM * 7,
    // backgroundColor: '',
    marginTop: REM * 5, // colors.white,
    alignSelf: 'center',
    // lineHeight: 30,
    textAlign: 'center',
    // backgroundColor: '',

    fontFamily: numberFont,
  },

  idIllegalTextInputStyle: {
    height: REM * 40, // this should be respective to font size
    width: '60%',
    fontSize: REM * 15, // 14,
    color: 'red', // colors.searchFieldGray,
    textAlignVertical: 'center',
    padding: REM * 7,
    marginTop: REM * 5, // colors.white,
    // backgroundColor: colors.white,
    alignSelf: 'center',

    // lineHeight: 30,
    textAlign: 'center',
    // backgroundColor: '',

    fontFamily: numberFont,
    ...Platform.select({
      ios: {
        fontWeight: 'bold',
      },
    }),
  },

  idTabletIllegalTextInputStyle: {
    height: REM * 30, // this should be respective to font size
    width: '60%',
    fontSize: REM * 10, // 14,
    color: 'red', // colors.searchFieldGray,
    textAlignVertical: 'center',
    padding: REM * 7,
    marginTop: REM * 5, // colors.white,
    // backgroundColor: colors.white,
    alignSelf: 'center',

    // lineHeight: 30,
    textAlign: 'center',
    // backgroundColor: '',

    fontFamily: numberFont,
    ...Platform.select({
      ios: {
        fontWeight: 'bold',
      },
    }),
  },

  idChangePriceModalWithImagesStyle: {
    /// change height when not images
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    // modalHeight-40,
    justifyContent: 'center', // 'space-around',//space-between when chat is ebabled
    width: '100%',
    ...Platform.select({
      ios: {
        height: '90%',
      },
      android: {
        height: '90%',
      },
    }),
    // backgroundColor: ''
    // marginTop: 40,
  },

  idTabletChangePriceModalWithImagesStyle: {
    /// change height when not images
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    height: '90%', // modalHeight-40,
    justifyContent: 'center', // 'space-around',//space-between when chat is ebabled
    width: '100%',
    // backgroundColor: ''
    // marginTop: 40,
  },

  idChangePriceModalWithoutImagesStyle: {
    /// change height when not images
    // flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    height: '80%', // modalHeight-40,
    // backgroundColor: '',
    justifyContent: 'center', // 'space-around',//space-between when chat is ebabled
    width: '100%',
    // marginTop: 40,
  },

  idTabletChangePriceModalWithoutImagesStyle: {
    /// change height when not images
    // flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    height: '85%', // modalHeight-40,
    // backgroundColor: '',
    justifyContent: 'center', // 'space-around',//space-between when chat is ebabled
    width: '100%',
    // marginTop: 40,
  },

  idCheckBoxViewStyle: {
    flexDirection: 'row',
    // backgroundColor: '',
    marginTop: REM * 20,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-around',
    width: REM * (modalWidth - modalWidth / 3),
    height: REM * 35,
  },

  idTabletCheckBoxViewStyle: {
    flexDirection: 'row',
    // backgroundColor: '',
    marginTop: REM * 20,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-around',
    width: REM * 140,
    height: REM * 20,
  },

  idCheckBoxStyle: {
    // marginTop: 5,
    // backgroundColor: colors.,
    alignSelf: 'center',

    // height: 10,
    // width: 10
    // width:20,
    // height: 20,
  },

  idChooseImageTableViewStyle: {
    // changePrice
    // flexDirection: 'row'
    // backgroundColor: '',
    marginTop: REM * 20,
  },

  idChooseImageRowViewStyle: {
    flexDirection: 'row',
  },

  idChosenChooseImageStyle: {
    height: REM * 70,
    width: REM * 70,
    borderWidth: 3,
    borderColor: colors.gray,
    padding: REM * 3,
    marginRight: StyleSheet.hairlineWidth,
    marginLeft: StyleSheet.hairlineWidth,
    // backgroundColor: ''
  },

  idTabletChosenChooseImageStyle: {
    height: REM * 70,
    width: REM * 70,
    borderWidth: 3,
    borderColor: colors.gray,
    padding: REM * 3,
    marginRight: StyleSheet.hairlineWidth,
    marginLeft: StyleSheet.hairlineWidth,
    // backgroundColor: ''
  },

  idChooseImageViewStyle: {
    // getChooseImage()
    // backgroundColor: '',
    alignItems: 'center',
    width: '70%',
  },

  idUnchosenChooseImageStyle: {
    height: REM * 70,
    width: REM * 70,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.gray,
    padding: REM * 3,
    marginRight: StyleSheet.hairlineWidth,
    marginLeft: StyleSheet.hairlineWidth,
    // backgroundColor: ''
  },

  idTabletUnchosenChooseImageStyle: {
    height: REM * 70,
    width: REM * 70,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.gray,
    padding: REM * 3,
    marginRight: StyleSheet.hairlineWidth,
    marginLeft: StyleSheet.hairlineWidth,

    // backgroundColor: ''
  },

  idAndroidImageStyle: {
    height: '100%',
    width: '100%',
  },

  idFooterTextStyle: {
    fontSize: REM * 17, // 17,
    color: colors.white,
    fontFamily: textFont,
  },

  idTabletFooterTextStyle: {
    fontSize: REM * 15, // fontSize: ASPECT_RATIO * (20),
    color: colors.white,
    fontFamily: textFont,
  },

  idShareTouchableStyle: {
    padding: REM * 7, // 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: REM * 85,
    alignItems: 'center',
  },

  idTabletShareTouchableStyle: {
    // backgroundColor: '',
    // padding: REM*(7), //7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: REM * 60,
    alignItems: 'center',
    // marginLeft: 20,
    // marginRight: 20
  },

  idShareImageStyle: {
    resizeMode: 'stretch',
    padding: REM * 7, // 7,
    alignSelf: 'center', // 'flex-end',
    // backgroundColor: '',
    height: REM * 15, // 15,
    width: REM * 15, // 15
  },

  idTabletShareImageStyle: {
    resizeMode: 'stretch',
    padding: REM * 7, // 7,
    alignSelf: 'center', // 'flex-end',
    // backgroundColor: '',
    height: REM * 10, // 15,
    width: REM * 10, // 15
  },

  tabletHeaderStyle: {
    width: '100%',
    // height: '8%',
    backgroundColor: colors.searchHeaderColor,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: REM * 7, // 7,
    height: REM * 70, // getTextSize(50),
  },

  headerStyle: {
    width: '100%',
    // height: '8%',
    backgroundColor: colors.searchHeaderColor,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: REM * 7, // 7,
    height: REM * 50,
  },

  headerElementsStyle: {
    // marginTop: 10,
    width: '90%',
    backgroundColor: colors.searchHeaderColor,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },

  // ########################### ITEM VIEW #######################################

  ivDetailViewStyle: {
    // render(), itemView. jewelryItemView
    width: Dimensions.get('window').width,
    backgroundColor: colors.trans, // colors.white,
    alignSelf: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.whiteBoxShadow,
        shadowOffset: { width: 0, height: REM * -290 },
        shadowOpacity: REM * 90,
        shadowRadius: REM * 5,
      },
      android: {
        // height: REM*gggggggg
      },
    }),
  },

  ivTabletDetailViewStyle: {
    // render(), itemView. jewelryItemView
    width: Dimensions.get('window').width,
    backgroundColor: colors.trans, // colors.white,
    alignSelf: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.whiteBoxShadow,
        shadowOffset: { width: 0, height: REM * -280 },
        shadowOpacity: REM * 90,
        shadowRadius: REM * 5,
      },
    }),
  },

  ivTableStyle: {
    // render()  ////TODO CHECK IOS
    flexDirection: 'row',
    justifyContent: 'center', // 'space-between',
    width: '100%',
    alignSelf: 'center',
    backgroundColor: colors.white,
    // these handle the side 'margins' of the view
    // paddingLeft: REM*10,
    // paddingRight: REM*10,

    // width: REM*100
    // backgroundColor: 'red',
    height: REM * 210,
  },

  ivTabletTableStyle: {
    // render()  ////TODO CHECK IOS
    flexDirection: 'row',
    justifyContent: 'center', // 'space-between',
    width: '100%',
    alignSelf: 'center',
    // backgroundColor: colors.white,
    // these handle the side 'margins' of the view
    // paddingLeft: REM*10,
    // paddingRight: REM*10,

    // width: REM*100
    // backgroundColor: 'cyan',
    height: REM * 80,
  },

  ivEntryStyle: {
    // render()
    // flexDirection: 'row',
    // marginRight: REM*10,
    justifyContent: 'center', // 'space-between',
    // width:
    // backgroundColor:'',
    width: '55%',
  },

  ivTabletEntryStyle: {
    // render()
    // flexDirection: 'row',
    // marginRight: REM*10,
    justifyContent: 'center', // 'space-between',
    // width:
    // backgroundColor:'',
    width: '25%',
    // marginLeft: 1
  },

  ivTabletLeftEntryStyle: {
    // render()
    // flexDirection: 'row',
    // marginRight: REM*10,
    justifyContent: 'center', // 'space-between',
    // width:
    // backgroundColor:'',
    width: '20%',
    // marginLeft: 1
  },

  ivColumnViewStyle: {
    // render()
    flexDirection: 'row',
    width: '85%',
    alignItems: 'baseline',
  },

  ivTabletColumnViewStyle: {
    // render()
    flexDirection: 'row',
    width: '100%',
    // justifyContent: 'space-between',
    // backgroundColor: '',
    // width: REM*100
    // height: REM*180,
    // marginRight: REM*10, //10,
  },

  ivLabelStyle: {
    // render()
    // for item view label
    color: colors.labelColor,
    fontFamily: textFont,
    fontSize: REM * 14, // getTextSize(15), //15,
    lineHeight: REM * 26, // getTextSize(25), //25
    // letterSpacing: REM*0.7,
    width: '35%', // REM*60,
    // backgroundColor: ''
    // width: '95%',
  },

  ivTabletLabelStyle: {
    // render()
    // for item view label
    color: colors.labelColor,
    fontFamily: textFont,
    fontSize: REM * 9, // getTextSize(15), //15,
    lineHeight: REM * 15, // getTextSize(25), //25
    // letterSpacing: REM*0.7,
    width: '35%', // REM*60,
    // backgroundColor: ''
    // width: '95%',
  },

  ivTabletLeftLabelStyle: {
    // render()
    // for item view label
    color: colors.labelColor,
    fontFamily: textFont,
    fontSize: REM * 9, // getTextSize(15), //15,
    lineHeight: REM * 15, // getTextSize(25), //25
    // letterSpacing: REM*0.7,
    width: '40%', // REM*60,
    // backgroundColor: ''
    // width: '95%',
  },

  ivDetailTextStyle: {
    // render()
    // for item details
    textAlign: 'left',
    color: colors.black,
    fontFamily: numberFont,
    // getTextSize(17), //15,
    lineHeight: REM * 26, // getTextSize(25), //25
    letterSpacing: REM * 0.5,
    ...Platform.select({
      ios: {
        fontSize: REM * 14,
      },
      android: {
        fontSize: REM * 12,
      },
    }),
    // backgroundColor: '',
    // width: '60%'//REM*140 //when adding width, if text is long, it will \n, so removed width

    // height: REM*25.5 //getTextSize(25.5), //25,
  },
  ivTabletDetailTextStyle: {
    // render()
    // for item details
    textAlign: 'left',
    color: colors.black,
    fontFamily: numberFont,
    fontSize: REM * 8, // getTextSize(17), //15,
    lineHeight: REM * 15, // getTextSize(25), //25
    letterSpacing: 0.5,
    // marginLeft:
    // backgroundColor: '',
    // width: '60%'//REM*140 //when adding width, if text is long, it will \n, so removed width

    // height: REM*25.5 //getTextSize(25.5), //25,
  },
  ivCrossedTabletDetailTextStyle: {
    // render()
    // for item details
    textAlign: 'left',
    color: colors.searchFieldGray,
    fontFamily: numberFont,
    fontSize: REM * 6, // getTextSize(17), //15,
    lineHeight: REM * 15, // getTextSize(25), //25
    letterSpacing: 0.5,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    alignItems: 'baseline',
    // marginLeft:
    // backgroundColor: '',
    // width: '60%'//REM*140 //when adding width, if text is long, it will \n, so removed width

    // height: REM*25.5 //getTextSize(25.5), //25,
  },

  ivJewelryDetailTextStyle: {
    // render()
    // for item details
    textAlign: 'left',
    color: colors.black,
    fontFamily: textFont,
    fontSize: getTextSize(14), // getTextSize(13)  <-- for if need to display center weight, //getTextSize(17), //15,
    lineHeight: getTextSize(26),
  },

  ivCrossedPriceTextStyle: {
    // render()
    textAlign: 'justify',
    textAlignVertical: 'bottom',
    color: colors.searchFieldGray,
    fontFamily: textFont,
    fontSize: getTextSize(12),
    lineHeight: getTextSize(23),
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },

  ivTabletCrossedPriceTextStyle: {
    // render()
    textAlign: 'justify',
    textAlignVertical: 'bottom',
    color: colors.searchFieldGray,
    fontFamily: textFont,
    fontSize: getTextSize(10),
    lineHeight: getTextSize(23),
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },

  ivPriceTextStyle: {
    // render()
    textAlign: 'left',
    fontFamily: textFont,
    letterSpacing: getTextSize(0.5),
    paddingBottom: getTextSize(6),
    ...Platform.select({
      ios: {
        fontSize: getTextSize(17), // 15,
      },
      android: {
        fontSize: getTextSize(14), // 15,
      },
    }),
  },

  // ################## FILTERS styling ########################################################################

  // filter white/black buttons
  filterBlacktextStyle: {
    // weight, priceFilter, shapeTable, colorTable, symmetry, fluor, cut, polish, symm, clarity, jewelryType
    fontSize: REM * 15,
    textAlignVertical: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    color: colors.black,
    fontFamily: textFont,
  },

  filterTabletBlacktextStyle: {
    // weight, priceFilter, shapeTable, colorTable, symmetry, fluor, cut, polish, symm, clarity, jewelryType
    fontSize: REM * 11,
    textAlignVertical: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    color: colors.black,
    fontFamily: textFont,
  },

  filterTabletWhiteTextStyle: {
    // weight, priceFilter, shapeTable, colorTable, symmetry, fluor, cut, polish, symm, clarity, jewelryType
    fontSize: REM * 11,
    textAlignVertical: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    color: colors.white,
    fontFamily: textFont,
  },

  // filter titles
  filterTitleViewStyle: {
    // weight, priceFilter, shapeTable, colorTable, symmetry, fluor, cut, polish, symm, clarity, jewelryType
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    backgroundColor: colors.trans,
  },

  filterTitleStyle: {
    // weight, priceFilter, shapeTable, colorTable, symmetry, fluor, cut, polish, symm, clarity, jewelryType

    // flex:1,
    fontSize: REM * 16, // 16,
    color: colors.black,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlign: 'left',
    alignSelf: 'center',
    backgroundColor: colors.trans,
    padding: '3%',
    marginBottom: REM * 5,
    // lineHeight: getTextSize(30), //30,
    marginTop: '5%',
    fontFamily: filterTitleFont, // 'PlayfairDisplay-BoldItalic',
  },

  tabletFilterTitleStyle: {
    // weight, priceFilter, shapeTable, colorTable, symmetry, fluor, cut, polish, symm, clarity, jewelryType

    fontSize: REM * 10,
    color: colors.black,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlign: 'left',
    alignSelf: 'center',
    backgroundColor: colors.trans,
    paddingTop: '3%',
    paddingLeft: '3%',
    paddingRight: '3%',
    fontFamily: filterTitleFont,
  },

  // ############################ CANCEL button #############################
  // x button of filters
  cancelTouchableStyle: {
    // weight, priceFilter, shapeTable, colorTable, symmetry, fluor, cut, polish, symm, clarity, jewelryType
    // backgroundColor: '',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: '5%',
    marginBottom: REM * 4,
    padding: 7,
  },
  tabletCancelTouchableStyle: {
    // weight, priceFilter, shapeTable, colorTable, symmetry, fluor, cut, polish, symm, clarity, jewelryType
    // backgroundColor: '',
    alignSelf: 'flex-end',
    alignItems: 'center',
    // marginTop:'5%',
    // marginBottom: REM*4,
    paddingTop: '3%',
    paddingLeft: '2%',
    paddingRight: '2%',
    paddingBottom: '0.5%', // ASPECT_RATIO * 15 //'1%',
    // backgroundColor: ''
  },
  cancelImageStyle: {
    // weight, priceFilter, shapeTable, colorTable, symmetry, fluor, cut, polish, symm, clarity, jewelryType
    backgroundColor: colors.trans,
    resizeMode: 'contain',
    // marginBottom: REM*4,//getTextSize(5),
    width: REM * 19,
    height: REM * 19,
  },
  tabletCancelImageStyle: {
    // weight, priceFilter, shapeTable, colorTable, symmetry, fluor, cut, polish, symm, clarity, jewelryType
    backgroundColor: colors.trans,
    resizeMode: 'contain',
    // marginBottom: REM*4,//getTextSize(5),
    width: REM * 10,
    height: REM * 10,
    // paddingBottom: ASPECT_RATIO * 15
  },
});

/* export const cancelButton = <TouchableOpacity style={styles.picStyle}
							onPress = {() => this.clearAll()}>
							<Image source ={require('../assets/pics/delete.png')}
					style={styles.imageStyle}></Image></TouchableOpacity>; */
