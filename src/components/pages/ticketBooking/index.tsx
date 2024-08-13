/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback} from 'react';
import Animated, {useAnimatedRef} from 'react-native-reanimated';
import {RefreshControl, ScrollView, View} from 'react-native';
import {PageEvent} from '@constants/AppInterfaces';
import {APP_PAGES_MAP} from '@constants/Navigation';
import {useFocusEffect} from '@react-navigation/native';
import {styles} from './styles';
import {
  onPageLeaveEvent,
  onPageRefreshEvent,
  onPageViewEvent,
} from '~/src/analytics';
import AppHeader from '../../common/AppHeader';

interface TicketBookingProps {
  route: {
    params: {
      queryParams: {
        screenTitle: string;
        movieId: number;
      };
    };
  };
}
const TicketBookingScreen = (props: TicketBookingProps) => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const {queryParams} = props.route?.params || {};
  const {screenTitle, movieId} = queryParams;
  const analyticsEvent: PageEvent = {
    pageID: APP_PAGES_MAP.TICKET_BOOKING_SCREEN,
  };

  useFocusEffect(
    useCallback(() => {
      onPageViewEvent(analyticsEvent);
      return () => {
        onPageLeaveEvent(analyticsEvent);
      };
    }, []),
  );

  const refreshPage = () => {
    onPageRefreshEvent({
      pageID: APP_PAGES_MAP.TICKET_BOOKING_SCREEN,
    });
  };

  const onProceedCTA = () => {
    // process payment & confirm booking with movieId
  };

  return (
    <View>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.screenScrollableView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={refreshPage} />
        }>
        <AppHeader
          title={screenTitle}
          safePaddingEnabled
          transparentBackgroundEnabled={false}
        />
      </ScrollView>
    </View>
  );
};

export default TicketBookingScreen;
