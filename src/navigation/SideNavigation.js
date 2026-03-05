import React from "react";
import {
  /*SafeAreaView,*/
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from "react-native";
import { profileTitleFont } from "../screens/styling";
import { getTextSize, TEXT, ACCESS, REM, isTablet } from "../Cortex";
import * as strings from "../screens/strings";
import { searchEngines } from "../screens/searchEngine/searchObject";
import { LineSeperator } from "../components";

/**
 *
 *props.navigation.navigate(strings.loose, {
                  searchEngine: searchEngine,
                });
 */

const DrawerItem = ({ text, icon = null, onPress }) => (
  <TouchableOpacity
    style={{ flexDirection: "row" }}
    onPress={onPress}>
    {icon}
    <Text
      style={{
        fontSize: getTextSize(15),
        color: "white",
        fontFamily: profileTitleFont,
      }}>
      {text}
    </Text>
  </TouchableOpacity>
);

export const SideNavigation = ({ navigation, searchStore }) => {
  const registerOrLogout = () =>
    ACCESS === strings.continueAsGuest
      ? TEXT.alreadyRegisteredGold
      : TEXT.logout;

  const navigateToScreen = (searchEngine) => {
    console.log("tkt searchStore", searchStore);
    searchStore.searchEngine = searchEngine;
    navigation.navigate("appStack", {
      screen: strings.loose,
      params: {
        searchEngine: searchEngines[searchEngine],
      },
    });
  };

  return (
    <View style={styles.safeArea}>
      <View style={styles.drawerHeader}>
        <TouchableOpacity
          style={styles.drawerXTouchableStyle}
          onPress={() => navigation.closeDrawer()}>
          <Image
            style={styles.drawerXimageStyle}
            source={require("../assets/pics/menuX.png")}
          />
        </TouchableOpacity>
        <View style={styles.drawerItemContainer}>
          <DrawerItem
            text={TEXT.jewelryDrawer}
            navigation={navigation}
            onPress={() => navigateToScreen(strings.jewelry)}
          />
          <DrawerItem
            text={TEXT.diamondDrawer}
            navigation={navigation}
            onPress={() => navigateToScreen(strings.loose)}
          />
          <DrawerItem
            text={TEXT.gemDrawer}
            navigation={navigation}
            onPress={() => navigateToScreen(strings.gems)}
          />
          <DrawerItem
            text={TEXT.contactUs.toUpperCase()}
            navigation={navigation}
          />
        </View>

        <LineSeperator
          color={"#2B2B2B"}
          marginVertical={"10%"}
        />

        <View style={styles.bottomDrawerItemContainer}>
          <DrawerItem
            text={TEXT.myProfile}
            navigateTo="profileStack"
            icon={
              <Image
                style={styles.drawerLogoutImageStyle}
                source={require("../assets/pics/user.png")}
              />
            }
          />
          <DrawerItem
            text={registerOrLogout()}
            icon={
              <Image
                style={styles.drawerLogoutImageStyle}
                source={require("../assets/pics/logout.png")}
              />
            }
          />
        </View>

        {/* <DrawerItems
        {...props}
        activeBackgroundColor={colors.black}
        activeTintColor={colors.white}
        iconContainerStyle={{ opacity: 1 }}
        labelStyle={routeStyle.drawerItemsStyle}
        onItemPress={({ route, focused }) => {
          const searchEngine = searchEngines[route.routeName] || null;
          if (!focused) {
            switch (route.routeName) {
              case 'profileStack': {
                props.navigation.navigate('profileStack');
                break;
              }
              case 'appStack': {
                props.navigation.navigate('appStack');
                break;
              }
              default: {
                props.navigation.navigate(strings.loose, {
                  searchEngine: searchEngine,
                });
                break;
              }
            }
          }
          props.navigation.dispatch(DrawerActions.closeDrawer());
        }}
      /> */}
        {/*
        <TouchableOpacity
          style={routeStyle.drawerLogoutTouchableStyle}
          onPress={() => logout(props)}>
          <Image
            style={routeStyle.drawerLogoutImageStyle}
            source={require('../assets/pics/logout.png')}
          />
          <Text style={routeStyle.drawerLogoutTextStyle}>
            {registerOrLogout()}
          </Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    height: "100%",
    backgroundColor: "black",
  },
  drawerHeader: {
    backgroundColor: "black",
    paddingTop: REM * 15,
    flex: 1, // TODO CHECK TABLET
    width: isTablet ? "100%" : "95%", // todo check as well for tablet
    alignItems: "flex-start",
    alignSelf: "center",
  },
  drawerXTouchableStyle: {
    height: isTablet ? REM * 12 : REM * 25,
    width: isTablet ? REM * 12 : REM * 25,
    marginLeft: isTablet ? REM * 10 : REM * 15,
    marginBottom: REM * 30,
  },
  drawerXimageStyle: {
    height: REM * 15,
    width: REM * 15,
    alignSelf: "flex-start",
  },
  drawerItemContainer: {
    height: "30%",
    justifyContent: "space-around",
  },
  bottomDrawerItemContainer: {
    justifyContent: "space-around",
    height: "15%",
  },
  drawerLogoutImageStyle: {
    width: isTablet ? REM * 13 : REM * 22,
    height: isTablet ? REM * 13 : REM * 22,
    resizeMode: "contain",
    marginRight: isTablet ? REM * 12 : REM * 20,
    alignSelf: "center",
  },
});
