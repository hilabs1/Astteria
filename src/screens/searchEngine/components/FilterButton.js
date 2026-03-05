import React from 'react';
import { TouchableWithoutFeedback, View, Text } from 'react-native';
import { buttons } from '../styling.js';
import PropTypes from 'prop-types';

export const FilterButton = props => (
	<TouchableWithoutFeedback
		onPress={props.onPress}>
		<View style={buttons.filterButton}
			flex={props.flex || 1}
			backgroundColor={props.isChosen}>
			<Text textAlign={'center'}
				style={props.textStyle}>{props.text}</Text>
		</View>
	</TouchableWithoutFeedback>
);

FilterButton.propTypes = {
	onPress: PropTypes.func,
	isChosen: PropTypes.string,
	textStyle: PropTypes.object,
	text: PropTypes.string,
	flex: PropTypes.number || PropTypes.null
};
