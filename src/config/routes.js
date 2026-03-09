import React from 'react';
import { Text, View, TouchableOpacity, Image, Keyboard, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

import * as colors from '../screens/colors';
import * as strings from '../screens/strings';
import WelcomeSearch from '../screens/WelcomeSearch';
import SearchLoose from '../screens/searchEngine/SearchLoose';
import SearchResult from '../screens/searchEngine/SearchResult';
import Profile from '../screens/Profile';
import ContactUs from '../screens/ContactUs';
import GuestLogin from '../screens/GuestLogin';
import ItemDetails from '../screens/ItemDetails';
import JewelryItemDetails from '../screens/JewelryItemDetails';
import CertView from '../screens/CertView';
import Offline from '../screens/Offline';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import { searchEngines } from '../screens/searchEngine/searchObject';

import { routeStyle } from './styling';

import {
  getTextSize,
  isTablet,
  getIconHeight,
  put,
  ACCESS,
  TEXT,
} from '../Cortex';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function press(navigation) {
  Keyboard.dismiss();
  navigation.openDrawer();
}

const getHeaderHight = () => (isTablet ? getTextSize(40) : getTextSize(60));

const registerOrLogout = () =>
  ACCESS === strings.continueAsGuest ? TEXT.alreadyRegisteredGold : TEXT.logout;

async function logout(navigation) {
  try {
    await put(
      strings.accessLevel.toString(),
      strings.continueAsGuest.toString()
    );
    await put(strings.prevAccess.toString(), ACCESS.toString());
    await Auth.signOut();
    navigation.navigate('initialLogin');
  } catch (err) {
    Alert.alert(TEXT.errorSignOut);
  }
}

// App Stack Navigator
function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.searchHeaderColor,
          height: getHeaderHight(),
        },
        headerTintColor: colors.white,
        headerBackTitle: ' ',
        headerTitle: () => (
          <Image
            style={{
              resizeMode: 'contain',
              alignSelf: 'center',
              marginTop: '2%',
              width: '100%',
              height: '60%',
            }}
            source={require('../assets/pics/logo.png')}
          />
        ),
      }}>
      <Stack.Screen
        name="welcome"
        component={WelcomeSearch}
        options={{ headerBackTitle: ' ' }}
      />
      <Stack.Screen
        name={strings.loose}
        component={SearchLoose}
        options={{ headerBackTitle: ' ' }}
      />
      <Stack.Screen
        name="searchResult"
        component={SearchResult}
        options={{
          headerBackTitle: ' ',
          headerRight: () => <View />,
        }}
      />
      <Stack.Screen
        name="itemDetails"
        component={ItemDetails}
        options={{
          headerBackTitle: ' ',
          headerRight: () => <View />,
        }}
      />
      <Stack.Screen
        name="jewelryItemDetails"
        component={JewelryItemDetails}
        options={{
          headerBackTitle: ' ',
          headerRight: () => <View />,
        }}
      />
      <Stack.Screen
        name="certView"
        component={CertView}
        options={{
          headerBackTitle: ' ',
          headerRight: () => <View />,
        }}
      />
      <Stack.Screen
        name="contactUs"
        component={ContactUs}
        options={{
          headerBackTitle: ' ',
          headerRight: () => <View />,
        }}
      />
      <Stack.Screen
        name="offline"
        component={Offline}
        options={{
          headerBackTitle: ' ',
          headerRight: () => <View />,
        }}
      />
    </Stack.Navigator>
  );
}

