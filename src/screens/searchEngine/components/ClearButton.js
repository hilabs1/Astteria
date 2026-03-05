import React from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import { buttons, views } from '../styling.js';
import PropTypes from 'prop-types';

export const ClearButton = props => (
	<TouchableOpacity
		style={buttons.cancelTouchableStyle}
		onPress = {props.onPress} >
		<Image source ={require('./pics/delete.png')}
			style = {buttons.cancelImageStyle} ></Image>

	</TouchableOpacity>
);

export const ClearButtonView = ({ showClearButton, title, clearAll }) => (
	<View style ={views.filterTitleViewStyle} >

		<Text style={views.filterTitleStyle}>{title.toUpperCase()}</Text>

		{!!showClearButton && <ClearButton onPress = {() => clearAll()}/>}

	</View>
);

ClearButton.propTypes = {
	onPress: PropTypes.func
};

ClearButtonView.propTypes = {
	showClearButton: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.number]),
	text: PropTypes.string,
	clearAll: PropTypes.func
};
