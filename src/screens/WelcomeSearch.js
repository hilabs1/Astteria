import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  StatusBar,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  Alert,
  SafeAreaView
} from 'react-native';
import * as strings from './strings';
import * as colors from './colors';
import * as styling from './styling';
import ContactUs from './ContactUs';
import { LineSeperator } from './LineSeperator';
import OurOffices from './OurOffices';
import SearchBar from './searchEngine/SearchBar';
import Toast from 'react-native-easy-toast';
import PropTypes from 'prop-types';
import { searchEngines } from './searchEngine/searchObject.js';
import {
  DEVICE_TYPE,
  ACCESS,
  TEXT,
  isTablet,
  FLAG,
  REST_FLAG,
  get,
  getTextSize,
  getStyle,
  dataMatrix,
  getFromFile,
  getDataAsync,
  initFlag,
  sendReport,
  logger,
  countryDropdown,
} from '../Cortex';

import { searchInLayer } from './searchEngine/Cortex';

import menuImage from '../assets/pics/menu.png';
import refreshImage from '../assets/pics/refresh.png';
import searchTopImage from '../assets/pics/searchTop.png';
import { filterViews } from './searchEngine/styling';

const loadDataTimeout = 50000;

const HeaderTouchable = (action, source, navigation, sideMargin) => (
  <TouchableOpacity
    onPress={() => {
      if (action !== undefined) {
        // too bad
        action(navigation);
      }
    }}
    style={{
      width: styling.iconDim[DEVICE_TYPE],
      height: styling.iconDim[DEVICE_TYPE],
      marginLeft: getTextSize(sideMargin),
      marginRight: getTextSize(sideMargin),
    }}>
    <Image
      style={{
        resizeMode: 'contain',
        alignSelf: 'center',
        width: '100%',
        height: '100%',
      }}
      source={source}
    />
  </TouchableOpacity>
);

export default class WelcomeSearch extends Component {
  // navigationOptions is deprecated in React Navigation v6
  // Header configuration is now handled in routes.js
  
  constructor(props) {
    super(props);
    this.openSearchDropDown = this.openSearchDropDown.bind(this);
    this.stateHandler = this.stateHandler.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.dismissBar = this.dismissBar.bind(this);
    this.refresh = this.refresh.bind(this);
    this.openDrawer = this.openDrawer.bind(this);

    logger('constructor');

    this.state = {
      loading: true,
      lock: true,
      [strings.textInputSearch]: '',
      topSearchBar: false,
      connectionStatus: 'BLANK',
      status: null,
      toast: false,
      openDrawer: false,
    };
  }

  componentDidMount() {
    this.manualComponentDidMount(false);
  }

  /**
   * [fetchData triggered from searchBar & searchFooter
   * 		collecting all user filter choices and triggers CORTEX's searchInLayers]
   * @return void [description]
   */
  fetchData() {
    var filterObject = {
      [strings.textInputSearch]: this.setTextInputSearch(),
    };
    searchInLayer(filterObject, strings.fromWelcome);
  }

  /**
   * [setTextInputSearch triggered by fetchData
   * 		handles filling lotId field of filterObject with textInput input]
   */
  setTextInputSearch = () =>
    this.state[strings.textInputSearch]
      ? this.state[strings.textInputSearch]
      : strings.unListed;

  stateHandler(stateName, value) {
    this.setState({
      [stateName]: value,
    });
  }

  openSearchDropDown() {
    this.setState({
      topSearchBar: !this.state.topSearchBar,
    });
  }

  openDrawer(navigation) {
    Keyboard.dismiss();
    navigation.openDrawer();
  }

  refresh() {
    Alert.alert(
      TEXT.refreshDataTitle,
      TEXT.refreshDataMessage,
      [
        { text: TEXT.yes, onPress: () => this.manualComponentDidMount(true) },
        { text: TEXT.no },
      ],
      { cancelable: false }
    );
  }

