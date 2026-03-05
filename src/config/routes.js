import React from 'react';
import { Text, View, TouchableOpacity, Image, Keyboard, Alert } from 'react-native';
import { StackNavigator, DrawerNavigator, DrawerItems, /*SafeAreaView,*/ DrawerActions } from 'react-navigation';

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

function press(navigation) {
  Keyboard.dismiss();
  navigation.openDrawer();
}

const getHeaderHight = () => (isTablet ? getTextSize(40) : getTextSize(60));

const registerOrLogout = () =>
  ACCESS === strings.continueAsGuest ? TEXT.alreadyRegisteredGold : TEXT.logout;

async function logout(props) {
  try {
    await put(
      strings.accessLevel.toString(),
      strings.continueAsGuest.toString()
    );
    await put(strings.prevAccess.toString(), ACCESS.toString());
    await Auth.signOut();
    props.navigation.navigate('initialLogin');
  } catch (err) {
    Alert(TEXT.errorSignOut);
  }
}

const AppStack = StackNavigator({

	welcome:
	{
		screen: WelcomeSearch,
		navigationOptions:
		{
			headerBackTitle: ' '
		}
	},
	[strings.loose]:
	{
		screen: SearchLoose,
		navigationOptions:
		{
			headerBackTitle: ' '
		}
	},
	searchResult:
	{
		screen: SearchResult,
		navigationOptions:
		{
			headerBackTitle: ' ',
			headerRight: <View/>
		}
	},

	itemDetails:
	{
		screen: ItemDetails,
		navigationOptions:
		{
			headerBackTitle: ' ',
			headerRight: <View/>
		}
	},

	// this one causes an error. well not anymore {quarantine 2020}
	jewelryItemDetails:
	{
		screen: JewelryItemDetails,
		navigationOptions:
		{
			headerBackTitle: ' ',
			headerRight: <View/>
		}
	},

	certView:
	{
		screen: CertView,
		navigationOptions:
		{
			headerBackTitle: ' ',
			headerRight: <View/>
		}
	},

	contactUs:
	{
		screen: ContactUs,
		navigationOptions:
		{
			headerBackTitle: ' ',
			headerRight: <View/>
		}
	},

	offline:
	{
		screen: Offline,
		navigationOptions:
		{
			headerBackTitle: ' ',
			headerRight: <View/>
		}
	}

}, {
	headerMode: 'float',
	navigationOptions:
	{
		headerStyle:
		{
			backgroundColor: colors.searchHeaderColor,
			height: getHeaderHight()
		},
		animationEnabled: true,
		headerTintColor: colors.white,
		headerBackTitle: ' ',
		headerTitle: (
			<Image style={{
				resizeMode: 'contain',
				alignSelf: 'center',
				marginTop: '2%',
				width: '100%',
				height: '60%'
			}}
			source={require('../assets/pics/logo.png')}/>)
	}
});

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='profile'
      component={Profile}
      options={{
        headerStyle: {
          backgroundColor: colors.searchHeaderColor,
          height: getHeaderHight(),
        },
        cardStack: {
          gesturesEnabled: false,
        },
        headerTitleStyle: {
          color: colors.white,
        },
        headerBackTitle: ' ',
        gesturesEnabled: false,
        headerTitle: (
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
        headerLeft: (
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
              source={require('../assets/pics/menu.png')}></Image>
          </TouchableOpacity>
        ),
      }}
    />
  </Stack.Navigator>
);

const LooseStack = StackNavigator({

	searchLoose:
	{
		screen: SearchLoose,
		navigationOptions: ({ navigation }) => ({
			headerStyle:
			{
				backgroundColor: colors.searchHeaderColor,
				height: getHeaderHight()
			},
			cardStack:
			{
				gesturesEnabled: false
			},
			headerTitleStyle:
			{
				color: colors.white
			},
			headerLeft: <TouchableOpacity style={routeStyle.headerLeftStyle}
				onPress={() => press(navigation)} >
				<Image style={{
					resizeMode: 'contain',
					alignSelf: 'center',
					marginLeft: getTextSize(7),
					width: getIconHeight(),
					height: getIconHeight()
				}}
				source={require('../assets/pics/menu.png') } ></Image>
			</TouchableOpacity>,
			headerBackTitle: ' ',
			gesturesEnabled: false,
			headerTitle: (
				<Image style={{
					resizeMode: 'contain',
					alignSelf: 'center',
					marginTop: '2%',
					width: '100%',
					height: '60%'
				}}
				source={require('../assets/pics/logo.png')}/>)
		})
	}
});

