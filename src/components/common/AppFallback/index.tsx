/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {COMING_SOON_ANIM} from '@constants/Assets';
import {onErrorEvent} from '~/src/analytics';
import {STYLES} from '~/src/constants/Styles';
import {styles} from './styles';
import RNLottie from '../RNLottie';
import RNText from '../RNText';

type AppFallback = {
  error: any;
  stackTrace: any;
};

const AppFallback = ({error, stackTrace}: AppFallback) => {
  useEffect(() => {
    onErrorEvent({
      id: 'APP',
      errorMessage: error?.message,
      extraData: {
        ...error,
        stackTrace: JSON.stringify(stackTrace, null, 4),
      },
    });
  }, []);

  return (
    <View style={STYLES.flex01}>
      <View style={styles.errorContainer}>
        <RNLottie
          source={COMING_SOON_ANIM}
          autoPlay
          loop
          style={STYLES.flex02}
        />
        <View style={styles.container}>
          <RNText style={styles.titleText}>Oops, Something went wrong</RNText>
          <RNText style={styles.subtitleText}>{error?.message}</RNText>
        </View>
      </View>
    </View>
  );
};

export default AppFallback;
