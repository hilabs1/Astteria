import React from 'react';
import {
  TouchableWithoutFeedback,
  ImageBackground,
  StatusBar,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  /*SafeAreaView,*/
} from 'react-native';
import { TABLET, getStyle, TEXT } from '../../Cortex';
import * as styling from '../styling';
import * as colors from '../colors';
import { LOGIN } from '../../constants/login';

const backgroundImage = TABLET
  ? require('../../assets/pics/launchBackgroundTablet.jpg')
  : require('../../assets/pics/launchBackground.jpg');

export const SignupView = ({
  userName,
  setUserName,
  email,
  setEmail,
  valFromDB,
  setValFromDB,
  imCompany,
  plus,
  getCompanyComps,
  register,
  registerOrLogin,
}) => {
  return (
    <View style={{ flex: 0.9 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ImageBackground
          style={styling.styles.registerImageBackgroundStyle}
          resizeMode='stretch'
          source={backgroundImage}>
          <StatusBar hidden={true} />

          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View
              testID={'registerView'}
              style={styling.styles.guestLoginViewStyle}>
              <Text
                style={getStyle(
                  styling.styles.guestloginWelcomeTextStyle,
                  styling.styles.tabletGuestLoginWelcomeTextStyle
                )}>
                {TEXT.registerWelcome}
              </Text>

              <TextInput
                clearButtonMode='always'
                autoCapitalize='words'
                autoCorrect={false}
                style={getStyle(
                  styling.styles.guestLoginTextInputStyle,
                  styling.styles.tabletGuestLoginTextInput
                )}
                multiline={false}
                placeholderTextColor={colors.gray}
                placeholder={TEXT.fullName}
                underlineColorAndroid={colors.trans}
                value={userName}
                onChangeText={setUserName}
                //	borderWidth={1}
              />

              <TextInput
                clearButtonMode='always'
                autoCapitalize='none'
                autoCorrect={true}
                keyboardType={'email-address'}
                style={getStyle(
                  styling.styles.guestLoginTextInputStyle,
                  styling.styles.tabletGuestLoginTextInput
                )}
                multiline={false}
                placeholderTextColor={colors.gray}
                placeholder={TEXT.emailPlaceHolder}
                underlineColorAndroid={colors.trans}
                value={email}
                onChangeText={setEmail}
                secureTextEntry={false}
              />

              <TextInput
                testID={'passwordTextInput'}
                clearButtonMode='always'
                autoCapitalize='none'
                autoCorrect={false}
                style={getStyle(
                  styling.styles.guestLoginTextInputStyle,
                  styling.styles.tabletGuestLoginTextInput
                )}
                multiline={false}
                placeholderTextColor={colors.gray}
                placeholder={TEXT.passwordTxt}
                underlineColorAndroid={colors.trans}
                value={valFromDB}
                secureTextEntry={true}
                onChangeText={setValFromDB}
              />

              <Text style={styling.styles.passwordPolicyTextStyle}>
                {' '}
                {TEXT.passwordPolicy}{' '}
              </Text>

              <View style={styling.styles.companyOptionViewStyle}>
                <TouchableOpacity
                  style={styling.styles.plusTouchableStyle}
                  onPress={() => imCompany()}>
                  <Text style={styling.styles.plusTextStyle}> {plus} </Text>
                </TouchableOpacity>

                <Text style={styling.styles.imCompanyTextStyle}>
                  {' '}
                  {TEXT.company}{' '}
                </Text>
              </View>

              {getCompanyComps()}

              <TouchableOpacity
                style={getStyle(
                  styling.styles.guestLoginEnterViewStyle,
                  styling.styles.tabletGuestLoginEnterViewStyle
                )}
                onPress={() => {
                  register();
                }}>
                <Text
                  style={getStyle(
                    styling.styles.guestLoginEnterTextStyle,
                    styling.styles.tabletGuestLoginEnterTextStyle
                  )}>
                  {TEXT.registerWelcome}
                </Text>
              </TouchableOpacity>

              <Text
                style={getStyle(
                  styling.styles.guestLoginRegisterTextStyle,
                  styling.styles.tabletGuestLoginRegisterTextStyle
                )}
                onPress={() => registerOrLogin()}>
                {TEXT.alreadyRegistered}
                <Text style={{ color: colors.sendButton }}>
                  {TEXT.alreadyRegisteredGold}
                </Text>{' '}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );
};
