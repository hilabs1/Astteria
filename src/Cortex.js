import React from 'react';
import {
  AsyncStorage,
  Linking,
  Dimensions,
  NativeModules,
  Alert,
  View,
  Platform,
  Text,
  Clipboard,
} from 'react-native';
import Share from 'react-native-share';
import * as strings from './screens/strings';
import * as colors from './screens/colors';
import * as styling from './screens/styling';
import * as indices from './screens/indices';
// import call from 'react-native-phone-call';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFetchBlob from 'rn-fetch-blob';
// import DeviceInfo from 'react-native-device-info';
import moment from 'moment';
import { numbers } from './constants/cortex';
import * as engText from './strings/engStrings';
import * as chineseText from './strings/chineseStrings';
import upperFirst from 'lodash/upperFirst';
import { isTextEqual, isValid, contains } from './strings/stringManipulation';
import * as RNLocalize from "react-native-localize";
var _ = require('lodash');

const getLocal = () => {
  const localesArr = RNLocalize?.getLocales();
  return localesArr[0]?.languageCode || 'en';
}

export const deviceLanguage = getLocal();

export var isChinese = deviceLanguage?.includes('zh');
// fix this later
export const TEXT = isChinese // deviceLanguage.includes('zh')
  ? chineseText
  : engText;

export var rateMatrix = [];
export var rateMatrixBackup = [
  ['NAME', 'RATE'],
  ['USD', 1],
  ['CNY', 8.03],
  ['GBP', 0.8333],
  ['EUR', 0.91],
];

export var CURRENCY_RATE = 1;
export var CURRENCY_SIGN = '';

export var dataMatrix = []; // typeof object, address as matrix
export var gemDataMatrix = [];
export var DATA_SIZE = 0;
export var FAIL_HTML = false;
export var FAIL_FILE = false;
export var LANG = 0;

export var dataResult = []; // typeof object, address as matrix

// strings.weight refers to total weight in stock, don't show is like that
export const titleArr = [
  strings.lotId,
  strings.Shape,
  strings.weight,
  strings.color,
  strings.fancyColorGroup,
  strings.FancyColorIntensity,
  strings.FancyColorOvertone,
  strings.clarity,
  strings.lab,
  strings.cut,
  strings.polish,
  strings.symmetry,
  strings.depth,
  strings.table,
  strings.fluorescenceColorIntensity,
  strings.measurements,
  strings.ppc,
  strings.totalPrice, // 17
  strings.rap,
  strings.type,
  strings.goldWeight,
  strings.link1,
  strings.link2,
  strings.link3,
  strings.link4,
  strings.link5,
  strings.link6,
  strings.link7,
  strings.link8,
  strings.certificateId, // 29
  strings.certificateLink,
  strings.supplier,
  strings.centerWeight,
  strings.totalCost,
  strings.totalPrice4,
  strings.bashariLocation,
  strings.parcelStoneCount,
  strings.age,
  strings.allocation,
  strings.gemType,
  strings.listPrice, // 40
  strings.offlineLink1,
  strings.offlineLink2,
  strings.offlineLink3,
  strings.offlineLink4,
  strings.offlineLink5,
  strings.offlineLink6,
  strings.offlineLink7,
  strings.offlineLink8,
  strings.offlineCertLink, //49
  strings.origin,
  strings.link9,
  strings.link10, // 52
  strings.videoen,
  strings.videocn,
  strings.has360,
  strings.filterColor,
  strings.productName,
  strings.asteriaPrice, // 59
  strings.countryLocation,
  strings.departmentInFantasy,
  strings.availability,
  strings.rateForSite,
]; //63

var indexArr = [];
var indexArrRest = [];
var indexArrSeren = [];
export var countryDropdown = [];
export var searchType;
export var ACCESS;
export var EMAIL;
export var COMPANY;
export var uploaded = false;
export var itemDetailsPDF;
export var pdfPath;
export var LOCATION = strings.international; // = regionHandler(); //get(strings.currentLocation);// = strings.international;// regionHandler(); //get(strings.currentLocation);
export var IMAGE_PREFIX = strings.internationalPrefix + strings.imageSuffix;
export var CERT_PREFIX = strings.internationalPrefix + strings.certSuffix;
export var REM = Dimensions.get('window').width / 380;
export var ASPECT_RATIO =
  Dimensions.get('window').height / Dimensions.get('window').width;
export var stockURL = strings.bashariUrlInternational;
export var errorNum = 'ID%KANE$\n';
export var basharyStock = [];
export var LOOSE_BAR = false;
export var ITEMS_TO_DOWNLOAD = 0;
export var FIRST_ITEMS_TO_DOWNLOAD = 0;
export var OFFLINE = false;
export var TABLET = false; //DeviceInfo.isTablet();
export var fromSearchBar = false;
export const brand = 'galaxy'; //DeviceInfo.getBrand();
// export const deviceCountry = DeviceInfo?.getDeviceCountry();
export const deviceModel = 'test'; //DeviceInfo?.getModel();
export const appVersion = '12'; // //DeviceInfo?.getReadableVersion();
export const systemVersion = '11'; //DeviceInfo?.getSystemVersion();
export const deviceLocale = 'en'; //DeviceInfo?.getDeviceLocale();

export const isTablet = false; //DeviceInfo.isTablet();
export const DEVICE_TYPE = TABLET ? 'TABLET' : 'MOBILE';

export var CONNECTION = false;
export var IP_ADD = strings.international;
export var FLAG = null;
export var REST_FLAG = null;
export var FETCH_FLAG = null;
export var REFRESH_FLAG = 0;
var HASH = null;
var BASH_HASH = null;
export var CERT_LINK = '';

/**
 * [put: stores data in local db, currently the password & currentLocation]
 * @param  String key [key of the data]
 * @param  String val [value if data]
 * @return itemJson     [irrelevant]
 */
export const put = async (key, val) => {
  try {
    var itemJSON = await AsyncStorage.setItem(key, JSON.stringify(val));
    return itemJSON;
  } catch (error) {
    return strings.unListed;
  }
};
/**
 * [get: returns data value of stores in key]
 * @param  String key [key of data]
 * @return String     [value of item]
 */
export const get = async (key) => {
  try {
    const itemJSON = await AsyncStorage.getItem(key);
    const item = await JSON.parse(itemJSON);
    logger(`get(${key}).success`);
    return item;
  } catch (error) {
    logger(`!get(${key})`);
    return strings.unListed;
  }
};
/**
 * [getTimestamp: generates a current timestamp of format yyyy m d h]
 * @return String [the current timestamp created]
 */
export const getTimestamp = () => moment();

/**
 * [isTimeOut: checks the difference between last and current timestamp
 * this func is used in getDataAsync() ; if isTimeOut, the app will pull data from the server, otherwise, from local storage file
 * this is check for bashari stock]
 * @param  String  date1 [first date]
 * @param  String  date2 [second date]
 * @return Boolean       [if difference between 2 dates is bigger than DIFF hrs, return true, otherwise false]
 */
export const isTimeOut = (date1, date2, dif) => {
  if (date1 === strings.unListed || date2 === strings.unListed) return true;
  return date2.diff(date1, 'hours') >= dif;
}

// TODO next version
export const checksum = async (text, hashStore, thisCheckSum) => {
  var hash = 0;
  var strlen = text.length;
  var i, c;

  if (strlen === 0) return hash;

  for (i = 0; i < strlen; i++) {
    c = text.charCodeAt(i);
    hash = (hash << 5) - hash + c;
    hash = hash & hash;
  }

  var prevChecksum = await get(thisCheckSum.toString());
  hashStore == 'BASH_HASH' ? (BASH_HASH = hash) : (HASH = hash);

  return !prevChecksum
    ? true // if no checksum, meaning file was never submitted to sharedPrefs, so go ahead and extract
    : prevChecksum != hash; // if checksum, meaning a file MUST be in sharedPrefs cuz checksum is only being written to db after extract was successfull!
};
/**
 * [getDataAsync triggered by welcomeSearch
 * 		replacing getData
 * 		so instead of using getIp, there's a different approach:
 * 		fetch both china && international
 * 		the first one to finish will determine the location]
 * @return void   [description]
 */
export const getDataAsync = async (force) => {
  logger(`getDataAsyc(${force})`);
  dataMatrix = [];
  gemDataMatrix = [];
  basharyStock = [];
  OFFLINE = false;

  const prevTimestamp = get(strings.loadFromFile)
    .then((prevTimestamp) => {
      let timestamp = getTimestamp();
      if (prevTimestamp || force) {
        logger('getDataAsync.success prevTimestamp', prevTimestamp, 'timestamp', timestamp);
        if (
          (prevTimestamp && isTimeOut(prevTimestamp, timestamp, 1)) ||
          force
        ) {
          logger('should be here')
          fetchThis(
            strings.bashariUrlInternational,
            strings.international,
            force
          );
          fetchThis(strings.bashariUrlChina, strings.inChina, force);
        } else {
          logger('getFromFile')
          getFromFile('getDataAsync', null);
        } // if arrives here, there must be a file
      } else {
        fetchThis(
          strings.bashariUrlInternational,
          strings.international,
          force
        );
        fetchThis(strings.bashariUrlChina, strings.inChina, force);
      }
    })
    .catch((error) => {
      logger(`E:1${error.message}`);
      logger(`!getDataAsyc(${force})`);
      if (force) {
        Alert.alert(
          TEXT.connectionProb,
          TEXT.connectionProbRefreshDetails,
          [{ text: TEXT.ok }],
          { cancelable: false }
        );
        FLAG = 'force';
      } else getFromFile('getDataAsync', null);
    });
};
/**
 * [fetchThis triggered by getDataAsync
 * 		handles fetching url from server]
 * @param  String  url  [url to fetch from]
 * @param  String  res  [a String that matched the location of url server
 *                      cn -> china
 *                      en -> international]
 * @return function     [if loadFromFile -> handleSearch()
 *                          otherwise -> getFromFile()]
 */
