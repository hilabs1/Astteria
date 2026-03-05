import React from 'react';
import { TouchableWithoutFeedback, View, Image, Text } from 'react-native';
import { ImageTableStyle, views, ImageRowStyle } from '../styling';
import * as colors from '../../colors';
import { isTablet } from '../../../Cortex';
import { ClearButton } from './ClearButton';
import PropTypes from 'prop-types';

const ImageWithText = ({ id, image, text, borderColor, clickButton, styling }) => (
	<TouchableWithoutFeedback
		onPress = {() => clickButton(id, borderColor, text)}>
		<View style={styling || ImageTableStyle.innerViewStyle}
			borderColor={borderColor ? colors.gray : colors.trans}>
			{image && <Image
				style={ImageTableStyle.imageStyle}
				source={image} ></Image>}
			<Text style={ImageTableStyle.textStyle}>{text}</Text>
		</View>
	</TouchableWithoutFeedback>
);

const Row = (buttons, buttonClick, style = null) => (
	<View style = {ImageTableStyle.tableStyle} >
		{buttons.map(button => (
			<ImageWithText
				key = {button.key}
				id = {button.key}
				image = {button.image}
				text = {button.text}
				borderColor = {button.isChosen}
				clickButton = {buttonClick}
				styling = {style} />
		))}
	</View>
);

const phoneView = (row, row1, buttonClick) => (
	<View>
		{Row(row, buttonClick)}
		{Row(row1, buttonClick)}
	</View>
);

/**
 * [titleView triggered by render
 * 		handles viewing a view with or without the x button depending
 * 		on what's in this.state[strings.clearAllButton]]
 * @return void [description]
 */
const titleView = (name, showClearButton, clearAll) => (
	<View style ={views.filterTitleViewStyle}>

		<Text style={views.filterTitleStyle}>{name}</Text>

		{showClearButton !== 0 && <ClearButton onPress = {() => clearAll()}/>}

	</View>
);

export const ImageTable = ({ tableObjects: { buttons, name, other, showClearButton }, buttonClick, clearAll }) => (
	<View style = {ImageTableStyle.shadowBox} >

		{titleView(name, showClearButton, clearAll)}
		<View style={ImageTableStyle.viewStyle}>
			{isTablet || buttons[0].length === 4
				? Row(buttons, buttonClick)
				: phoneView(buttons.slice(0, 5), buttons.slice(5, buttons.length), buttonClick)}
			<ImageWithText
				id = {other.key}
				text = {other.text}
				borderColor = {other.isChosen}
				clickButton = {buttonClick}/>
		</View>
	</View>

);

export const ImageRow = ({ tableObjects: { buttons, name, showClearButton, style }, buttonClick, clearAll }) => (
	<View style = {ImageRowStyle.shadowBox} >

		{titleView(name, showClearButton, clearAll)}
		<View style={ImageRowStyle.viewStyle}>
			{Row(buttons, buttonClick, style)}
		</View>
	</View>
);

ImageTable.propTypes = {
	tableObjects: PropTypes.object,
	buttons: PropTypes.array,
	showClearButton: PropTypes.number,
	buttonClick: PropTypes.func,
	clearAll: PropTypes.func
};

ImageWithText.propTypes = {
	id: PropTypes.number,
	borderColor: PropTypes.number,
	image: PropTypes.number,
	text: PropTypes.string,
	clickButton: PropTypes.func,
	styling: PropTypes.object
};