  async manualComponentDidMount(force) {
    if (force) {
      initFlag();
    }

    const prevAccess = await get(strings.prevAccess.toString());
    let accessChange = false;
    if (prevAccess && prevAccess != ACCESS) {
      accessChange = true;
      initFlag();
    }
    if ((dataMatrix && dataMatrix.length === 0) || force || accessChange) {
      logger('startLoading');
      this.setState(
        {
          loading: true,
          lock: true,
          toast: false,
        },
        async () => {
          getDataAsync(force);
          const timer = setInterval(() => {
            if (FLAG !== null && REST_FLAG !== null) {
              if (
                (FLAG === 'lockIt' || FLAG === 'extract' || FLAG === 'force') &&
                dataMatrix.length === 0
              ) {
                logger(`0: F ${FLAG} M: ${dataMatrix.length}`);
                this.setState(
                  {
                    loading: false,
                    lock: true,
                    status: FLAG,
                    toast: false,
                  },
                  () => {
                    clearInterval(timer);
                    clearTimeout(timeout);
                    clearTimeout(slowConnectionTimeout);
                  }
                );
                if (FLAG === 'lockIt') {
                  Alert.alert(
                    TEXT.connectionProb,
                    TEXT.connectionProbDetails,
                    [{ text: TEXT.ok }],
                    { cancelable: false }
                  );
                }
                if (FLAG === 'extract') {
                  Alert.alert(
                    TEXT.parsingError,
                    TEXT.parsingErrorDetails,
                    [
                      { text: TEXT.ok },
                      {
                        text: TEXT.letUsKnow,
                        onPress: () =>
                          sendReport('Check format of stock files'),
                      },
                    ],
                    { cancelable: false }
                  );
                }
              } else {
                logger(`1: F ${FLAG} M: ${dataMatrix.length}`);
                this.setState(
                  {
                    loading: false,
                    lock: false,
                    toast: false,
                  },
                  () => {
                    clearInterval(timer);
                    clearTimeout(timeout);
                    clearTimeout(slowConnectionTimeout);
                    if (
                      (FLAG === 'force' ||
                        FLAG === strings.international ||
                        FLAG === strings.inChina ||
                        FLAG === 'fromFile') &&
                      dataMatrix.length !== 0
                    ) {
                      Alert.alert(
                        TEXT.allSet,
                        TEXT.allSetDetails,
                        [{ text: TEXT.ok }],
                        { cancelable: false }
                      );
                    }
                  }
                );
              }
            }
          }, 1000);

          const timeout = setTimeout(() => {
            if (FLAG !== null && REST_FLAG !== null) {
              logger(`2: F ${FLAG} RF: ${REST_FLAG}`);
              this.setState(
                {
                  loading: false,
                  lock: false,
                  toast: false,
                },
                () => {
                  clearInterval(timer);
                  Alert.alert(
                    TEXT.allSet,
                    TEXT.allSetDetails,
                    [{ text: TEXT.ok }],
                    { cancelable: false }
                  );
                }
              );
            } else {
              if (force) {
                logger(`3: F ${FLAG} RF: ${REST_FLAG}`);
                getFromFile('welcome', false);
                this.setState(
                  {
                    loading: false,
                    lock: false,
                    toast: false,
                  },
                  () => clearInterval(timer)
                );

                Alert.alert(
                  TEXT.couldntRefresh,
                  TEXT.connectionProbDetails,
                  [{ text: TEXT.ok }],
                  { cancelable: false }
                );
              } else {
                logger(`4: F ${FLAG} RF: ${REST_FLAG}`);
                this.setState(
                  {
                    loading: false,
                    lock: true,
                    toast: false,
                  },
                  () => clearInterval(timer)
                );
                Alert.alert(
                  TEXT.connectionProb,
                  TEXT.connectionProbDetails,
                  [{ text: TEXT.ok }],
                  { cancelable: false }
                );
              }
            }
          }, loadDataTimeout);

          const slowConnectionTimeout = setTimeout(() => {
            this.setState({ toast: true });
          }, 10000);
        }
      );
    } else {
      // could b a problem
      logger(`5: F ${FLAG} RF: ${REST_FLAG} M: ${dataMatrix.length}`);
      this.setState({
        loading: false,
        lock: true,
        toast: false,
      });
    }
    // setParams is deprecated in React Navigation v6
    // Header configuration is now static in routes.js
  }

