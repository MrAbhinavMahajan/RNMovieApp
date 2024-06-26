import React, {useEffect, useRef, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import * as NavigationService from '../../../service/Navigation';
import {fetchRecommendedMovies} from '../../../apis/Main';
import {FlatList, NativeAppEventEmitter, View} from 'react-native';
import {APP_PAGES_MAP, APP_WIDGETS_MAP} from '../../../constants/Navigation';
import {styles} from './styles';
import {PAGE_REFRESH} from '../../../constants/Page';
import {FALLBACK_DATA} from '../../data/Main';
import HeaderTitleWidget from '../HeaderTitle';
import MoviePosterWidget, {MoviePosterItem} from '../MoviePoster';

const RecommendedMoviesWidget = () => {
  const page = 1;
  const lastMovieId = 278;
  const query = useQuery({
    queryKey: ['recommendedMovies', lastMovieId],
    queryFn: ({signal}) => fetchRecommendedMovies(signal, lastMovieId, page),
  });
  console.log(`recommendedMovies for id ${lastMovieId}: \n`, query);
  const {data, refetch, isLoading, isError, error} = query;
  const listRef = useRef(null);
  const [isRightCTAEnabled, setRightCTAEnabled] = useState(false);

  const refreshWidget = () => {
    refetch();
  };

  const onViewAllAction = () => {
    NavigationService.navigate(APP_PAGES_MAP.MOVIE_VIEW_ALL_SCREEN, {
      queryParams: {
        screenTitle: 'Recommended Movies',
        widgetId: APP_WIDGETS_MAP.RECOMMENDED_MOVIES,
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
        title={'Recommended'}
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

export default RecommendedMoviesWidget;
