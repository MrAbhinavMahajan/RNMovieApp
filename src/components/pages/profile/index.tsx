import React, {useRef} from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';
import {styles} from './styles';
import AppHeader from '../../common/AppHeader';
import {ScrollToTopCTA} from '../../common/AppCTA';

const ProfileScreen = () => {
  const scrollRef = useRef(null);

  const onPageRefresh = () => {};

  const scrollToTop = () => {
    scrollRef?.current.scrollTo({x: 0, y: 0, animated: true});
  };

  return (
    <View style={styles.screenView}>
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onPageRefresh} />
        }>
        <AppHeader title={'Profile'} />
      </ScrollView>
      <ScrollToTopCTA
        scrollToTop={scrollToTop}
        styles={[styles.scrollToTopBtn]}
      />
    </View>
  );
};

export default ProfileScreen;
