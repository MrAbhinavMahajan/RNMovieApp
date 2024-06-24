import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import RNLottie from '../../common/RNLottie';
import {COMING_SOON_ANIM} from '../../../constants/Assets';

const ProfileScreen = () => {
  return (
    <View style={styles.screenView}>
      <RNLottie
        source={COMING_SOON_ANIM}
        autoPlay
        loop
        style={styles.lottieView}
      />
    </View>
  );
};

export default ProfileScreen;
