import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { searchFooter } from './styling';

import { TEXT } from '../../Cortex';
import PropTypes from 'prop-types';

/**
 * [search triggers when user press search button
 * 		-> triggers function fetchData that is in the parent component
 * 		-> navigate to searchResult screen]
 * @return void [description]
 */
const search = (props) => {
  const filterObject = props.rightAction(); // idk what this is, but afarid to rm and see what happens
  // console.log('tkt footer filterObject', filterObject);
  // return;
  // props.navigation.navigate('searchResult');
  props.dismissBar();
};

export const SearchFooter = (props) => (
  <View style={searchFooter.headerStyle}>
    <View style={searchFooter.headerElementsStyle}>
      <TouchableOpacity
        style={searchFooter.touchableStyle}
        onPress={() => props.leftAction()}>
        <Text style={searchFooter.textResetStyle}>{props.leftText}</Text>
      </TouchableOpacity>

      <Text
        style={searchFooter.textSearchStyle}
        onPress={() => search(props)}>
        {' '}
        {props.rightText}{' '}
      </Text>

      <Text style={searchFooter.invisibleTextStyle}>{TEXT.reset}</Text>
    </View>
  </View>
);

SearchFooter.propTypes = {
  clear: PropTypes.func,
  rightText: PropTypes.string,
  rightAction: PropTypes.func,
  leftText: PropTypes.string,
  leftAction: PropTypes.func,
};