  /**
   * [redirectToScreen redirect to search screens]
   * @param  String  screen [either SearchJewelry or SearchLoose]
   * @return void           [description]
   */
  redirectToScreen(searchEngine) {
    if (ACCESS === strings.manager || ACCESS === strings.asteriaSalespeople) {
      // TODO move from here
      const countryLocation = {
        name: TEXT.countryLocation.toUpperCase(),
        stateName: strings.countryLocationState,
        stringArr: countryDropdown.map((countryObj) => countryObj.text),
        scrollViewStyle: filterViews.scrollViewStyle,
        scrollEnabled: true,
        isRange: false,
        showClearButton: 0,
        buttons: countryDropdown,
      };
      searchEngine.filterObjects.push(countryLocation);
    }
    if (!this.state.lock) {
      this.props.navigation.navigate(strings.loose, {
        searchEngine: searchEngine,
      });
      this.setState({
        topSearchBar: false,
        [strings.textInputSearch]: '',
      });
      return true;
    } else {
      if (dataMatrix && dataMatrix.length !== 0) {
        this.props.navigation.navigate(strings.loose, {
          searchEngine: searchEngine,
        });

        this.setState({
          topSearchBar: false,
          lock: false,
          toast: false,
          [strings.textInputSearch]: '',
        });
        return true;
      }

      initFlag();

      if (
        this.state.status &&
        (this.state.status === 'lockIt' || this.state.status === 'force')
      ) {
        Alert.alert(
          TEXT.connectionProb,
          TEXT.connectionProbDetails,
          [
            { text: TEXT.ok },
            {
              text: TEXT.tryAgain,
              onPress: () => this.manualComponentDidMount(false),
            },
          ],
          { cancelable: false }
        );
      }

      if (this.state.status && this.state.status === 'extract') {
        Alert.alert(
          TEXT.parsingError,
          TEXT.parsingErrorDetails,
          [
            { text: TEXT.ok },
            {
              text: TEXT.tryAgain,
              onPress: () => this.manualComponentDidMount(false),
            },
          ],
          { cancelable: false }
        );
      }
      return true;
    }
  }

  /**
   * [loadingData triggered by render()
   * 		handles showing loader for six mins(for now) until all data loads ]
   * @return View   [activityIndicator]
   */
  loadingData() {
    return (
      this.state.loading && (
        <View style={getStyle(styles.loaderStyle, styles.tabletLoaderStyle)}>
          <ActivityIndicator
            aninamting={this.state.loading}
            size="large"
            color={colors.blueButton}
          />
          <Text style={styles.loaderTextStyle}>{TEXT.loadingText}</Text>
          {this.state.toast && (
            <Text style={styles.psstTextStyle}>{TEXT.slowConnection}</Text>
          )}
        </View>
      )
    );
  }

  getSearchBar() {
    return (
      this.state.topSearchBar &&
      !this.state.lock && (
        <SearchBar
          style={styles.componentStyle}
          action={this.stateHandler}
          actionFetch={this.fetchData}
          refreshAction={this.refresh}
          navigation={this.props.navigation}
          dismissBar={this.dismissBar}
          ref={(SearchBar) => {
            this.SearchBar = SearchBar;
          }}
        />
      )
    );
  }

  /**
   * [dismissBar triggered by SearchFooter
   * 		handles dismissing searchbar if user didnt type in anything and navigated to next screen]
   * @return {[type]} [description]
   */
  dismissBar() {
    if (
      !this.state[strings.textInputSearch] ||
      this.state[strings.textInputSearch].length === 0
    ) {
      this.setState({
        topSearchBar: false,
      });
    }
  }

  keyboardDismiss = () => Keyboard.dismiss();

