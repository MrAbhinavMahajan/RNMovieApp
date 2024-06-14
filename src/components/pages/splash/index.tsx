import React, {useRef} from 'react';
import useComponentDidMount from '../../../hooks/useComponentDidMount';
import useComponentWillUnmount from '../../../hooks/useComponentWillUnmount';
import * as NavigationService from '../../../service/Navigation';
import {kSTACKS} from '../../../constants/Navigation';
import RNLottie from '../../common/RNLottie';
import {HAPPY_SPACEMAN_ANIM} from '../../../constants/Assets';
import {styles} from './styles';

const SplashScreen = () => {
  useComponentDidMount(componentDidMount);
  useComponentWillUnmount(componentWillUnmount);

  function componentDidMount() {
    initialLaunchTimer.current = setTimeout(() => {
      NavigationService.navigateReplace(kSTACKS.MAIN_TAB);
    }, 3000);
  }

  function componentWillUnmount() {
    clearTimeout(initialLaunchTimer?.current);
  }

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
