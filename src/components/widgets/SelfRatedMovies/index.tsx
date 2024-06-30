import React, {useEffect, useMemo, useRef, useState} from 'react';
import _ from 'lodash';
import {useQuery} from '@tanstack/react-query';
import * as NavigationService from '../../../service/Navigation';
import {FlatList, NativeAppEventEmitter, View} from 'react-native';
import {fetchMoviesRated} from '../../../apis/Main';
import {APP_PAGES_MAP, APP_WIDGETS_MAP} from '../../../constants/Navigation';
import {styles} from './styles';
import {PAGE_REFRESH} from '../../../constants/Page';
import {FALLBACK_DATA} from '../../../data/Main';
import {QUERY_STATUS} from '../../../constants/Main';
import {kRATINGS} from '../../../constants/Messages';
import {IconSize, MaterialIcon} from '../../common/RNIcon';
import {COLORS} from '../../../constants/Colors';
import HeaderTitleWidget from '../HeaderTitle';
import MoviePosterWidget, {MoviePosterItem} from '../MoviePoster';
import ErrorInfoWidget from '../ErrorInfo';
import EmptyStateWidget from '../EmptyState';

const SelfRatedMoviesWidget = () => {
  const page = 1;
  const query = useQuery({
    queryKey: ['selfRatedMovies'],
    queryFn: ({signal}) => fetchMoviesRated(signal, page),
  });
  console.log('selfRatedMovies: \n', query);
  const {data, refetch, isLoading, isFetching, isError, error, status} = query;
  const listRef = useRef(null);
  const movies = useMemo(() => {
    if (isError) {
      return [];
    }
    return data?.results || FALLBACK_DATA;
  }, [data?.results, isError]);
  const [isRightCTAEnabled, setRightCTAEnabled] = useState(false);
  const isEmpty =
    !isError && status !== QUERY_STATUS.PENDING && _.isEmpty(movies);

  const refreshWidget = () => {
    refetch();
  };

  const exploreMovies = () => {
    NavigationService.navigate(APP_PAGES_MAP.MOVIE_VIEW_ALL_SCREEN, {
      queryParams: {
        screenTitle: 'Now Playing Movies',
        widgetId: APP_WIDGETS_MAP.NOW_PLAYING,
      },
    });
  };

  const onViewAllAction = () => {
    NavigationService.navigate(APP_PAGES_MAP.MOVIE_VIEW_ALL_SCREEN, {
      queryParams: {
        screenTitle: 'Rated Movies',
        widgetId: APP_WIDGETS_MAP.FAVORITE_MOVIES,
      },
    });
  };

  const onScroll = (event: any) => {
    const listScrollPos = event?.nativeEvent?.contentOffset?.x || 0;
    setRightCTAEnabled(listScrollPos > 120);
  };

  const keyExtractor = (item: MoviePosterItem) => `${item?.id}`;

  useEffect(() => {
    NativeAppEventEmitter.addListener(
      PAGE_REFRESH.PROFILE_SCREEN,
      refreshWidget,
    );
  }, []);

  const renderItem = ({
    item,
    index,
  }: {
    item: MoviePosterItem;
    index: number;
  }) => (
    <MoviePosterWidget
      item={item}
      index={index}
      containerStyles={styles.moviePoster}
    />
  );

  return (
    <View
      style={styles.containerView}
      pointerEvents={isLoading ? 'none' : 'auto'}>
      <HeaderTitleWidget
        title={'Rated Movies'}
        containerStyles={styles.headerView}
        rightCTAAction={onViewAllAction}
        rightCTAEnabled={isRightCTAEnabled}
        loaderEnabled={isFetching}
      />
      {isError && (
        <ErrorInfoWidget
          error={error}
          containerStyles={styles.errorContainer}
          retryCTA={refreshWidget}
        />
      )}
      {isEmpty && (
        <EmptyStateWidget
          title={kRATINGS.noRatings.title}
          message={kRATINGS.noRatings.subtitle}
          containerStyles={styles.errorContainer}
          action={exploreMovies}
          icon={
            <MaterialIcon
              name={'star'}
              size={IconSize.large}
              color={COLORS.fullBlack}
            />
          }
        />
      )}
      <FlatList
        ref={listRef}
        data={movies}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        contentContainerStyle={styles.scrollableContentView}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        extraData={movies}
      />
    </View>
  );
};

export default SelfRatedMoviesWidget;
