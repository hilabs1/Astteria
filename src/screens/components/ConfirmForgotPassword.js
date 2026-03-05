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
} from 'react-native';
import { TABLET, getStyle, TEXT } from '../../Cortex';
import * as styling from '../styling';
import * as colors from '../colors';
import { LOGIN } from '../../constants/login';

const backgroundImage = TABLET
  ? require('../../assets/pics/launchBackgroundTablet.jpg')
  : require('../../assets/pics/launchBackground.jpg');

export const ConfirmForgotPassword = ({
  authenticationCode,
  setAuthenticationCode,
  valFromDB,
  setValFromDB,
  confirmEmail,
  setView,
}) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ImageBackground
        style={styling.styles.guestLoginConfirmImageBackgroundStyle}
        resizeMode='stretch'
        source={backgroundImage}>
        <StatusBar hidden={true} />

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View
            testID={'passwordView'}
            style={styling.styles.guestLoginConfirmView}>
            <TextInput
              clearButtonMode='always'
              autoCapitalize='none'
              autoCorrect={false}
              style={getStyle(
                styling.styles.guestLoginTextInputStyle,
                styling.styles.tabletGuestLoginTextInput
              )}
              multiline={false}
              underlineColorAndroid={colors.trans}
              value={authenticationCode}
              placeholderTextColor={colors.gray}
              placeholder={TEXT.enterConfCode}
              onChangeText={(text) => {
                setAuthenticationCode(text);
              }}
              //	borderWidth={1}
            />

            <TextInput
              clearButtonMode='always'
              autoCapitalize='none'
              autoCorrect={false}
              style={getStyle(
                styling.styles.guestLoginTextInputStyle,
                styling.styles.tabletGuestLoginTextInput
              )}
              multiline={false}
              placeholderTextColor={colors.gray}
              placeholder={TEXT.newPassword}
              underlineColorAndroid={colors.trans}
              value={valFromDB}
              secureTextEntry={true}
              onChangeText={(text) => setValFromDB(text)}
            />

            <Text style={styling.styles.passwordPolicyTextStyle}>
              {' '}
              {TEXT.passwordPolicy}{' '}
            </Text>

            <TouchableOpacity
              style={getStyle(
                styling.styles.guestLoginEnterViewStyle,
                styling.styles.tabletGuestLoginEnterViewStyle
              )}
              onPress={() => confirmEmail()}>
              <Text
                style={getStyle(
                  styling.styles.guestLoginConfirmTextStyle,
                  styling.styles.tabletGuestLoginConfirmTextStyle
                )}>
                {TEXT.confirm}
              </Text>
            </TouchableOpacity>

            <Text
              style={getStyle(
                styling.styles.guestLoginForgotPassTextStyle,
                styling.styles.tabletGuestLoginForgotPassTextStyle
              )}
              onPress={() => setView(LOGIN.loginView)}>
              {TEXT.cancelForgotPassword}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};
