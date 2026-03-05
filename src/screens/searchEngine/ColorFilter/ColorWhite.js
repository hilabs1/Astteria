import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import ScrollFilter from '../components/ScrollFilter';

import { colorTable } from '../styling';

import { whiteColors } from '../filterObject';

export default class ColorWhite extends Component {
	/**
	 * [constructor]
	 * @param  <T> props [props passed from parent component
	 *                   action: refers to colorTable's prop from stateHandler() from its parent (grandparent)]
	 *                   clear: refers to parent's showClearAll()]
	 *
	 *         String [] whites: array of state names
	 *
	 *         states: each color button is associated with a color state which indicates if it was chosen
	 *         		   colors.filterButtonGray: when button was not chosen
	 *         		   colors.blueButton: whenn button was pressed
					   [strings.clearAllButton] -> state of the x button, default is null, meaning, invisible
					   min && max -> keep track of scale

	 * @return void      [description]
	 */
	constructor (props) {
		super(props);

		this.state =
		{
			...whiteColors
		};
	};

	componentDidMount () {
		// dev('ColorWhite', 'componentDidMount', JSON.stringify(this.state));
	}

	reset () {
		this.setState({
			...whiteColors
		});
		this.ScrollFilter.clearAll();
	}

	render () {
		return (
			<View style = {colorTable.whiteRowViewStyle}>
				<ScrollFilter
					name = {whiteColors.name}
					stateName = {whiteColors.stateName}
					stringArr = {whiteColors.stringArr}
					scrollViewStyle = {whiteColors.scrollViewStyle}
					scrollEnabled = {whiteColors.scrollEnabled}
					isRange = {whiteColors.isRange}
					range = {this.state.range}
					showClearButton = {this.props.showClearButton}
					buttons = {this.state.buttons}
					stateHandler = {this.props.stateHandler}
					toggleClear = {number => this.props.showClearAll(number)}
					isColor = {'white'}
					ref = {ScrollFilter => { this.ScrollFilter = ScrollFilter; }}
				/>
			</View>

		);
	}
}

ColorWhite.propTypes = {
	showClearButton: PropTypes.number,
	stateHandler: PropTypes.func,
	showClearAll: PropTypes.func
};