export const fetchThis = async (url, res, force) => {
  logger(`fetchThis(${force}:top).success`);
  return fetch(url, { headers: { 'Cache-Control': 'no-cache' } })
    .then(async (resp) => {
      logger(`fetchThis(${force}:mid).success`);
      return resp.text();
    })
    .then(async (text) => {
      if (!FLAG) {
        logger(`fetchThis(${res}).success`);
        FLAG = res;
        FAIL_HTML = false;
        var loadFromHTML = await checksum(
          text,
          'BASH_HASH',
          strings.checksumBash
        );
        var prevAccess = await get(strings.prevAccess.toString());
        var accessChange = false;
        if (prevAccess && prevAccess != ACCESS) {
          logger(`AC: ${ACCESS}; PAC: ${prevAccess}`);
          accessChange = true;
          put(strings.prevAccess.toString(), ACCESS.toString());
        } else logger(`AC===PAC: ${ACCESS}`);

        let restText = null;

        await manualRegionHandles(res == strings.inChina);

        if (loadFromHTML || accessChange) {
          logger('checksumDifferent');
          setCurrency();

          if (!REST_FLAG || accessChange) {
            // this is for fetching (or not) the rest of the stock
            var prevTimestamp = await get(strings.loadRestFromFile);
            var currTimestamp = getTimestamp();

            if (prevTimestamp || force) {
              if (
                (prevTimestamp &&
                  isTimeOut(prevTimestamp, currTimestamp, 24)) ||
                force
              ) {
                restText = await fetchThird(force);
                if (!restText) getFromFile('checksumRest', REST_FLAG);
              } else getFromFile('checksumRest', REST_FLAG);
            } else restText = await fetchThird(force);
          }
          return handleSearch(text, restText, force);
        } else {
          logger(`checksumEquals(${force})`);

          if (force) FLAG = 'force';

          return getFromFile('checksum', FLAG);
        }
      }
    })
    .catch((error) => {
      logger(`E:2${error.message}`);
      if (force) {
        if (REFRESH_FLAG === 0) {
          Alert.alert(
            TEXT.connectionProb,
            TEXT.connectionProbRefreshDetails,
            [{ text: TEXT.ok }],
            { cancelable: false }
          );
          REFRESH_FLAG++;
        } else REFRESH_FLAG = 0;
        FLAG = 'force';
        logger('!fetchThis(force)');
      } else {
        logger(`!fetchThis(${res})`);
        FAIL_HTML = true;
        if (FETCH_FLAG === 'error') getFromFile('getHTML', null);
        FETCH_FLAG = 'error';
      }
    });
};

export const setRateMatrix = async (resp) => {
  logger(`ratesStatus: ${resp.status}`);
  if (resp && resp.status !== 404) {
    const data = await resp.text();
    if (data) {
      var rows = data.split('\n');
      rows.map((row) => rateMatrix.push(row.split('\t')));
    }
  } else rateMatrix = rateMatrixBackup;
};

export const setCurrency = async () => {
  const resp = await fetch(strings.internationalRatesURL, {
    headers: { 'Cache-Control': 'no-cache' },
  });
  await setRateMatrix(resp);
  if (isChinese) {
    CURRENCY_RATE = parseFloat(rateMatrix[2][1]);
    CURRENCY_SIGN = 'RMB';
  } else {
    if (deviceLanguage.includes('gb'))
      CURRENCY_RATE = parseFloat(rateMatrix[3][1]);
  }
  logger('setCurrency()');
  put(strings.ratesBackup, rateMatrix);
  put(strings.rates, rateMatrix);
};

/**
 * [getFromFile: redirected from getDate
 * 		get data from local storage file]
 * @return void [description]
 */

export const getFromFile = async (fromFunc, force) => {
  logger('getFromFile()');
  if (
    fromFunc === 'checksum' ||
    fromFunc === 'getDataAsync' ||
    fromFunc === 'extract' ||
    fromFunc === 'welcome'
  ) {
    dataMatrix = [];
    basharyStock = [];
    gemDataMatrix = [];
    basharyStock = await getThatData(strings.bashariInventoryFile.toString());
    dataMatrix = await getThatData(strings.inventoryFile.toString());
    gemDataMatrix = await getThatData(strings.inventoryGemFile.toString());
  }
  if (fromFunc === 'checksumRest') {
    // meaning rest does not need an update
    dataMatrix = [];
    dataMatrix = await getThatData(strings.inventoryFile);
  }
  await setCurrency();
  countryDropdown = (await get(strings.countryLocation)) || [];
  if (basharyStock) dataMatrix = basharyStock.concat(dataMatrix);

  if (
    dataMatrix &&
    gemDataMatrix &&
    dataMatrix.length !== 0 &&
    gemDataMatrix.length !== 0
  ) {
    if (fromFunc === 'getHTML') {
      Alert.alert(
        TEXT.connectionProb,
        TEXT.connectionProbLoadBackup,
        [{ text: TEXT.ok }],
        { cancelable: false }
      );
    }
    FLAG = !force ? 'fromFile' : force;
    REST_FLAG = FLAG;
    return true;
  } else {
    // failed to load from file
    if (
      fromFunc !== 'getHTML' &&
      fromFunc !== 'extract' &&
      fromFunc !== 'checksum'
    ) {
      fetchThis(strings.bashariUrlInternational, strings.international, force);
      fetchThis(strings.bashariUrlChina, strings.inChina, force);
    } else {
      if (fromFunc === 'extract' || fromFunc === 'checksum') {
        dataMatrix = [];
        gemDataMatrix = [];
        var bashBackup = await getThatData(strings.bashariBackup.toString());
        if (bashBackup) {
          var gemBackup = await getThatData(strings.gemBackup.toString());
          var restBackup = await getThatData(strings.restBackup.toString());
          dataMatrix = restBackup;
          dataMatrix = basharyStock.concat(dataMatrix);
          gemDataMatrix = gemBackup;
        } else FLAG = 'extract';
      } else {
        dataMatrix = [];
        gemDataMatrix = [];
        FLAG = 'lockIt';
      }
    }
    REST_FLAG = FLAG;
    return false;
  }
};

/**
 * [getThatData triggered by getFromFile
 * 		handles getting data from sharedPrefs]
 * @param  String  inventoryFile  [name of data file to get]
 * @return boolean                [if success -> true
 *                                    otherwise -> false]
 */
export const getThatData = async (inventoryFile) => {
  return get(inventoryFile)
    .then((temp) => {
      if (temp) {
        logger(`getThatData(${inventoryFile}).success`);
        return temp;
      } else {
        FAIL_FILE = true;
        logger(`!getDatData(${inventoryFile})`);
        FLAG = 'lockIt';
        return false;
      }
    })
    .catch((error) => {
      logger(`E:3${error.message}`);
      logger(`!getThatData(${inventoryFile})`);
      FLAG = 'lockIt';
      REST_FLAG = FLAG;
      return false;
    });
};
/**
 * [handleSearch: redirected from getFromFile && fetchThis
 * 		extracts text from stock file and stores in local db as a modified table]
 * @param  String text [text from stock file]
 * @return void      [description]
 */
export const handleSearch = async (text, restText, force) =>
  bashariExtract(text, restText, force);

/**
 * THIS FUNCTION IS THE FOUNDATION OF THE STOCK SEPERATION
 * [fetchThird triggered by fetchThis
 * 		handles fetching the non-Bashary stock file]
 * @param  boolean  force [true -> user pressed 'refresh' button
 *                        false -> was triggered when the prev file is 'old' and needed to be updated]
 * @return String         [text that was extracted from url]
 */
export const fetchThird = async (force) => {
  logger(`fetchThird(${force})`);
  const url =
    LOCATION === strings.inChina
      ? strings.serenUrlChina
      : strings.serenUrlInternational;

  return RNFetchBlob.fetch('GET', url, {
    'Cache-Control': 'no-store',
  })
    .then(async (resp) => {
      logger('fetchThird.resp.success');
      return await resp.text();
    })
    .then(async (text) => {
      logger('fetchThird.text.success');
      return text;
    })
    .catch((error) => {
      logger(error.message);
      return null;
    });
};

const isAll = (searchArr) => searchArr == strings.all;

