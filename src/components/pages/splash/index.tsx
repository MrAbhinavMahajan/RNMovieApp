import React, {useEffect, useRef} from 'react';
import RNLottie from '../../common/RNLottie';
import {HAPPY_SPACEMAN_ANIM} from '../../../constants/Assets';
import {styles} from './styles';
import {APP_STACKS_MAP} from '../../../constants/Navigation';
import * as NavigationService from '../../../service/Navigation';

const SplashScreen = () => {
  useEffect(() => {
    initialLaunchTimer.current = setTimeout(() => {
      NavigationService.navigateReplace(APP_STACKS_MAP.AUTH_STACK); // ! navigateReplace will unmount this route & mounts new one
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
