import React, {useEffect, useMemo, useRef, useState} from 'react';
import _ from 'lodash';
import {useQuery} from '@tanstack/react-query';
import * as NavigationService from '../../../service/Navigation';
import {FlatList, NativeAppEventEmitter, View} from 'react-native';
import {fetchMovieFavorites} from '../../../apis/Main';
import {APP_PAGES_MAP, APP_WIDGETS_MAP} from '../../../constants/Navigation';
import {styles} from './styles';
import {PAGE_REFRESH} from '../../../constants/Page';
import {FALLBACK_DATA} from '../../data/Main';
import {QUERY_STATUS} from '../../../constants/Main';
import HeaderTitleWidget from '../HeaderTitle';
import MoviePosterWidget, {MoviePosterItem} from '../MoviePoster';
import ErrorInfoWidget from '../ErrorInfo';

const FavoritesMoviesWidget = () => {
  const page = 1;
  const query = useQuery({
    queryKey: ['favoriteMovies'],
    queryFn: ({signal}) => fetchMovieFavorites(signal, page),
  });
  console.log('favoriteMovies: \n', query);
  const {data, refetch, isLoading, isFetching, isError, error, status} = query;
  const listRef = useRef(null);
  const movies = useMemo(() => {
    return data?.results || FALLBACK_DATA;
  }, [data?.results]);
  const [isRightCTAEnabled, setRightCTAEnabled] = useState(false);

  const refreshWidget = () => {
    refetch();
  };

  const onViewAllAction = () => {
    NavigationService.navigate(APP_PAGES_MAP.MOVIE_VIEW_ALL_SCREEN, {
      queryParams: {
        screenTitle: 'Favorite Movies',
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
    NativeAppEventEmitter.addListener(PAGE_REFRESH.HOME_SCREEN, refreshWidget);
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

  if (!isError && status !== QUERY_STATUS.PENDING && _.isEmpty(movies)) {
    return <></>;
  }

  return (
    <View
      style={styles.containerView}
      pointerEvents={isLoading ? 'none' : 'auto'}>
      <HeaderTitleWidget
        title={'Favorites 🥃'}
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

export default FavoritesMoviesWidget;
