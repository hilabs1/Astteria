import React, { Component } from 'react';
import { all } from './strings';
import { jewelryTypeTableObj } from './searchEngine/filterObject';
import { ImageRow } from './searchEngine/components/ImageTable';
import { dev, pull } from '../Cortex';

let choiceArr = [];

export default class JewelryType extends Component {
	constructor (props) {
		super(props);
		this.state =
		{
			...jewelryTypeTableObj,
			showClearButton: 0
		};
	}

	componentWillUnmount () {
		this.clearAll();
	}

	submit (ansArr) {
		this.props.stateHandler(jewelryTypeTableObj.stateName, ansArr);
	}

	getChoiceArr (isChosen, name) {
		let ansArr = [];
		const isNecklace = name === 2;
		// dev('JewelryType', 'getChoiceArr:', `isNecklace: ${isNecklace} isChosen: ${isChosen} `);
		name = jewelryTypeTableObj.stringArr[name];
		// dev('JewelryType', 'getChoiceArr:', `name: ${name}`);
		if (isChosen) {
			if (!choiceArr.includes(name)) {
				choiceArr.push(name);
				dev('JewelryType', 'getChoiceArr: after push: choiceArr:', `${choiceArr}`);
				isNecklace && choiceArr.push(jewelryTypeTableObj.stringArr[4]);
				dev('JewelryType', 'getChoiceArr: after isNecklace: choiceArr: ', `${choiceArr}`);
			}
		} else {
			choiceArr = pull(choiceArr, name);
			dev('JewelryType', 'getChoiceArr: pull: ', `${choiceArr}`);
		}

		choiceArr.length === 0
			? ansArr = [all]
			: ansArr = choiceArr;

		dev('JewelryType', 'getChoiceArr', ansArr);
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
		choiceArr = [];
		this.setState({
			showClearButton: 0,
			buttons: jewelryTypeTableObj.buttons
		}, () => this.submit([all]));
	};

	render () {
		return <ImageRow
			clearAll = {this.clearAll}
			tableObjects = {this.state}
			buttonClick = {(key, borderColor, text) => this.clickButton(key, borderColor, text)} />;
	}
}