const CustomDrawerNavigator = (props) => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'black',
    }}>
    <View style={routeStyle.drawerHeader}>
      <TouchableOpacity
        style={routeStyle.drawerXTouchableStyle}
        onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}>
        <Image
          style={routeStyle.drawerXimageStyle}
          source={require('../assets/pics/menuX.png')}
        />
      </TouchableOpacity>

      <DrawerItems
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
      />

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
      </TouchableOpacity>
    </View>
  </View>
);



// const Stack = createNativeStackNavigator();
// export const AppStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen
//       name='welcome'
//       key='1'
//       component={WelcomeSearch}
//       options={{
//         headerShown: false,
//         headerBackTitle: ' ',
//         headerTitle: null,
//       }}
//     />
//     {/* <Stack.Screen
//       name={strings.loose}
//       component={SearchLoose}
//       key='2'
//       options={{
//         headerShown: false,
//         headerBackTitle: ' ',
//         headerTitle: () => null,
//       }}
//     />
//     <Stack.Screen
//       name='searchResult'
//       component={SearchResult}
//       options={{
//         headerShown: false,
//         headerBackTitle: ' ',
//         // headerRight: <View />,
//       }}
//     />
//     <Stack.Screen
//       name='itemDetails'
//       component={ItemDetails}
//       options={{
//         headerShown: false,
//         headerBackTitle: ' ',
//         headerRight: <View />,
//       }}
//     />
//     <Stack.Screen
//       name='jewelryItemDetails'
//       component={JewelryItemDetails}
//       options={{
//         headerShown: false,
//         headerBackTitle: ' ',
//         headerRight: <View />,
//       }}
//     />
//     <Stack.Screen
//       name='certView'
//       component={CertView}
//       options={{
//         headerShown: false,
//         headerBackTitle: ' ',
//         headerRight: <View />,
//       }}
//     />
//     <Stack.Screen
//       name='contactUs'
//       component={ContactUs}
//       options={{
//         headerShown: false,
//         headerBackTitle: ' ',
//         headerRight: <View />,
//       }}
//     />
//     <Stack.Screen
//       name='offline'
//       component={Offline}
//       options={{
//         headerShown: false,
//         headerBackTitle: ' ',
//         headerRight: <View />,
//       }}
//     /> */}
//   </Stack.Navigator>
// );

// const AppStack = createNativeStackNavigator(
//   {
//     welcome: {
//       screen: WelcomeSearch,
//       navigationOptions: {
//         headerBackTitle: ' ',
//       },
//     },
//     [strings.loose]: {
//       screen: SearchLoose,
//       navigationOptions: {
//         headerBackTitle: ' ',
//       },
//     },
//     searchResult: {
//       screen: SearchResult,
//       navigationOptions: {
//         headerBackTitle: ' ',
//         headerRight: <View />,
//       },
//     },

//     itemDetails: {
//       screen: ItemDetails,
//       navigationOptions: {
//         headerBackTitle: ' ',
//         headerRight: <View />,
//       },
//     },

//     // this one causes an error. well not anymore {quarantine 2020}
//     jewelryItemDetails: {
//       screen: JewelryItemDetails,
//       navigationOptions: {
//         headerBackTitle: ' ',
//         headerRight: <View />,
//       },
//     },

//     certView: {
//       screen: CertView,
//       navigationOptions: {
//         headerBackTitle: ' ',
//         headerRight: <View />,
//       },
//     },

//     contactUs: {
//       screen: ContactUs,
//       navigationOptions: {
//         headerBackTitle: ' ',
//         headerRight: <View />,
//       },
//     },

//     offline: {
//       screen: Offline,
//       navigationOptions: {
//         headerBackTitle: ' ',
//         headerRight: <View />,
//       },
//     },
//   },
//   {
//     headerMode: 'float',
//     navigationOptions: {
//       headerStyle: {
//         backgroundColor: colors.searchHeaderColor,
//         height: getHeaderHight(),
//       },
//       animationEnabled: true,
//       headerTintColor: colors.white,
//       headerBackTitle: ' ',
//       headerTitle: (
//         <Image
//           style={{
//             resizeMode: 'contain',
//             alignSelf: 'center',
//             marginTop: '2%',
//             width: '100%',
//             height: '60%',
//           }}
//           source={require('../assets/pics/logo.png')}
//         />
//       ),
//     },
//   }
// );


