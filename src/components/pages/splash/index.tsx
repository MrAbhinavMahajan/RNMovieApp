import React, {useEffect, useRef} from 'react';
import RNLottie from '../../common/RNLottie';
import {HAPPY_SPACEMAN_ANIM} from '../../../constants/Assets';
import {styles} from './styles';
import {startUserSession} from '../../../utilities/AppUtils';

const SplashScreen = () => {
  useEffect(() => {
    initialLaunchTimer.current = setTimeout(() => {
      startUserSession();
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
