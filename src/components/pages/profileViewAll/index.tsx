/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useMemo, useState} from 'react';
import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import {ActivityIndicator, FlatList, RefreshControl, View} from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  withTiming,
} from 'react-native-reanimated';
import * as NavigationService from '../../../service/Navigation';
import {
  fetchMovieFavorites,
  fetchMovieWatchlist,
  fetchMoviesRated,
} from '../../../apis/Main';
import {styles} from './styles';
import {APP_TABS_MAP, APP_WIDGETS_MAP} from '../../../constants/Navigation';
import {STD_ACTIVITY_COLOR, STYLES} from '../../../constants/Styles';
import {
  AppArrowUpIcon,
  AppTickIcon,
  AppEditIcon,
  AppSearchIcon,
} from '../../common/RNIcon';
import {MoviePosterItem} from '../../widgets/MoviePoster';
import {APP_QUERY_MAP} from '../../../constants/Api';
import RNText from '../../common/RNText';
import AppHeader from '../../common/AppHeader';
import AppCTA from '../../common/AppCTA';
import ErrorStateWidget from '../../widgets/ErrorState';
import MovieCard from './MovieCard';

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
  const {queryParams} = props?.route?.params || {};
  const {screenTitle, widgetId} = queryParams;
  const [editableModeEnabled, setEditableModeEnabled] = useState(false);

  const makePageAPICall = async (signal: AbortSignal, pageParam = 1) => {
    switch (widgetId) {
      case APP_WIDGETS_MAP.FAVORITE_MOVIES:
        return fetchMovieFavorites(signal, pageParam);

      case APP_WIDGETS_MAP.WATCHLIST_MOVIES:
        return fetchMovieWatchlist(signal, pageParam);

      case APP_WIDGETS_MAP.RATED_MOVIES:
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
  });
  console.log('profileViewAllMovies: \n', query);
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
  console.log('profileViewAllMovies Data :\n', data);
  const movies = useMemo(() => {
    if (isError) {
      return [];
    }
    return data?.pages.flatMap(page => page.results) || [];
  }, [data?.pages, isError]);
  console.log('View-All Movies :', movies);

  const scrollToTopCTAFadeAnimationStyles = useAnimatedStyle(() => ({
    opacity: withTiming(scrollHandler.value > 600 ? 1 : 0),
  }));

  const scrollToTop = () => {
    listRef.current?.scrollToOffset({animated: true, offset: 0});
  };

  const refreshPage = () => {
    if (isFetching) {
      return;
    }
    // ! Refetch All the Query Data
    refetch();
  };

  const onSearchCTA = () => {
    NavigationService.navigate(APP_TABS_MAP.SEARCH_TAB);
  };

  const onEditableModeTogglerCTA = () => {
    setEditableModeEnabled(m => !m);
  };

  const keyExtractor = (item: MoviePosterItem) => `${item?.id}`;

  useEffect(() => {
    return () => {
      // ! Cancelling Query in Progress on unmount
      queryClient.cancelQueries({
        queryKey: [APP_QUERY_MAP.PROFILE_VIEW_ALL_MOVIES, widgetId],
      });
      // ! Invalidating Query Data on unmount
      queryClient.invalidateQueries({
        queryKey: [APP_QUERY_MAP.PROFILE_VIEW_ALL_MOVIES],
        refetchType: 'active',
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
    return <RNText>No Movies Found</RNText>;
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
        style={[styles.scrollToTopBtn, scrollToTopCTAFadeAnimationStyles]}>
        <AppCTA hitSlop={styles.scrollToTopBtnHitSlop} onPress={scrollToTop}>
          <AppArrowUpIcon />
        </AppCTA>
      </Animated.View>
    </View>
  );
};

export default ProfileViewAllScreen;
