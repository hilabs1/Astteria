import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import * as strings from '../strings';
import { views, price, weight } from './styling.js';
import { ClearButtonView } from './components/ClearButton';
import { TextInputFilter } from './components/TextInputFilter';
import { TEXT } from '../../Cortex';
import PropTypes from 'prop-types';

export default class AgeFilter extends Component {
	constructor (props) {
		super(props);
		this.state = {
			showClearButton: false,
			from: '',
			to: ''
		};
	}

	changeInputFrom (age) {
		this.setState({
			from: age || '',
			showClearButton: !!age || !!this.state.to
		}, () => this.submit());
	}

	changeInputTo (age) {
		this.setState({
			to: age || '',
			showClearButton: !!age || !!this.state.from
		}, () => this.submit());
	}

	/**
	 * [submit triggered by clearAll() & changeInput()()
	 * 		creates an array of chosen shapes and send to parent component]
	 * @return void [description]
	 */
	submit () {
		const [from, to] = [parseFloat(this.state.from) || 0, parseFloat(this.state.to) || 1000];
		const choiceArray = from > to
			? [to, from]
			: [from, to];

		this.props.stateHandler(strings.ageRangeState, choiceArray);
	}

	/**
	 * [clearAll triggered when user presses x button
	 * 		handles clearing user's selection]
	 * @return void [description]
	 */
	clearAll () {
		this.setState({
			showClearButton: false,
			from: '',
			to: ''
		}, () => this.submit());
	}

	render () {
		return (<TouchableWithoutFeedback style = {views.shadowBox}
			onPress = {() => Keyboard.dismiss()}>

			<View style={views.shadowBox}>

				<ClearButtonView
					showClearButton={this.state.showClearButton}
					title={TEXT.age}
					clearAll={() => this.clearAll()}/>

				<View style={views.viewStyle}>

					<View style={views.rowStyle}>

						<TextInputFilter
							style={weight.textInputStyle}
							placeholder={strings.ZERO}
							value={this.state.from}
							keyboardType='numeric'
							onChangeText={text => this.changeInputFrom(text)}/>

						<Text style={price.textToStyle}>{TEXT.to}</Text>

						<TextInputFilter
							style={weight.textInputStyle}
							placeholder={strings.K}
							value={this.state.to}
							keyboardType='numeric'
							onChangeText={text => this.changeInputTo(text)}/>

					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
		);
	}
};

AgeFilter.propTypes = {
	stateHandler: PropTypes.func
};