// const ProfileStack = createNativeStackNavigator({
//   profile: {
//     screen: Profile,
//     navigationOptions: ({ navigation }) => ({
//       headerStyle: {
//         backgroundColor: colors.searchHeaderColor,
//         height: getHeaderHight(),
//       },
//       cardStack: {
//         gesturesEnabled: false,
//       },
//       headerTitleStyle: {
//         color: colors.white,
//       },
//       headerLeft: (
//         <TouchableOpacity
//           style={routeStyle.headerLeftStyle}
//           onPress={() => press(navigation)}>
//           <Image
//             style={{
//               resizeMode: 'contain',
//               alignSelf: 'center',
//               marginLeft: getTextSize(7),
//               width: getIconHeight(),
//               height: getIconHeight(),
//             }}
//             source={require('../assets/pics/menu.png')}></Image>
//         </TouchableOpacity>
//       ),
//       headerBackTitle: ' ',
//       gesturesEnabled: false,
//       headerTitle: (
//         <Image
//           style={{
//             resizeMode: 'contain',
//             alignSelf: 'center',
//             marginTop: '2%',
//             width: '100%',
//             height: '60%',
//           }}
//           source={require('../assets/pics/logo.png')}
//         />
//       ),
//     }),
//   },
// });

// const LooseStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen
//       name='searchLoose'
//       component={SearchLoose}
//       options={{
//         headerStyle: {
//           backgroundColor: colors.searchHeaderColor,
//           height: getHeaderHight(),
//         },
//         cardStack: {
//           gesturesEnabled: false,
//         },
//         headerTitleStyle: {
//           color: colors.white,
//         },
//         headerBackTitle: ' ',
//         gesturesEnabled: false,
//         headerTitle: (
//           <Image
//             style={{
//               resizeMode: 'contain',
//               alignSelf: 'center',
//               marginTop: '2%',
//               width: '100%',
//               height: '60%',
//             }}
//             source={require('../assets/pics/logo.png')}
//           />
//         ),
//         headerLeft: (
//           <TouchableOpacity
//             style={routeStyle.headerLeftStyle}
//             onPress={() => press(navigation)}>
//             <Image
//               style={{
//                 resizeMode: 'contain',
//                 alignSelf: 'center',
//                 marginLeft: getTextSize(7),
//                 width: getIconHeight(),
//                 height: getIconHeight(),
//               }}
//               source={require('../assets/pics/menu.png')}></Image>
//           </TouchableOpacity>
//         ),
//       }}
//     />
//   </Stack.Navigator>
// );

// const LooseStack = createNativeStackNavigator({
//   searchLoose: {
//     screen: SearchLoose,
//     navigationOptions: ({ navigation }) => ({
//       headerStyle: {
//         backgroundColor: colors.searchHeaderColor,
//         height: getHeaderHight(),
//       },
//       cardStack: {
//         gesturesEnabled: false,
//       },
//       headerTitleStyle: {
//         color: colors.white,
//       },
//       headerLeft: (
//         <TouchableOpacity
//           style={routeStyle.headerLeftStyle}
//           onPress={() => press(navigation)}>
//           <Image
//             style={{
//               resizeMode: 'contain',
//               alignSelf: 'center',
//               marginLeft: getTextSize(7),
//               width: getIconHeight(),
//               height: getIconHeight(),
//             }}
//             source={require('../assets/pics/menu.png')}></Image>
//         </TouchableOpacity>
//       ),
//       headerBackTitle: ' ',
//       gesturesEnabled: false,
//       headerTitle: (
//         <Image
//           style={{
//             resizeMode: 'contain',
//             alignSelf: 'center',
//             marginTop: '2%',
//             width: '100%',
//             height: '60%',
//           }}
//           source={require('../assets/pics/logo.png')}
//         />
//       ),
//     }),
//   },
// });


// const Drawer = createDrawerNavigator();

// const DrawerNavigator = () => (
//   <Drawer.Navigator>
//     <Drawer.Screen
//       name='appStack'
//       component={AppStack}
//     />
//     <Drawer.Screen
//       name={strings.loose}
//       component={LooseStack}
//     />
//     <Drawer.Screen
//       name={strings.jewelry}
//       component={LooseStack}
//     />
//     <Drawer.Screen
//       name={strings.gems}
//       component={LooseStack}
//     />
//     <Drawer.Screen
//       name={'profile'}
//       component={LooseStack}
//       options={{
//         title: TEXT.myProfile,
//         cardStack: {
//           gesturesEnabled: false,
//         },
//         drawerLabel: TEXT.myProfile,

//         drawerIcon: ({ tintColor }) => (
//           <Image
//             source={require('../assets/pics/user.png')}
//             tintColor={colors.white}
//             style={routeStyle.userIconImageStyle}
//           />
//         ),
//       }}
//     />
//   </Drawer.Navigator>
// );

