import React from 'react';
import { View, StyleSheet } from 'react-native';
import { isTablet } from '../Cortex';

import * as colors from './colors';

export const LineSeperator = () => <View style={styles.lineSeperatorStyle}></View>;

const styles = StyleSheet.create({
	lineSeperatorStyle:
	{
		borderBottomColor: '#979797',
		borderBottomWidth: 1,
		width: isTablet ? '10%' : '20%',
		alignSelf: 'center',
		backgroundColor: colors.trans
	}
});