export const bashariExtract = async (text, restText, force) => {
  basharyStock = [];
  gemDataMatrix = [];
  var productName = strings.fluorBlank;

  if (typeof text !== 'string') {
    text = String(text);
  }

  var fluorIndex = -1;
  text = text.split('\n'); //  matrix that each row is a row from stock file
  // const categories = rows[0].split('\t'); // first line of stock file is the categories
  const [categories, rows] = [text[0].split('\t'), text.splice(1, text.length)];
  if (categories.length < 10) {
    logger('!bashariExtract');
    put(strings.checksumBash, null);
    getFromFile('extract', null);
    return true;
  } else {
    logger('bashariExtract.success');
    if (!force) {
      titleArr.map((title) => {
        const indexOfTitleInCategories = findIndex(categories, title);
        indexArr.push(indexOfTitleInCategories);

        if (title === strings.fluorescenceColorIntensity)
          fluorIndex = indexOfTitleInCategories;
      });
    }

    rows.map((row) => {
      productName = strings.fluorBlank;
      row = row.split('\t');
      const newRow = [];
      indexArr.map((index, i) => {
        let element = strings.fluorBlank;
        if (index >= 0) {
          element = row[index] || strings.fluorBlank;
          element = element.trim();
          if (
            categories[index].includes(strings.weight) ||
            contains(categories[index], strings.depth) ||
            contains(categories[index], strings.table)
          ) {
            element = arrangeWeightString(element);
          } else {
            element = getElementFullString(element, categories[index]);
          }
          if (
            categories[index] === strings.fancyColorGroup &&
            element.includes('(')
          ) {
            const fancyArr = element.split('(');
            fancyArr[1] = fancyArr[1].replace(')', '');
            newRow[indices.color] = fancyArr[1];
            if (!isValid(row[indexArr[indices.FancyColorIntensity]]))
              row[indexArr[indices.FancyColorIntensity]] = strings.light;
            productName = `${
              row[indexArr[indices.FancyColorIntensity]]
            } ${fancyArr[0].trim()}`;
          }
          if (categories[index] === strings.measurements) {
            const isZeroString = parseFloat(element);
            if (isZeroString == 0) element = strings.fluorBlank;
          }
          if (element === 'NIL') element = strings.fluorBlank;

          if (
            element.length >= 4 &&
            categories[index] !== strings.clarity && //this is how it should be? -> titleArr[indexArr[index]]
            categories[index] !== strings.lab &&
            titleArr[index] !== strings.lotId &&
            categories[index] !== strings.certificateId &&
            categories[index] !== strings.measurements &&
            !+element &&
            !element.includes('http')
          )
            element = upperFirst(element);

          if (categories[index] === strings.lab) {
            if (contains(element, 'eg')) {
              element = strings.egl;
            }
          }
          newRow.push(element);
          if (categories[index] === strings.countryLocation) {
            if (
              countryDropdown.filter(
                (countryObj) => countryObj.text === element
              ).length === 0
            ) {
              if (element !== strings.fluorBlank) {
                countryDropdown.push({
                  key: countryDropdown.length,
                  text: element,
                  isChosen: 0,
                });
              }
            }
          }
          if (titleArr[index] === strings.productName) {
            if (!isValid(newRow[indices.productName]))
              newRow[indices.productName] = productName;
          }
        } else {
          if (i === indices.supplier) {
            newRow.push(strings.basharySupplier);
          } else newRow.push(strings.fluorBlank);
        }
      }); // end of indexArr.map
      if (isLegit(newRow, 0)) {
        basharyStock = sortByAge(basharyStock, newRow);
      }
    }); // end of rows.map

    put(strings.checksumBash, BASH_HASH);
    var value = getTimestamp();
    put(strings.loadFromFile, value);
    put(strings.bashariInventoryFile, basharyStock);
    put(strings.inventoryGemFile, gemDataMatrix);

    put(strings.bashariBackup, basharyStock);
    put(strings.gemBackup, gemDataMatrix);
    put(strings.countryLocation, countryDropdown);

    return restText ? serenExtract(restText, force) : true;
  }
};

export const serenExtract = async (text, force) => {
  if (typeof text !== 'string') {
    text = String(text);
  }
  text = text.split('\n');
  const [categories, rows] = [text[0].split(','), text.splice(1, text.length)];
  if (categories.length < 10 || !text) {
    errorNum += '!serenExtract\n';
    put(strings.checksumSeren, null);
    getFromFile('checksumSeren', null);
    return true;
  }
  errorNum += 'serenExtract.success\n';
  const serenTitles = {
    [strings.lotId]: 'VendorStockNumber',
    [strings.fancyColorGroup]: 'FancyColor',
    [strings.fluorescenceColorIntensity]: 'FluorescenceIntensity',
    [strings.rap]: 'RapnetDiscountPercent',
    [strings.link1]: 'DiamondImage',
    [strings.certificateLink]: 'CertificateImage',
    [strings.totalCost]: 'RapnetAskingPrice',
  };
  // type = loose
  // supplier = seren
  //
  let fluorIndex = -1;
  if (!force) {
    titleArr.map((title, i) => {
      const serenTitle = serenTitles[title] || title;
      const indexOfTitleInCategories = findIndex(categories, serenTitle);
      categories[indexOfTitleInCategories] = title;
      indexArrSeren.push(indexOfTitleInCategories);
      if (title === strings.fluorescenceColorIntensity)
        fluorIndex = indexOfTitleInCategories;
    });
  }
  rows.map((row) => {
    row = row.split(',');
    const newRow = [];
    let weight = 1;
    indexArrSeren.map((index, i) => {
      let element = strings.fluorBlank;
      if (index >= 0) {
        // const titulo = categories[index];
        element = row[index] || strings.fluorBlank;
        element = element.trim();

        if (categories[index] === strings.lotId && isValid(element)) {
          element = `MS${element}`;
        }

        if (categories[index] === strings.totalCost) {
          element = +element;
          if (element) {
            element = parseInt(2 * element * weight, 10);
          }
        }

        if (
          index < categories.length &&
          (categories[index].includes(strings.weight) ||
            contains(categories[index], strings.depth) ||
            contains(categories[index], strings.table) ||
            contains(categories[index], strings.totalCost))
        ) {
          element = arrangeWeightString(element);
        } else {
          element = getElementFullString(element, categories[index]);
        }
        if (categories[index] === strings.weight) weight = +element;

        // if (categories[index] === strings.fancyColorGroup)
        // {
        // const fancyArr = element.split('(');
        // fancyArr[1] = fancyArr[1].replace(')', '');
        // newRow[indices.color] = element;//fancyArr[1];
        // if (!isValid(row[indexArr[indices.FancyColorIntensity]])) row[indexArr[indices.FancyColorIntensity]] = strings.light;
        // productName = `${row[indexArr[indices.FancyColorIntensity]]} ${fancyArr[0].trim()}`;
        // }
        if (categories[index] === strings.measurements) {
          const isZeroString = parseFloat(element);
          if (isZeroString == 0) element = strings.fluorBlank;
        }
        if (element === 'NIL') element = strings.fluorBlank;

        if (
          element.length >= 4 &&
          categories[index] !== strings.clarity &&
          categories[index] !== strings.lab &&
          categories[index] !== strings.lotId &&
          categories[index] !== strings.certificateId &&
          categories[index] !== strings.measurements &&
          !+element &&
          !element.includes('http')
        )
          element = upperFirst(element);

        if (categories[index] === strings.lab) {
          if (contains(element, 'eg')) {
            element = strings.egl;
          }
        }
        newRow.push(element);
      } else {
        if (i === indices.supplier) {
          newRow.push(strings.serenSupplier);
        } else newRow.push(strings.fluorBlank);
      }
    }); // end of indexArr.map
    if (isLegit(newRow, 0)) {
      dataMatrix.push(newRow);
    }
  }); // end of row.map
  put(strings.inventoryFile, dataMatrix);
  logger(`rest ${dataMatrix.length}`);
  put(strings.restBackup, dataMatrix);
  dataMatrix = basharyStock.concat(dataMatrix);
  const time = getTimestamp();
  put(strings.loadRestFromFile, time);
  put(strings.checksumRest, HASH);
  REST_FLAG = FLAG;
  return true;
};

/**
 * [extract redirected from handleSearch
 * 		extracts corresponding data from text variable and store it in dataMatrix]
 * @param  String text      [data from inventory file]
 */
export const extract = async (text, force) => {
  ITEMS_TO_DOWNLOAD = 0;
  FIRST_ITEMS_TO_DOWNLOAD = 0;

  if (typeof text !== 'string') {
    text = String(text);
  }

  var fluorIndex = -1;
  var rateIndex = -1;
  var asteriaPriceIndex = -1;
  text = text.split('\n');

  const [categories, rows] = [text[0].split('\t'), text.splice(1, text.length)];

  if (categories.length < 10 || !text) {
    errorNum += '!extract\n';
    put(strings.checksum, null);
    getFromFile('checksumRest', null);
    return true;
  } else {
    errorNum += 'extract.success\n';
    if (!force) {
      titleArr.map((title, i) => {
        const indexOfTitleInCategories = findIndex(categories, title);
        indexArrRest.push(indexOfTitleInCategories);
        if (title === strings.fluorescenceColorIntensity)
          fluorIndex = indexOfTitleInCategories;
        //if (title === strings.rateForSite || title === strings.asteriaPrice) indexArrRest.push(i);
      });
    }

    rows.map((row) => {
      row = row.split('\t');
      const newRow = [];

      indexArrRest.map((index) => {
        let element = strings.fluorBlank;
        if (index >= 0) {
          element = row[index] || strings.fluorBlank;
          element = element.trim();
          if (
            categories[index].includes(strings.weight) ||
            contains(categories[index], strings.depth) ||
            contains(categories[index], strings.table)
          ) {
            element = arrangeWeightString(element);
          } else {
            element = getElementFullString(element, categories[index]);
          }

          if (categories[index] === strings.measurements) {
            const isZeroString = parseFloat(element);
            if (isZeroString == 0) element = strings.fluorBlank;
          }

          if (
            element.length >= 4 &&
            categories[index] !== strings.clarity &&
            categories[index] !== strings.lab &&
            titleArr[index] !== strings.lotId && // not optimal, but lotId label in file is LotIdStr, and i have LodID
            categories[index] !== strings.measurements &&
            !+element &&
            !element.includes('http') &&
            categories[index] !== strings.certificateId
          )
            element = capitalize(element);
        }
        newRow.push(element);
      });
      if (isLegit(newRow, 1)) {
        if (newRow[indices.supplier] !== strings.basharySupplier) {
          dataMatrix.push(newRow);
        }
      }
    });
  }

  put(strings.inventoryFile, dataMatrix);
  logger(`rest ${dataMatrix.length}`);
  put(strings.restBackup, dataMatrix);
  dataMatrix = basharyStock.concat(dataMatrix);
  const time = getTimestamp();
  put(strings.loadRestFromFile, time);
  put(strings.checksumRest, HASH);
  REST_FLAG = FLAG;
  return true;
};

/**
 * [sortByAge triggered by extract
 * 		handles sorting Bashari stock by age]
 * @param  String [][]  matrix  [matrix of bashari items]
 * @param  String []    newRow  [row to add to the matrix]
 * @return String [][]  matrix  [matrix of bashari items plus newRow added in the right place]
 */
export function sortByAge(matrix, newRow) {
  if (matrix.length === 0) {
    matrix.push(newRow);
  } else {
    var currAge = parseInt(newRow[indices.age], 10);
    var done = false;

    for (let i = 0; i < matrix.length && !done; i++) {
      if (currAge <= parseInt(matrix[i][indices.age], 10)) {
        matrix.splice(i, 0, newRow);
        done = true;
      }
    }
    if (!done) {
      matrix.push(newRow); // at to end of matrix
    }
  }
  return matrix;
}