const DrawerStack = DrawerNavigator(
  {
    appStack: {
      navigationOptions: {
        title: TEXT.home,
        cardStack: {
          gesturesEnabled: false,
        },
        drawerLabel: TEXT.home,
      },
      screen: AppStack,
    },
    [strings.loose]: {
      navigationOptions: {
        title: TEXT.diamondDrawer,
        cardStack: {
          gesturesEnabled: false,
        },
        drawerLabel: TEXT.diamondDrawer,
      },
      screen: LooseStack,
    },
    [strings.jewelry]: {
      navigationOptions: {
        title: TEXT.jewelryDrawer,
        cardStack: {
          gesturesEnabled: false,
        },
        drawerLabel: TEXT.jewelryDrawer,
      },
      screen: LooseStack,
    },
    [strings.gems]: {
      navigationOptions: {
        title: TEXT.gemDrawer,
        cardStack: {
          gesturesEnabled: false,
        },
        drawerLabel: TEXT.gemDrawer,
      },
      screen: LooseStack,
    },
    profileStack: {
      navigationOptions: {
        title: TEXT.myProfile,
        cardStack: {
          gesturesEnabled: false,
        },
        drawerLabel: TEXT.myProfile,

        drawerIcon: ({ tintColor }) => (
          <Image
            source={require('../assets/pics/user.png')}
            tintColor={colors.white}
            style={routeStyle.userIconImageStyle}
          />
        ),
      },
      screen: ProfileStack,
    },
  },
  {
    contentComponent: CustomDrawerNavigator,
  }
);

const InitialLogin = StackNavigator({

	initialLogin:
	{
		screen: GuestLogin,
		navigationOptions:
		{
			headerStyle:
			{
				backgroundColor: colors.searchHeaderColor
			},
			title: strings.AppName,
			cardStack:
			{
				gesturesEnabled: false
			},
			headerBackTitle: ' '
		}
	},
	drawerStack:
	{
		screen: DrawerStack
	}
},
{
	headerMode: 'none',
	// this vv is for disabling ios back swipe
	navigationOptions:
	{
		cardStack:
		{
			gesturesEnabled: false
		},
		gesturesEnabled: false
	}
  });

  const Root = StackNavigator({
	initialLogin:
	{
		screen: InitialLogin
	}
}, {
	headerMode: 'none',
	initialRouteName: 'initialLogin'
});


// export const InitialLogin = () => (
//   <Stack.Navigator
//     screenOptions={{
//       cardStack: {
//         gesturesEnabled: false,
//       },
//       gesturesEnabled: false,
//     }}>
//     <Stack.Screen
//       name='initialLogin'
//       component={GuestLogin}
//       options={{
//         header: () => null,
//       }}
//       // options={{
//       //   headerStyle: {
//       //     backgroundColor: colors.searchHeaderColor,
//       //   },
//       //   title: strings.AppName,
//       //   cardStack: {
//       //     gesturesEnabled: false,
//       //   },
//       //   headerBackTitle: ' ',
//       // }}
//     />
//     {/* <Stack.Screen name="drawerStack" component={DrawerStack} /> */}
//   </Stack.Navigator>
// );

// const InitialLogin = createNativeStackNavigator(
//   {
//     initialLogin: {
//       screen: GuestLogin,
//       navigationOptions: {
//         headerStyle: {
//           backgroundColor: colors.searchHeaderColor,
//         },
//         title: strings.AppName,
//         cardStack: {
//           gesturesEnabled: false,
//         },
//         headerBackTitle: ' ',
//       },
//     },
//     drawerStack: {
//       screen: DrawerStack,
//     },
//   },
//   {
//     headerMode: 'none',
//     // this vv is for disabling ios back swipe
//     navigationOptions: {
//       cardStack: {
//         gesturesEnabled: false,
//       },
//       gesturesEnabled: false,
//     },
//   }
// );

// const Root = () => (
//   <Stack.Navigator
//     screenOptions={
//       {
//         // headerMode: 'none',
//         // initialRouteName: 'initialLogin',
//       }
//     }>
//     <Stack.Screen
//       name='initialLogin'
//       component={InitialLogin}
//     />
//   </Stack.Navigator>
// );

// const Root = createNativeStackNavigator(
//   {
//     initialLogin: {
//       screen: InitialLogin,
//     },
//   },
//   {
//     headerMode: 'none',
//     initialRouteName: 'initialLogin',
//   }
// );

export default Root;

Root.propTypes = {
  navigation: PropTypes.object,
};
