import React, { Component, useState } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  BackHandler,
  KeyboardAvoidingView,
  Keyboard,
  Linking,
  Platform,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import * as strings from './strings';
import * as colors from './colors';
import * as styling from './styling';
import { contactUs } from './styling';

import {
  getTextSize,
  getStyle,
  isTablet,
  TEXT,
  contactUsSendEmail,
} from '../Cortex';
import { Input, LineSeperator } from '../components';

const LabelInput = ({
  label,
  value,
  setValue,
  keyboardType = 'default',
  multiline = false,
}) => (
  <>
    <Text style={getStyle(styles.labelStyle, styles.tabletLabelStyle)}>
      {label}
    </Text>
    <Input
      value={value}
      setValue={setValue}
      keyboardType={keyboardType}
      multiline={multiline}
    />
  </>
);

export const ContactUs = (props) => {
  const [name, setName] = useState(strings.blank);
  const [email, setEmail] = useState(strings.blank);
  const [subject, setSubject] = useState(strings.blank); //this.getSubject()
  const [tellUsMore, setTellUsMore] = useState(strings.blank);
  const [phone, setPhone] = useState(strings.blank);

  const clearAll = () => {
    setName(strings.blank);
    setSubject(strings.blank);
    setTellUsMore(strings.blank);
    setPhone(strings.blank);
  };

  return (
    <View style={getStyle(styles.keyboardView, styles.tabletKeyboardView)}>
      <TouchableWithoutFeedback
        style={styles.touchableViewStyle}
        onPress={() => Keyboard.dismiss()}>
        <View style={styles.touchableViewStyle}>
          <Text
            style={getStyle(
              styles.contactUsTitleStyle,
              styles.tabletContactUsTitleStyle
            )}>
            {TEXT.contactUs.toUpperCase()}
          </Text>
          <View
            style={getStyle(
              styles.lineSeperatorStyle,
              styles.tabletLineSeperatorStyle
            )}>
            <LineSeperator color="#979797" width={isTablet ? '10%' : '20%'} />
          </View>

          <LabelInput label={TEXT.fullName} value={name} setValue={setName} />

          <LabelInput
            label={TEXT.phoneNumber}
            value={phone}
            setValue={setPhone}
            keyboardType="numeric"
          />

          <LabelInput
            label={TEXT.subject}
            value={subject}
            setValue={setSubject}
          />

          <LabelInput
            label={TEXT.tellUsMore}
            value={tellUsMore}
            setValue={setTellUsMore}
            multiline={true}
          />

          {Platform.OS === 'android' && !isTablet && (
            <View style={styles.rectangularStyle}></View>
          )}
          <TouchableOpacity
            style={getStyle(styles.innerViewStyle, styles.tabletInnerViewStyle)}
            onPress={() => {
              contactUsSendEmail(name, subject, tellUsMore, phone);
              clearAll();
            }}>
            <Text style={getStyle(styles.textStyle, styles.tabletTextStyle)}>
              {TEXT.send}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default ContactUs;
// export default class ContactUs extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       [strings.nameState]: strings.blank,
//       [strings.email]: strings.blank,
//       [strings.subject]: 'null', //this.getSubject(),
//       [strings.tellUsMore]: strings.blank,
//       [strings.phoneNumberState]: strings.blank,
//     };
//   }

//   /**
//    * [getSubject triggered by consturctor
//    * 		fills the subject field of the email
//    * 		subject, if != strings.blank, it means the user was redirected here from an itemDetail || jewelryItemDetails screen]
//    * @return String [subject of email to be sent]
//    */
//   getSubject() {
//     var subject = this.props.navigation.getParam('id', strings.blank);
//     return subject !== strings.blank ? `Lot ID: ${subject}` : subject;
//   }

//   componentDidMount() {
//     BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
//   }

//   handleBackButton() {
//     return true;
//   }

//   componentWillUnmount() {
//     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
//   }

//   /**
//    * [sendMail sending email
//    * 		filling email fields and sending it via gmail app
//    * 		//TODO this should be an inapp service]
//    * @return void [description]
//    */
//   sendMail() {
//     var name = this.state[strings.nameState];
//     if (!name) {
//       this.showAlert(strings.invalidName);
//     } else {
//       var subject = this.state[strings.subject];
//       if (!subject) {
//         subject = "I'm interested in...";
//       }

//       var body = this.state[strings.tellUsMore];

//       if (!body) {
//         var temp = strings.blank; // this.props.navigation.getParam('id', strings.blank);
//         if (temp != strings.blank) {
//           body =
//             'My name is ' +
//             name +
//             ', I would like to receive more info about item ' +
//             temp;
//         } else {
//           body =
//             'My name is ' +
//             name +
//             ', I would like to receive more info about Asteria';
//         }
//       } else {
//         body = 'My name is ' + name + ', ' + body + '.';
//       }

//       var phone = this.state[strings.phoneNumberState];
//       if (phone) {
//         body += '\n You can reach me at ' + phone;
//       }

//       Linking.openURL(
//         'mailto:' + strings.mailTo + '?subject=' + subject + '&body=' + body
//       );
//       this.messageSent();
//     }
//   }

//   /**
//    * [messageSent triggered by sendMail
//    * 		clearAll fields, navigate to prev screen(when redirected from itemDetals) ]
//    * @return void [description]
//    */
//   messageSent() {
//     this.clearAll();
//     this.props.navigation.goBack();
//   }

//   /**
//    * [changeInput triggered when a user changes input in textInput]
//    * @param  String  stateName	 [state corresponding to each textInput]
//    * @param  String  text       [text user inserted]
//    * @return void           [description]
//    */
//   changeInput(stateName, text) {
//     this.setState({
//       [stateName]: text,
//     });
//   }

//   /**
//    * [clearAll triggered in messageSent
//    * 		clears all textInputs
//    * 		consider adding a 'reset form' option ]
//    * @return void [description]
//    */
//   clearAll() {
//     this.setState({
//       [strings.nameState]: strings.blank,
//       [strings.subject]: strings.blank,
//       [strings.tellUsMore]: strings.blank,
//       [strings.phoneNumberState]: strings.blank,
//     });
//   }

//   /**
//    * [getBehavior CAN ERASE ]
//    * @return {[type]} [description]
//    */
//   getBehavior() {
//     if (Platform.OS === 'ios') {
//       return 'padding';
//     }
//   }

//   /**
//    * [getAndroidWorkaround triggers in render
//    * 		android has a problem with viewing send button on top, hence a workaround]
//    * @return View [view with the specific android styling]
//    */
//   getAndroidWorkaround() {
//     return (
//       Platform.OS === 'android' &&
//       !isTablet && <View style={styles.rectangularStyle}></View>
//     );
//   }

//   keyboardDismiss() {
//     Keyboard.dismiss();
//   }

//   getView() {
//     console.log('');
//     var keyboardVerticalOffset = 50;
//     var subject = strings.blank; //this.props.navigation.getParam('id', strings.blank);
//     if (subject !== strings.blank) {
//       // refers to when redirected from item
//       return (
//         <KeyboardAvoidingView
//           style={contactUs.keyboardViewRedirected}
//           behavior="padding"
//           enabled
//           keyboardVerticalOffset={keyboardVerticalOffset}>
//           <TouchableWithoutFeedback
//             style={contactUs.scrollViewStyle}
//             onPress={() => Keyboard.dismiss()}>
//             <ScrollView contentContainerStyle={contactUs.scrollViewStyle}>
//               <Text style={contactUs.contactUsTitleStyleRedirected}>
//                 {TEXT.contactUs.toUpperCase()}
//               </Text>

//               <View style={contactUs.lineSeperatorStyleRedirected}>
//                 <LineSeperator />
//               </View>

//               <Text
//                 style={getStyle(
//                   styles.labelStyle,
//                   styles.tabletRedirectedLabelStyle
//                 )}>
//                 {TEXT.fullName}
//               </Text>

//               <TextInput
//                 style={getStyle(
//                   styles.textInputStyleRedirected,
//                   styles.tabletTextInputStyleRedirected
//                 )}
//                 clearButtonMode="always"
//                 multiline={false}
//                 underlineColorAndroid={colors.trans}
//                 borderWidth={1}
//                 autoCorrect={false}
//                 value={this.state[strings.nameState]}
//                 onChangeText={(text) => {
//                   this.changeInput([strings.nameState], text);
//                 }}
//               />

//               <Text
//                 style={getStyle(
//                   styles.labelStyle,
//                   styles.tabletRedirectedLabelStyle
//                 )}>
//                 {TEXT.phoneNumber}
//               </Text>

//               <TextInput
//                 style={getStyle(
//                   styles.textInputStyleRedirected,
//                   styles.tabletTextInputStyleRedirected
//                 )}
//                 clearButtonMode="always"
//                 multiline={false}
//                 underlineColorAndroid={colors.trans}
//                 borderWidth={1}
//                 keyboardType="numeric"
//                 autoCorrect={false}
//                 value={this.state[strings.phoneNumberState]}
//                 onChangeText={(text) => {
//                   this.changeInput([strings.phoneNumberState], text);
//                 }}
//               />

//               <Text
//                 style={getStyle(
//                   styles.labelStyle,
//                   styles.tabletRedirectedLabelStyle
//                 )}>
//                 {TEXT.subject}
//               </Text>

//               <TextInput
//                 style={getStyle(
//                   styles.textInputStyleRedirected,
//                   styles.tabletTextInputStyleRedirected
//                 )}
//                 clearButtonMode="always"
//                 multiline={false}
//                 underlineColorAndroid={colors.trans}
//                 borderWidth={1}
//                 autoCorrect={false}
//                 value={this.state[strings.subject]}
//                 onChangeText={(text) => {
//                   this.changeInput([strings.subject], text);
//                 }}
//               />

//               <Text
//                 style={getStyle(
//                   styles.labelStyle,
//                   styles.tabletRedirectedLabelStyle
//                 )}>
//                 {TEXT.tellUsMore}
//               </Text>

//               <TextInput
//                 style={getStyle(
//                   styles.tellUsMoreStyleRedirected,
//                   styles.tabletTellUsMoreStyleRedirected
//                 )}
//                 clearButtonMode="always"
//                 multiline={true}
//                 underlineColorAndroid={colors.trans}
//                 borderWidth={1}
//                 autoCorrect={false}
//                 value={this.state[strings.tellUsMore]}
//                 onChangeText={(text) => {
//                   this.changeInput([strings.tellUsMore], text);
//                 }}
//               />

//               <TouchableOpacity
//                 style={styles.innerViewStyleRedirected}
//                 onPress={() => {
//                   this.sendMail();
//                 }}>
//                 <Text style={styles.textStyle}>{TEXT.send}</Text>
//               </TouchableOpacity>
//             </ScrollView>
//           </TouchableWithoutFeedback>
//         </KeyboardAvoidingView>
//       );
//     } else {
//       // refers to when shown on welcome screen
//       return (
//         <KeyboardAvoidingView
//           style={getStyle(styles.keyboardView, styles.tabletKeyboardView)}>
//           <TouchableWithoutFeedback
//             style={styles.touchableViewStyle}
//             onPress={() => this.keyboardDismiss()}>
//             <View style={styles.touchableViewStyle}>
//               <Text
//                 style={getStyle(
//                   styles.contactUsTitleStyle,
//                   styles.tabletContactUsTitleStyle
//                 )}>
//                 {TEXT.contactUs.toUpperCase()}
//               </Text>

//               <View
//                 style={getStyle(
//                   styles.lineSeperatorStyle,
//                   styles.tabletLineSeperatorStyle
//                 )}>
//                 <LineSeperator />
//               </View>

//               <Text
//                 style={getStyle(styles.labelStyle, styles.tabletLabelStyle)}>
//                 {TEXT.fullName}
//               </Text>

//               <TextInput
//                 style={getStyle(
//                   styles.textInputStyle,
//                   styles.tabletTextInputStyle
//                 )}
//                 clearButtonMode="always"
//                 multiline={false}
//                 underlineColorAndroid={colors.trans}
//                 borderWidth={1}
//                 autoCorrect={false}
//                 value={this.state[strings.nameState]}
//                 onChangeText={(text) => {
//                   this.changeInput([strings.nameState], text);
//                 }}
//               />

//               <Text
//                 style={getStyle(styles.labelStyle, styles.tabletLabelStyle)}>
//                 {TEXT.phoneNumber}
//               </Text>

//               <TextInput
//                 style={getStyle(
//                   styles.textInputStyle,
//                   styles.tabletTextInputStyle
//                 )}
//                 clearButtonMode="always"
//                 multiline={false}
//                 underlineColorAndroid={colors.trans}
//                 borderWidth={1}
//                 keyboardType="numeric"
//                 autoCorrect={false}
//                 value={this.state[strings.phoneNumberState]}
//                 onChangeText={(text) => {
//                   this.changeInput([strings.phoneNumberState], text);
//                 }}
//               />

//               <Text
//                 style={getStyle(styles.labelStyle, styles.tabletLabelStyle)}>
//                 {TEXT.subject}
//               </Text>

//               <TextInput
//                 style={getStyle(
//                   styles.textInputStyle,
//                   styles.tabletTextInputStyle
//                 )}
//                 clearButtonMode="always"
//                 multiline={false}
//                 underlineColorAndroid={colors.trans}
//                 borderWidth={1}
//                 autoCorrect={false}
//                 value={this.state[strings.subject]}
//                 onChangeText={(text) => {
//                   this.changeInput([strings.subject], text);
//                 }}
//               />

//               <Text
//                 style={getStyle(styles.labelStyle, styles.tabletLabelStyle)}>
//                 {TEXT.tellUsMore}
//               </Text>

//               <TextInput
//                 style={getStyle(
//                   styles.tellUsMoreStyle,
//                   styles.tabletTellUsMoreTextInputStyle
//                 )}
//                 clearButtonMode="always"
//                 multiline={true}
//                 underlineColorAndroid={colors.trans}
//                 borderWidth={1}
//                 autoCorrect={false}
//                 value={this.state[strings.tellUsMore]}
//                 onChangeText={(text) => {
//                   this.changeInput([strings.tellUsMore], text);
//                 }}
//               />

//               {this.getAndroidWorkaround()}

//               <TouchableOpacity
//                 style={getStyle(
//                   styles.innerViewStyle,
//                   styles.tabletInnerViewStyle
//                 )}
//                 onPress={() => {
//                   this.sendMail();
//                 }}>
//                 <Text
//                   style={getStyle(styles.textStyle, styles.tabletTextStyle)}>
//                   {TEXT.send}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </TouchableWithoutFeedback>
//         </KeyboardAvoidingView>
//       );
//     }
//   }

//   render() {
//     return this.getView();
//   }
// }

const styles = StyleSheet.create({
  tabletTellUsMoreStyleRedirected: {
    height: getTextSize(100), // '20%', //this should be respective to font size
    width: '90%',
    fontSize: getTextSize(10),
    color: colors.black,
    textAlignVertical: 'top',
    justifyContent: 'center',
    alignItems: 'center',
    padding: getTextSize(2),
    borderWidth: StyleSheet.hairlineWidth,
    marginTop: getTextSize(5),
    borderColor: colors.gray,
    fontFamily: styling.numberFont,
  },

  tabletTextInputStyleRedirected: {
    height: getTextSize(25), // '5%',
    width: '90%',
    fontSize: getTextSize(10),
    color: colors.black,
    textAlignVertical: 'center',
    padding: getTextSize(5),
    marginTop: getTextSize(2),
    marginBottom: getTextSize(10),
    borderColor: colors.gray,
    fontFamily: styling.numberFont,
    borderWidth: StyleSheet.hairlineWidth,
  },

  tabletRedirectedLabelStyle: {
    width: '90%',
    color: colors.cuLabel,
    fontSize: getTextSize(12), // 14,
    textAlign: 'left',
    fontFamily: styling.textFont,
  },

  tabletTextStyle: {
    color: colors.white,
    fontSize: getTextSize(15), // ASPECT_RATIO * (25), //15
    letterSpacing: getTextSize(3), // 3,
    paddingLeft: 5,
    fontFamily: styling.textFont,
  },

  tabletInnerViewStyle: {
    backgroundColor: colors.black,
    width: '30%',

    // padding: 15,
    // marginTop:10,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.shadowBox,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 22,
        shadowRadius: 5,
        position: 'absolute',
        top: '94%',
        height: '11%',
      },
      android: {
        elevation: 3,
        position: 'absolute',
        top: '88%',
        height: '11%',
      },
    }),
  },

  tabletTellUsMoreTextInputStyle: {
    height: getTextSize(50), // ASPECT_RATIO * (100),  //100, //this should be respective to font size
    width: '90%',
    fontSize: getTextSize(10), // ASPECT_RATIO * (20),//15,
    color: colors.black,
    textAlignVertical: 'top',
    justifyContent: 'center',
    alignItems: 'center',
    padding: getTextSize(5),
    marginTop: getTextSize(5), // ASPECT_RATIO * (15), // getPercentage(2), //'2%',
    // margin: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.gray,
    ...Platform.select({
      ios: {
        marginBottom: '28%', // getPercentage(30), //'30%',
        fontFamily: styling.numberFont,
      },
      android: {
        marginBottom: '15%',
        fontFamily: styling.numberFont,
      },
    }),
  },

  tabletTextInputStyle: {
    height: getTextSize(30), // ASPECT_RATIO * (50),//'7.6%',
    fontFamily: styling.numberFont,
    width: '90%',
    fontSize: getTextSize(10), // ASPECT_RATIO * (20), //15,
    color: colors.black,
    textAlignVertical: 'center',
    padding: getTextSize(5), // 5,
    margin: getTextSize(5), // ASPECT_RATIO * (15), //getPercentage(2), //'2%',
    borderColor: colors.gray,
    borderWidth: StyleSheet.hairlineWidth,
  },

  tabletLabelStyle: {
    // flex: 1,
    // height: '4%',
    width: '90%',
    // margin: '1%',
    // opacity: 0.5,
    // marginTop: getPercentage(1),// '1%',
    color: colors.black,
    fontSize: getTextSize(12), // 14,
    // lineHeight: getTextSize(20), //20,
    textAlign: 'left',
    fontFamily: styling.textFont,
    // alignSelf: 'flex-start',
    // backgroundColor:'red'
  },

  tabletLineSeperatorStyle: {
    marginTop: '2%', // getTextSize(20), //getPercentage(5), //'3%',
    marginBottom: '3%', // getTextSize(35), //'10%',
    width: '120%',
    // marginTop: ''
  },

  tabletContactUsTitleStyle: {
    fontSize: getTextSize(15), // ASPECT_RATIO * (23),//20,
    alignSelf: 'center',
    color: colors.black,
    letterSpacing: getTextSize(1.25), // 1.25,
    textAlign: 'center',
    fontFamily: styling.textFont, // 'PlayfairDisplay-Regular',
    // backgroundColor: 'pink'
    ...Platform.select({
      ios: {
        marginTop: getTextSize(50),
      },
      android: {
        marginTop: getTextSize(5),
      },
    }),
  },

  tabletKeyboardView: {
    // flex:1,
    // justifyContent: 'space-around',//goes along with flex:1
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    backgroundColor: colors.trans,
    ...Platform.select({
      ios: {
        height: getTextSize(350),
      },
      android: {
        // paddingBottom: getTextSize(20)
        height: getTextSize(350),
      },
    }),
  },

  tellUsMoreStyleRedirected: {
    height: '20%', // this should be respective to font size
    width: '90%',
    fontSize: getTextSize(15),
    color: colors.black,
    textAlignVertical: 'top',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderWidth: StyleSheet.hairlineWidth,
    // marginTop: '2%',
    // margin: 5,

    borderColor: colors.gray,
    // borderRadius: 3,
    fontFamily: styling.numberFont,
    // marginBottom: '10%'

    // backgroundColor: 'pink' //colors.gray,
    // justifyContent: 'flex-start',
  },
  textInputStyleRedirected: {
    height: '7%',
    width: '90%',
    fontSize: getTextSize(15),
    color: colors.black,
    textAlignVertical: 'center',
    padding: getTextSize(5),
    // margin: '1%',
    borderColor: colors.gray,
    // borderRadius: 3,
    fontFamily: styling.numberFont,
    borderWidth: StyleSheet.hairlineWidth,
    // textAlign: 'center'
    // backgroundColor: colors.gray,
    // justifyContent: 'flex-start',
  },

  viewStyleRedirected: {
    backgroundColor: colors.white,
    width: Dimensions.get('window').width,
    alignSelf: 'center',
    alignItems: 'center',
    height: '100%',

    // padding: 10
  },

  touchableViewStyleRedirected: {
    // flex:1,
    // justifyContent: 'space-around',//goes along with flex:1
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    // height:  '100%',
    backgroundColor: colors.white,
  },

  innerViewStyleRedirected: {
    backgroundColor: colors.sendButton,
    width: '47%',
    position: 'absolute',
    bottom: getTextSize(20),

    // padding: 15,
    // marginTop:10,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.shadowBox,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 22,
        shadowRadius: 5,

        height: '11%',
      },
      android: {
        elevation: 3,

        height: getTextSize(40), // '11%',
      },
    }),
  },

  lineSeperatorStyle: {
    marginTop: getTextSize(20), // getPercentage(5), //'3%',
    marginBottom: getTextSize(35), // '10%',
    width: '120%',
  },
  rectangularStyle: {
    // TODO i hate this android workaround, but just for now
    // backgroundColor: colors.rectangular,
    height: getTextSize(50), // if change this to percantage, result in prob on android
    // marginBottom: 60,
    width: '100%',
  },

  touchableViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
  },

  labelStyle: {
    // flex: 1,
    // height: '4%',
    width: '90%',
    margin: '1%',
    // opacity: 0.5,
    // marginTop: getPercentage(1),// '1%',
    color: colors.cuLabel,
    fontSize: getTextSize(15), // 14,
    // lineHeight: getTextSize(20), //20,
    textAlign: 'left',
    fontFamily: styling.textFont,
    // alignSelf: 'flex-start',
    // backgroundColor:'red'
  },

  contactUsTitleStyle: {
    marginTop: '10%', // getPercentage(10), //'10%',
    // height: '7%',
    fontSize: getTextSize(20), // 20,
    alignSelf: 'center',
    color: colors.black,
    letterSpacing: getTextSize(1.25), // 1.25,
    textAlign: 'center',
    fontFamily: styling.textFont, // 'PlayfairDisplay-Regular',

    // backgroundColor: 'pink'
    // backgroundColor: 'pink'
  },

  keyboardView: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    backgroundColor: colors.trans,

    ...Platform.select({
      ios: {
        height: getTextSize(570), // 570
      },
      android: {
        height: getTextSize(590), // 570
      },
    }),
  },

  viewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: colors.white,
    height: '100%',
    ...Platform.select({
      android: {
        elevation: 3,
      },
    }),
  },

  textInputStyle: {
    height: getTextSize(40), // '7.6%',
    fontFamily: styling.numberFont,
    width: '90%',
    fontSize: getTextSize(15), // 15,
    color: colors.black,
    textAlignVertical: 'center',
    padding: getTextSize(5), // 5,
    margin: getTextSize(10), // getPercentage(2), //'2%',
    borderColor: colors.gray,
    borderWidth: StyleSheet.hairlineWidth,
  },
  tellUsMoreStyle: {
    height: getTextSize(100), // 100, //this should be respective to font size
    width: '90%',
    fontSize: getTextSize(15), // 15,
    color: colors.black,
    textAlignVertical: 'top',
    justifyContent: 'center',
    alignItems: 'center',
    padding: getTextSize(5),
    marginTop: getTextSize(10), // getPercentage(2), //'2%',
    // margin: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.gray,
    ...Platform.select({
      ios: {
        marginBottom: '28%', // getPercentage(30), //'30%',
        fontFamily: styling.numberFont,
      },
      android: {
        marginBottom: '15%',
        fontFamily: styling.numberFont,
      },
    }),
  },

  innerViewStyle: {
    backgroundColor: colors.sendButton,
    width: '47%',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.shadowBox,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 22,
        shadowRadius: 5,
        position: 'absolute',
        top: '94%',
        height: '11%',
      },
      android: {
        elevation: 3,
        position: 'absolute',
        top: '89%',
        height: getTextSize(50),
      },
    }),
  },
  textStyle: {
    color: colors.black,
    fontSize: getTextSize(15), // 15
    letterSpacing: getTextSize(3), // 3,
    paddingLeft: 5,
    fontFamily: styling.textFont,
  },
});
