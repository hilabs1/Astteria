import React, { Component } from 'react';

import { all } from './strings';
import { gemTypeTableObj } from './searchEngine/filterObject';
import { ImageRow } from './searchEngine/components/ImageTable';
//
import { dev, pull } from '../Cortex';

let choiceArr = [];

export default class GemType extends Component {
	constructor (props) {
		super(props);
		this.state =
		{
			...gemTypeTableObj,
			showClearButton: 0
		};
	}

	submit (ansArr) {
		this.props.stateHandler(gemTypeTableObj.stateName, ansArr);
	}

	componentWillUnmount () {
		this.clearAll();
	}

	getChoiceArr (isChosen, name) {
		let ansArr = [];
		name = gemTypeTableObj.stringArr[name];
		isChosen
			? !choiceArr.includes(name) && choiceArr.push(name)
			: choiceArr = pull(choiceArr, name);

		choiceArr.length === 0
			? ansArr = [all]
			: ansArr = choiceArr;

		dev(ansArr);
		this.submit(ansArr);
	}

	clickButton (key, borderColor, name) {
		const isChosen = 1 - borderColor;
		this.setState({
			showClearButton: isChosen ? this.state.showClearButton + 1 : this.state.showClearButton - 1,
			buttons: this.state.buttons.map(button => {
				return button.key === key
					? { key: key, text: button.text, isChosen: isChosen, image: button.image }
					: button;
			})
		}, () => {
			this.getChoiceArr(isChosen, key);
		});
	};

	clearAll = () => {
		this.setState({
			showClearButton: 0,
			buttons: gemTypeTableObj.buttons
		}, () => this.submit([all]));
	};

	render () {
		return <ImageRow
			clearAll = {this.clearAll}
			tableObjects = {this.state}
			buttonClick = {(key, borderColor, text) => this.clickButton(key, borderColor, text)} />;
	}
}
