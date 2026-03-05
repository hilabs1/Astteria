import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import * as strings from '../strings';
import { views, bashariLocation } from './styling.js';
import { ClearButtonView } from './components/ClearButton';
import { TextInputFilter } from './components/TextInputFilter';
import { TEXT } from '../../Cortex';
import PropTypes from 'prop-types';

export default class BashariLocation extends Component {
	constructor (props) {
		super(props);
		this.state = {
			showClearButton: false,
			[strings.bashariLocation]: ''
		};
	}

	changeInput (bashariLocation) {
		this.setState({
			[strings.bashariLocation]: bashariLocation,
			showClearButton: !!bashariLocation
		}, () => this.submit());
	}

	/**
	 * [submit triggered by clearAll() & changeInput()()
	 * 		creates an array of chosen shapes and send to parent component]
	 * @return void [description]
	 */
	submit () {
		this.props.stateHandler(strings.bashariLocationState, this.state[strings.bashariLocation]);
	}

	/**
	 * [clearAll triggered when user presses x button
	 * 		handles clearing user's selection]
	 * @return void [description]
	 */
	clearAll () {
		this.setState({
			showClearButton: false,
			[strings.bashariLocation]: ''
		}, () => this.submit());
	}

	render () {
		return (<TouchableWithoutFeedback style = {views.shadowBox}
			onPress = {() => Keyboard.dismiss()}>

			<View style={views.shadowBox}>

				<ClearButtonView
					showClearButton={this.state.showClearButton}
					title={TEXT.bashariLocation}
					clearAll={() => this.clearAll()}/>

				<View style={views.viewStyle}>

					<TextInputFilter
						style={bashariLocation.textInputStyle}
						placeholder={strings.bashariLocation}
						value={this.state[strings.bashariLocation]}
						onChangeText={text => this.changeInput(text)}
						autoCapitalize={'none'}
						autoCorrect={false}
					/>
				</View>
			</View>
		</TouchableWithoutFeedback>
		);
	}
};

BashariLocation.propTypes = {
	stateHandler: PropTypes.func
};
