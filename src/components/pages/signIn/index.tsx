/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Alert, Linking, RefreshControl, ScrollView, View} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  withTiming,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {STD_VERTICAL_SPACING} from '../../../constants/Styles';
import {AppArrowUpIcon} from '../../common/RNIcon';
import {AUTH_STEPS} from '../../../data/Main';
import {createAccessTokenV4, createRequestTokenV4} from '../../../apis/Main';
import {startUserSession} from '../../../utilities/App';
import {COLORS} from '../../../constants/Colors';
import {styles} from './styles';
import Storage from '../../../utilities/Storage';
import RNText from '../../common/RNText';
import AppCTA from '../../common/AppCTA';
import QuotationWidget from '../../widgets/Quotation';
import HeaderTitleWidget from '../../widgets/HeaderTitle';

const SignInScreen = () => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
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
    queryKey: ['requestToken', requestTokenQueryFilter],
    queryFn: ({signal}) => createRequestTokenV4(signal),
    enabled: !!requestTokenQueryFilter,
  });
  const accessTokenQuery = useQuery({
    queryKey: ['accessToken', accessTokenQueryFilter],
    queryFn: ({signal}) => createAccessTokenV4(signal, requestToken),
    enabled: !!accessTokenQueryFilter,
  });

  useEffect(() => {
    const {data, isError, error} = requestTokenQuery;
    console.log(
      'requestTokenQuery::::',
      JSON.stringify(requestTokenQuery, null, 4),
    );
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
    console.log(
      'accessTokenQuery::::',
      JSON.stringify(accessTokenQuery, null, 4),
    );
    if (isError) {
      Alert.alert(error.name, error?.message);
      return;
    }
    if (!!accessTokenQueryFilter && data?.access_token) {
      const {access_token, account_id: id} = data;
      Storage.setUserStorageInstance(id);
      Storage.saveToUserStorage('accountId', id);
      Storage.saveToUserStorage('accessToken', access_token);
      startUserSession();
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

  const onPageRefresh = () => {};

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({x: 0, y: 0, animated: true});
  };

  const scrollToTopCTAFadeAnimationStyles = useAnimatedStyle(() => ({
    opacity: withTiming(scrollHandler.value > 100 ? 1 : 0),
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
    return (
      <AppCTA onPress={action} style={styles.ctaView} disabled={disabled}>
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
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onPageRefresh} />
        }>
        {renderSignInWidget()}
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
