import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { isTablet, getVal, writeToClipboard, ACCESS, TEXT, getDollarSign } from '../../Cortex';
import { fromSearchBar } from '../searchEngine/Cortex';
import * as strings from '../strings';
import { itemViewStyle } from './styling';
import { scratchedPriceView, shapeIcon, defaultDiamond } from './Cortex';

import { isValid, isTextEqual } from '../../strings/stringManipulation';
let DATA = {};
let KEY;

const firstColumn = (DATA) => [
	isValid(DATA[strings.cut]) && { label: TEXT.cut, value: DATA[strings.cut] },
	{ label: TEXT.polish, value: DATA[strings.polish] },
	{ label: TEXT.symm, value: DATA[strings.symmetry] },
	{ label: TEXT.fluorDisplay, value: DATA[strings.fluorescenceColorIntensity] }
];

const secondColumn = (DATA) => [
	{ label: TEXT.mmDisplay, value: DATA[strings.measurements] },
	{ label: strings.sku, value: DATA[strings.lotId] },
	isValid(DATA[strings.certificateId])
		&& !isTextEqual(DATA[strings.lotId], DATA[strings.certificateId])
		&& { label: TEXT.certDisplay, value: DATA[strings.certificateId] }
];

const Table = ({ showDetails }) => {
	return <View style ={itemViewStyle.tableStyle} >
		{isTablet
			? <View style={{ flexDirection: 'row', width: '65%', justifyContent: 'flex-start' }} >
				<Column rowArr = {firstColumn(DATA)} />
				<Column rowArr = {secondColumn(DATA)} />
			</View>
			: <Column rowArr = {[...firstColumn(DATA), ...secondColumn(DATA)]} />
		}
		{DATA.PRICE != strings.callForPrice
			? <PriceBox />
			: <CallForPrice showDetails={showDetails} />}
	</View>;
};

const PriceBox = () => (

	!isTextEqual(DATA[strings.availability], strings.consumed)
		&& <View style={itemViewStyle.priceBoxStyle} >

			<View style={itemViewStyle.priceWhiteBox} >

				<Text style={itemViewStyle.priceLabelStyle} >{TEXT.ppc}</Text>

				<Text style={itemViewStyle.priceTextStyle} >{getDollarSign(DATA[strings.ppc])}</Text>
			</View>

			<View style={itemViewStyle.priceWhiteBox} >

				<Text style={itemViewStyle.priceLabelStyle} >{getVal(strings.totalPrice)}</Text>

				<Discount isJewelryView = {false} />

			</View>

			{isValid(DATA[strings.color])
				&& !isTextEqual(ACCESS, strings.continueAsGuest)
				&& DATA.RAP_BELOW !== 0
				&& isValid(DATA.RAP_BELOW)
				&& <View style = {itemViewStyle.priceWhiteBox} >

					<Text style={itemViewStyle.priceLabelStyle}>{strings.rap}%</Text>

					<Text style={itemViewStyle.priceTextStyle}>{DATA.RAP_BELOW}</Text>

				</View>}
		</View>
);

const Discount = ({ isJewelryView }) => {
	let price = null;
	let beforeDiscount = '';
	const space = isTablet && !isJewelryView ? '\n' : ' ';

	if (!DATA.PRICE[0] || DATA.PRICE[0] == 0 || DATA.PRICE[0] == DATA.PRICE[1]) {
		price = getDollarSign(DATA.PRICE[1]);
	} else {
		price = `${space}${getDollarSign(DATA.PRICE[0])}`;
		beforeDiscount = scratchedPriceView(DATA.PRICE[1]);
	}
	return isJewelryView
		? <Text style={itemViewStyle.jewelryDetailText}>{beforeDiscount}{price}</Text>
		: <Text style={itemViewStyle.priceTextStyle}>{beforeDiscount}{price}</Text>;
};

const CallForPrice = ({ showDetails }) => (
	<TouchableOpacity style={itemViewStyle.callForPriceBox}
		onPress = {showDetails}>
		<Text style={itemViewStyle.priceLabelStyle}>{TEXT.callForPrice}</Text>
	</TouchableOpacity>
);

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
		<Text style={itemViewStyle.detailTextStyle}>{value}</Text>
	</View>
);

const Title = () => {
	return fromSearchBar && isTablet
		? <Text style={itemViewStyle.jewelryTitleStyle}
			onPress = {() => writeToClipboard(DATA.TITLE)}>{DATA.TITLE}</Text>

		: <View style={itemViewStyle.titleViewStyle}>
			<Image source = {shapeIcon[DATA[strings.Shape]] || defaultDiamond}
				style = {itemViewStyle.shapeImageStyle}></Image>
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

const JeweleryView = ({ showDetails }) => (
	<View style = {itemViewStyle.jewelryShadowBox}>
		<View style = {itemViewStyle.jewelryViewStyle} >
			<TouchableOpacity
				onPress = {showDetails}>

				<PictureBox />

				<Title />

				<IDRow />

				{(DATA.PRICE != strings.callForPrice)
					&& <View style = {itemViewStyle.jewelryEntryRow} >
						<Discount isJewelryView = {true}/>
						<Text style={itemViewStyle.jewelryDetailText}>{`  PPC ${DATA[strings.ppc]}`}</Text>
					</View>}

			</TouchableOpacity>
		</View>

	</View>
);

const PictureBox = () => (
	<View style={itemViewStyle.pictureBox} >
		<Image source = {shapeIcon[DATA[strings.Shape]] || defaultDiamond}></Image>
	</View>
);

export const LooseView = ({ key, data, navigation, showDetails }) => {
	DATA = data;
	KEY = key;
	return isTablet && fromSearchBar
		? <JeweleryView showDetails = {() => showDetails('itemDetails', false)} />
		: <View style = {itemViewStyle.shadowBox}>
			<TouchableOpacity onPress = {() => showDetails('itemDetails', false)} >
				<View style={itemViewStyle.viewStyle}>

					<Title />

					<Table showDetails = {() => showDetails('itemDetails', true)}/>

				</View>
			</TouchableOpacity>
		</View>;
};
