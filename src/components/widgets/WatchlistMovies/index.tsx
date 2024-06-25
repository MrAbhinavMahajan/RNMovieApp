import React, {useEffect, useRef, useState} from 'react';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import _ from 'lodash';
import {fetchMovieWatchlist} from '../../../apis/Main';
import {FlatList, NativeAppEventEmitter, View} from 'react-native';
import * as NavigationService from '../../../service/Navigation';
import {APP_PAGES_MAP, APP_WIDGETS_MAP} from '../../../constants/Navigation';
import {styles} from './styles';
import {PAGE_REFRESH} from '../../../constants/Page';
import HeaderTitleWidget from '../HeaderTitle';
import MoviePosterWidget, {MoviePosterItem} from '../MoviePoster';
import {FALLBACK_DATA} from '../../data/Main';

const WatchlistMoviesWidget = () => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['watchlistMovies'],
    queryFn: fetchMovieWatchlist,
  });
  console.log('watchlistMovies: \n', query);
  const {data, error, isLoading, isSuccess, refetch} = query;
  const listRef = useRef(null);
  const [isRightCTAEnabled, setRightCTAEnabled] = useState(false);

  const refreshWidget = () => {
    refetch();
  };

  const onViewAllAction = () => {
    NavigationService.navigate(APP_PAGES_MAP.MOVIE_VIEW_ALL_SCREEN, {
      queryParams: {
        screenTitle: 'Watchlist Movies',
        widgetId: APP_WIDGETS_MAP.WATCHLIST_MOVIES,
      },
    });
  };

  const onScroll = (event: any) => {
    const listScrollPos = event?.nativeEvent?.contentOffset?.x || 0;
    setRightCTAEnabled(listScrollPos > 120);
  };

  useEffect(() => {
    NativeAppEventEmitter.addListener(PAGE_REFRESH.HOME_SCREEN, refreshWidget);
  }, []);

  if (_.isEmpty(data?.results)) {
    return <></>;
  }

  return (
    <View
      style={styles.containerView}
      pointerEvents={isLoading ? 'none' : 'auto'}>
      <HeaderTitleWidget
        title={'Watchlist'}
        containerStyles={styles.headerView}
        rightCTAAction={onViewAllAction}
        rightCTAEnabled={isRightCTAEnabled}
        loaderEnabled={!data?.results}
      />
      <FlatList
        ref={listRef}
        onScroll={onScroll}
        data={data?.results ?? FALLBACK_DATA}
        renderItem={({item, index}: {item: MoviePosterItem; index: number}) => (
          <MoviePosterWidget
            item={item}
            index={index}
            containerStyles={styles.moviePoster}
          />
        )}
        keyExtractor={item => `${item?.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollableContentView}
      />
    </View>
  );
};

export default WatchlistMoviesWidget;
