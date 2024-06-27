import React, {useEffect, useRef} from 'react';
import * as NavigationService from '../../../service/Navigation';
import {APP_STACKS_MAP} from '../../../constants/Navigation';
import RNLottie from '../../common/RNLottie';
import {HAPPY_SPACEMAN_ANIM} from '../../../constants/Assets';
import {styles} from './styles';

const SplashScreen = () => {
  useEffect(() => {
    initialLaunchTimer.current = setTimeout(() => {
      NavigationService.navigateReplace(APP_STACKS_MAP.AUTH_STACK);
    }, 3000);

    return () => {
      clearTimeout(initialLaunchTimer?.current);
    };
  }, []);

  const initialLaunchTimer = useRef<any>(null);

  return (
    <RNLottie
      source={HAPPY_SPACEMAN_ANIM}
      autoPlay
      loop
      style={styles.lottieView}
    />
  );
};

export default SplashScreen;
