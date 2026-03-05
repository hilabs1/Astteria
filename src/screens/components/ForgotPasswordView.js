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

export const ForgotPasswordView = ({
  userName,
  setUserName,
  notifyEmail,
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
              keyboardType={'email-address'}
              placeholderTextColor={colors.gray}
              placeholder={TEXT.loginPlaceHolder}
              underlineColorAndroid={colors.trans}
              value={userName}
              onChangeText={(text) => {
                setUserName(text);
              }}
              //	borderWidth={1}
            />

            <TouchableOpacity
              style={getStyle(
                styling.styles.guestLoginEnterViewStyle,
                styling.styles.tabletGuestLoginEnterViewStyle
              )}
              onPress={() => {
                notifyEmail();
              }}>
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
