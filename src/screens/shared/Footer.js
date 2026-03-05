import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import * as colors from './colors';
import * as styling from './styling';

import { getTextSize, getStyle, TEXT } from '../Cortex';

/**
 * [search triggers when user press search button
 * 		-> triggers function fetchData that is in the parent component
 * 		-> navigate to searchResult screen]
 * @return void [description]
 */
const search = (props) => {
  const filterObject = props.action();
  this.props.navigation.navigate('searchResult');
  this.props.dismissBar();
};

export const Footer = (props) => (
  <View style={getStyle(styles.headerStyle, styles.tabletHeaderStyle)}>
    <View style={styles.headerElementsStyle}>
      <TouchableOpacity
        style={getStyle(styles.touchableStyle, styles.tabletTouchableStyle)}
        onPress={props.clear}>
        <Text
          style={getStyle(styles.textResetStyle, styles.tabletTextResetStyle)}>
          {TEXT.reset}
        </Text>
      </TouchableOpacity>

      <Text
        style={getStyle(
          styles.textSearchStyle,
          styles.tabletTextSearchStyle
        )} /* this should b a pic later */
        onPress={() => search()}>
        {' '}
        {TEXT.search.toUpperCase()}{' '}
      </Text>

      <Text
        style={getStyle(
          styles.invisibleTextStyle,
          styles.tabletInvisibleTextStyle
        )}>
        {TEXT.reset}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  tabletTouchableStyle: {
    // backgroundColor: 'red',
    padding: getTextSize(5), /// ASPECT_RATIO * (10), //7
  },

  tabletTextSearchStyle: {
    fontSize: getTextSize(15), // ASPECT_RATIO * (30), //20,
    color: colors.white,
    fontFamily: styling.textFont, // 'PlayfairDisplay-Regular',
    letterSpacing: getTextSize(1.43),
    // backgroundColor: 'green'
  },
  tabletInvisibleTextStyle: {
    fontSize: getTextSize(10), // ASPECT_RATIO * (20), //15,
    color: colors.searchHeaderColor,
    padding: getTextSize(5), // ASPECT_RATIO * (10),//getTextSize(7), //7
    // backgroundColor: 'pink'
  },

  tabletTextResetStyle: {
    fontSize: getTextSize(10), // ASPECT_RATIO * (20), //15,
    color: colors.white,
    fontFamily: styling.textFont, // 'PlayfairDisplay-Regular'
  },

  tabletHeaderStyle: {
    width: '100%',
    // height: '8%',
    backgroundColor: colors.searchHeaderColor,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: getTextSize(7), // 7,
    height: getTextSize(40), // ASPECT_RATIO * 70 //getTextSize(50),
  },

  headerStyle: {
    width: '100%',
    // height: '8%',
    backgroundColor: colors.searchHeaderColor,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: getTextSize(7), // 7,
    height: getTextSize(50),
  },
  textSearchStyle: {
    fontSize: getTextSize(20), // 20,
    color: colors.white,
    fontFamily: styling.textFont, // 'PlayfairDisplay-Regular',
    letterSpacing: getTextSize(1.43),
  },
  invisibleTextStyle: {
    fontSize: getTextSize(15), // 15,
    color: colors.searchHeaderColor,
    padding: getTextSize(7), // 7
  },

  textResetStyle: {
    fontSize: getTextSize(15), // 15,
    color: colors.white,
    fontFamily: styling.textFont, // 'PlayfairDisplay-Regular'
  },
  touchableStyle: {
    // backgroundColor: 'red',
    padding: getTextSize(7), // 7
  },

  imageStyle: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  innerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '10%',
    width: '15%',
  },
  headerElementsStyle: {
    // marginTop: 10,
    width: '100%',
    backgroundColor: colors.searchHeaderColor,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
