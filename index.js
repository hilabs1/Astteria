import 'react-native-gesture-handler';
import { AppRegistry, LogBox } from 'react-native';
import App from './App';
LogBox.ignoreLogs([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
]);
LogBox.ignoreAllLogs();
AppRegistry.registerComponent('Asteria', () => App);