/**
 * [findIndex redirected from searchBy**** fucntions, search && extract
 * 		find index of an element of an array]
 * @param  String [] row   [an array of strings]
 * @param  string 	 value [value of element that needs to be found]
 * @return int       	   [corresponding index, if doesn't exist, return -1]
 */
export function findIndex(row, value) {
  value = value.toUpperCase();

  for (let i = 0; i < row.length; i++) {
    let title = row[i];
    title = title.toUpperCase();
    title = title.replace(/\s/g, '');
    if (title.includes(value) || title.includes(value.replace(/\s/g, ''))) {
      if (
        !title.includes(strings.price4.toUpperCase()) ||
        title == value.replace(/\s/g, '')
      ) {
        return i;
      }
    }
  }
  return -1;
}

//========PDF Generator=======================================================

/**
 * [generatePDF called from DetailFooter.js, ItemDetails.js && JewelryItemDetails.js
 * 		the pdf generator library converts HTML to pdf, so here, I'm creating an HTML
 * 		with all data and it gets converted pretty smoothly]
 * @param  String []  dataArr [array of selected item details]
 * @return void         	  [description]
 */
export const generatePDF = async (dataArr, newPrice, includeLogo, pics) => {
  var details = await getString(dataArr, newPrice);
  var cert = dataArr[strings.certificateLink];

  var htmlToPdf =
    '<html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>.pic {border-style: solid;border-color: #838383; border-width: thin;}</style></head>';

  htmlToPdf +=
    '<body><div style="background-color:white; margin-left:35px; margin-right:35px">';

  if (includeLogo) htmlToPdf += strings.logoImagePdf;

  htmlToPdf +=
    '<font size = "2" face = "Agenda-Light" weight="bold">' +
    '<p>PRODUCT DETAILS</p>' +
    '</font><hr>';

  htmlToPdf += details;

  if (pics.length !== 0) {
    htmlToPdf +=
      '<font size = "2" face = "Agenda-Light" weight="bold">' +
      '<p style="margin-top:10px">PRODUCT IMAGES</p>' +
      '</font><hr>';
  }

  htmlToPdf += '<div align="center">' + '<table width = "100%"> ';

  for (let i = 0; i < pics.length; i++) {
    if (Platform.OS === 'ios') {
      if (pics[i].includes('jpg') || pics[i].includes('JPG')) {
        if (i % 2 === 0) {
          htmlToPdf += `<tr valign="top"><td align="left"><img class="pic" style="" src="${pics[i]}" alt="image" width="300" height="auto"></td>`;
        } else {
          htmlToPdf += `<td align="right"><img class="pic" src="${pics[i]}" alt="image" width="300" height="auto"></td></tr>`;
        }
      }
    } else {
      if (pics[i].includes('jpg') || pics[i].includes('JPG')) {
        if (i % 2 === 0) {
          htmlToPdf += `<tr valign="top"><td align="left"><img style="" src="${pics[i]}" alt="image" width="300" height="auto" border="1 solid #838383"></td>`;
        } else {
          htmlToPdf += `<td align="right"><img src="${pics[i]}" alt="image" width="300" height="auto" border="1 solid #838383"></td></tr>`;
        }
      }
    }
  }

  htmlToPdf += '</table></div></div></body></html>';
  const IMG = pics[0];

  var altCertInd = indices.certificateId;

  if (isValid(cert)) {
    var link = supplierLink(CERT_PREFIX, cert, dataArr[strings.supplier]);
    if (link && link.includes('http')) {
      if (!cert.includes('pdf')) {
        htmlToPdf += `<img src="${link}" alt= ${cert} height="900" width="100%">`;
      }
    }
  }
  htmlToPdf += '</table></div></div></body></html>';

  const dirs = RNFetchBlob.fs.dirs;
  const options =
    Platform.OS === 'ios'
      ? {
          html: htmlToPdf,
          fileName: dataArr[strings.lotId],
          directory: 'docs',
        }
      : {
          html: htmlToPdf,
          fileName: `${dataArr[strings.lotId]}`,
          directory: `Documents/${dataArr[strings.lotId]}.pdf`,
        };

  const file = await RNHTMLtoPDF.convert(options);

  var ans;
  ans = [file.filePath, false];
  return ans;
};
/**
 * [getString redirects from generatePDF
 * 		generates a string that will be embedded in HTML that later gets converted to PDF]
 * @param  String [] dataArr    [chosen item details]
 * @return String    arrResult  [chosen item details in a string format]
 */
export const getString = async (dataArr, newPrice) =>
  isValid(dataArr[strings.color])
    ? getWhiteTitle(dataArr, newPrice)
    : getFancyTitle(dataArr, newPrice);

/**
 * [getWhiteTitle redirected from getString
 * 		return white item titles]
 * @param  String []  dataArr 			[array of item data]
 * @return String     stringDetails     [white item title to be displayed in PDF]
 */
export const getWhiteTitle = (dataArr, newPrice) => {
  newPrice = typeof newPrice === 'string' ? 0 : newPrice[0] || newPrice[1];

  let vid = '';
  if (dataArr.VIDEO !== strings.fluorBlank) {
    vid = `<td><a href="${dataArr.VIDEO}" style="color:#2F364C;">${TEXT.video}</a></td>`;
  }

  const fluor = dataArr[strings.fluorescenceColorIntensity];

  var centerWeight =
    dataArr[strings.centerWeight] &&
    dataArr[strings.centerWeight] !== strings.fluorBlank
      ? `<tr><td style = "color: ${colors.pdfLabelGray}">${
          TEXT.centerWeight
        }</td><td>${dataArr[strings.centerWeight]}${TEXT.ct} (${
          TEXT.totalDisplay
        }: ${dataArr[strings.weight]}${TEXT.ct})</td></tr>`
      : `<tr><td style = "color: ${colors.pdfLabelGray}">${
          TEXT.totalDisplay
        }</td><td>${dataArr[strings.weight]}${TEXT.ct}</td></tr>`;

  var stringDetails = `<div><font size = "1" face = "Agenda-Light" weight="bold">
	<table width = "400">
	<tr><td style = "color: ${colors.pdfLabelGray}">${strings.sku}</td><td>${
    dataArr[strings.lotId]
  }${vid}</td></tr>
	<tr><td style = "color: ${colors.pdfLabelGray}">${TEXT.color}</td><td>${
    dataArr[strings.color]
  }</td></tr>
	<tr><td style = "color: ${colors.pdfLabelGray}">${TEXT.Shape}</td><td>${
    dataArr[strings.Shape]
  }</td></tr>
	${centerWeight}
	<tr><td style = "color: ${colors.pdfLabelGray}">${
    TEXT.clarity
  }</td><td>${getNone(dataArr[strings.clarity])}</td></tr>
	<tr><td style = "color: ${colors.pdfLabelGray}">${
    TEXT.fluor
  }</td><td>${fluor}</td></tr>
	<tr><td style = "color: ${colors.pdfLabelGray}">${
    TEXT.totalDisplay
  }</td><td>${CURRENCY_SIGN}${newPrice}</td></tr>
	</table></font></div>`;

  return stringDetails;
};

/**
 * [getFancyTitle redirected from getString
 * 		return fancy item titles]
 * @param  String   dataArr   		[array of item data]
 * @return String   stringDetails   [fancy item title to be displayed in PDF]
 */
export function getFancyTitle(dataArr, newPrice) {
  var stringDetails;
  newPrice = newPrice.includes('C') ? 0 : newPrice[0] || newPrice[1];

  let vid = '';
  if (dataArr.VIDEO !== strings.fluorBlank) {
    vid = `<td><a href="${dataArr.VIDEO}" style="color:#2F364C;">${TEXT.video}</a></td>`;
  }

  if (!isValid(dataArr[strings.gemType])) {
    const fluor = dataArr[strings.fluorescenceColorIntensity];

    // if jewelry, centerwight : weight
    var weight = isValid(dataArr[strings.type])
      ? `<tr><td style = "color: ${colors.pdfLabelGray}">${
          TEXT.centerWeight
        }</td><td>${dataArr[strings.centerWeight]}${TEXT.ct} (${
          TEXT.totalDisplay
        }: ${dataArr[strings.weight]}${TEXT.ct})</td></tr>`
      : `<tr><td style = "color: ${colors.pdfLabelGray}">${
          TEXT.totalDisplay
        }</td><td>${dataArr[strings.weight]}${TEXT.ct}</td></tr>`;

    stringDetails = `<body><font size = "1" face = "Agenda-Light" weight="bold">
			<table width = "400">
			<tr><td style = "color: ${colors.pdfLabelGray}">${strings.sku}</td><td>${
      dataArr[strings.lotId]
    }${vid}</td></tr>
			<tr><td style = "color: ${colors.pdfLabelGray}">${TEXT.color}</td><td>${
      dataArr.FULL_FANCY
    }</td></tr>
			<tr><td style = "color: ${colors.pdfLabelGray}">${TEXT.Shape}</td><td>${
      dataArr[strings.Shape]
    }</td></tr>
			${weight}
			<tr><td style = "color: ${colors.pdfLabelGray}">${
      TEXT.clarity
    }</td><td>${getNone(dataArr[strings.clarity])}</td></tr>
			<tr><td style = "color: ${colors.pdfLabelGray}">${
      TEXT.fluor
    }</td><td>${fluor}</td></tr>
			<tr><td style = "color: ${colors.pdfLabelGray}">${
      TEXT.totalDisplay
    }</td><td>${CURRENCY_SIGN}${newPrice}</td></tr>
			</table></font></body>`;
  } else {
    // gemstone
    var colorNType = `${dataArr[strings.gemType]} ${dataArr[strings.type]}`;

    stringDetails = `<body><font size = "1" face = "Agenda-Light" weight="bold">
			<table width = "400">
			<tr><td style = "color: ${colors.pdfLabelGray}">${strings.sku}</td><td>${
      dataArr[strings.lotId]
    }</td></tr>
			<tr><td style = "color: ${colors.pdfLabelGray}">${
      TEXT.type
    }</td><td>${colorNType}</td></tr>
			<tr><td style = "color: ${colors.pdfLabelGray}">${TEXT.color}</td><td>${
      dataArr[strings.fancyColorGroup]
    }</td></tr>
			<tr><td style = "color: ${colors.pdfLabelGray}">${TEXT.Shape}</td><td>${
      dataArr[strings.Shape]
    }</td></tr>
			<tr><td style = "color: ${colors.pdfLabelGray}">${TEXT.centerWeight}</td><td>${
      dataArr[strings.weight]
    }${TEXT.ct}</td></tr>
			<tr><td style = "color: ${colors.pdfLabelGray}">${
      TEXT.clarity
    }</td><td>${getNone(dataArr[strings.clarity])}</td></tr>
			<tr><td style = "color: ${colors.pdfLabelGray}">${
      TEXT.totalDisplay
    }</td><td>${CURRENCY_SIGN}${newPrice}</td></tr>
			</table></font></body>`;
  }
  return stringDetails;
}

