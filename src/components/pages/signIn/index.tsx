/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Linking, ScrollView, View} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import useSessionStore from '@store/useSessionStore';
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {useFocusEffect} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {STD_VERTICAL_SPACING} from '@constants/Styles';
import {AppArrowUpIcon} from '@components/common/RNIcon';
import {AUTH_STEPS} from '../../../data/Main';
import {createAccessTokenV4, createRequestTokenV4} from '@apis/Main';
import {COLORS} from '@constants/Colors';
import {
  onPageClickEvent,
  onPageLeaveEvent,
  onPageViewEvent,
} from '~/src/analytics';
import {APP_PAGES_MAP} from '~/src/constants/Navigation';
import {PageEvent} from '@constants/AppInterfaces';
import {styles} from './styles';
import {APP_QUERY_MAP} from '@constants/Api';
import RNText from '@components/common/RNText';
import AppCTA from '@components/common/AppCTA';
import QuotationWidget from '@components/widgets/Quotation';
import HeaderTitleWidget from '@components/widgets/HeaderTitle';
import {vpx} from '~/src/libraries/responsive-pixels';

const SignInScreen = () => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const login = useSessionStore(state => state.login);
  const scrollHandler = useScrollViewOffset(scrollRef); // * Gives Current offset of ScrollView
  const insets = useSafeAreaInsets();
  const [requestTokenQueryFilter, setRequestTokenQueryFilter] = useState<
    null | number
  >(null);
  const [accessTokenQueryFilter, setAccessTokenQueryFilter] = useState<
    null | number
  >(null);
  const [requestToken, setRequestToken] = useState('');
  const requestTokenQuery = useQuery({
    queryKey: [APP_QUERY_MAP.REFRESH_TOKEN, requestTokenQueryFilter],
    queryFn: ({signal}) => createRequestTokenV4(signal),
    enabled: !!requestTokenQueryFilter,
  });
  const accessTokenQuery = useQuery({
    queryKey: [APP_QUERY_MAP.ACCESS_TOKEN, accessTokenQueryFilter],
    queryFn: ({signal}) => createAccessTokenV4(signal, requestToken),
    enabled: !!accessTokenQueryFilter,
  });
  const analyticsEvent: PageEvent = {
    pageID: APP_PAGES_MAP.SIGN_IN_SCREEN,
  };

  useFocusEffect(
    useCallback(() => {
      onPageViewEvent(analyticsEvent);
      return () => {
        onPageLeaveEvent(analyticsEvent);
      };
    }, []),
  );

  useEffect(() => {
    const {data, isError, error} = requestTokenQuery;
    if (isError) {
      Alert.alert(error.name, error?.message);
      return;
    }
    if (!!requestTokenQueryFilter && data?.request_token) {
      const token = data?.request_token;
      setRequestToken(token);
    }
  }, [requestTokenQuery?.data]);

  useEffect(() => {
    const {data, isError, error} = accessTokenQuery;
    if (isError) {
      Alert.alert(error.name, error?.message);
      return;
    }
    if (!!accessTokenQueryFilter && data?.access_token) {
      const {access_token, account_id: id} = data;
      login(id, access_token);
    }
  }, [accessTokenQuery]);

  const generateRequestToken = () => {
    setAccessTokenQueryFilter(null);
    setRequestTokenQueryFilter(Date.now());
  };

  const approveRequestToken = () => {
    setAccessTokenQueryFilter(null);
    setRequestTokenQueryFilter(null);
    Linking.openURL(
      `https://www.themoviedb.org/auth/access?request_token=${requestToken}`,
    );
  };

  const generateAccessToken = () => {
    setRequestTokenQueryFilter(null);
    setAccessTokenQueryFilter(Date.now());
  };

  const scrollToTop = () => {
    onPageClickEvent({
      pageID: APP_PAGES_MAP.SIGN_IN_SCREEN,
      name: 'SCROLL TO TOP CTA',
    });
    scrollRef.current?.scrollTo({x: 0, y: 0, animated: true});
  };

  const scrollToTopCTAAnimationStyles = useAnimatedStyle(() => ({
    opacity: withTiming(scrollHandler.value > 100 ? 1 : 0),
    transform: [
      {
        translateY: withRepeat(
          withSequence(withTiming(-15), withTiming(0)),
          -1,
          true,
        ),
      },
    ],
  }));

  useEffect(() => {
    return () => {
      setRequestTokenQueryFilter(null);
      setAccessTokenQueryFilter(null);
    };
  }, []);

  const renderWidgetCTA = (
    title: string,
    action: () => void,
    disabled: boolean = false,
  ) => {
    const onCTA = () => {
      onPageClickEvent({
        pageID: APP_PAGES_MAP.SIGN_IN_SCREEN,
        name: title,
      });
      action();
    };
    return (
      <AppCTA onPress={onCTA} style={styles.ctaView} disabled={disabled}>
        <RNText style={styles.ctaTitleText}>{title}</RNText>
      </AppCTA>
    );
  };

  const renderSignInWidget = () => {
    const isLoading =
      requestTokenQuery?.isFetching || accessTokenQuery?.isFetching;
    return (
      <View style={styles.widgetView}>
        <LinearGradient
          colors={[COLORS.transparent, COLORS.fullBlack]}
          style={[
            styles.headerView,
            {paddingTop: insets.top + STD_VERTICAL_SPACING},
          ]}>
          <RNText style={styles.pageTitle}>SignIn</RNText>
          <View style={{marginBottom: vpx(48)}}>
            {AUTH_STEPS.map((el, idx) => (
              <View style={styles.guideView} key={idx}>
                <RNText style={styles.guideViewTitleText}>STEP-{el?.id}</RNText>
                <RNText style={styles.guideViewSubtitleText}>
                  {el?.message}
                </RNText>
              </View>
            ))}
          </View>
        </LinearGradient>
        <View style={styles.containerView}>
          <HeaderTitleWidget
            title={'Proceed here'}
            loaderEnabled={isLoading}
            containerStyles={styles.ctaLabelTitleView}
          />
          {renderWidgetCTA(
            'Generate Request Token',
            generateRequestToken,
            isLoading,
          )}
          {renderWidgetCTA(
            'SignIn | SignUp | Approve',
            approveRequestToken,
            isLoading,
          )}
          {renderWidgetCTA(
            'Generate Access Token',
            generateAccessToken,
            isLoading,
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.screenView}>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.screenScrollableView}
        showsVerticalScrollIndicator={false}>
        {renderSignInWidget()}
        <QuotationWidget
          title={`Embrace ${'\n'}Movie Magic!`}
          subtitle={'Crafted with ❤️ in Chamba, India'}
        />
      </ScrollView>
      <Animated.View
        style={[styles.scrollToTopBtn, scrollToTopCTAAnimationStyles]}>
        <AppCTA hitSlop={styles.scrollToTopBtnHitSlop} onPress={scrollToTop}>
          <AppArrowUpIcon />
        </AppCTA>
      </Animated.View>
    </View>
  );
};

export default SignInScreen;
