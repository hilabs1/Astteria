
import React from 'react';
import { Text, View } from 'react-native';
import Root from './src/config/routes';
import { Amplify } from 'aws-amplify';
import config from './aws-exports';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

Amplify.configure(config);

const App = props => {
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <Root />
    </View>
  )}

export default App;
