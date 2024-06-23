import React, {useRef} from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';
import {styles} from './styles';

const ProfileScreen = () => {
  const scrollRef = useRef(null);

  const onPageRefresh = () => {};

  return (
    <View style={styles.screenView}>
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onPageRefresh} />
        }></ScrollView>
    </View>
  );
};

export default ProfileScreen;