  getTabletView = () =>
    isTablet ? (
      <View style={styles.tabletButtonStyle}>
        <TouchableOpacity
          style={styles.innerViewStyle}
          disabled={this.state.loading}
          onPress={() => {
            this.redirectToScreen(searchEngines[strings.loose]);
          }}>
          <Image
            style={styles.tabletLooseStyle}
            source={require('../assets/pics/coloredDiamondsTablet.jpg')}></Image>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.innerViewStyle}
          disabled={this.state.loading}
          onPress={() => {
            this.redirectToScreen(searchEngines[strings.gems]);
          }}>
          <Image
            style={styles.tabletLooseStyle}
            source={require('../assets/pics/gemstonesTablet.jpg')}></Image>
        </TouchableOpacity>
      </View>
    ) : (
      <View>
        <TouchableOpacity
          style={styles.innerViewStyle}
          disabled={this.state.loading}
          onPress={() => {
            this.redirectToScreen(searchEngines[strings.loose]);
          }}>
          <Image
            style={styles.looseStyle}
            source={require('../assets/pics/coloredDiamonds.jpg')}></Image>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.innerViewStyle}
          disabled={this.state.loading}
          onPress={() => {
            this.redirectToScreen(searchEngines[strings.gems]);
          }}>
          <Image
            style={styles.gemStyle}
            source={require('../assets/pics/gemstones.jpg')}></Image>
        </TouchableOpacity>
      </View>
    );

  render() {
    return (
      <SafeAreaView  style={{flex: 1, backgroundColor: 'white'}} >
      <View style={styles.globalViewStyle}>
        {this.getSearchBar()}

        <ScrollView
          contentContainerStyle={styles.scrollViewStyle}
          scrollEnabled={!this.state.loading}
          keyboardShouldPersistTaps="handled">
          <StatusBar
            hidden={false}
            barStyle="light-content"
            backgroundColor={colors.searchHeaderColor}
          />

          <TouchableOpacity
            style={styles.jewelryButtonStyle}
            disabled={this.state.loading}
            onPress={() => {
              this.redirectToScreen(searchEngines[strings.jewelry]);
            }}>
            <Image
              style={styles.jewelryStyle}
              source={require('../assets/pics/diamondJewelry.jpg')}></Image>
          </TouchableOpacity>

          {this.getTabletView()}

          {this.loadingData()}

          <TouchableWithoutFeedback onPress={() => this.keyboardDismiss()}>
            <View style={styles.positionViewStyle}>
              <Image
                style={getStyle(styles.marbleStyle, styles.tabletMarbleStyle)}
                source={require('../assets/pics/marble.jpg')}></Image>

              <Text
                style={getStyle(
                  styles.aboutUsTitleStyle,
                  styles.tabletAboutUsTitleStyle
                )}>
                {TEXT.aboutUsTitle.toUpperCase()}
              </Text>

              <View
                style={getStyle(
                  styles.lineSeperatorStyle,
                  styles.tabletLineSeperatorStyle
                )}>
                <LineSeperator />
              </View>

              <Text
                style={getStyle(
                  styles.contactTextStyle,
                  styles.tabletContactTextStyle
                )}>
                {TEXT.aboutUsContent}
              </Text>

              <View
                style={getStyle(
                  styles.rectangularStyle,
                  styles.tabletRectangularStyle
                )}></View>

              <View
                style={getStyle(
                  styles.componentStyle,
                  styles.tabletComponentStyle
                )}>
                <ContactUs navigation={this.props.navigation} />
              </View>

              <View style={styles.officesComponentStyle}>
                <OurOffices
                  navigation={this.props.navigation}
                  stat={this.state.connectionStatus}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>

        <Toast
          style={{ backgroundColor: colors.white, padding: 15 }}
          position="bottom"
          positionValue={150}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={1}
          textStyle={{ color: colors.royalBlue }}
        />
        </View>
        </SafeAreaView>
    );
  }
}

