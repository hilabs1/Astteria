import * as strings from '../strings';
import React from 'react';
import { TouchableWithoutFeedback, View, Text } from 'react-native';
import { TEXT } from '../../../Cortex';
import { buttons, views } from '../styling.js';

export const RadioButton = props =>
	<View style={views.rowStyle}>
		<TouchableWithoutFeedback
			onPress={() => props.buttonPressed(strings.white)}>
			<View style = {buttons.radioButton}
				backgroundColor={this.state[strings.white]}>
				<Text style={this.state.whiteText}>{TEXT.white}
				</Text>
			</View>
		</TouchableWithoutFeedback>

		<TouchableWithoutFeedback
			onPress={() => this.buttonPressed(strings.fancy)}>
			<View style = {buttons.radioButton}
				backgroundColor={this.state[strings.fancy]}>
				<Text style={this.state.fancyText}>{TEXT.fancy}</Text>
			</View>
		</TouchableWithoutFeedback>
	</View>;
