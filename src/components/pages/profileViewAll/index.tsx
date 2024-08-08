/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import {ActivityIndicator, FlatList, RefreshControl, View} from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import * as NavigationService from '@service/Navigation';
import {
  fetchMovieFavorites,
  fetchMovieWatchlist,
  fetchMoviesRated,
} from '@apis/Main';
import {styles} from './styles';
import {
  APP_PAGES_MAP,
  APP_TABS_MAP,
  APP_WIDGETS_MAP,
} from '@constants/Navigation';
import {STD_ACTIVITY_COLOR, STYLES} from '@constants/Styles';
import {
  AppArrowUpIcon,
  AppTickIcon,
  AppEditIcon,
  AppSearchIcon,
} from '@components/common/RNIcon';
import {MoviePosterItem, PageEvent} from '@constants/AppInterfaces';
import {APP_QUERY_MAP} from '@constants/Api';
import AppHeader from '@components/common/AppHeader';
import AppCTA from '@components/common/AppCTA';
import ErrorStateWidget from '@components/widgets/ErrorState';
import MovieCard from './MovieCard';
import EmptyStateCreativeCard from '@components/common/EmptyStateCard';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {
  onPageClickEvent,
  onPageLeaveEvent,
  onPageRefreshEvent,
  onPageViewEvent,
} from '~/src/analytics';

interface ProfileViewAllScreenProps {
  route: {
    params: {
      queryParams: {
        screenTitle: string;
        widgetId: string;
      };
    };
  };
}

