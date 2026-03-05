import React from 'react';
import { Text } from 'react-native';
import { getDollarSign, getNone, TEXT } from '../../Cortex';
import * as strings from '../strings';
import { itemViewStyle } from './styling';
import { isValid } from '../../strings/stringManipulation';
export const defaultDiamond = require('../searchEngine/components/pics/defaultDiamond.jpg');

export const linkArr = [[strings.link1, strings.link2, strings.link3],
	[strings.link4, strings.link5, strings.link6],
	[strings.link7, strings.link8]];

export const shapeIcon = {
	[strings.ShapeRound]: require('../searchEngine/components/pics/round.png'),
	[strings.ShapeRadiant]: require('../searchEngine/components/pics/radiant.png'),
	[strings.ShapePrincess]: require('../searchEngine/components/pics/princess.png'),
	[strings.ShapeOval]: require('../searchEngine/components/pics/oval.png'),
	[strings.ShapeCushion]: require('../searchEngine/components/pics/cushion.png'),
	[strings.ShapeHeart]: require('../searchEngine/components/pics/heart.png'),
	[strings.ShapePear]: require('../searchEngine/components/pics/pear.png'),
	[strings.ShapeAsscher]: require('../searchEngine/components/pics/asscher.png'),
	[strings.ShapeEmerald]: require('../searchEngine/components/pics/emerald.png'),
	[strings.ShapeMarquise]: require('../searchEngine/components/pics/marquise.png')
};

export const gemIcon = {
	[strings.ruby]: require('../searchEngine/components/pics/ruby.png'),
	[strings.emeraldGem]: require('../searchEngine/components/pics/emeraldGem.png'),
	[strings.sapphire]: require('../searchEngine/components/pics/sapphire.png'),
	'-': defaultDiamond
};

export const getImageArr = (includeAll, images, chosenImages) => {
	let imageArr = [];
	!includeAll
		? images.map((img, i) => chosenImages[i] && imageArr.push(img))
		: imageArr = images;
	return imageArr;
};

export const scratchedPriceView = price => (
	<Text style={itemViewStyle.crossedTextStyle}>{getDollarSign(price, false)} </Text>
);

export const getLink = (supplier, type, url) => {
	if (!isValid(url)) return strings.fluorBlank;

	const newUrl = supplier == strings.basharySupplier
		? `${type}${url}`
		: url;

	return (!newUrl.includes('http'))
		? strings.fluorBlank
		: newUrl;
};

export const generateTitle = (DATA) => {
	let titleText;
	let prodName;
	const clarity = getNone(DATA[strings.clarity]);
	let clarityDisplay = !isValid(clarity) ? '' : `-${clarity}`;
	let lab = DATA[strings.lab];

	const shape = isValid(DATA[strings.Shape]) ? `${DATA[strings.Shape]}, ` : '';
	const weight = isValid(DATA[strings.jewelryType])
		? (isValid(DATA[strings.centerWeight]) && DATA[strings.centerWeight] !== 0
			? `${DATA[strings.centerWeight]}${TEXT.ct}, `
			: '')
		: (isValid(DATA[strings.weight]) && DATA[strings.weight] !== 0
			? `${DATA[strings.weight]}${TEXT.ct}, `
			: '');

	let color = '';

	lab = !isValid(lab) ? '' : `, ${lab}`;

	if (isValid(DATA[strings.jewelryType])) {
		// jewelry title
		if (!isValid(DATA[strings.gemType])) {
			// no gems
			if (isValid(DATA[strings.productName])) {
				// product name != null
				clarityDisplay = clarityDisplay.replace('-', '');
				prodName = DATA[strings.productName].trim();
				titleText = isValid(DATA[strings.color])
					? `${weight}${prodName}(${DATA[strings.color]})-${clarityDisplay} ${shape} ${TEXT.diamond} ${DATA[strings.jewelryType]} ${lab}`
					: `${prodName}`;
			} else {
				color = DATA.isWhite
					? DATA[strings.color]
					: DATA.FULL_FANCY;

				titleText = `${weight}${color}${clarityDisplay}, ${TEXT.diamond} ${DATA[strings.jewelryType]}${lab}`;
			}
		} else {
			// gems
			titleText = `${weight}${color}${DATA[strings.gemType]} ${DATA[strings.jewelryType]}`;
		}
	} else {
		// loose title
		if (isValid(DATA[strings.productName])) {
			// product name != null
			clarityDisplay = clarityDisplay.replace('-', '');
			prodName = DATA[strings.productName].trim();
			titleText = isValid(DATA[strings.color])
				? `${weight}${shape}${prodName}(${DATA[strings.color]})-${clarityDisplay}${lab}`
				: `${prodName}`;
		} else {
			color = DATA.isWhite
				? DATA[strings.color]
				: DATA.FULL_FANCY;

			titleText = `${weight}${shape}${color}${clarityDisplay}${lab}`;
		}
	}
	return titleText;
};
