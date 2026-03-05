import React from 'react';
import { View, Text, FlatList, Platform } from 'react-native';
import PropTypes from 'prop-types';

import * as strings from '../../strings';
import * as indices from '../../indices';
import {
  isTablet,
  TEXT,
  dev,
  getRapPerCentBLow,
  getPrice,
  getImages,
  getFullFancy,
  convertPrice,
  priceFix,
  LOCATION,
  getNone,
  CERT_PREFIX,
} from '../../../Cortex';

import { searchResultStyle } from '../styling';
import { dataResult, searchType } from '../Cortex';
import { isTextEqual, isValid } from '../../../strings/stringManipulation';
import { LooseView } from '../../results/LooseView';
import { JewelryView } from '../../results/JewelryView';
import { generateTitle, getLink } from '../../results/Cortex';

var _ = require('lodash');

const dataObj = (item) => ({
  [strings.lotId]: item[indices.lotId],
  [strings.Shape]:
    TEXT.SHAPE[item[indices.Shape].toUpperCase()] || item[indices.Shape],
  [strings.weight]: item[indices.weight],
  [strings.color]: item[indices.color],
  [strings.clarity]: item[indices.clarity],
  [strings.lab]: item[indices.lab],
  [strings.allocation]: item[indices.allocation],
  [strings.cut]:
    TEXT.DEF[item[indices.cut].toUpperCase()] || strings.fluorBlank,
  [strings.polish]:
    TEXT.DEF[item[indices.polish].toUpperCase()] || strings.fluorBlank,
  [strings.symmetry]:
    TEXT.DEF[item[indices.symmetry].toUpperCase()] || strings.fluorBlank,
  [strings.depth]: item[indices.depth],
  [strings.table]: item[indices.table],
  [strings.fluorescenceColorIntensity]:
    TEXT.FLUOR[item[indices.fluorescenceColorIntensity].toUpperCase()] ||
    strings.fluorBlank,
  [strings.measurements]: item[indices.measurements],
  [strings.totalPrice]: item[indices.totalPrice],
  [strings.asteriaPrice]: item[indices.asteriaPrice],
  [strings.ppc]: convertPrice(
    priceFix(item[indices.ppc], item[indices.rateForSite]),
    false
  ),
  [strings.rap]: item[indices.rap],
  [strings.picture]: [],
  [strings.fancyColorGroup]: item[indices.fancyColorGroup],
  [strings.FancyColorIntensity]:
    TEXT.INTENSITY[item[indices.FancyColorIntensity].toUpperCase()] ||
    strings.fluorBlank,
  [strings.FancyColorOvertone]:
    TEXT.COLOR[item[indices.FancyColorOvertone].toUpperCase()],
  [strings.certificateId]: item[indices.certificateId],
  [strings.certificateLink]: getLink(
    item[indices.supplier],
    CERT_PREFIX,
    item[indices.certificateLink]
  ),
  [strings.listPrice]: item[indices.listPrice],
  [strings.productName]: item[indices.productName],
  [strings.availability]: item[indices.availability],
  [strings.rateForSite]: item[indices.rateForSite],
  [strings.bashariLocation]: item[indices.bashariLocation],
  [strings.supplier]: item[indices.supplier],
  [strings.age]: item[indices.age],
  [strings.totalCost]: item[indices.totalCost],
  [strings.totalPrice4]: item[indices.totalPrice4],
  RAP_BELOW: getRapPerCentBLow(item[indices.ppc], item[indices.listPrice]),
  VIDEO: isTextEqual(LOCATION, strings.inChine)
    ? item[indices.videocn]
    : item[indices.videoen],
  IMG: getImages(item), // this.getPictures(arr),
  isWhite: isValid(item[indices.color]),
  FULL_FANCY: getFullFancy(
    item[indices.FancyColorIntensity],
    item[indices.FancyColorOvertone],
    item[indices.fancyColorGroup]
  ),
  openContactUs: false,
  PRICE: getPrice(
    item[indices.asteriaPrice],
    item[indices.totalPrice],
    item[indices.rateForSite]
  ),
  [strings.departmentInFantasy]: item[indices.departmentInFantasy],
  // jewelry additions
  //zoomIn: false,
  isGem: isValid(item[indices.gemType]),
  [strings.centerWeight]: +item[indices.centerWeight] || strings.fluorBlank,
  [strings.goldWeight]: +item[indices.goldWeight] || strings.fluorBlank,
  [strings.jewelryType]:
    (item[indices.type] && TEXT.JEWELRY[item[indices.type].toUpperCase()]) ||
    strings.fluorBlank,
  [strings.gemType]:
    (item[indices.gemType] && TEXT.GEM[item[indices.gemType].toUpperCase()]) ||
    strings.fluorBlank,
});

const List = ({ navigation }) => {
  const col = isTablet && !isTextEqual(searchType, strings.loose) ? 2 : 1;
  return Platform.OS === 'android' ? (
    <FlatList
      data={dataResult}
      removeClippedSubviews={true}
      numColumns={col}
      renderItem={({ item }) => (
        <ListView
          item={item}
          navigation={navigation}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  ) : (
    <FlatList
      data={dataResult}
      numColumns={col}
      renderItem={({ item }) => (
        <ListView
          item={item}
          navigation={navigation}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const ListView = ({ item, navigation }) => {
  let data = dataObj(item);
  const TITLE = generateTitle(data);
  data = { ...data, TITLE };

  return !isTextEqual(item[0], strings.lotId) &&
    !isValid(item[indices.type]) ? (
    <LooseView
      key={item[strings.lotId]}
      data={data}
      navigation={navigation}
      showDetails={(screen, openContactUs) =>
        showDetails(screen, navigation, data, openContactUs)
      }
    />
  ) : (
    <JewelryView
      key={item[strings.lotId]}
      data={data}
      navigation={navigation}
      showDetails={(screen, openContactUs) =>
        showDetails(screen, navigation, data, openContactUs)
      }
    />
  );
};

const showDetails = (screen, navigation, data, openContactUs, title) =>
  navigation.navigate(screen, { data: data, openContactUs: openContactUs });

export const ResultView = ({ navigation }) => {
  console.log('tkt dataResult', dataResult);
  return (
    <View style={searchResultStyle.viewStyle}>
      {dataResult.length === 0 ? (
        <Text style={searchResultStyle.resultTextStyle}>{TEXT.zeroResult}</Text>
      ) : (
        <Text
          style={
            searchResultStyle.resultTextStyle
          }>{`${dataResult.length} ${TEXT.resultFound}`}</Text>
      )}

      {dataResult.length !== 0 && <List navigation={navigation} />}
    </View>
  );
};

/*SearchResult.propType = {
	navigation: PropTypes.object,

}*/
