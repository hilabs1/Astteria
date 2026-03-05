import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Linking,
  TouchableOpacity,
  BackHandler,
  Alert,
  Platform,
} from 'react-native';

import * as strings from './strings';
import * as colors from './colors';
import * as styling from './styling';
import { LineSeperator } from './LineSeperator';
// import DeviceInfo from 'react-native-device-info';

import {
  get,
  LOCATION,
  getTextSize,
  IMAGE_PREFIX,
  CERT_PREFIX,
  errorNum,
  getStyle,
  callPhone,
  deviceModel,
  appVersion,
  systemVersion,
  sendReport,
  deviceLocale,
  brand,
  TABLET,
  CERT_LINK,
  TEXT,
} from '../Cortex';
// import { connectionLog } from './WelcomeSearch';

export default class OurOffices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: null,
      time1: null,
      time2: null,
      latitude: null,
      longitude: null,
      error: null,
      connectionStatus: '',
    };
  }

  // ===== android onBackPressed handle
  componentDidMount() {
    // console.log('OurOffices: TKT_1: componentDidMount ~~~~~~~~~~~~~~~~~~~~~~~');
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    // this.getPhysicalLocation();
  }

  handleBackButton = () => true;

  componentWillUnmount() {
    // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  // =============================

  /**
   * [openSocialMedia handles social media redirection]
   * @param  String socialMedia [either Facebook, Twitter, Instagram, youtube]
   */
  openSocialMedia = (socialMedia) => {
    switch (socialMedia) {
      case 'facebook': {
        Linking.canOpenURL(strings.facebookURL).then((supported) => {
          if (supported) {
            Linking.openURL(strings.facebookURL);
          }
        });
        break;
      }
      case 'twitter': {
        Linking.canOpenURL(strings.twitterURL).then((supported) => {
          if (supported) {
            Linking.openURL(strings.twitterURL);
          }
        });
        break;
      }
      case 'instagram': {
        Linking.canOpenURL(strings.instagramURL).then((supported) => {
          if (supported) {
            Linking.openURL(strings.instagramURL);
          }
        });
        break;
      }
      case 'youtube': {
        Linking.canOpenURL(strings.youtubeURL).then((supported) => {
          if (supported) {
            Linking.openURL(strings.youtubeURL);
          }
        });
        break;
      }
    }
  };

  /**
   * [knockKnock triggered by render
   * 		handles knock knock on Asteria logo]
   * @return void   [description]
   */
  knockKnock = () => {
    var t = new Date().getTime();
    if (this.state.time == null) {
      this.setState({
        time: t,
      });
    } else {
      if (this.state.time1 == null) {
        this.setState({
          time1: t,
        });
      } else {
        this.setState(
          {
            time2: t,
          },
          () => {
            this.checkInterval();
          }
        );
      }
    }
  };

  /**
   * [checkInterval triggered by knockKnock
   * 		handles knocks check
   * 		if knocked on Asteria logo three times in intervals of 1.5 seconds, showAlert() ]
   * @return void   [description]
   */
  checkInterval = () => {
    if (
      this.state.time2 - this.state.time1 < 1000 &&
      this.state.time1 - this.state.time < 1000
    ) {
      // this.getPhysicalLocation();
      this.showAlert();
      // console.log('ourOffices: TKT_17: checkInterval(): location: '+LOCATION);
    }
    this.setState({
      time: null,
      time1: null,
      time2: null,
    });
  };

  /**
   * [showAlert triggered by checkInterval
   * 		handles displaying alert with location and prefixes]
   * @return void   [description]
   */
  async showAlert() {
    var loc = LOCATION;
    if (LOCATION == strings.international) {
      loc = await get(strings.currentLocation);
      if (loc == null) loc = LOCATION;
    }

    var date = await get(strings.loadFromFile);
    var deviceIp = await DeviceInfo.getIPAddress();
    var comp = this.props.stat;

    var log =
      'You are in ' +
      loc +
      '\napp version: ' +
      appVersion +
      '\nimg: ' +
      IMAGE_PREFIX +
      '\ncert: ' +
      CERT_PREFIX +
      // + '\ntemp: '+temp
      '\nlog: ' +
      errorNum +
      '\nconnection: ' +
      connectionLog +
      '\ncomp: ' +
      comp +
      '\nfileDate y m d h: ' +
      date +
      '\nlocale: ' +
      deviceLocale +
      '\nbrand: ' +
      brand +
      '\nmodel: ' +
      deviceModel +
      '\nis tablet: ' +
      TABLET +
      '\nos version: ' +
      systemVersion +
      '\nCERT: ' +
      CERT_LINK;

    Alert.alert(
      'Report',
      log,
      [{ text: 'OK' }, { text: 'Send Report', onPress: () => sendReport(log) }],
      { cancelable: false }
    );
  }

  render() {
    return (
      <View style={getStyle(styles.viewStyle, styles.tabletViewStyle)}>
        <Text
          style={getStyle(
            styles.ourOfficesTitleStyle,
            styles.tabletOurOfficesTitleStyle
          )}>
          {TEXT.ourOffices}
        </Text>

        <View
          style={getStyle(
            styles.lineSeperatorStyle,
            styles.tabletLineSeperatorStyle
          )}>
          <LineSeperator />
        </View>

        <View style={styles.officeTableStyle}>
          <View style={styles.officeColumnStyle}>
            <Text
              style={getStyle(
                styles.officesTextStyle,
                styles.tabletOfficesTextStyle
              )}>
              {TEXT.london}
            </Text>
            <Text
              style={getStyle(
                styles.officesTextStyle,
                styles.tabletOfficesTextStyle
              )}>
              {TEXT.ny}
            </Text>
            <Text
              style={getStyle(
                styles.officesTextStyle,
                styles.tabletOfficesTextStyle
              )}>
              {TEXT.chicago}
            </Text>
            {/* <Text style ={styles.offlineMode} >OFFLINE</Text> */}
          </View>

          <View style={styles.officeColumnStyle}>
            <Text
              style={getStyle(
                styles.officesTextStyle,
                styles.tabletOfficesTextStyle
              )}>
              {TEXT.israelTxt}
            </Text>
            <Text
              style={getStyle(
                styles.officesTextStyle,
                styles.tabletOfficesTextStyle
              )}>
              {TEXT.la}
            </Text>
            <Text
              style={getStyle(
                styles.officesTextStyle,
                styles.tabletOfficesTextStyle
              )}>
              {TEXT.switzerland}
            </Text>
          </View>

          <View style={styles.officeColumnStyle}>
            <Text
              style={getStyle(
                styles.officesTextStyle,
                styles.tabletOfficesTextStyle
              )}>
              {TEXT.shanghai}
            </Text>
            <Text
              style={getStyle(
                styles.officesTextStyle,
                styles.tabletOfficesTextStyle
              )}>
              {TEXT.beijing}
            </Text>
            <Text
              style={getStyle(
                styles.officesTextStyle,
                styles.tabletOfficesTextStyle
              )}>
              {TEXT.shenzhen}
            </Text>
            <Text
              style={getStyle(
                styles.officesTextStyle,
                styles.tabletOfficesTextStyle
              )}>
              {TEXT.hongKong}
            </Text>
          </View>
        </View>

        {/* phone view */}
        <View style={getStyle(styles.phoneView, styles.tabletPhoneView)}>
          <TouchableWithoutFeedback onPress={() => callPhone(strings.phone)}>
            <View style={styles.phoneWrapperStyle}>
              <Text style={styles.phoneStyle}>{strings.phone}</Text>
            </View>
          </TouchableWithoutFeedback>

          <Text style={styles.phoneStyle}>|</Text>

          <TouchableWithoutFeedback onPress={() => callPhone(strings.phoneCH)}>
            <View style={styles.phoneWrapperStyle}>
              <Text style={styles.phoneStyle}>{strings.phoneCH}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <TouchableWithoutFeedback onPress={() => this.knockKnock()}>
          <View
            style={getStyle(
              styles.imageTitleWrapperStyle,
              styles.tabletImageTitleWrapperStyle
            )}>
            <Image
              style={getStyle(
                styles.imageLogoStyle,
                styles.tabletImageLogoStyle
              )}
              source={require('../assets/pics/title2.png')}></Image>
          </View>
        </TouchableWithoutFeedback>

        {/* social media======== */}

        <View
          style={getStyle(
            styles.socialMediaViewStyle,
            styles.tabletSocialMediaViewStyle
          )}>
          <TouchableOpacity onPress={() => this.openSocialMedia('facebook')}>
            <Image
              style={getStyle(styles.imageStyle, styles.tabletImageStyle)}
              source={require('../assets/pics/facebook.png')}></Image>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.openSocialMedia('instagram')}>
            <Image
              style={getStyle(styles.imageStyle, styles.tabletImageStyle)}
              source={require('../assets/pics/instagram.png')}></Image>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.openSocialMedia('twitter')}>
            <Image
              style={getStyle(styles.imageStyle, styles.tabletImageStyle)}
              source={require('../assets/pics/twitter.png')}></Image>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.openSocialMedia('youtube')}>
            <Image
              style={getStyle(styles.youtubeStyle, styles.tabletYoutubeStyle)}
              source={require('../assets/pics/youtube.png')}></Image>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabletViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: getTextSize(450),
    backgroundColor: colors.white,
  },
  tabletImageStyle: {
    alignContent: 'center',
    justifyContent: 'center',
    height: getTextSize(20),
    width: getTextSize(20),
    resizeMode: 'contain',
  },
  tabletYoutubeStyle: {
    alignContent: 'center',
    justifyContent: 'center',
    height: getTextSize(16),
    width: getTextSize(20),
    resizeMode: 'stretch',
  },

  tabletSocialMediaViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    width: '40%',
    height: '15%',
    marginBottom: '5%',
  },

  tabletImageTitleWrapperStyle: {
    width: '40%',
    height: '10%',
    marginTop: '13%',
    justifyContent: 'center',
  },

  tabletImageLogoStyle: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },

  tabletPhoneView: {
    flexDirection: 'row',
    width: '100%',
    height: '10%',
    backgroundColor: colors.phoneBackground,
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  tabletLineSeperatorStyle: {
    marginTop: '5%',
    marginBottom: '7%',
    width: '100%',
  },
  tabletOurOfficesTitleStyle: {
    marginTop: '10%',
    fontSize: getTextSize(15),
    alignSelf: 'center',
    color: colors.black,
    letterSpacing: getTextSize(1.25),
    textAlign: 'center',
    fontFamily: styling.textFont,
  },

  tabletOfficesTextStyle: {
    fontSize: getTextSize(10),
    letterSpacing: getTextSize(1.16),
    lineHeight: getTextSize(25),
    textAlign: 'center',
    fontFamily: styling.textFont,
  },

  offlineMode: {
    fontSize: getTextSize(11),
    letterSpacing: getTextSize(1.16),
    lineHeight: getTextSize(25),
    textAlign: 'center',
    fontFamily: styling.textFont,
    backgroundColor: 'red',
    color: colors.white,
  },

  youtubeStyle: {
    alignContent: 'center',
    justifyContent: 'center',
    height: getTextSize(21),
    width: getTextSize(30),
    resizeMode: 'stretch',
  },

  ourOfficesTitleStyle: {
    marginTop: '35%',
    fontSize: getTextSize(20),
    alignSelf: 'center',
    color: colors.black,
    letterSpacing: getTextSize(1.25),
    textAlign: 'center',
    fontFamily: styling.textFont,
  },
  imageTitleWrapperStyle: {
    width: '65%',
    height: '12%',
    marginTop: '9%',
    marginBottom: '2%',
  },
  phoneWrapperStyle: {
    width: '40%',
  },
  imageLogoStyle: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  phoneStyle: {
    height: getTextSize(25),
    letterSpacing: getTextSize(0.5),
    lineHeight: getTextSize(25),
    textAlign: 'center',
    ...Platform.select({
      android: {
        fontFamily: styling.numberFont,
        fontSize: getTextSize(15),
      },
      ios: {
        fontSize: getTextSize(13),
        fontFamily: styling.numberFont,
        fontWeight: '300',
      },
    }),
  },
  lineSeperatorStyle: {
    marginTop: '6%',
    marginBottom: '10%',
    width: '100%',
  },
  officesTextStyle: {
    fontSize: getTextSize(11),
    letterSpacing: getTextSize(1.16),
    lineHeight: getTextSize(25),
    textAlign: 'center',
    fontFamily: styling.textFont,
    ...Platform.select({
      android: {
        fontSize: getTextSize(15),
      },
    }),
  },
  officeTableStyle: {
    flexDirection: 'row',
    marginBottom: '13%',
    width: '100%',
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  officeColumnStyle: {
    alignItems: 'center',
    height: '100%',
    width: '30%',
    alignSelf: 'center',
  },
  locationTitleStyle: {
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: '35%',
    height: '10%',
    width: '60%',
  },
  viewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: getTextSize(600),
    backgroundColor: colors.white,
  },
  textStyle: {
    fontSize: 20,
    textAlignVertical: 'center',
    textAlign: 'center',
    alignItems: 'center',
    color: colors.black,
    marginBottom: 20,
  },

  innerViewStyle: {
    alignItems: 'center',
    padding: 7,
  },
  subtitlesStyle: {
    fontSize: 15,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.black,
  },
  phoneView: {
    flexDirection: 'row',
    width: '100%',
    height: '14%',
    backgroundColor: colors.phoneBackground,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  socialMediaViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-around',
    width: '70%',
    height: '15%',
    marginBottom: '20%',
  },
  imageStyle: {
    alignContent: 'center',
    justifyContent: 'center',
    height: getTextSize(20),
    width: getTextSize(20),
    resizeMode: 'contain',
  },
});
