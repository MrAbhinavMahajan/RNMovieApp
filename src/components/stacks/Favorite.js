import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {kROUTES} from '../../constants/Navigation';
import FavoriteScreen from '../pages/favorite';

const {Navigator, Screen} = createNativeStackNavigator();

const FavoriteStack = () => (
  <Navigator
    initialRouteName={kROUTES.FAVORITE_SCREEN}
    screenOptions={{
      gestureEnabled: false,
      headerShown: false,
    }}>
    <Screen name={kROUTES.FAVORITE_SCREEN} component={FavoriteScreen} />
  </Navigator>
);

export default FavoriteStack;
