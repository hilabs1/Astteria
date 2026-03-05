import React from 'react';
import { View } from 'react-native';

export const LineSeperator = ({
  color,
  width = '100%',
  marginVertical = 0,
}) => (
  <View
    style={{
      width,
      borderBottomWidth: 1,
      borderColor: color,
      marginVertical,
      alignSelf: 'center',
    }}
  />
);
