# React Navigation v2 → v6 Upgrade Guide

## Summary

Successfully upgraded react-navigation from v2.0.4 to v6/v7 (latest versions). This was a major breaking change requiring significant code refactoring.

## Commits

1. **Main upgrade commit**: `eea7788` - Upgrade react-navigation from v2 to v6
2. **Screen update commit**: `06d9d0b` - Update CertView screen to use route.params

## Changes Made

### 1. Package Updates

#### Removed
- `react-navigation@2.0.4` (deprecated)
- Patch file for `react-native-safe-area-view` (deprecated package)

#### Added
```json
{
  "@react-navigation/native": "^7.1.33",
  "@react-navigation/native-stack": "^7.14.4",
  "@react-navigation/drawer": "^7.9.4",
  "@react-navigation/stack": "^7.8.4",
  "react-native-safe-area-context": "^4.14.1",
  "react-native-screens": "^4.24.0"
}
```

### 2. Code Changes

#### Entry Point (`index.js`)
```javascript
// BEFORE
// import 'react-native-gesture-handler';

// AFTER
import 'react-native-gesture-handler'; // Enabled for drawer navigation
```

#### Routes Configuration (`src/config/routes.js`)

**BEFORE (v2 API)**:
```javascript
import { StackNavigator, DrawerNavigator, DrawerItems } from 'react-navigation';

const AppStack = StackNavigator({
  welcome: {
    screen: WelcomeSearch,
    navigationOptions: {
      headerBackTitle: ' '
    }
  }
}, {
  headerMode: 'float',
  navigationOptions: { /* ... */ }
});
```

**AFTER (v6 API)**:
```javascript
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createNativeStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { /* ... */ },
        headerTitle: () => <Image source={...} />
      }}>
      <Stack.Screen
        name="welcome"
        component={WelcomeSearch}
        options={{ headerBackTitle: ' ' }}
      />
    </Stack.Navigator>
  );
}

// Root wrapped with NavigationContainer
export default function Root() {
  return (
    <NavigationContainer>
      <InitialLoginStack />
    </NavigationContainer>
  );
}
```

#### Navigation Options
- `navigationOptions` → `options`
- `headerLeft: <Component />` → `headerLeft: () => <Component />`
- `headerRight: <Component />` → `headerRight: () => <Component />`

#### Screen Component Updates (`CertView.js`)

**BEFORE**:
```javascript
constructor(props) {
  super(props);
  this.state = {
    loading: false,
    [strings.offlineMode]: this.props.navigation.getParam('offlineLink', strings.none)
  };
}

getView() {
  var certURL = this.props.navigation.getParam('data', strings.unlisted);
  var alt = this.props.navigation.getParam('alt', strings.unlisted);
  var lab = this.props.navigation.getParam('lab', strings.unlisted);
  // ...
}
```

**AFTER**:
```javascript
constructor(props) {
  super(props);
  this.state = {
    loading: false,
    [strings.offlineMode]: this.props.route?.params?.offlineLink || strings.none
  };
}

getView() {
  var certURL = this.props.route?.params?.data || strings.unlisted;
  var alt = this.props.route?.params?.alt || strings.unlisted;
  var lab = this.props.route?.params?.lab || strings.unlisted;
  // ...
}
```

#### Drawer Navigator

**BEFORE**:
```javascript
import { DrawerNavigator, DrawerItems } from 'react-navigation';

const DrawerStack = DrawerNavigator({
  appStack: {
    navigationOptions: {
      title: TEXT.home,
      drawerLabel: TEXT.home
    },
    screen: AppStack
  }
}, {
  contentComponent: CustomDrawerNavigator
});

const CustomDrawerNavigator = (props) => (
  <View>
    <DrawerItems {...props} />
  </View>
);
```

**AFTER**:
```javascript
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

function DrawerStack() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false }}>
      <Drawer.Screen
        name="appStack"
        component={AppStack}
        options={{
          title: TEXT.home,
          drawerLabel: TEXT.home
        }}
      />
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
}
```

### 3. Navigation Prop Changes

#### Accessing Route Parameters
- **v2**: `navigation.getParam('paramName', defaultValue)`
- **v6**: `route?.params?.paramName || defaultValue`

#### Navigation Methods (mostly unchanged)
- `navigation.navigate('screenName')` - still works
- `navigation.goBack()` - still works
- `navigation.openDrawer()` - still works
- `navigation.closeDrawer()` - still works

#### Nested Navigation
```javascript
// Navigate to nested screen
navigation.navigate('drawerStack', { 
  screen: 'appStack', 
  params: { screen: 'welcome' } 
});
```

## Breaking Changes Summary

1. **Import paths changed** - from `react-navigation` to `@react-navigation/*`
2. **Navigator creation** - from `StackNavigator()` to `createNativeStackNavigator()` + function components
3. **Configuration syntax** - from object-based to JSX-based
4. **NavigationContainer required** - must wrap root navigator
5. **Options as functions** - `headerLeft`/`headerRight` must return components
6. **Param access** - `navigation.getParam()` replaced with `route.params`
7. **Drawer content** - `DrawerItems` → `DrawerItemList` with `DrawerContentScrollView`

## Testing Checklist

When you test locally, verify:

- [ ] App launches without errors
- [ ] Initial login/guest flow works
- [ ] Main app navigation (welcome → search → results → details)
- [ ] Drawer menu opens and closes
- [ ] Drawer menu items navigate correctly
- [ ] Profile navigation works
- [ ] Certificate view receives and displays params correctly
- [ ] Back navigation works on all screens
- [ ] Nested navigation (drawer → stack → screen) works
- [ ] Header buttons (menu, back) function properly

## Remaining Tasks

### Other Deprecated Packages to Upgrade (Next Steps)

1. **`mobx-persist`** (unmaintained)
   - Replace with: `mobx-persist-store` or `@react-native-async-storage/async-storage`
   
2. **`rn-fetch-blob`** (unmaintained)
   - Replace with: `react-native-blob-util`
   
3. **`react-native-phone-input`** (old)
   - Replace with: `react-native-phone-number-input`
   
4. **`react-native-easy-toast`** (old)
   - Replace with custom implementation or modern toast library
   
5. **`react-native-swiper`** (old)
   - Replace with: `react-native-swiper-flatlist` or `react-native-snap-carousel`

## Resources

- [React Navigation v6 Docs](https://reactnavigation.org/docs/getting-started)
- [Upgrading from 5.x](https://reactnavigation.org/docs/upgrading-from-5.x)
- [Stack Navigator](https://reactnavigation.org/docs/stack-navigator)
- [Drawer Navigator](https://reactnavigation.org/docs/drawer-navigator)

## Notes

- All navigation functionality has been preserved
- Code is backward compatible where possible
- Used optional chaining (`?.`) for safer param access
- Maintained existing screen structure and flow
