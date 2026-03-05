import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import * as styling from '../screens/styling';
import * as colors from '../screens/colors';
import { getTextSize, getStyle } from '../Cortex';

export const Input = ({
  value,
  setValue,
  keyboardType = 'default',
  multiline = false,
}) => (
  <TextInput
    style={[
      getStyle(styles.textInputStyle, styles.tabletTextInputStyle),
      multiline && getStyle(styles.multiline, styles.multilineTablet),
    ]}
    clearButtonMode="always"
    multiline={multiline}
    underlineColorAndroid={colors.trans}
    borderWidth={1}
    autoCorrect={false}
    keyboardType={keyboardType}
    value={value}
    onChangeText={setValue}
  />
);

const styles = StyleSheet.create({
  textInputStyle: {
    height: getTextSize(40),
    fontFamily: styling.numberFont,
    width: '90%',
    fontSize: getTextSize(15),
    color: colors.black,
    textAlignVertical: 'center',
    padding: getTextSize(5),
    margin: getTextSize(10),
    borderColor: colors.gray,
    borderWidth: StyleSheet.hairlineWidth,
  },
  tabletTextInputStyle: {
    height: getTextSize(30),
    fontFamily: styling.numberFont,
    width: '90%',
    fontSize: getTextSize(10),
    color: colors.black,
    textAlignVertical: 'center',
    padding: getTextSize(5),
    margin: getTextSize(5),
    borderColor: colors.gray,
    borderWidth: StyleSheet.hairlineWidth,
  },
  multiline: {
    height: getTextSize(100),
  },
  multilineTablet: {
    height: getTextSize(50),
  },
});
