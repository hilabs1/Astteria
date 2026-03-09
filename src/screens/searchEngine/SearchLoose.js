// @ts-ignore
import React, { Component, useEffect, useRef, useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  // @ts-ignore
  TouchableOpacity,
  // @ts-ignore
  BackHandler,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  // @ts-ignore
  Image,
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {
  getTextSize,
  // @ts-ignore
  getIconHeight,
  ASPECT_RATIO,
  isTablet,
  TEXT,
  // @ts-ignore
  dev,
  logger,
  // ACCESS,
} from '../../Cortex';
// @ts-ignore
import { scrollableButtons } from './filterObject';
// @ts-ignore
import { filterViews } from './styling';

import { searchInLayer } from './Cortex';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import ShapeTable from './ShapeTable';
import Weight from './Weight';
import GemType from '../GemType';
import ColorTable from './ColorFilter/ColorTable';
import ScrollFilter from './components/ScrollFilter';
import * as strings from '../strings';
import * as colors from '../colors';
import { searchEngineStyle } from './styling';
import { SearchFooter } from './SearchFooter';
import { filterObjects } from './filterObject';
import JewelryType from '../JewelryType';
import PriceFilter from './PriceFilter';
import BashariLocation from './BashariLocation';
import AgeFilter from './AgeFilter';
// @ts-ignore
import { FilterButton } from './components/FilterButton';

let refs = [];
// @ts-ignore
var searchObj = {};
var ACCESS = strings.manager;
const statusBar = (
  <StatusBar
    hidden={false}
    barStyle='light-content'
    backgroundColor={colors.searchHeaderColor}
  />
);

const height = isTablet ? (Platform.OS === 'android' ? 150 : 250) : 160;
// isTablet && Platform.OS === 'ios' ? 250 : 160;

// (Platform.OS === 'ios' ? 250 : 160) : 160;

export default class SearchLoose extends Component {
  // navigationOptions is deprecated in React Navigation v6
  // Header configuration is now handled in routes.js

  constructor(props) {
    super(props);
    logger('this.props.route.params', this.props.route?.params)
    searchObj = this.props.route?.params?.searchEngine;
    // this.stateHandler = this.stateHandler.bind(this);
    // this.handleBackButton = this.handleBackButton.bind(this);
    // this.fetchData = this.fetchData.bind(this);
    // this.clearAll = this.clearAll.bind(this);
    // this.openSearchDropDown = this.openSearchDropDown.bind(this);
    this.dismissBar = this.dismissBar?.bind(this);

    this.state = {
      ...searchObj.state,
      filterObjects: searchObj.filterObjects,
      weightTitle:
        searchObj.type === strings.loose ? TEXT.weight : TEXT.centerWeight,
    };
  }

  /**
   * [fetchData triggered from searchBar & searchFooter
   * 		collecting all user filter choices and triggers CORTEX's searchInLayers]
   * @return void [description]
   */
  fetchData = () => {
    // for all
    const ageRangeState =
      ACCESS === strings.manager ? this.state[strings.ageRangeState] : '';
    const countryLocationState =
      ACCESS === strings.manager
        ? this.state[strings.countryLocationState]
        : '';
    const bashariLocationState =
      ACCESS === strings.manager
        ? this.state[strings.bashariLocationState]
        : '';

    var filterObject = {
      [strings.textInputSearch]: this.setTextInputSearch(),
      [strings.weightRangeState]: this.state[strings.weightRangeState],
      [strings.labState]: this.state[strings.labState],
      countryLocationState,
      ageRangeState,
      bashariLocationState,
    };

    if (searchObj.type !== strings.gems) {
      // loose & jewelry
      filterObject = {
        ...filterObject,
        [strings.shapeState]: this.state[strings.shapeState],
        [strings.colorState]: this.state[strings.colorState],
        [strings.whiteColorArr]: this.setColor(strings.whiteColorArr),
        [strings.fancyIntensities]: this.setColor(strings.fancyIntensities),
        [strings.fancyColorArr]: this.setColor(strings.fancyColorArr),
        [strings.fancyOvertoneState]: this.setColor(strings.fancyOvertoneState),
        [strings.clarityState]: this.state[strings.clarityState],
      };
    }

    if (searchObj.type === strings.loose) {
      filterObject = {
        ...filterObject,
        [strings.cutState]: this.state[strings.cutState],
        [strings.polishState]: this.state[strings.polishState],
        [strings.symmetryState]: this.state[strings.symmetryState],
        [strings.fluorescenseState]: this.state[strings.fluorescenseState],
      };
      console.log('filterObject', filterObject);
    } else {
      // gems and jewelry
      filterObject = {
        ...filterObject,
        [strings.priceRangeState]: this.state[strings.priceRangeState],
        [strings.jewelryType]: this.state[strings.jewelryType],
      };
    }
    if (searchObj.type === strings.gems) {
      // gems only
      filterObject = {
        ...filterObject,
        [strings.gemType]: this.state[strings.gemType],
      };
    }
    dev('SearchLoose', 'fetchData', JSON.stringify(filterObject));
    // Alert.alert('SearchLoose', `${JSON.stringify(filterObject)}`);
    searchInLayer(filterObject, searchObj.type);
  };

  /**
   * [setColor triggered from fetchData
   * 		filling the color fields of filterObject
   * 		if user chose white: fancyOvertone, fancyIntensity && fancyColorArr get to be unlisted]
   * @param String prop [description]
   */
  setColor(prop) {
    if (this.state[strings.colorState] == strings.white) {
      // TODO fix this ==
      return prop === strings.whiteColorArr
        ? this.state[prop]
        : strings.unListed;
    } else {
      return prop === strings.whiteColorArr
        ? strings.unListed
        : this.state[prop];
    }
  }

  /**
   * [setTextInputSearch triggered by fetchData
   * 		handles filling lotId field of filterObject with textInput input]
   */
  setTextInputSearch() {
    return this.state[strings.textInputSearch]
      ? this.state[strings.textInputSearch]
      : strings.unListed;
  }

  /**
   * [stateHandler triggered by all .js that SearchJewelry contains]
   * @param  String  stateName  [the state name to update]
   * @param  String  value      [value the user chose in filter]
   * @return void          	  [description]
   */
  stateHandler = (stateName, value) => {
    if (stateName === strings.textInputSearch || strings.bashariLocationState) {
      this.setState({
        [stateName]: value,
      });
    } else {
      if (Array.isArray(value)) {
        this.setState(
          {
            [stateName]: value,
          },
          () => console.log('then', this.state)
        );
      }
    }
  };

  // ===== android onBackPressed handle
  openSearchDropDown = () => {
    this.setState({
      topSearchBar: !this.state.topSearchBar,
    });
  };

  componentDidMount() {
    // setParams is deprecated in React Navigation v6
    // Header configuration is now static in routes.js
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    this.clearAll();
    // if (Platform.OS === 'android') {
    //   BackHandler.removeEventListener(
    //     'hardwareBackPress',
    //     this.handleBackButton
    //   );
    // }
  }

  handleBackButton = () => {
    this.props.navigation.goBack(null);
    return true;
  };

  /**
   * [clearAll triggered by searchFooter's button reset
   * 		triggers clearAll function of each component]
   * @return void [description]
   */
  clearAll = () => {
    dev('SearchLoose', 'clearAll', refs.length);
    filterObjects.map((filter, index) => {
      refs[index] && refs[index].clearAll();
    });

    this.Weight.clearAll();
    this.ShapeTable && this.ShapeTable.clearAll();
    this.ColorTable && this.ColorTable.clearAll();
    if (searchObj.type !== strings.loose) {
      this.PriceFilter.clearAll();
      this.JewelryType.clearAll();
    }
    if (searchObj.type === strings.gems) {
      this.GemType.clearAll();
    }
    if (this.state.topSearchBar) {
      this.SearchBar.clearAll();
    }
    if (ACCESS === strings.manager) {
      this.AgeFilter && this.AgeFilter.clearAll();
      this.BashariLocation && this.BashariLocation.clearAll();
    }
    this.setState({
      ...searchObj.state,
    });
  };

  getTouchable() {
    refs = [];
    console.log('searchObj', searchObj);
    return (
      <TouchableWithoutFeedback
        style={searchEngineStyle.scrollViewStyle}
        onPress={() => Keyboard.dismiss()}>
        <ScrollView
          contentContainerStyle={searchEngineStyle.scrollViewStyle}
          keyboardShouldPersistTaps="handled">
          {/* searchBar================================== */}
          <Text style={searchEngineStyle.textStyle}>{searchObj.title}</Text>

          {/* gem type====================================== */}
          {searchObj.type === strings.gems && (
            <GemType
              stateHandler={this.stateHandler}
              ref={(GemType) => {
                this.GemType = GemType;
              }}
            />
          )}

          {searchObj.type !== strings.loose && (
            <View>
              <View style={searchEngineStyle.jewelryTypeContainer}>
                <JewelryType
                  stateHandler={this.stateHandler}
                  ref={(JewelryType) => {
                    this.JewelryType = JewelryType;
                  }}
                />
              </View>

              {searchObj.type === strings.jewelry && (
                <View style={searchEngineStyle.shadowBox}>
                  <View style={searchEngineStyle.innerBox}>
                    <Text style={searchEngineStyle.subtitleTextStyle}>
                      {TEXT.mainStoneDt}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          )}

          {/* shape====================================== */}
          {searchObj.type !== strings.gems && (
            <View style={searchEngineStyle.shapeTypeContainer}>
              <ShapeTable
                stateHandler={this.stateHandler}
                ref={(ShapeTable) => {
                  this.ShapeTable = ShapeTable;
                }}
              />
            </View>
          )}

          {/* weight ====================================== */}
          <View style={{ height }}>
            <Weight
              stateHandler={this.stateHandler}
              ref={(Weight) => {
                this.Weight = Weight;
              }}
              type={this.state.weightTitle}
            />
          </View>

          {/* color ====================================== */}
          {searchObj.type !== strings.gems && (
            <ColorTable
              stateHandler={this.stateHandler}
              ref={(ColorTable) => {
                this.ColorTable = ColorTable;
              }}
            />
          )}

          {this.state.filterObjects.map((filter, i) => (
            <View key={filter.name} style={{ height }}>
              <ScrollFilter
                name={filter.name}
                stateName={filter.stateName}
                stringArr={filter.stringArr}
                scrollViewStyle={filter.scrollViewStyle}
                scrollEnabled={filter.scrollEnabled}
                isRange={filter.isRange}
                range={filter.range}
                showClearButton={filter.showClearButton}
                buttons={filter.buttons}
                stateHandler={this.stateHandler}
                ref={(ScrollFilter) =>
                  !refs.includes(ScrollFilter) && refs.push(ScrollFilter)
                }
              />
            </View>
          ))}
          {searchObj.type !== strings.loose && (
            <View style={{ height }}>
              <PriceFilter
                stateHandler={this.stateHandler}
                ref={(PriceFilter) => {
                  this.PriceFilter = PriceFilter;
                }}
              />
            </View>
          )}
          {this.getManagerFilters()}
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }

  getManagerFilters = () => (
    <>
      {(ACCESS === strings.manager ||
        ACCESS === strings.asteriaSalespeople) && (
        <View style={{ height }}>
          <AgeFilter
            stateHandler={this.stateHandler}
            ref={(AgeFilter) => {
              this.AgeFilter = AgeFilter;
            }}
          />
        </View>
      )}

      {ACCESS === strings.manager && (
        <View style={{ height }}>
          <BashariLocation
            stateHandler={this.stateHandler}
            ref={(BashariLocation) => {
              this.BashariLocation = BashariLocation;
            }}
          />
        </View>
      )}
    </>
  );

  getFooter() {
    return (
      <SearchFooter
        navigation={this.props.navigation}
        rightAction={this.fetchData}
        leftAction={this.clearAll}
        rightText={TEXT.search.toUpperCase()}
        leftText={TEXT.reset}
        dismissBar={this.dismissBar}
      />
    );
  }

  getView() {
    var keyboardVerticalOffset = getTextSize(95);
    if (isTablet) {
      keyboardVerticalOffset = ASPECT_RATIO * 80;
    }

    return Platform.OS === 'ios' ? (
      <KeyboardAvoidingView
        style={searchEngineStyle.viewStyle}
        behavior="padding"
        enabled
        keyboardVerticalOffset={keyboardVerticalOffset}>
        {statusBar}

        {this.getSearchBar()}

        {this.getTouchable()}

        {this.getFooter()}
      </KeyboardAvoidingView>
    ) : (
      <View style={searchEngineStyle.viewStyle}>
        {statusBar}

        {this.getSearchBar()}

        {this.getTouchable()}

        {this.getFooter()}
      </View>
    );
  }

  /**
   * [getSearchBar triggered by search icon in header
   * 		handles showing/hiding searchbar]
   * @return View   [searchBar view]
   */
  getSearchBar() {
    if (this.state.topSearchBar) {
      return (
        <SearchBar
          style={searchEngineStyle.searchBarStyle}
          action={this.stateHandler}
          actionFetch={this.fetchData}
          navigation={this.props.navigation}
          dismissBar={this.dismissBar}
          ref={(SearchBar) => {
            this.SearchBar = SearchBar;
          }}
        />
      );
    }
  }

  /**
   * [dismissBar triggered by SearchFooter
   * 		handles dismissing searchbar if user didnt type in anything and navigated to next screen]
   * @return {[type]} [description]
   */

  render() {
    return this.getView();
  }
}

SearchLoose.propTypes = {
  navigation: PropTypes.object,
};
