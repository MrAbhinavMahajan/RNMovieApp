/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useState} from 'react';
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
import AppHeader from '@components/common/AppHeader';
import {PrimaryCTA} from '@components/common/AppCTA';
import SelectorBox from './SelectorBox';
import AppDatePicker from '../../common/AppDatePicker';

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
  const [isDateTimeModalOpened, setIsDateTimeModalOpen] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(
    new Date().getTime(),
  );
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

  const openDateTimeModal = () => {
    setIsDateTimeModalOpen(true);
  };

  const closeDateTimeModal = () => {
    setIsDateTimeModalOpen(false);
  };

  const onDateTimeChange = (date: Date) => {
    const tempActivityTime = date.getTime();
    console.log(tempActivityTime, date.toString());
    setSelectedDateTime(tempActivityTime);
  };

  const onProceedCTA = () => {
    // process payment & confirm booking with movieId
  };

  const renderPageLayout = () => (
    <ScrollView
      ref={scrollRef}
      contentContainerStyle={styles.screenScrollableView}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={refreshPage} />
      }>
      <SelectorBox />
      <AppDatePicker
        selectedDateTime={selectedDateTime}
        isOpen={isDateTimeModalOpened}
        openDateTimeModal={openDateTimeModal}
        closeDateTimeModal={closeDateTimeModal}
        onDateTimeChange={onDateTimeChange}
        containerStyles={styles.dateTimePicker}
      />
    </ScrollView>
  );

  const renderPageHeader = () => (
    <AppHeader
      title={screenTitle}
      safePaddingEnabled
      transparentBackgroundEnabled={false}
    />
  );

  const renderPageFooter = () => (
    <View style={styles.footerView}>
      <PrimaryCTA title={'Proceed'} onPress={onProceedCTA} />
    </View>
  );

  return (
    <View style={styles.screenView}>
      {renderPageHeader()}
      {renderPageLayout()}
      {renderPageFooter()}
    </View>
  );
};

export default TicketBookingScreen;