/**
 * [getImages redirected from generatePDF
 * 		handles images of item to display on PDF]
 * @param  String [] dataArr [array of item data]
 * @return String [] result  [array of image URLs]
 */
export function getImages(dataArr) {
  var result = [];

  const indexArr = [
    indices.link1,
    indices.link2,
    indices.link3,
    indices.link4,
    indices.link5,
    indices.link6,
    indices.link7,
    indices.link8,
    indices.link9,
    indices.link10,
  ];

  indexArr.map((index) => {
    if (dataArr[index] && isValid(dataArr[index])) {
      !supplierCheck(dataArr[indices.supplier])
        ? result.push(dataArr[index])
        : result.push(IMAGE_PREFIX + dataArr[index]);
    }
  });

  return result;
}

/**
 * [getVal redirected from ItemView.js, ItemDetails.js, JewelryItemDetails.js && JewelryItemView.js
 * 		returns the display value of UI labels && values]
 * @param  String  rawValue [value of category from dataMatrix]
 * @return String           [display value]
 */
export function getVal(rawValue) {
  if (rawValue) {
    rawValue = rawValue.toUpperCase();
    switch (rawValue) {
      case strings.excellent.toUpperCase():
        return TEXT.exDisplay;

      case strings.veryGood.toUpperCase():
        return TEXT.vgDisplay;

      case strings.good.toUpperCase():
        return TEXT.gDisplay;

      case strings.fair.toUpperCase():
        return TEXT.fDisplay;

      case strings.poor.toUpperCase():
        return TEXT.pDisplay;

      case strings.verySlight.toUpperCase():
        return TEXT.vSlight;

      // ====faint slight
      case strings.faint.toUpperCase():
        return TEXT.faintDisplay;

      case strings.slight.toUpperCase():
        return TEXT.slDisplay;
      /// =================
      case strings.medium.toUpperCase():
        return TEXT.mDisplay;

      case strings.strong.toUpperCase():
        return TEXT.stgDisplay;

      case strings.veryStrong.toUpperCase():
        return TEXT.vStgDisplay;

      case strings.none.toUpperCase():
        return TEXT.nDisplay;

      case strings.totalPrice.toUpperCase():
        return TEXT.totalDisplay;

      case strings.fluorBlank:
        return strings.fluorBlank;
      default:
        return strings.fluorBlank;
    }
  }
}

/**
 * [getNone redirected from getWhiteTitle, getFancyTitle, labRefine
 * 		returns a universal value of NONE to be stored in dataMatrix
 * 		if value != null, if it equals none, return NONE
 * 		otherwise, return value]
 * @param  String  value  [value of supposedly blank value]
 * @return String  value  [correct value of NONE]
 */
export function getNone(value) {
  if (value) {
    // TODO what about if value is null?
    var temp = value.toUpperCase();
    if (temp == strings.none.toUpperCase() || temp == strings.fluorBlank)
      return strings.fluorBlank;
    if (temp == strings.gubelinSearch) return strings.gubelin;
    return value;
  }
  return value;
}

/**
 * [labRefine redirected from ItemView.js, ItemDetails.js, JewelryItemDetails.js && JewelryItemView.js
 * 		returns display value of EGL lab values]
 * @param  String lab [lab from item details]
 * @return String  [display value of that lab, or proceeds with getNone]
 */
export function labRefine(lab) {
  if (lab) {
    var temp = lab.toUpperCase();
    if (temp.includes(strings.egl)) {
      return strings.egl;
    }
    return getNone(lab);
  }
}

/**
 * [callPhone redirected from ItemDetails.js, JewelryItemDetails.js && OurOffices.js
 * 		calls seleced phone]
 * @param  String  country  [phone number to call]
 * @return void             [description]
 */
export function callPhone(country) {
  if (!TABLET) {
    const args = {
      number: country, // String value with the number to call
      prompt: false, // Optional boolean property. Determines if the user should be prompt prior to the call
    };
  }
}

/**
 * [send redirected from generatePDF
 * 		open share prompt to share PDF]
 * @param  String path   [PDF file path]
 * @return void 	     [description]
 */
export const send = async (path, multiple) => {
  if (multiple) {
    Share.open({
      title: TEXT.share,
      message: TEXT.shareMessage,
      urls: path,
      subject: TEXT.shareSubject,
    })
      .then((res) => logger(`send ${res.status}`))
      .catch((err) => logger(`!send ${err.message}`));
  } else {
    if (Platform.OS === 'android') {
      path = `file://${path}`;
      Share.open({
        title: TEXT.share,
        message: TEXT.shareMessage,
        url: path,
        type: 'application/pdf',
        subject: TEXT.shareSubject,
      })
        .then((res) => logger(`send ${res.status}`))
        .catch((err) => logger(`!send ${err.message}`));
    } else {
      Share.open({
        url: path.toString(),
        type: 'application/pdf',
        subject: TEXT.shareSubject,
      })
        .then((res) => logger(`send ${res.status}`))
        .catch((err) => logger(`!send ${err.message}`));
    }
  }
};

/**
 * [manualRegionHandles triggered by fetchThis
 * 		handles setting current location info based on the first stock fetched
 * 		case china returned first -> set location && urls to cn servers
 * 		otherwise -> set location && urls to en servers]
 * @param  boolean  china  [true -> means china
 *                         false -> means international]
 * @return String          [location string
 *                                   China for china
 *                                   International otherwise]
 */
export const manualRegionHandles = (china) => {
  logger(`manualRegionHandles(${china})`);
  if (china) {
    put(strings.currentLocation, strings.inChina);
    LOCATION = strings.inChina;
    IP_ADD = strings.inChina;
    setLocation();
    return strings.inChina;
  } else {
    put(strings.currentLocation, strings.international);
    setLocation();
    IP_ADD = strings.international;
    stockURL = strings.bashariUrlInternational;
    LOCATION = strings.international;
    return strings.international;
  }
};

/**
 * [getCountryPrefix triggered by setLocation
 * 		handles returning location corresponding prefix of file(image or cert)
 * 		-china -> strings.chinaPrefix
 * 		-otherwize -> strings.internationalPrefix]
 * @param  String  type  [type of media:
 *                       images -> for images
 *                       certs -> for certificates]
 * @return String        [full prefix string]
 */
export const getCountryPrefix = async (type) => {
  if (isTextEqual(LOCATION, strings.inChina)) {
    logger('getCountryPrefix.china');
    stockURL = strings.bashariUrlChina;
    return strings.chinaPrefix + getTypeSuffix(type);
  } else {
    logger('getCountryPrefix.notChina');
    stockURL = strings.bashariUrlInternational;
    return strings.internationalPrefix + getTypeSuffix(type);
  }
};

/**
 * [getTypeSuffix triggered by getCountryPrefix]
 * @param  String  type  [type of media:
 *                       images -> for images
 *                       certs -> for certificates]
 * @return String        [corresponding server directory of each type
 *                       images -> for images
 *                       certs -> for certificates]
 */
export const getTypeSuffix = (type) =>
  isTextEqual(type, strings.certSuffix)
    ? strings.certSuffix
    : strings.imageSuffix;

/**
 * [setLocation triggered by manualRegionHandles
 * 		assign value to IMAGE_PREFIX && CERT_PREFIX according to location in local storage]
 */
export const setLocation = () => {
  getCountryPrefix(strings.imageSuffix).then((ans) => {
    IMAGE_PREFIX = ans;
  });

  getCountryPrefix(strings.certSuffix).then((ans) => {
    CERT_PREFIX = ans;
  });
};

/**
 * [arrangeString triggered by searchByLotID
 * 		handles weight input
 * 		if input ends with 0, remove it iteratively
 * 		if input starts with a . (dot), append zero to beginning]
 * @param  String  st  [user's input]
 * @return String  st  [st after modification in format x.y while x != . && y != 0 && y != .]
 */
export const arrangeWeightString = (st) => {
  if (!+st || st == 0) {
    return strings.fluorBlank;
  }
  st = +st;
  return Number.isInteger(st) ? st.toFixed(1) : st;
};

/**
 * [setWeight triggered by ItemDetails.js ItemView.js, JewelryItemView.js && JewelryItemDetails.js
 * 		handles displaying non decimal weight values with .0]
 * @param String  w  [if w includes . -> return same w
 *                   otherwise -> append .0 to end]
 */
export const setWeight = (w) =>
  w.includes('.') || !isValid(w) ? w : `${w}.00`;
/**
 * [getTextSize description triggered by all components
 * 		handle sizing of components usng REM
 * 		(REM -> refer to styling.js || top page initializations )]
 * @param  float    size   [base size]
 * @return float           [size after multiplying by REM]
 */
export const getTextSize = (size) => REM * size;

/**
 * [supplierCheck triggered by itemDetails, jewelryItemView, jewelryItemDetails
 * 		handles things that are supplier dependent]
 * @param  String/int  supplier  [supplier indicator]
 * @return boolean               [true -> when supplier is 302 (meaning Bashari)
 *                                false -> otherwise]
 */
