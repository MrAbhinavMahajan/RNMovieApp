import React from 'react';
import {StyleSheet} from 'react-native';
import MaskedView from '@react-native-community/masked-view';

export const RNMaskedView = ({element, children}) => (
  <MaskedView style={styles.container} maskElement={element}>
    {children}
  </MaskedView>
);

export default RNMaskedView;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
});
