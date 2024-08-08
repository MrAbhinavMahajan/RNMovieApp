/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from 'react';
import useSessionStore from '@store/useSessionStore';
import * as NavigationService from '@service/Navigation';
import RNLottie from '@components/common/RNLottie';
import {
  APP_PAGES_MAP,
  APP_STACKS_MAP,
  APP_TABS_MAP,
} from '@constants/Navigation';
import {PageEvent} from '@constants/AppInterfaces';
import {onPageLeaveEvent, onPageViewEvent} from '~/src/analytics';
import {HAPPY_SPACEMAN_ANIM} from '@constants/Assets';
import {styles} from './styles';

const SplashScreen = () => {
  const isSignedIn = useSessionStore(state => state.isSignedIn);
  const analyticsEvent: PageEvent = {
    pageID: APP_PAGES_MAP.SPLASH_SCREEN,
    extraData: {
      isSignedIn,
    },
  };

  const launchApp = () => {
    if (isSignedIn) {
      NavigationService.navigateReplace(APP_TABS_MAP.MAIN_TAB);
    } else {
      NavigationService.navigateReplace(APP_STACKS_MAP.AUTH_STACK);
    }
  };

  useEffect(() => {
    initialLaunchTimer.current = setTimeout(launchApp, 3000);
    onPageViewEvent(analyticsEvent);
    return () => {
      onPageLeaveEvent(analyticsEvent);
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
