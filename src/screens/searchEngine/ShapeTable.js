import React, { Component } from 'react';
import { all } from '../strings';
import { ImageTable } from './components/ImageTable';
import PropTypes from 'prop-types';
import { TEXT, pull } from '../../Cortex';

import { imageTableObj } from './filterObject';

let choiceArr = [];

export default class ShapeTable extends Component {
	constructor (props) {
		super(props);
		this.clearAll = this.clearAll.bind(this);
		this.state = {
			...imageTableObj,
			showClearButton: 0

		};
	}

	componentWillUnmount () {
		this.clearAll();
	}

	submit (ansArr) {
		this.props.stateHandler(imageTableObj.stateName, ansArr);
	}

	getChoiceArr (isChosen, name) {
		let ansArr = [];
		name = imageTableObj.stringArr[name];
		isChosen
			? !choiceArr.includes(name) && choiceArr.push(name)
			: choiceArr = pull(choiceArr, name);

		choiceArr.length === 0
			? ansArr = [all]
			: ansArr = choiceArr;

		this.submit(ansArr);
	}

	clickButton (key, borderColor, name) {
		const isChosen = 1 - borderColor;
		if (key === 10) {
			this.setState({
				other: { key: 10, text: TEXT.other, isChosen: isChosen },
				showClearButton: isChosen ? this.state.showClearButton + 1 : this.state.showClearButton - 1
			}, () => this.getChoiceArr(isChosen, key));
		} else {
			this.setState({
				showClearButton: isChosen ? this.state.showClearButton + 1 : this.state.showClearButton - 1,
				buttons: this.state.buttons.map(button => {
					return button.key === key
						? { key: key, text: button.text, isChosen: isChosen, image: button.image }
						: button;
				})
			}, () => this.getChoiceArr(isChosen, key));
		}
	};

	clearAll () {
		choiceArr = [];
		this.setState({
			showClearButton: 0,
			buttons: imageTableObj.buttons,
			other: imageTableObj.other
		}, () => this.submit([all]));
	}

	render () {
		return <ImageTable
			clearAll = {this.clearAll}
			tableObjects = {this.state}
			buttonClick = {(key, borderColor, text) => this.clickButton(key, borderColor, text)} />;
	}
};

ShapeTable.propTypes = {
	stateHandler: PropTypes.func
};
