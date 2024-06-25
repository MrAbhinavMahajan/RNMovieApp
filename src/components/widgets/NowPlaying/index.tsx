import React, {useEffect, useRef, useState} from 'react';
import {FlatList, NativeAppEventEmitter, View} from 'react-native';
import {PAGE_REFRESH} from '../../../constants/Page';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {fetchNowPlayingMovies} from '../../../apis/Main';
import * as NavigationService from '../../../service/Navigation';
import {APP_PAGES_MAP, APP_WIDGETS_MAP} from '../../../constants/Navigation';
import {styles} from './styles';
import MoviePosterWidget, {MoviePosterItem} from '../MoviePoster';
import HeaderTitleWidget from '../HeaderTitle';
import {FALLBACK_DATA} from '../../data/Main';

const NowPlayingMoviesWidget = () => {
  const page = 1;
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['nowPlayingMovies'],
    queryFn: () => fetchNowPlayingMovies(page),
  });
  console.log('nowPlayingMovies:\n', query);
  const {data, error, isLoading, isSuccess, refetch} = query;
  const listRef = useRef(null);
  const [isRightCTAEnabled, setRightCTAEnabled] = useState(false);
  const refreshWidget = () => {
    refetch();
  };

  const onViewAllAction = () => {
    NavigationService.navigate(APP_PAGES_MAP.MOVIE_VIEW_ALL_SCREEN, {
      queryParams: {
        screenTitle: 'Now Playing Movies',
        widgetId: APP_WIDGETS_MAP.NOW_PLAYING,
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

  return (
    <View
      style={styles.containerView}
      pointerEvents={isLoading ? 'none' : 'auto'}>
      <HeaderTitleWidget
        title={'Now Playing'}
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

export default NowPlayingMoviesWidget;
