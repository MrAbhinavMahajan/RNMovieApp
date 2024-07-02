import React, {useEffect, useMemo, useRef, useState} from 'react';
import _ from 'lodash';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import * as NavigationService from '../../../service/Navigation';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  NativeAppEventEmitter,
  View,
} from 'react-native';
import {deleteMovieRating, fetchMoviesRated} from '../../../apis/Main';
import {APP_PAGES_MAP, APP_WIDGETS_MAP} from '../../../constants/Navigation';
import {styles} from './styles';
import {PAGE_REFRESH} from '../../../constants/Page';
import {FALLBACK_DATA} from '../../../data/Main';
import {QUERY_STATUS} from '../../../constants/Main';
import {kGENERAL, kRATINGS} from '../../../constants/Messages';
import {AppDeleteIcon, IconSize, MaterialIcon} from '../../common/RNIcon';
import {COLORS} from '../../../constants/Colors';
import HeaderTitleWidget from '../HeaderTitle';
import MoviePosterWidget, {MoviePosterItem} from '../MoviePoster';
import ErrorStateWidget from '../ErrorState';
import EmptyStateWidget from '../EmptyState';
import LinearGradient from 'react-native-linear-gradient';
import AppCTA from '../../common/AppCTA';

const SelfRatedMoviesWidget = () => {
  const queryClient = useQueryClient();
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
        widgetId: APP_WIDGETS_MAP.RATED_MOVIES,
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
        <ErrorStateWidget
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
        renderItem={({item, index}: {item: MoviePosterItem; index: number}) => (
          <MovieCard item={item} index={index} queryClient={queryClient} />
        )}
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

const MovieCard = ({
  item,
  index,
  queryClient,
}: {
  item: MoviePosterItem;
  index: number;
  queryClient: any;
}) => {
  const {mutate, isPending} = useMutation({
    mutationFn: deleteMovieRating,
    onSuccess: () => {
      Alert.alert(kRATINGS.deleteRating.title, kRATINGS.deleteRating.subtitle);
      queryClient.invalidateQueries(['selfRatedMovies']); // ! Invalidates the favoriteMovies query data and fetch on successful mutation
    },
    onError: () => {
      Alert.alert(kGENERAL.title, kGENERAL.subtitle);
    },
  });
  const {id} = item || {};

  const onCTA = () => {
    if (isPending) {
      // ! Throttle unnecessary calls
      return;
    }
    mutate(id);
  };
  return (
    <AppCTA style={styles.moviePosterContainer} onPress={onCTA}>
      <MoviePosterWidget
        item={item}
        index={index}
        containerStyles={styles.moviePoster}
      />

      <LinearGradient
        colors={[COLORS.transparent, COLORS.fullBlack]}
        style={[styles.moviePosterGradient]}>
        {isPending ? (
          <ActivityIndicator size={'large'} color={COLORS.azureishWhite} />
        ) : (
          <AppDeleteIcon
            size={IconSize.extraLargeBold}
            color={COLORS.fullWhite}
          />
        )}
      </LinearGradient>
    </AppCTA>
  );
};
export default SelfRatedMoviesWidget;