export const supplierCheck = (supplier) => supplier == 302;

/**
 * [generateCertPDF triggered by CertView && generatePDF
 * 		handles creating a pdf of certificate file only, and shares it through share()]
 * @param  String  linkURL  [link of certificate]
 * @param  String  alt      [aname of file]
 * @return void             [description]
 */
export const generateCertPDF = async (linkURL, alt, lab) => {
  if (linkURL.includes('pdf')) {
    const dirs = RNFetchBlob.fs.dirs;
    return RNFetchBlob.config({
      path: `${dirs.DocumentDir}/${lab}_${alt}.pdf`,
    })
      .fetch('GET', linkURL)
      .then((res) => res.path());
  }

  const htmlToPdf = `<img src="${linkURL}" alt="${alt}" height="100%" width="100%">`;
  const options =
    Platform.OS === 'ios'
      ? {
          html: htmlToPdf,
          fileName: alt,
          directory: 'docs',
        }
      : {
          html: htmlToPdf,
          fileName: alt,
          directory: `Documents/${alt}.pdf`,
        };

  const file = await RNHTMLtoPDF.convert(options);
  return file.filePath;
};

/**
 * [isLegit triggered by extract()
 * 		handles checking whether entry is valid for display]
 * @param  String []  row  [array of item details]
 * @return boolean     	   [false -> if color == null || weight == 0 || shape == 0
 *                          true -> otherwise]
 */
export function isLegit(row, ind) {
  const whiteIndex = indices.color;
  const fancyIndex = indices.fancyColorGroup;

  if (!isValid(row[0])) return false;

  if (
    ACCESS === strings.continueAsGuest ||
    ACCESS === strings.registered ||
    ACCESS === strings.unverified
  ) {
    if (
      (row[indices.link1] === strings.fluorBlank &&
        row[indices.type] !== strings.fluorBlank) ||
      row[indices.allocation] !== strings.fluorBlank
    ) {
      // no pic && type is not loose
      return false;
    } else {
      if (
        row[indices.gemType] !== strings.fluorBlank &&
        row[indices.gemType] !== strings.none &&
        row[indices.gemType] !== ''
      ) {
        gemDataMatrix.push(row);
        return false;
      }
      if (
        row[whiteIndex] === strings.fluorBlank &&
        row[fancyIndex] === strings.fluorBlank
      ) {
        return false;
      }
      return true;
    }
  } else {
    if (
      ACCESS == strings.wholesale &&
      row[indices.allocation] !== strings.fluorBlank
    ) {
      return false;
    }

    if (isValid(row[indices.gemType])) {
      // meaning this is a gem, sent from bashariExtract
      if (ind === 0) {
        gemDataMatrix.push(row);
      }
      return false;
    }
    if (row[indices.weight] === strings.fluorBlank) {
      return false;
    }

    if (
      row[whiteIndex] === strings.fluorBlank &&
      row[fancyIndex] === strings.fluorBlank
    ) {
      return false;
    }
  }
  return true;
}

/**
 * [updateAccess triggered by GuestLogin().isLoggedIn(), GuestLogin().isPasswordCorrect()
 * 		 handles assigning user's input passdowrd to ACCESS,
 * 		 some attributes will only be displayed is ACCESS == strings.managerPassword]
 * @param  {[type]} password [description]
 * @return {[type]}          [description]
 */
export const updateAccess = (password: string) => {
  ACCESS = password;
};

export const updateEmail = (email) => {
  EMAIL = email;
};

export const updateCo = (co) => {
  COMPANY = co;
};

/**
 * [getCertPdf triggered by generatePDF()
 * 		handles adding certificate links to PDF for share]
 * @param  String  linkURL  [url of certificate]
 * @param  String  alt      [String for alt(not in use for now, but I'm scared removing it)]
 * @return String           [if ios -> html string to append to htmlToPdf of generatePDF
 *                           otherwise -> path of certificate pdf]
 */
export const getCertPdf = async (linkURL, alt) => {
  const dirs = RNFetchBlob.fs.dirs;
  return RNFetchBlob.config({
    path: `${dirs.DocumentDir}/${alt}`,
  })
    .fetch('GET', linkURL, {})
    .then((res) => res.path());
};

/**
 * [getPrice triggered by itemDetails.render(), itemView.render(), jewelryItemView.render() && jewelryItemDetails.render()
 * 		handles 0 valued prices]
 * @param  String  price  [price value of item in check]
 * @return String         [0/null/none -> return -
 * 		                   otherwise -> price without decimals]
 */
export function getPrice(asteriaPrice, price, rateForSite) {
  if ((!isValid(asteriaPrice) && !isValid(price)) || asteriaPrice == 1) {
    return strings.callForPrice;
  }
  let priceTimesRate = getDiscountPrice(price, rateForSite);
  priceTimesRate = convertPrice(priceTimesRate, false);
  let asteriaPriceNumber = convertPrice(+asteriaPrice, true);

  if (!asteriaPriceNumber || asteriaPriceNumber === 0) {
    asteriaPriceNumber = null;
  }

  if (priceTimesRate * 0.97 < asteriaPriceNumber) {
    if (priceTimesRate * 0.97 === priceTimesRate)
      return [null, asteriaPriceNumber];
    return [null, priceTimesRate.toString()];
  }

  return priceTimesRate < asteriaPriceNumber
    ? [priceTimesRate.toString(), asteriaPriceNumber]
    : [asteriaPriceNumber, priceTimesRate.toString()];
}

export const scratchedPriceView = (style, price) => (
  <Text style={style}>{getDollarSign(price, false)} </Text>
);

export const getDiscountPrice = (price, rateForSite) =>
  rmDecimals(priceFix(price, rateForSite));

export const multiply = (x, y) => priceFix(x, y);

export function priceFix(price, rateForSite) {
  if (!isValid(rateForSite)) rateForSite = 1.3;

  price = parseInt(price);
  rateForSite = parseFloat(rateForSite);

  price *= rateForSite;
  price = rmDecimals(price);

  return price;
}

export function convertPrice(price, isAsteriaPrice) {
  if (price == strings.callForPrice) {
    return price;
  }
  if (isAsteriaPrice) {
    price = parseFloat(price);
    return CURRENCY_RATE * price;
  }
  price = parseInt(price);
  var newPrice = CURRENCY_RATE * price;
  newPrice = rmDecimals(newPrice);

  return newPrice;
}

export function rmDecimals(price) {
  price /= 100;

  price = parseInt(price, 10); //Number(price).toFixed(0);
  price = price * 100;

  price = Number(price).toFixed(0);

  price = parseInt(price, 10);
  return price;
}

export function getWeightFloat(price, co) {
  price = co * price;

  price = price / 100;

  price = Number(price).toFixed(0);
  price = price * 100;

  price = Number(price).toFixed(0);

  price = parseInt(price, 10);

  return price;
}

export const weightFix = (weight) => parseFloat(weight);

/**
 * [supplierCheck triggered by generatePDF()
 * 		handles media links of two types of suppliers:, Bashary, non-Bashary ]
 * @param  String  type  [image or cert]
 * @param  String  url   [url of image/cert from item's details]
 * @return String        [type+url -> Bashary items
 *                        url -> non-Bashary items]
 */
export const supplierLink = (type, url, supplier) =>
  isValid(supplier) && supplier == strings.basharySupplier
    ? `${type}${url}`
    : url;

/**
 * [getFullFancy triggered by itemView.getTitle() , itemDetails.getTitle(), JewelryItemDetails.getTitle()
 * 		handles displaying full string of color of fancy colored items]
 * @param  String  intensity  [item's intensity]
 * @param  string  overtone   [item's overtone]
 * @return String             [full fancy color string of item] 78654
 */
export function getFullFancy(intensity, overtone, fancyColorGroup) {
  intensity = TEXT.INTENSITY[intensity.toUpperCase()] || strings.fluorBlank;
  overtone = capitalize(getColorString(overtone)) || strings.fluorBlank;
  fancyColorGroup = getColorString(fancyColorGroup) || strings.fluorBlank;
  var fancyColor = '';
  if (isValid(intensity)) {
    fancyColor += `${intensity}`;
  }
  if (isValid(overtone)) {
    fancyColor += ` ${overtone}`;
  }

  fancyColor = fancyColor.replace('-', ' ');
  fancyColor += ` ${fancyColorGroup}`;

  return fancyColor.trim();
}

export function arrangeLocation(dataArr) {
  var loc = null;
  var space = ', ';
  let bashariLocation = '';
  if (dataArr[strings.bashariLocation]) {
    bashariLocation =
      dataArr[strings.bashariLocation].length > 10
        ? `${capitalize(dataArr[strings.bashariLocation])}\n`
        : `${capitalize(dataArr[strings.bashariLocation])}, `;
  }

  const countryLocation = dataArr[strings.countryLocation]
    ? `${capitalize(dataArr[strings.countryLocation])}, `
    : '';
  const departmentInFantasy = dataArr[strings.departmentInFantasy]
    ? `${dataArr[strings.departmentInFantasy]}, `
    : '';
  const availability = dataArr[strings.availability]
    ? `${capitalize(dataArr[strings.availability])}`
    : '';
  if (ACCESS == strings.manager) {
    loc = `${bashariLocation}${countryLocation}${departmentInFantasy}${availability}`;
  }
  if (ACCESS == strings.asteriaSalespeople) {
    loc = `${countryLocation}${departmentInFantasy}${availability}`;
  }
  if (ACCESS == strings.wholesale) {
    loc = countryLocation;
  }
  return loc;
}