const ProfileViewAllScreen = (props: ProfileViewAllScreenProps) => {
  const queryClient = useQueryClient();
  const isFocussed = useIsFocused();
  const {queryParams} = props?.route?.params || {};
  const {screenTitle, widgetId} = queryParams;
  const [editableModeEnabled, setEditableModeEnabled] = useState(false);

  const makePageAPICall = async (signal: AbortSignal, pageParam = 1) => {
    switch (widgetId) {
      case APP_WIDGETS_MAP.FAVORITE_MOVIES:
        return fetchMovieFavorites(signal, pageParam);

      case APP_WIDGETS_MAP.WATCHLIST_MOVIES:
        return fetchMovieWatchlist(signal, pageParam);

      case APP_WIDGETS_MAP.SELF_RATED_MOVIES:
        return fetchMoviesRated(signal, pageParam);
    }
  };

  const query = useInfiniteQuery({
    queryKey: [APP_QUERY_MAP.PROFILE_VIEW_ALL_MOVIES, widgetId],
    queryFn: ({pageParam, signal}) => makePageAPICall(signal, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.page > lastPage.total_pages) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    refetchInterval: 5000,
    enabled: isFocussed,
  });
  const {
    data,
    refetch,
    isLoading, // isLoading -> true for Initial Loading
    isFetching, // isFetching -> is true when Data is present & either new or old data being fetched
    isFetchingNextPage,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
  } = query;
  const listRef = useAnimatedRef<any>();
  const scrollHandler = useScrollViewOffset(listRef); // * Gives Current offset of ScrollView
  const movies = useMemo(() => {
    if (isError) {
      return [];
    }
    return data?.pages.flatMap(page => page.results) || [];
  }, [data?.pages, isError]);
  const analyticsEvent: PageEvent = {
    pageID: APP_PAGES_MAP.PROFILE_VIEW_ALL_SCREEN,
    extraData: {
      ...queryParams,
      editableModeEnabled,
    },
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

  const scrollToTop = () => {
    onPageClickEvent({
      pageID: APP_PAGES_MAP.PROFILE_VIEW_ALL_SCREEN,
      name: 'SCROLL TO TOP CTA',
    });
    listRef.current?.scrollToOffset({animated: true, offset: 0});
  };

  const refreshPage = () => {
    if (isFetching) {
      return;
    }
    // ! Refetch All the Query Data
    onPageRefreshEvent({
      pageID: APP_PAGES_MAP.PROFILE_VIEW_ALL_SCREEN,
    });
    refetch();
  };

  const onSearchCTA = () => {
    onPageClickEvent({
      pageID: APP_PAGES_MAP.PROFILE_VIEW_ALL_SCREEN,
      name: 'SEARCH CTA',
    });
    NavigationService.navigate(APP_TABS_MAP.SEARCH_TAB);
  };

  const onEditableModeTogglerCTA = () => {
    onPageClickEvent({
      pageID: APP_PAGES_MAP.PROFILE_VIEW_ALL_SCREEN,
      name: 'EDIT CTA',
    });
    setEditableModeEnabled(m => !m);
  };

  const keyExtractor = (item: MoviePosterItem) => `${item?.id}`;

  useFocusEffect(
    useCallback(() => {
      onPageViewEvent(analyticsEvent);
      return () => {
        onPageLeaveEvent(analyticsEvent);
      };
    }, []),
  );

  useEffect(() => {
    return () => {
      // ! Cancelling Query in Progress on unmount
      queryClient.cancelQueries({
        queryKey: [APP_QUERY_MAP.PROFILE_VIEW_ALL_MOVIES, widgetId],
      });
    };
  }, []);

  const onEndReached = () => {
    if (isFetching) {
      // ! Throttle unnecessary API Calls
      return;
    }
    if (hasNextPage) {
      // ! hasNextPage becomes false when getNextPageParam returns undefined
      fetchNextPage();
    }
  };

  const renderListHeader = () => {
    if (isError) {
      return (
        <ErrorStateWidget
          error={error}
          containerStyles={styles.errorContainer}
          retryCTA={refreshPage}
        />
      );
    }
    return <></>;
  };

  const renderListFooter = () => {
    if (isFetchingNextPage) {
      return <ActivityIndicator color={STD_ACTIVITY_COLOR} />;
    }
    return <></>;
  };

  const renderListEmptyCard = () => {
    if (isError || isLoading || isFetching) {
      return <></>;
    }
    return (
      <EmptyStateCreativeCard
        title={'Oops!'}
        message={'No Data Found'}
        retryCTA={refreshPage}
      />
    );
  };

  const RightComponent = (
    <View style={STYLES.flexRow}>
      {!editableModeEnabled && (
        <AppCTA onPress={onSearchCTA} style={styles.rightCta}>
          <AppSearchIcon />
        </AppCTA>
      )}
      <AppCTA onPress={onEditableModeTogglerCTA} style={styles.rightCta}>
        {editableModeEnabled ? <AppTickIcon /> : <AppEditIcon />}
      </AppCTA>
    </View>
  );

  return (
    <View style={styles.screenView}>
      <AppHeader
        title={screenTitle}
        RightComponent={RightComponent}
        safePaddingEnabled={false}
        transparentBackgroundEnabled={false}
        multipleCTAModeEnabled={true}
        containerStyles={styles.headerContainer}
      />
      {isLoading && (
        <View style={styles.loaderView}>
          <ActivityIndicator size={'large'} color={STD_ACTIVITY_COLOR} />
        </View>
      )}
      <FlatList
        ref={listRef}
        data={movies || []}
        renderItem={({item, index}: {item: MoviePosterItem; index: number}) => (
          <MovieCard
            item={item}
            index={index}
            editableModeEnabled={editableModeEnabled}
            widgetId={widgetId}
          />
        )}
        keyExtractor={keyExtractor}
        numColumns={3}
        columnWrapperStyle={styles.columnWrapperView}
        contentContainerStyle={styles.scrollableContentView}
        onEndReached={onEndReached}
        onEndReachedThreshold={5} // tells FlatList to trigger onEndReached earlier
        ListHeaderComponent={renderListHeader}
        ListFooterComponent={renderListFooter}
        ListEmptyComponent={renderListEmptyCard}
        initialNumToRender={10} // items to render in initial render batch
        maxToRenderPerBatch={10} // limits the number of items rendered per incremental batch
        extraData={movies} // tells FlatList to render whenever the chosen variable updates
        windowSize={1} // the number of "pages" of items rendered in either direction from the visible content
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={refreshPage} />
        }
      />
      <Animated.View
        style={[styles.scrollToTopBtn, scrollToTopCTAAnimationStyles]}>
        <AppCTA hitSlop={styles.scrollToTopBtnHitSlop} onPress={scrollToTop}>
          <AppArrowUpIcon />
        </AppCTA>
      </Animated.View>
    </View>
  );
};

export default ProfileViewAllScreen;
