import React, { Component } from 'react';
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Keyboard,
} from 'react-native';

import * as colors from '../colors';
import * as strings from '../strings';
import { searchBar } from './styling';
import { TEXT } from '../../Cortex';

import search2 from './components/pics/search2.png';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      [strings.textInputSearch]: '',
    };
  }

  changeInput = (text) => {
    this.setState(
      {
        [strings.textInputSearch]: text || '',
      },
      () => this.submit()
    );
  };

  clearAll = () => {
    this.setState(
      {
        [strings.textInputSearch]: '',
      },
      () => this.submit()
    );
  };

  submit = () =>
    this.props.action(
      /*strings.textInputSearch, */ this.state[strings.textInputSearch]
    );

  /**
   * [search triggers when user press search button
   * 		-> triggers function fetchData that is in the parent component
   * 		-> navigate to search result screen
   * 		-> clear textIput field]
   * @return void [description]
   */
  search = () => {
    Keyboard.dismiss();
    var filterObject = this.props.actionFetch();
    this.props.navigation.navigate('searchResult');
    this.props.dismissBar();
  };

  render() {
    return (
      <View style={searchBar.wrapperViewStyle}>
        <View style={searchBar.viewStyle}>
          <TextInput
            style={searchBar.textInput}
            autoCapitalize='none'
            clearButtonMode='always'
            autoCorrect={false}
            ref={(element) => {
              this.input = element;
            }}
            onChangeText={(text) => this.changeInput(text)}
            multiline={false}
            value={this.state[strings.textInputSearch]}
            placeholderTextColor={colors.gray}
            placeholder={TEXT.DiamondSearchPlaceHolder}
            underlineColorAndroid={colors.trans}
            onSubmitEditing={() => this.search()}
          />
          <TouchableOpacity
            style={searchBar.searchTouchable}
            onPress={() => this.search()}>
            <Image
              style={searchBar.searchImage}
              source={search2}></Image>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
