import React, {useEffect, useRef} from 'react';
import RNLottie from '../../common/RNLottie';
import {HAPPY_SPACEMAN_ANIM} from '../../../constants/Assets';
import {styles} from './styles';
import {SecuredStorage} from '../../../constants/Storage';
import {APP_STACKS_MAP, APP_TABS_MAP} from '../../../constants/Navigation';
import * as NavigationService from '../../../service/Navigation';

const SplashScreen = () => {
  const preLaunchApp = () => {};

  const launchApp = () => {
    const token = SecuredStorage.getString('accessToken');
    if (!token) {
      // fresh login
      NavigationService.navigateReplace(APP_STACKS_MAP.AUTH_STACK);
    } else {
      NavigationService.navigateReplace(APP_TABS_MAP.MAIN_TAB);
    }
  };

  useEffect(() => {
    preLaunchApp();
    initialLaunchTimer.current = setTimeout(launchApp, 3000);
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
