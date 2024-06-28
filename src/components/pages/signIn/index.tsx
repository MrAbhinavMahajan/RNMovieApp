/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {STD_VERTICAL_SPACING} from '../../../constants/Styles';
import {styles} from './styles';
import RNText from '../../common/RNText';
import AppCTA from '../../common/AppCTA';
import {useQueryClient} from '@tanstack/react-query';
import QuotationWidget from '../../widgets/Quotation';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../../constants/Colors';
import {AppArrowUpIcon} from '../../common/RNIcon';
import {AUTH_STEPS} from '../../data/Main';

const SignInScreen = () => {
  const queryClient = useQueryClient();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollHandler = useScrollViewOffset(scrollRef); // * Gives Current offset of ScrollView
  const insets = useSafeAreaInsets();
  const [requestToken, setRequestToken] = useState('');

  const clearCache = () => {
    queryClient.clear();
  };

  const generateRequestToken = () => {};

  const generateAccessToken = () => {};

  const onPageRefresh = () => {
    clearCache();
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({x: 0, y: 0, animated: true});
  };

  const scrollToTopCTAFadeAnimationStyles = useAnimatedStyle(() => ({
    opacity: withTiming(scrollHandler.value > 100 ? 1 : 0),
  }));

  useEffect(() => {
    clearCache();
  }, []);

  const renderWidgetCTA = (title: string, action: () => void) => {
    return (
      <AppCTA onPress={action} style={styles.ctaView}>
        <RNText style={styles.ctaTitleText}>{title}</RNText>
      </AppCTA>
    );
  };

  const renderLoginWidget = () => {
    return (
      <View style={styles.widgetView}>
        <LinearGradient
          colors={[COLORS.transparent, COLORS.fullBlack]}
          style={[
            styles.headerView,
            {paddingTop: insets.top + STD_VERTICAL_SPACING},
          ]}>
          <RNText style={styles.pageTitle}>Login</RNText>
          {AUTH_STEPS.map((el, idx) => (
            <View style={styles.guideView} key={idx}>
              <RNText style={styles.guideViewTitleText}>STEP-{el?.id}</RNText>
              <RNText style={styles.guideViewSubtitleText}>
                {el?.message}
              </RNText>
            </View>
          ))}
        </LinearGradient>
        <View style={styles.containerView}>
          <RNText style={styles.ctaLabelTitleText}>Proceed here</RNText>
          {renderWidgetCTA('Request Token', generateRequestToken)}
          {renderWidgetCTA('Access Token', generateAccessToken)}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.screenView}>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.screenScrollableView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onPageRefresh} />
        }>
        {renderLoginWidget()}
        <QuotationWidget
          title={`Embrace ${'\n'}Movie Magic!`}
          subtitle={'Crafted with ❤️ in Chamba, India'}
        />
      </ScrollView>
      <Animated.View
        style={[styles.scrollToTopBtn, scrollToTopCTAFadeAnimationStyles]}>
        <AppCTA hitSlop={styles.scrollToTopBtnHitSlop} onPress={scrollToTop}>
          <AppArrowUpIcon />
        </AppCTA>
      </Animated.View>
    </View>
  );
};

export default SignInScreen;
