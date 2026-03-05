import React from 'react';
import {
  TouchableWithoutFeedback,
  ImageBackground,
  Keyboard,
  StatusBar,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { TABLET, getStyle, TEXT } from '../../Cortex';
import * as styling from '../styling';
import * as colors from '../colors';

const backgroundImage = TABLET
  ? require('../../assets/pics/launchBackgroundTablet.jpg')
  : require('../../assets/pics/launchBackground.jpg');

export const LoginView = ({
  userName,
  setUserName,
  passwordInput,
  setPasswordInput,
  login,
  continueAsGuest,
  registerOrLogin,
  forgotPassword,
}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <ImageBackground
      style={styling.styles.guestLoginImageBackgroundStyle}
      resizeMode="stretch"
      source={backgroundImage}>
      <StatusBar hidden={true} />

      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View
          testID={'passwordView'}
          style={styling.styles.guestLoginViewStyle}>
          <Text
            style={getStyle(
              styling.styles.guestloginWelcomeTextStyle,
              styling.styles.tabletGuestLoginWelcomeTextStyle
            )}>
            {TEXT.welcome}
          </Text>
          <TextInput
            clearButtonMode="always"
            autoCapitalize="none"
            autoCorrect={false}
            style={getStyle(
              styling.styles.guestLoginTextInputStyle,
              styling.styles.tabletGuestLoginTextInput
            )}
            multiline={false}
            keyboardType={'email-address'}
            placeholderTextColor={colors.gray}
            placeholder={TEXT.loginPlaceHolder}
            underlineColorAndroid={colors.trans}
            value={userName}
            onChangeText={setUserName}
          />

          <TextInput
            clearButtonMode="always"
            autoCapitalize="none"
            autoCorrect={false}
            style={getStyle(
              styling.styles.guestLoginTextInputStyle,
              styling.styles.tabletGuestLoginTextInput
            )}
            multiline={false}
            placeholderTextColor={colors.gray}
            placeholder={TEXT.passwordTxt}
            underlineColorAndroid={colors.trans}
            value={passwordInput} //{this.state.valFromDB}
            secureTextEntry={true}
            onChangeText={setPasswordInput}
          />
          <TouchableOpacity
            style={getStyle(
              styling.styles.guestLoginEnterViewStyle,
              styling.styles.tabletGuestLoginEnterViewStyle
            )}
            onPress={login}>
            <Text
              style={getStyle(
                styling.styles.guestLoginEnterTextStyle,
                styling.styles.tabletGuestLoginEnterTextStyle
              )}>
              {TEXT.enter}
            </Text>
          </TouchableOpacity>

          <Text
            style={getStyle(
              styling.styles.guestLoginContinueAsGuestTextStyle,
              styling.styles.tabletGuestLoginContinueAsGuestTextStyle
            )}
            onPress={continueAsGuest}>
            {TEXT.continueAsGuest}
          </Text>

          <Text
            style={getStyle(
              styling.styles.guestLoginRegisterTextStyle,
              styling.styles.tabletGuestLoginRegisterTextStyle
            )}
            onPress={registerOrLogin}>
            {TEXT.register}{' '}
            <Text style={{ color: colors.sendButton }}>
              {TEXT.registerWelcome}
            </Text>{' '}
          </Text>

          <Text
            style={getStyle(
              styling.styles.guestLoginForgotPassTextStyle,
              styling.styles.tabletGuestLoginForgotPassTextStyle
            )}
            onPress={() => forgotPassword()}>
            {TEXT.forgotPassword}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  </TouchableWithoutFeedback>
);
