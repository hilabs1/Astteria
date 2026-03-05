
import * as strings from '../screens/strings';

export const isTextEqual = (text, text1) => {
	if (!text || !text1) return false;
	// dev('stringManipulation', 'isTextEqual', `text ${text} text1 ${text1} `);
	text = text.toUpperCase();
	text1 = text1.toUpperCase();
	return text === text1;
};

export const isValid = value => (value !== strings.fluorBlank || value != strings.fluorBlank);

export const contains = (This, that) => {
	if (!This || !that) return false;

	This = This.toUpperCase();
	that = that.toUpperCase();

	return This.includes(that);
};
