import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';

import * as strings from '../../strings';
import * as colors from '../../colors';
import { views, filterViews, colorTable, buttons } from '../styling';
import ColorWhite from './ColorWhite';
import FancyColor from './FancyColor';
import { ClearButtonView } from '../components/ClearButton';
import PropTypes from 'prop-types';

import { TEXT } from '../../../Cortex';

const textStyles = [filterViews.filterWhiteTextStyle, filterViews.filterBlacktextStyle];
const buttonStyles = [colors.blueButton, colors.trans];

const RadioButton = props => (
	<TouchableWithoutFeedback
		onPress={() => props.toggle()}>
		<View style = {buttons.radioButton}
			backgroundColor={buttonStyles[props.state]}>
			<Text style={textStyles[props.state]}>{props.text}</Text>
		</View>
	</TouchableWithoutFeedback>);

export default class ColorTable extends Component {
/**
 * [constructor ]
 * @param  <T> props [props passed from parent component
 *                   action: refers to parent's stateHandler()]
 *
 *         states: [stringa.white] && [strings.fancy] -> state of the two color buttons
 *         												 blue: selected (default color of white color button)
 *         												 trans: unselected (default color of fancy color button)
 *
 *         		       whiteText && fancyText -> state of the text color of chosen buttn
 *         		    						  white: default text color of white color button
 *         		    						  black: default text color of fancy color button)

					viewType -> depending on user's selection, shows white colot filter || fancy color filters
								default: white color

 * @return void      [description]
 */
	constructor (props) {
		super(props);
		this.state = {
			colorState: [0, 1],
			showClearButton: 0
		};
	}

	componentDidMount () {
		// dev('ColorTable', 'componentDidMount', JSON.stringify(this.state));
	}

	toggleButton (button) {
		this.setState({
			colorState: button,
			showClearButton: 0
		}, () => this.submit());
	}

	/**
	 * [submit triggered by buttonPressed()
	 * 		creates an array of chosen color and send to parent
	 * 		trigers parents' stateHndles() ]
	 * @return void [description]
	 */
	submit () {
		var choiceArray = [];
		this.state.colorState[0] === 0
			? choiceArray[0] = strings.white
			: choiceArray[0] = strings.fancy;

		this.props.stateHandler(strings.colorState, choiceArray);
	}

	/**
	 * [clearAll triggered when user presses x button
	 * 		handles clearing user's selection]
	 * @return void [description]
	 */
	clearAll () {
		this.state.colorState[0] === 0
			? this.ColorWhite.reset()
			: this.FancyColor.reset();

		this.setState({
			colorState: [0, 1],
			showClearButton: 0
		}, () => this.submit());
	}

	showClearAll (number) {
		this.setState({
			showClearButton: number
		});
	}

	render () {
		return (
			<View style={colorTable.shadowBox}>

				<ClearButtonView
					showClearButton={this.state.showClearButton}
					title={TEXT.color}
					clearAll={() => this.clearAll()}/>

				<View style={this.state.colorState[0] === 0 ? colorTable.whiteViewStyle : colorTable.fancyViewStyle}>

					<View style={views.rowStyle}>

						<RadioButton
							toggle = {() => this.toggleButton([0, 1])}
							state = {this.state.colorState[0]}
							text = {TEXT.white}/>

						<RadioButton
							toggle = {() => this.toggleButton([1, 0])}
							state = {this.state.colorState[1]}
							text = {TEXT.fancy}/>
					</View>

					{this.state.colorState[0] === 0
						? <ColorWhite stateHandler = {this.props.stateHandler}
							ref = {ColorWhite => { this.ColorWhite = ColorWhite; }}
							showClearAll = { number => this.showClearAll(number)}/>
						: <FancyColor stateHandler = {this.props.stateHandler}
							ref = {FancyColor => { this.FancyColor = FancyColor; }}
							showClearAll = {number => this.showClearAll(number)}/>
					}
				</View>
			</View>);
	}
}

ColorTable.propTypes = {
	stateHandler: PropTypes.func
};

RadioButton.propTypes = {
	toggle: PropTypes.func,
	state: PropTypes.number,
	text: PropTypes.string
};
