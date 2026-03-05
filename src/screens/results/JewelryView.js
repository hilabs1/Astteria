import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { isTablet, writeToClipboard, TEXT, getDollarSign } from '../../Cortex';
import * as strings from '../strings';
import { itemViewStyle, jewelryViewStyle } from './styling';
import { scratchedPriceView, defaultDiamond, gemIcon } from './Cortex';

import { isValid, isTextEqual } from '../../strings/stringManipulation';
let DATA = {};
let KEY;

const firstColumn = (DATA) => [
	{ label: TEXT.totalWeightDisplay, value: DATA[strings.weight] },
	{ label: TEXT.Shape, value: DATA[strings.Shape] },
	{ label: TEXT.lab, value: DATA[strings.lab] },
	{ label: TEXT.price, value: DATA.PRICE },
	{ label: strings.sku, value: DATA[strings.lotId] }
];

const Table = ({ showDetails }) => {
	return <View style ={itemViewStyle.tableStyle} >
		<Column rowArr = {firstColumn(DATA)} />
		<PictureBox />
	</View>;
};

const Discount = ({ isJewelryView }) => {
	if (isTextEqual(DATA[strings.availability], strings.consumed)) return null;

	let price = null;
	let beforeDiscount = '';
	const space = isTablet ? ' ' : '\n';

	if (DATA.PRICE == strings.callForPrice) {
		price = strings.callForPrice;
	} else {
		if (!DATA.PRICE[0] || DATA.PRICE[0] == 0 || DATA.PRICE[0] == DATA.PRICE[1]) {
			price = getDollarSign(DATA.PRICE[1]);
		} else {
			price = `${space}${getDollarSign(DATA.PRICE[0])}`;
			beforeDiscount = scratchedPriceView(DATA.PRICE[1]);
		}
	}
	return isTablet
		? <Text style={itemViewStyle.jewelryDetailText}>{beforeDiscount}{price}</Text>
		: <Text style={jewelryViewStyle.priceTextStyle}>{beforeDiscount}{price}</Text>;
};

const Column = ({ rowArr }) => (
	<View style = {itemViewStyle.columnStyle}>
		{rowArr.map((row, i) =>
			!!row && <Row key = {`${KEY}${i}`}
				label = {row.label}
				value = {row.value} />
		)}
	</View>
);

const Row = ({ label, value }) => (
	<View style={itemViewStyle.rowStyle} >
		<Text style={itemViewStyle.labelStyle}>{label}</Text>
		{isTextEqual(label, TEXT.price)
			? <Discount isJewelryView = {false} />
			: <Text style={itemViewStyle.detailTextStyle}>{value}</Text>}
	</View>
);

const Title = () => {
	return isTablet
		? <Text style={itemViewStyle.jewelryTitleStyle}
			onPress = {() => writeToClipboard(DATA.TITLE)}>{DATA.TITLE}</Text>

		: <View style={jewelryViewStyle.titleViewStyle}>
			<Text style={itemViewStyle.titleTextStyle}
				onPress = {() => writeToClipboard(DATA.TITLE)} >{DATA.TITLE}</Text>
		</View>;
};

const IDRow = () => (
	<View style ={itemViewStyle.jewelryEntryRow} >
		<Text style={itemViewStyle.jewelryDetailText}>{DATA[strings.lotId]}</Text>
		{DATA[strings.certificateId] != DATA[strings.lotId]
			&& isValid(DATA[strings.certificateId])
			&& <Text style={itemViewStyle.jewelryDetailText}>, {DATA[strings.certificateId]}</Text>}
	</View>
);

const TabletView = ({ showDetails }) => (
	<View style = {itemViewStyle.jewelryShadowBox}>
		<View style = {itemViewStyle.jewelryViewStyle} >
			<TouchableOpacity
				onPress = {showDetails}>

				<PictureBox />

				<Title />

				<IDRow />

				{DATA.PRICE != strings.callForPrice
					&& <View style = {itemViewStyle.jewelryEntryRow}>
						<Discount isJewelryView = {true}/></View>}

			</TouchableOpacity>
		</View>

	</View>
);

const getImage = () => {
	if (DATA.IMG[0] && isValid(DATA.IMG[0])) {
		return { uri: DATA.IMG[0], resizeMode: 'contain' };
	}
	return gemIcon[DATA[strings.gemType]] || defaultDiamond;
};

const PictureBox = () => (
	<View style={itemViewStyle.pictureBox} >
		<Image style = {{ height: '100%', width: '100%' }}
			source = {getImage()}
			resizeMode={'center'}></Image>
	</View>
);

export const JewelryView = ({ key, data, navigation, showDetails }) => {
	DATA = data;
	KEY = key;
	return isTablet
		? <TabletView showDetails = {() => showDetails('jewelryItemDetails', false)}/>
		: <View style = {itemViewStyle.shadowBox}>
			<TouchableOpacity onPress = {() => showDetails('jewelryItemDetails', false)} >
				<View style={itemViewStyle.viewStyle}>

					<Title />

					<Table showDetails = {() => showDetails('jewelryItemDetails', true)}/>

				</View>
			</TouchableOpacity>
		</View>;
};
