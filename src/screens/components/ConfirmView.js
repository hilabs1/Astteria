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

export const ConfirmView = ({
  authenticationCode,
  confirmSignUp,
  setAuthenticationCode,
  confirmLater,
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
              placeholderTextColor={colors.labelColor}
              placeholder={TEXT.enterConfCode}
              onChangeText={(text) => {
                setAuthenticationCode(text);
              }}
              //	borderWidth={1}
            />

            <TouchableOpacity
              style={getStyle(
                styling.styles.guestLoginEnterViewStyle,
                styling.styles.tabletGuestLoginEnterViewStyle
              )}
              onPress={() => confirmSignUp()}>
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
              onPress={() => confirmLater()}>
              {TEXT.confirmLater}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};