export function getP(totalCost) {
  totalCost =
    totalCost && isValid(totalCost)
      ? `${CURRENCY_SIGN}${totalCost}`
      : strings.fluorBlank;

  if (ACCESS == strings.manager) {
    return (
      <View style={styling.styles.idCostModalEntryViewStyle}>
        <Text
          style={getStyle(
            styling.styles.idMoreInfoDetailsLabelTextStyle,
            styling.styles.idTabletMoreInfoDetailsLabelTextStyle
          )}>
          {strings.p}:
        </Text>
        <Text
          style={getStyle(
            styling.styles.idMoreInfoDetailsTextStyle,
            styling.styles.idTabletMoreInfoDetailsTextStyle
          )}>
          {totalCost}
        </Text>
      </View>
    );
  }
}

export function getLocation(dataArr) {
  var loc = arrangeLocation(dataArr) || strings.fluorBlank;
  return (
    <View style={styling.styles.idCostModalEntryViewStyle}>
      <Text
        style={getStyle(
          styling.styles.idMoreInfoDetailsLabelTextStyle,
          styling.styles.idTabletMoreInfoDetailsLabelTextStyle
        )}>
        {strings.location}:
      </Text>
      <Text
        style={getStyle(
          styling.styles.idMoreInfoDetailsTextStyle,
          styling.styles.idTabletMoreInfoDetailsTextStyle
        )}>
        {loc}
      </Text>
    </View>
  );
}

export function getAge(age) {
  if (ACCESS == strings.manager) {
    // age = age || strings.fluorBlank
    if (!age) age = strings.fluorBlank;
    return (
      <View style={styling.styles.idCostModalEntryViewStyle}>
        <Text
          style={getStyle(
            styling.styles.idMoreInfoDetailsLabelTextStyle,
            styling.styles.idTabletMoreInfoDetailsLabelTextStyle
          )}>
          {strings.age}:
        </Text>
        <Text
          style={getStyle(
            styling.styles.idMoreInfoDetailsTextStyle,
            styling.styles.idTabletMoreInfoDetailsTextStyle
          )}>
          {age}
        </Text>
      </View>
    );
  }
}

export function getSupplierText(supplier) {
  if (ACCESS == strings.manager) {
    return (
      <View style={styling.styles.idCostModalEntryViewStyle}>
        <Text
          style={getStyle(
            styling.styles.idMoreInfoDetailsLabelTextStyle,
            styling.styles.idTabletMoreInfoDetailsLabelTextStyle
          )}>
          {strings.supplierTag}:
        </Text>
        <Text
          style={getStyle(
            styling.styles.idMoreInfoDetailsTextStyle,
            styling.styles.idTabletMoreInfoDetailsTextStyle
          )}>
          {getSupplier(supplier)}
        </Text>
      </View>
    );
  }
}

export function getAlloc(alloc) {
  if (ACCESS == strings.asteriaSalespeople || ACCESS == strings.manager) {
    return (
      <View style={styling.styles.idCostModalEntryViewStyle}>
        <Text
          style={getStyle(
            styling.styles.idMoreInfoDetailsLabelTextStyle,
            styling.styles.idTabletMoreInfoDetailsLabelTextStyle
          )}>
          {strings.allocation}:
        </Text>
        <Text
          style={getStyle(
            styling.styles.idMoreInfoDetailsTextStyle,
            styling.styles.idTabletMoreInfoDetailsTextStyle
          )}>
          {alloc}
        </Text>
      </View>
    );
  }
}

export function getRapTotal(rapTotal, dataArr) {
  if (ACCESS == strings.manager || ACCESS == strings.asteriaSalespeople) {
    if (rapTotal) rapTotal = `${CURRENCY_SIGN}${rapTotal}`;
    else rapTotal = strings.fluorBlank;

    return (
      <View style={styling.styles.idCostModalEntryViewStyle}>
        <Text
          style={getStyle(
            styling.styles.idMoreInfoDetailsLabelTextStyle,
            styling.styles.idTabletMoreInfoDetailsLabelTextStyle
          )}>
          {strings.rapnetPriceTotal}:
        </Text>
        <Text
          style={getStyle(
            styling.styles.idMoreInfoDetailsTextStyle,
            styling.styles.idTabletMoreInfoDetailsTextStyle
          )}>
          {rapTotal}
        </Text>
      </View>
    );
  }
}

export function getRapPercent(dataArr) {
  // non-jewelry
  if (
    dataArr[strings.type] == strings.fluorBlank &&
    (ACCESS == strings.manager || ACCESS == strings.asteriaSalespeople)
  ) {
    return (
      <View style={{ alignSelf: 'flex-start' }}>
        <View style={styling.styles.idCostModalEntryViewStyle}>
          <Text
            style={getStyle(
              styling.styles.idMoreInfoDetailsLabelTextStyle,
              styling.styles.idTabletMoreInfoDetailsLabelTextStyle
            )}>
            {strings.ppc}:
          </Text>
          <Text
            style={getStyle(
              styling.styles.idMoreInfoDetailsTextStyle,
              styling.styles.idTabletMoreInfoDetailsTextStyle
            )}>
            ${dataArr[strings.ppc]}
          </Text>
        </View>

        <View style={styling.styles.idCostModalEntryViewStyle}>
          <Text
            style={getStyle(
              styling.styles.idMoreInfoDetailsLabelTextStyle,
              styling.styles.idTabletMoreInfoDetailsLabelTextStyle
            )}>
            {strings.rap}%:
          </Text>
          <Text
            style={getStyle(
              styling.styles.idMoreInfoDetailsTextStyle,
              styling.styles.idTabletMoreInfoDetailsTextStyle
            )}>
            {dataArr[strings.rap]}
          </Text>
        </View>
      </View>
    );
  }
}

export const isAccessible = () =>
  isTextEqual(ACCESS, strings.manager) ||
  isTextEqual(ACCESS, strings.asteriaSalespeople);

export const isRegistered = () =>
  isTextEqual(ACCESS, strings.manager) ||
  isTextEqual(ACCESS, strings.asteriaSalespeople) ||
  isTextEqual(ACCESS, strings.wholesale);

export function getMoreInfoPrice(dataArr) {}

/**
 * [getBashariMoreInfo triggered by passwordOrCost()
 * 		if supplier == bashari (302) display more info]
 * @param  String  totalCost  [total cost]
 * @return View               [corresponding view to supplier]
 */
export function getBashariMoreInfo(dataArr) {
  return (
    <View
      style={getStyle(
        styling.styles.idCostModalViewStyle,
        styling.styles.idTabletCostModalViewStyle
      )}>
      <View style={styling.styles.idCostModalEntryViewStyle}>
        <Text
          style={getStyle(
            styling.styles.idMoreInfoDetailsLabelTextStyle,
            styling.styles.idTabletMoreInfoDetailsLabelTextStyle
          )}>
          {TEXT.salePrice}:
        </Text>
        <Text
          style={getStyle(
            styling.styles.idMoreInfoDetailsTextStyle,
            styling.styles.idTabletMoreInfoDetailsTextStyle
          )}>
          {getDollarSign(parseInt(dataArr[strings.totalPrice]))}
        </Text>
      </View>

      {getRapPercent(dataArr) /* manager&astSales */}

      {getP(dataArr[strings.totalCost]) /* manager */}

      {
        getRapTotal(
          dataArr[strings.totalPrice4],
          dataArr
        ) /* manager&astSales */
      }

      {getAge(dataArr[strings.age]) /* manager */}

      {getAlloc(dataArr[strings.allocation]) /* manager&astSales */}

      {getSupplierText(dataArr[strings.supplier]) /* manager */}

      {getLocation(dataArr) /* manager&astSales&wholesale */}

      {getMoreInfoPrice(dataArr) /**/}
    </View>
  );
}

/**
 * [fixYouTubeLink triggered by itemDetails.displayVideo() && jewelryItemDetails.displayVideo()
 * 		handles fixing youtube link to be embedded & not showing retaled videos]
 * @param  String  link  [youtube link]
 * @return String  res   [embed youtube link with ?rel=0 ]
 */
export function fixYouTubeLink(link) {
  if (link.includes('embed')) {
    return link + '?rel=0';
  }
  var res = link.replace('watch?v=', 'embed/') + '?rel=0';
  return res;
}

/**
 * [setCo triggered by itemView, jewelryItemView, itemDetails && jewelryItemDetails
 * 		handles the multiplication coefficient of each item type
 * 		white lose is multiplied by 1.2
 *      the rest are multiplied by 1.3]
 * @param String  color  [either D-Z or fancy]
 * @param  int           [corrwsponding coefficient]
 */
export function setCo(color, type) {
  if (isValid(color) && (type == strings.loose || !isValid(type))) {
    return numbers.whiteLooseCoefficient;
  }
  return numbers.fancyEmbeddedCoeficient;
}

/**
 * [getSupplier triggered by getBashariMoreInfo
 * 			handles supplier string]
 * @param  int  supplier  [supplier number]
 * @return String         [string of corresponding supplier]
 */
export const getSupplier = (supplier) =>
  strings.SUPPLIER[+supplier] || strings.fluorBlank;

/**
 * [getRapPerCentBLow description, itemView, itemDetails
 * 		handles changing rap% after price change]
 * @param  String   numerator   [string representing of the numerator -> item's ppc]
 * @param  String   demoninator [string representing the denominator -> items list price]
 * @return int      ans         [rap% corresponding to numerator & denominator ]
 */
export const getRapPerCentBLow = (numerator, demoninator) => {
  if (!isValid(numerator) || !isValid(demoninator) || demoninator == 0)
    return strings.fluorBlank;

  var ans = (1 - +numerator / +demoninator) * 100;
  ans = Number(ans).toFixed(0);
  ans = Math.abs(ans);
  ans *= -1;
  return ans;
};

/**
 * [storeLinks triggered by downloadFile
 * 		handles returning null when path is unlisted]
 * @param  String   fileName [stop it]
 * @param  String   path     [file path in local db]
 * @return String            [path or null]
 */
export async function storeLinks(fileName, path) {
  return put(fileName, path).then(() => {
    if (path == strings.unListed) {
      return null;
    }
    return path;
  }); // while path ! unlisted
}

/**
 * [getStyle triggered by almost every component that uses styling
 * 		handles styling of phone && tablet]
 * @param  style    phoneStyle   [style for phones]
 * @param  style    tabletStyle  [style for tablet]
 * @return style                 [style of corresponding device]
 */
