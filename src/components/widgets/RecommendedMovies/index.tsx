import {useQuery, useQueryClient} from '@tanstack/react-query';
import React, {useEffect, useRef, useState} from 'react';
import {fetchRecommendedMovies} from '../../../apis/Main';
import {FlatList, NativeAppEventEmitter, View} from 'react-native';
import * as NavigationService from '../../../service/Navigation';
import {APP_PAGES_MAP, APP_WIDGETS_MAP} from '../../../constants/Navigation';
import {styles} from './styles';
import {PAGE_REFRESH} from '../../../constants/Page';
import HeaderTitleWidget from '../HeaderTitle';
import MoviePosterWidget from '../MoviePoster';

const RecommendedMoviesWidget = () => {
  const queryClient = useQueryClient();
  const lastMovieId = 278;
  const query = useQuery({
    queryKey: ['recommendedMovies'],
    queryFn: () => fetchRecommendedMovies(lastMovieId),
  });
  console.log(`recommendedMovies for id ${lastMovieId}: \n`, query);
  const {data, error, isLoading, isSuccess, refetch} = query;
  const listRef = useRef(null);
  const [isRightCTAEnabled, setRightCTAEnabled] = useState(false);

  const refreshWidget = () => {
    refetch();
  };

  const onViewAllAction = () => {
    NavigationService.navigate(APP_PAGES_MAP.VIEW_ALL_MOVIES_SCREEN, {
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
    <View style={styles.containerView}>
      <HeaderTitleWidget
        title={'Recommended'}
        containerStyles={styles.headerView}
        rightCTAAction={onViewAllAction}
        rightCTAEnabled={isRightCTAEnabled}
      />
      <FlatList
        ref={listRef}
        onScroll={onScroll}
        data={data?.results || []}
        renderItem={itemProps => {
          return (
            <MoviePosterWidget
              {...itemProps}
              containerStyles={styles.moviePoster}
            />
          );
        }}
        keyExtractor={item => `${item?.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollableContentView}
      />
    </View>
  );
};

export default RecommendedMoviesWidget;