// Profile Stack Navigator
function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="profile"
        component={Profile}
        options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: colors.searchHeaderColor,
            height: getHeaderHight(),
          },
          headerTintColor: colors.white,
          headerBackTitle: ' ',
          gestureEnabled: false,
          headerTitle: () => (
            <Image
              style={{
                resizeMode: 'contain',
                alignSelf: 'center',
                marginTop: '2%',
                width: '100%',
                height: '60%',
              }}
              source={require('../assets/pics/logo.png')}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={routeStyle.headerLeftStyle}
              onPress={() => press(navigation)}>
              <Image
                style={{
                  resizeMode: 'contain',
                  alignSelf: 'center',
                  marginLeft: getTextSize(7),
                  width: getIconHeight(),
                  height: getIconHeight(),
                }}
                source={require('../assets/pics/menu.png')}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

// Loose Stack Navigator (for search)
function LooseStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="searchLoose"
        component={SearchLoose}
        options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: colors.searchHeaderColor,
            height: getHeaderHight(),
          },
          headerTintColor: colors.white,
          headerBackTitle: ' ',
          gestureEnabled: false,
          headerTitle: () => (
            <Image
              style={{
                resizeMode: 'contain',
                alignSelf: 'center',
                marginTop: '2%',
                width: '100%',
                height: '60%',
              }}
              source={require('../assets/pics/logo.png')}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={routeStyle.headerLeftStyle}
              onPress={() => press(navigation)}>
              <Image
                style={{
                  resizeMode: 'contain',
                  alignSelf: 'center',
                  marginLeft: getTextSize(7),
                  width: getIconHeight(),
                  height: getIconHeight(),
                }}
                source={require('../assets/pics/menu.png')}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

// Custom Drawer Content Component
function CustomDrawerContent(props) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
      }}>
      <View style={routeStyle.drawerHeader}>
        <TouchableOpacity
          style={routeStyle.drawerXTouchableStyle}
          onPress={() => props.navigation.closeDrawer()}>
          <Image
            style={routeStyle.drawerXimageStyle}
            source={require('../assets/pics/menuX.png')}
          />
        </TouchableOpacity>

        <DrawerContentScrollView {...props}>
          <DrawerItemList
            {...props}
            activeBackgroundColor={colors.black}
            activeTintColor={colors.white}
            labelStyle={routeStyle.drawerItemsStyle}
          />
        </DrawerContentScrollView>

        <TouchableOpacity
          style={routeStyle.drawerLogoutTouchableStyle}
          onPress={() => logout(props.navigation)}>
          <Image
            style={routeStyle.drawerLogoutImageStyle}
            source={require('../assets/pics/logout.png')}
          />
          <Text style={routeStyle.drawerLogoutTextStyle}>
            {registerOrLogout()}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Drawer Stack Navigator
function DrawerStack() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: 'black',
        },
      }}>
      <Drawer.Screen
        name="appStack"
        component={AppStack}
        options={{
          title: TEXT.home,
          drawerLabel: TEXT.home,
        }}
      />
      <Drawer.Screen
        name={strings.loose}
        component={LooseStack}
        options={{
          title: TEXT.diamondDrawer,
          drawerLabel: TEXT.diamondDrawer,
        }}
      />
      <Drawer.Screen
        name={strings.jewelry}
        component={LooseStack}
        options={{
          title: TEXT.jewelryDrawer,
          drawerLabel: TEXT.jewelryDrawer,
        }}
      />
      <Drawer.Screen
        name={strings.gems}
        component={LooseStack}
        options={{
          title: TEXT.gemDrawer,
          drawerLabel: TEXT.gemDrawer,
        }}
      />
      <Drawer.Screen
        name="profileStack"
        component={ProfileStack}
        options={{
          title: TEXT.myProfile,
          drawerLabel: TEXT.myProfile,
          drawerIcon: ({ color }) => (
            <Image
              source={require('../assets/pics/user.png')}
              tintColor={colors.white}
              style={routeStyle.userIconImageStyle}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

// Initial Login Stack
function InitialLoginStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen
        name="initialLogin"
        component={GuestLogin}
        options={{
          title: 'ASTTERIA',
        }}
      />
      <Stack.Screen
        name="drawerStack"
        component={DrawerStack}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

// Root Navigator wrapped with NavigationContainer
export default function Root() {
  return (
    <NavigationContainer>
      <InitialLoginStack />
    </NavigationContainer>
  );
}

Root.propTypes = {
  navigation: PropTypes.object,
};
