/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {
  Alert,
  NativeAppEventEmitter,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import {styles} from './styles';
import QuotationWidget from '../../widgets/Quotation';
import {PAGE_REFRESH} from '../../../constants/Page';
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  withTiming,
} from 'react-native-reanimated';
import {AppArrowUpIcon, AppLogoutIcon} from '../../common/RNIcon';
import AppCTA from '../../common/AppCTA';
import WatchlistMoviesWidget from '../../widgets/WatchlistMovies';
import FavoritesMoviesWidget from '../../widgets/FavoriteMovies';
import SelfRatedMoviesWidget from '../../widgets/SelfRatedMovies';
import HeaderTitleWidget from '../../widgets/HeaderTitle';
import {COLORS} from '../../../constants/Colors';
import RNImage from '../../common/RNImage';
import RNText from '../../common/RNText';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {STD_VERTICAL_SPACING} from '../../../constants/Styles';
import {expireAccessTokenV4} from '../../../apis/Main';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {kSIGN_OUT} from '../../../constants/Messages';
import {SignOutRequestBody} from '../../../constants/AppInterfaces';
import Storage from '../../../utilities/Storage';
import {terminateUserSession} from '../../../utilities/App';

const ProfileScreen = () => {
  const queryClient = useQueryClient();
  const insets = useSafeAreaInsets();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollHandler = useScrollViewOffset(scrollRef); // * Gives Current offset of ScrollView
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
              queryClient.clear();
              terminateUserSession();
            },
          },
        ],
      );
    },
    onError: () => {
      Alert.alert(GENERIC_ERROR_TITLE, GENERIC_ERROR_MESSAGE);
    },
  });
  useEffect(() => {
    return () => {
      NativeAppEventEmitter.removeAllListeners(PAGE_REFRESH.PROFILE_SCREEN);
    };
  }, []);

  const onPageRefresh = () => {
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

  const scrollToTopCTAFadeAnimationStyles = useAnimatedStyle(() => ({
    opacity: withTiming(scrollHandler.value > 600 ? 1 : 0),
  }));

  const renderProfileCard = () => (
    <View
      style={[
        styles.profileCardView,
        {paddingTop: insets.top + STD_VERTICAL_SPACING},
      ]}>
      <RNImage
        imageURL={
          'https://media.themoviedb.org/t/p/w440_and_h660_face/geAWZUshBg4hS8TIeLOEhJbglpo.jpg'
        }
        imageStyles={styles.profileImage}
        imageViewStyles={styles.profileImageView}
      />

      <RNText style={styles.usernameText} numberOfLines={1}>
        Abhinav Mahajan
      </RNText>
    </View>
  );

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
          <RefreshControl refreshing={false} onRefresh={onPageRefresh} />
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
        style={[styles.scrollToTopBtn, scrollToTopCTAFadeAnimationStyles]}>
        <AppCTA hitSlop={styles.scrollToTopBtnHitSlop} onPress={scrollToTop}>
          <AppArrowUpIcon />
        </AppCTA>
      </Animated.View>
    </View>
  );
};

export default ProfileScreen;