export function getStyle(phoneStyle, tabletStyle) {
  if (isTablet) {
    if (tabletStyle) {
      return tabletStyle;
    }
    return phoneStyle;
  }
  return phoneStyle;
}

/**
 * [getIconHeight triggered by welcomeSearch, searchGem, searchBar, searchLoose && searchJewelry]
 * @return int  [icon size]
 */
export const getIconHeight = () =>
  isTablet ? getTextSize(20) : getTextSize(25);

/**
 * [getShape triggered by jewelryItemView, JewelryItemDetails, itemView && itemDetails
 * 		handles not showing none string for shape]
 * @param  String   shape  [i'm not explaining this]
 * @return String          [either 'mix' or the actual shape]
 */
export const getShape = (shape) => (!isValid(shape) ? TEXT.mix : shape);

/**
 * [getOfflineImages triggered by triggere by itemDetails, jewelryItemView, JewelryItemView
 * 		handles getting offline paths of items]
 * @param  String []  arr   [array represents a row]
 * @param  int        index [index of some link]
 * @return String           [either file's path or null]
 */
export async function getOfflineImages(arr, index) {
  var offlineIndices = [
    indices.link1,
    indices.link2,
    indices.link1,
    indices.link3,
    indices.link4,
    indices.link5,
    indices.link6,
    indices.link7,
    indices.link8,
  ];

  if (isValid(arr[index])) {
    var path = get(arr[index]).then((path) => {
      if (path) {
        return path;
      }
      return null;
    });
  }
  return null;
}

/**
 * [handleOfflineLinks triggered by fetchOffline NOT IN USE YET
 * 		handles getting file's path from local db and assigning them to dataMatrix]
 * @param  int      link        [index of link in dataMatrix]
 * @param  String   offlineLink [offline link]
 * @return void                 [description]
 */
export async function handleOfflineLinks(link, offlineLink) {
  for (let i = 0; i < dataMatrix.length; i++) {
    var row = dataMatrix[i];
    var name = row[link];
    name = name.trim();
    name = name.replace(/\s/g, '');
    if (isValid(name)) {
      var path = await get(name);
      if (path && path != strings.unListed) {
        dataMatrix[i][offlineLink] = path;
      }
    }
  }
}

/**
 * [fetchOffline NOT IN USE YET
 * 		see handleOfflineLinks]
 * @return void   [description]
 */
export async function fetchOffline() {
  handleOfflineLinks(indices.link1, indices.offlineLink1);
  handleOfflineLinks(indices.certificateLink, indices.offlineCertLink);
  handleOfflineLinks(indices.link2, indices.offlineLink2);
  handleOfflineLinks(indices.link3, indices.offlineLink3);
  handleOfflineLinks(indices.link4, indices.offlineLink4);
  handleOfflineLinks(indices.link5, indices.offlineLink5);
  handleOfflineLinks(indices.link6, indices.offlineLink6);
}

/**
 * [sendReport triggered by OurOffices Knock Knock function after user presses Send Report
 * 		handles view log alert]
 * @param  String  log  [log text]
 * @return void         [description]
 */
export const sendReport = (log) =>
  Linking.openURL(
    `mailto:${strings.reportEmail}?subject=Asteria Diamonds App Report&body=${log}`
  );

/**
 * [initFlag triggered by welcomeSearch.redirectToScreen
 * 		handles initializing FLAG with null bc when user is locked out
 * 		this function is here bc FLAG is a read-only var in other classes
 * 		of the app and presses try again, FLAG needs to be null for the reloading process to start again]
 * @return {[type]} [description]
 */
export const initFlag = () => {
  FLAG = null;
  REST_FLAG = null;
};

/**
 * [setDataMatrix triggered by welcomeSearch.manualComponentDidMount
 * 		handles this:
 * 		so when user tries to update data (using the update button)
 * 		dataMatrix is initialized before trying to fill iteself again with updated data
 * 		thing is, if the refresh failed, dataMatrix is empty, so saving a copy of it in tempDataMatrix
 * 		in case dataMatrix is empty ]
 * @param void   tempDataMatrix [description]
 */
export const setDataMatrix = (tempDataMatrix) => {
  dataMatrix = tempDataMatrix;
};

/**
 * [setCertLink triggered by jewelryItemDetails
 * 		handles saving the string of the link of the last item viewed]
 * @param String   lotId    [last item viewed lotId]
 * @param String   certLink [link of that ^^ item's certificate]
 */
export const setCertLink = (lotId, certLink) => {
  CERT_LINK = `${lotId}: ${certLink}`;
};

/**
 * [getElementFullString triggered by this.extract && this.bashariExtract ]
 * @param  String   rawValue [value from stock file
 *                           e.g. EX, VG etc.]
 * @param  String   title    [category of rawValue
 *                           e.g. clarity, intensity etc.]
 * @return String            [full string of rawvalue
 *                            e.g. EX -> Excellent
 *                                 VG -> Very Good]
 */
export const getElementFullString = (rawValue, title) => {
  if (!rawValue || rawValue == 0) return strings.fluorBlank;

  // fluorescence none means none
  if (
    isTextEqual(title, strings.fluorescenceColorIntensity) &&
    isTextEqual(rawValue, strings.none)
  )
    return strings.none;

  if (+rawValue) {
    return +rawValue === 0 ? strings.fluorBlank : rawValue;
  }

  if (rawValue === 'F') {
    return title === strings.fluorescenceColorIntensity
      ? engText.faint
      : title === strings.color
      ? rawValue
      : engText.fair;
  }

  if (
    title === titleArr[indices.FancyColorIntensity] ||
    title === titleArr[indices.clarity] ||
    title === titleArr[indices.cut] ||
    title === titleArr[indices.polish] ||
    title === titleArr[indices.symmetry]
  ) {
    rawValue = rawValue.trim();
    const newValue = engText.FIX[rawValue.toUpperCase()] || rawValue;
    return newValue;
  }
  return rawValue;
};

/**
 * [getDollarSign triggered by jewelryItemView && jewelryItemDetails
 * 		handels showing dollar sign only if price is legit]
 * @param  String   price [either a legit price,
 *                        or a dash (-) when there's no price]
 * @return String         [if price is legit -> $price
 *                            else -> price]
 */
export const getDollarSign = (price) =>
  price === strings.callForPrice
    ? price
    : `${parseFloat(price).toLocaleString('en')} ${CURRENCY_SIGN}`;

export function getColorString(color) {
  if (isValid(color)) {
    if (color.includes(')')) return color;
    color = color.toUpperCase();
    color = color.trim().replace('-', ' ');
    const colorArr = color.split(' ');
    let ansString = '';

    colorArr.map((color) => {
      color = color.trim();
      const translation = TEXT.COLOR[color] || '';
      if (color) ansString += `${translation} `;
    });
    return ansString;
  }
  return color;
}

/**
 * [writeToClipboard triggered by itemDetails, itemView, jewelryItemView, jewelryItemDetails
 * 		handles a user's text-touch of some of item's details; making it possible to copy the selected text ]
 * @param  String text [text to be copied]
 * @return {void}
 */
export const writeToClipboard = async (text) => {
  await Clipboard.setString(text);
  Alert.alert(text, TEXT.copyToClipboard, [{ text: TEXT.ok }], {
    cancelable: true,
  });
};

export const capitalize = (stringToCapitalize) => {
  return _.startCase(_.toLower(stringToCapitalize));
};

export function isBetween(num, range, inclusive) {
  return inclusive
    ? num >= range[0] && num <= range[1]
    : num > range[0] && num < range[1];
}

/**
 * [The opposite of pushing into array - removing from array]
 * @param  {[type]} array [description]
 * @param  {[type]} pred  [description]
 * @return {[type]}       [description]
 */
export const pull = (array, pred) =>
  _.remove(array, (n) => {
    return n !== pred;
  });

export const clearLogger = () => {
  errorNum = '';
};

export const logger = (...text) => {
  errorNum += `${text}\n`;
  console.log('[LOG]:', ...text);
};

export const dev = (
  screen = 'screen',
  funcion = 'funcion',
  text = 'txt',
  ...extra
) => console.log(`[DEV]: ${screen}: ${funcion}: ${text}`, ...extra);

export const contactUsSendEmail = async (
  name = 'name',
  subject = 'subject',
  tellUsMore = 'more',
  phone = '12345'
) => {
  let body = `My name is ${name}, ${tellUsMore}.`;
  if (phone) {
    body += `\nYou can reach me at ${phone}`;
  }

  // TODO
  console.log('TODO NOT SUPPORTED SIMULATOR body and add Alert for success');

  // await Linking.openURL(
  //   `mailto:js777755@gmail.com?subject='${subject}'&body='${body}'`
  //   // 'mailto:' + strings.mailTo + '?subject=' + subject + '&body=' + body
  // );
};

//   sendMail() {
//     var name = this.state[strings.nameState];
//     if (!name) {
//       this.showAlert(strings.invalidName);
//     } else {
//       var subject = this.state[strings.subject];
//       if (!subject) {
//         subject = "I'm interested in...";
//       }

//       var body = this.state[strings.tellUsMore];

//       if (!body) {
//         var temp = strings.blank; // this.props.navigation.getParam('id', strings.blank);
//         if (temp != strings.blank) {
//           body =
//             'My name is ' +
//             name +
//             ', I would like to receive more info about item ' +
//             temp;
//         } else {
//           body =
//             'My name is ' +
//             name +
//             ', I would like to receive more info about Asteria';
//         }
//       } else {
//         body = 'My name is ' + name + ', ' + body + '.';
//       }

//       var phone = this.state[strings.phoneNumberState];
//       if (phone) {
//         body += '\n You can reach me at ' + phone;
//       }

//       Linking.openURL(
//         'mailto:' + strings.mailTo + '?subject=' + subject + '&body=' + body
//       );
//       this.messageSent();
//     }
//   }
