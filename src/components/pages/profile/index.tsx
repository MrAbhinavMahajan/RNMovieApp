/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import _ from 'lodash';
import {
  Alert,
  NativeAppEventEmitter,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import {styles} from './styles';
import QuotationWidget from '@components/widgets/Quotation';
import {PAGE_REFRESH} from '@constants/Page';
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {AppArrowUpIcon, AppLogoutIcon} from '@components/common/RNIcon';
import {COLORS} from '@constants/Colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {STD_VERTICAL_SPACING} from '@constants/Styles';
import {expireAccessTokenV4, fetchAccountDetails} from '@apis/Main';
import {useMutation, useQuery} from '@tanstack/react-query';
import {kGENERAL, kSIGN_OUT} from '@constants/Messages';
import {SignOutRequestBody} from '@constants/AppInterfaces';
import {APP_QUERY_MAP} from '@constants/Api';
import Storage from '@utilities/Storage';
import useAppStore from '@store/useAppStore';
import AppCTA from '@components/common/AppCTA';
import RNImage from '@components/common/RNImage';
import RNText from '@components/common/RNText';
import WatchlistMoviesWidget from '@components/widgets/WatchlistMovies';
import FavoritesMoviesWidget from '@components/widgets/FavoriteMovies';
import SelfRatedMoviesWidget from '@components/widgets/SelfRatedMovies';
import HeaderTitleWidget from '@components/widgets/HeaderTitle';
import {getImageURL} from '~/src/utilities/App';
import {useIsFocused} from '@react-navigation/native';

const ProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const isFocussed = useIsFocused();
  const {accountDetails, setAccountDetails, logout} = useAppStore();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollHandler = useScrollViewOffset(scrollRef); // * Gives Current offset of ScrollView
  const {data, isSuccess} = useQuery({
    queryKey: [APP_QUERY_MAP.PROFILE],
    queryFn: ({signal}) => fetchAccountDetails(signal),
    refetchInterval: 10000,
    enabled: isFocussed,
  });
  const logoutMutation = useMutation({
    mutationFn: expireAccessTokenV4,
    onSuccess: () => {
      Alert.alert(
        kSIGN_OUT.afterSignOut.title,
        kSIGN_OUT.afterSignOut.subtitle,
        [
          {
            text: 'Okay',
            onPress: () => {
              logout();
            },
          },
        ],
      );
    },
    onError: () => {
      Alert.alert(kGENERAL.title, kGENERAL.subtitle);
    },
  });

  useEffect(() => {
    if (!_.isEmpty(data)) {
      setAccountDetails(data);
    }
  }, [isSuccess]);

  useEffect(() => {
    return () => {
      NativeAppEventEmitter.removeAllListeners(PAGE_REFRESH.PROFILE_SCREEN);
    };
  }, []);

  const refreshPage = () => {
    NativeAppEventEmitter.emit(PAGE_REFRESH.PROFILE_SCREEN);
  };

  const onLogout = () => {
    Alert.alert(
      kSIGN_OUT.beforeSignOut.title,
      kSIGN_OUT.beforeSignOut.subtitle,
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            const userStorage = Storage.getUserStorageInstance();
            const accessToken: string | undefined =
              userStorage?.getString('accessToken');
            if (accessToken) {
              const body: SignOutRequestBody = {
                access_token: accessToken,
              };
              logoutMutation.mutate(body);
            } else {
              throw new Error('Access Token Not Found');
            }
          },
        },
      ],
    );
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({x: 0, y: 0, animated: true});
  };

  const scrollToTopCTAAnimationStyles = useAnimatedStyle(() => ({
    opacity: withTiming(scrollHandler.value > 600 ? 1 : 0),
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

  const renderProfileCard = () => {
    const username =
      accountDetails?.name || accountDetails?.username || 'Loading..';
    const imageFallbackCharacter = accountDetails
      ? accountDetails?.username[0]
      : '';
    const imageURL = getImageURL(
      accountDetails?.avatar?.tmdb?.avatar_path ?? '',
    );
    return (
      <View
        style={[
          styles.profileCardView,
          {paddingTop: insets.top + STD_VERTICAL_SPACING},
        ]}>
        <RNImage
          imageURL={imageURL}
          imageStyles={styles.profileImage}
          imageViewStyles={styles.profileImageView}
          fallbackCharacter={imageFallbackCharacter}
        />
        <RNText style={styles.usernameText} numberOfLines={1}>
          {username}
        </RNText>
      </View>
    );
  };

  const renderSignOutCTA = () => (
    <HeaderTitleWidget
      title={'Sign Out'}
      titleTextStyles={styles.pageCtaText}
      containerStyles={styles.pageCtaView}
      rightCTAAction={onLogout}
      rightCTAIcon={<AppLogoutIcon color={COLORS.red} />}
      rightCTAEnabled={true}
      loaderEnabled={logoutMutation.isPending}
    />
  );

  return (
    <View style={styles.screenView}>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.screenScrollableView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={refreshPage} />
        }>
        {renderProfileCard()}
        <FavoritesMoviesWidget />
        <WatchlistMoviesWidget />
        <SelfRatedMoviesWidget />
        {renderSignOutCTA()}
        <QuotationWidget
          title={`Immersive${'\n'}cinematic${'\n'}universe`}
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

export default ProfileScreen;
