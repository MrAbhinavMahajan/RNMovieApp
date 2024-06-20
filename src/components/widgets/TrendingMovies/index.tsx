import React, {useEffect} from 'react';
import {NativeAppEventEmitter, View} from 'react-native';
import {PAGE_REFRESH} from '../../../constants/Page';
import RNText from '../../common/RNText';

const TrendingMoviesWidget = () => {
  const refreshWidget = () => {};

  useEffect(() => {
    NativeAppEventEmitter.addListener(PAGE_REFRESH.HOME_SCREEN, refreshWidget);
  }, []);
  return (
    <View>
      <RNText style={{height: 200, backgroundColor: 'red', marginBottom: 10}}>
        Hii
      </RNText>
      <RNText style={{height: 200, backgroundColor: 'red', marginBottom: 10}}>
        Hii
      </RNText>
      <RNText style={{height: 200, backgroundColor: 'red', marginBottom: 10}}>
        Hii
      </RNText>
      <RNText style={{height: 200, backgroundColor: 'red', marginBottom: 10}}>
        Hii
      </RNText>
      <RNText style={{height: 200, backgroundColor: 'red', marginBottom: 10}}>
        Hii
      </RNText>
      <RNText style={{height: 200, backgroundColor: 'red', marginBottom: 10}}>
        Hii
      </RNText>
      <RNText style={{height: 200, backgroundColor: 'red', marginBottom: 10}}>
        Hii
      </RNText>
      <RNText style={{height: 200, backgroundColor: 'red', marginBottom: 10}}>
        Hii
      </RNText>
      <RNText style={{height: 200, backgroundColor: 'red', marginBottom: 10}}>
        Hii
      </RNText>
      <RNText style={{height: 200, backgroundColor: 'red', marginBottom: 10}}>
        Hii
      </RNText>
      <RNText style={{height: 200, backgroundColor: 'red', marginBottom: 10}}>
        Hii
      </RNText>
      <RNText style={{height: 200, backgroundColor: 'red', marginBottom: 10}}>
        Hii
      </RNText>
    </View>
  );
};

export default TrendingMoviesWidget;
