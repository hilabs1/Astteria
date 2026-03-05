import React from 'react';
import { TextInput } from 'react-native';
import * as colors from '../../colors';

export const TextInputFilter = ({ placeholder, value, onChangeText, style, keyboardType = 'default', ...rest }) => (
	<TextInput
		style={style}
		multiline={false}
		maxLength={10}
		placeholderTextColor={colors.gray}
		placeholder={placeholder}
		underlineColorAndroid= {colors.trans}
		keyboardType={keyboardType}
		value= {value}
		onChangeText={text => onChangeText(text)}
		{...rest} />
);
