import { StyleSheet } from 'react-native';

import { textFont, REM } from '../screens/styling';
import { isTablet } from '../Cortex';
import * as colors from '../screens/colors';

export const routeStyle = StyleSheet.create({
  headerLeftStyle: {
    padding: REM * 5,
    paddingRight: REM * 20,
  },
  drawerHeader: {
    backgroundColor: 'black',
    paddingTop: isTablet ? REM * 15 : REM * 15,
    flex: 1, // TODO CHECK TABLET
    // marginLeft: isTablet ? 0 : 20,
    width: '95%', //isTablet ? '100%' : '90%', // todo check as well for tablet
    alignItems: 'flex-start',
    alignSelf: 'center',
    // justifyContent: 'space-around',
  },
  drawerXTouchableStyle: {
    height: isTablet ? REM * 12 : REM * 25,
    width: isTablet ? REM * 12 : REM * 25,
    marginLeft: isTablet ? REM * 10 : REM * 15,
    marginBottom: REM * 30,
    // alignSelf: 'center',
    // justifyContent: 'center',
  },
  drawerXimageStyle: {
    height: REM * 15,
    width: REM * 15,
    alignSelf: 'flex-start',
  },
  drawerItemsStyle: {
    fontFamily: textFont,
    letterSpacing: isTablet ? REM * 3 : REM * 5,
    color: 'white',
    fontWeight: '300',
    fontSize: isTablet ? REM * 8 : REM * 15,
    marginBottom: isTablet ? REM * 15 : 10,
  },
  drawerLogoutTouchableStyle: {
    marginLeft: isTablet ? REM * 2 : REM * 14,
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  drawerLogoutImageStyle: {
    width: isTablet ? REM * 13 : REM * 22,
    height: isTablet ? REM * 13 : REM * 22,
    resizeMode: 'contain',
    marginRight: isTablet ? REM * 12 : REM * 20,
    alignSelf: 'center',
  },
  drawerLogoutTextStyle: {
    fontFamily: textFont,
    letterSpacing: isTablet ? REM * 3 : REM * 5,
    color: 'white',
    fontWeight: '300',
    fontSize: isTablet ? REM * 8 : REM * 13,
  },
  userIconImageStyle: {
    width: isTablet ? REM * 10 : REM * 22,
    height: isTablet ? REM * 10 : REM * 22,
    resizeMode: 'contain',
    backgroundColor: colors.trans,
    alignSelf: 'center',
    marginBottom: isTablet ? REM * 13 : 0,
  },
});