WelcomeSearch.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  psstTextStyle: {
    fontFamily: styling.textFont,
    alignSelf: 'center',
    fontSize: getTextSize(12),
    paddingTop: getTextSize(5),
  },
  headerStyle: {
    flexDirection: 'row',
  },
  tabletLoaderStyle: {
    position: 'absolute',
    top: getTextSize(200),
    alignSelf: 'center',
    backgroundColor: colors.white,
    height: getTextSize(100),
    width: getTextSize(200),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
  },
  tabletLooseStyle: {
    resizeMode: 'cover',
    height: '100%',
    width: Dimensions.get('window').width / 2,
    backgroundColor: colors.searchJewelryImage,
    ...Platform.select({
      android: {
        marginTop: '1%',
      },
      ios: {
        marginTop: '2%',
      },
    }),
  },

  tabletButtonStyle: {
    flexDirection: 'row',
    marginTop: 1,
  },

  tabletComponentStyle: {
    backgroundColor: colors.trans,
    width: '90%',
    alignSelf: 'center',
    position: 'absolute',
    top: getTextSize(180),
    ...Platform.select({
      ios: {
        shadowColor: colors.shadowBox,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 22,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.shadowBox,
      },
    }),
  },

  tabletMarbleStyle: {
    width: Dimensions.get('window').width,
    height: getTextSize(570),
  },
  tabletContactTextStyle: {
    width: '80%',
    height: getTextSize(150),
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: getTextSize(15),
    fontSize: getTextSize(12),
    position: 'absolute',
    top: getTextSize(70),
    color: colors.black,
    fontFamily: styling.textFont,
  },

  tabletLineSeperatorStyle: {
    position: 'absolute',
    top: getTextSize(60),
    width: '100%',
  },

  tabletAboutUsTitleStyle: {
    position: 'absolute',
    marginTop: '8%',
    fontSize: getTextSize(15),
    alignSelf: 'center',
    color: colors.black,
    letterSpacing: getTextSize(1.25),
    textAlign: 'center',
    fontFamily: styling.textFont,
  },

  globalViewStyle: {
    backgroundColor: colors.white,
    flex: 1,
  },

  loaderTextStyle: {
    fontFamily: styling.textFont,
    alignSelf: 'center',
    fontSize: getTextSize(15),
  },

  loaderStyle: {
    position: 'absolute',
    top: getTextSize(200),
    alignSelf: 'center',
    backgroundColor: colors.white,
    height: getTextSize(120),
    width: getTextSize(260),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },

  officesComponentStyle: {
    backgroundColor: colors.trans,
    height: getTextSize(500),
    width: '100%',
    alignSelf: 'center',
  },

  lineSeperatorStyle: {
    position: 'absolute',
    top: getTextSize(65),
    width: '100%',
  },

  positionViewStyle: {
    width: '100%',
    marginBottom: '5%',
    backgroundColor: colors.white,
  },

  rectangularStyle: {
    backgroundColor: colors.rectangular,
    width: '100%',
    ...Platform.select({
      ios: {
        height: getTextSize(550),
      },
      android: {
        height: getTextSize(550),
      },
    }),
  },

  tabletRectangularStyle: {
    width: '100%',
    ...Platform.select({
      ios: {
        height: 0,
      },
      android: {
        height: 0,
      },
    }),
  },

  contactTextStyle: {
    width: '70%',
    height: getTextSize(150),
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: getTextSize(25),
    fontSize: getTextSize(16),
    position: 'absolute',
    top: '8%',
    color: colors.black,
    fontFamily: styling.textFont,
  },

  aboutUsTitleStyle: {
    position: 'absolute',
    marginTop: '8%',
    fontSize: getTextSize(20),
    alignSelf: 'center',
    color: colors.black,
    letterSpacing: getTextSize(1.25),
    textAlign: 'center',
    fontFamily: styling.textFont,
  },

  marbleStyle: {
    width: Dimensions.get('window').width,
    height: getTextSize(350),
  },

  jewelryStyle: {
    resizeMode: 'cover',
    height: '100%',
    backgroundColor: colors.searchJewelryImage,
    width: Dimensions.get('window').width,
    marginTop: '1%',
  },
  looseStyle: {
    resizeMode: 'cover',
    height: '100%',
    width: Dimensions.get('window').width,
    backgroundColor: colors.searchJewelryImage,
    ...Platform.select({
      android: {
        marginTop: '1%',
      },
      ios: {
        marginTop: '2%',
      },
    }),
  },

  gemStyle: {
    resizeMode: 'cover',
    height: '100%',
    width: Dimensions.get('window').width,
    backgroundColor: colors.searchJewelryImage,
    ...Platform.select({
      android: {
        marginTop: '1%',
      },
      ios: {
        marginTop: '3%',
      },
    }),
  },

  scrollViewStyle: {
    backgroundColor: colors.white,
  },
  componentStyle: {
    backgroundColor: colors.trans,
    width: '80%',
    alignSelf: 'center',
    position: 'absolute',
    top: '22%',
    ...Platform.select({
      ios: {
        shadowColor: colors.shadowBox,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 22,
        shadowRadius: 5,
      },
    }),
  },

  jewelryButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: getTextSize(250),
  },

  innerViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: getTextSize(170),
  },
});
