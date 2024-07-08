import React, {useEffect, useRef} from 'react';
import RNLottie from '../../common/RNLottie';
import {HAPPY_SPACEMAN_ANIM} from '@constants/Assets';
import {styles} from './styles';
import {APP_STACKS_MAP, APP_TABS_MAP} from '@constants/Navigation';
import * as NavigationService from '@service/Navigation';
import useAppStore from '@store/useAppStore';

const SplashScreen = () => {
  const {isSignedIn} = useAppStore();
  const launchApp = () => {
    if (isSignedIn) {
      NavigationService.navigateReplace(APP_TABS_MAP.MAIN_TAB);
    } else {
      NavigationService.navigateReplace(APP_STACKS_MAP.AUTH_STACK);
    }
  };

  useEffect(() => {
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
