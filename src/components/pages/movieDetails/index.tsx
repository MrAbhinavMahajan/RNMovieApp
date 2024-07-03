/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import _ from 'lodash';
import {
  Alert,
  NativeAppEventEmitter,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import MovieDetailsTab from '../../tabs/movieDetails';
import MovieDetailsScreenHeader from './header';
import AppCTA from '../../common/AppCTA';
import {
  fetchMovieFavorites,
  fetchMovieWatchlist,
  updateMovieFavorites,
  updateMovieWatchlist,
} from '../../../apis/Main';
import {AppBackIcon, IconSize, MaterialIcon} from '../../common/RNIcon';
import {goBack} from '../../../service/Navigation';
import {styles} from './styles';
import {PAGE_REFRESH} from '../../../constants/Page';
import {COLORS} from '../../../constants/Colors';
import {STYLES} from '../../../constants/Styles';
import {kGENERAL} from '../../../constants/Messages';
import {APP_QUERY_MAP} from '../../../constants/Api';
import {
  FavoriteRequestBody,
  MovieItem,
  WatchlistRequestBody,
} from '../../../constants/AppInterfaces';
import AppHeader from '../../common/AppHeader';
import useAppStore from '../../../store/useAppStore';

interface MovieDetailsScreenProps {
  route: {
    params: {
      queryParams: {
        screenTitle: string;
        movieId: number;
      };
    };
  };
}

const MovieDetailsScreen = (props: MovieDetailsScreenProps) => {
  const queryClient = useQueryClient();
  const {setLastWatchedMovieId} = useAppStore();
  const page = 1;
  const favoriteMoviesQuery = useQuery({
    queryKey: [APP_QUERY_MAP.FAVORITE_MOVIES],
    queryFn: ({signal}) => fetchMovieFavorites(signal, page),
  });
  const watchlistMoviesDataQuery = useQuery({
    queryKey: [APP_QUERY_MAP.WATCHLIST_MOVIES],
    queryFn: ({signal}) => fetchMovieWatchlist(signal, page),
  });
  const favoritesMutation = useMutation({
    mutationFn: updateMovieFavorites,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [APP_QUERY_MAP.FAVORITE_MOVIES],
        refetchType: 'active',
      }); // ! Invalidates the favoriteMovies query data and fetch on successful mutation
    },
    onError: () => {
      Alert.alert(kGENERAL.title, kGENERAL.subtitle);
    },
  });
  const watchlistMutation = useMutation({
    mutationFn: updateMovieWatchlist,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [APP_QUERY_MAP.WATCHLIST_MOVIES],
        refetchType: 'active', // ! Invalidates the watchlistMovies query data and fetch on successful mutation
      });
    },
    onError: () => {
      Alert.alert(kGENERAL.title, kGENERAL.subtitle);
    },
  });
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchlist, setIsWatchlist] = useState(false);

  const scrollRef = useRef(null);
  const {queryParams} = props.route?.params || {};
  const {screenTitle, movieId} = queryParams;

  const setMoviesDataRequired = () => {
    setLastWatchedMovieId(movieId);

    setIsFavorite(() => {
      let isMovieFound = false;
      if (!_.isEmpty(favoriteMoviesQuery?.data?.results)) {
        isMovieFound =
          favoriteMoviesQuery?.data?.results.filter(
            (el: MovieItem) => el.id === movieId,
          )?.length > 0;
      }
      return isMovieFound;
    });

    setIsWatchlist(() => {
      let isMovieFound = false;
      if (!_.isEmpty(watchlistMoviesDataQuery?.data?.results)) {
        isMovieFound =
          watchlistMoviesDataQuery?.data?.results.filter(
            (el: MovieItem) => el?.id === movieId,
          )?.length > 0;
      }
      return isMovieFound;
    });
  };

  const refreshPage = () => {
    setMoviesDataRequired();
    NativeAppEventEmitter.emit(PAGE_REFRESH.MOVIE_DETAILS_SCREEN);
  };

  useEffect(() => {
    refreshPage();
  }, [movieId]);

  const toggleFavorite = () => {
    setIsFavorite(val => {
      const body: FavoriteRequestBody = {
        media_type: 'movie',
        media_id: movieId,
        favorite: !val,
      };
      favoritesMutation.mutateAsync(body);
      return !val;
    });
  };

  const toggleWatchlist = () => {
    setIsWatchlist(val => {
      const body: WatchlistRequestBody = {
        media_type: 'movie',
        media_id: movieId,
        watchlist: !val,
      };
      watchlistMutation.mutateAsync(body);
      return !val;
    });
  };

  const renderLeftHeaderControls = () => (
    <AppCTA onPress={goBack} style={styles.leftIcon}>
      <AppBackIcon />
    </AppCTA>
  );

  const renderRightHeaderControls = () => (
    <View style={STYLES.flexRow}>
      <AppCTA onPress={toggleFavorite} style={styles.rightIcon}>
        <MaterialIcon
          name={isFavorite ? 'favorite' : 'favorite-outline'}
          size={IconSize.large}
          color={isFavorite ? COLORS.red : COLORS.fullWhite}
        />
      </AppCTA>
      <AppCTA onPress={toggleWatchlist} style={styles.rightIcon}>
        <MaterialIcon
          name={isWatchlist ? 'bookmark' : 'bookmark-outline'}
          size={IconSize.large}
          color={COLORS.fullWhite}
        />
      </AppCTA>
    </View>
  );

  const renderPageHeader = () => (
    <AppHeader
      LeftComponent={renderLeftHeaderControls()}
      RightComponent={renderRightHeaderControls()}
      containerStyles={styles.headerView}
      transparentBackgroundEnabled={true}
      safePaddingEnabled={false}
      gradientEnabled={true}
      gradientColors={[COLORS.transparent, COLORS.fullBlack]}
      gradientStyles={styles.headerGradientView}
    />
  );

  const renderPageLayout = () => (
    <ScrollView
      ref={scrollRef}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.screenScrollableView}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={refreshPage} />
      }>
      <MovieDetailsScreenHeader screenTitle={screenTitle} movieId={movieId} />
      <MovieDetailsTab />
    </ScrollView>
  );

  return (
    <View style={styles.screenView}>
      {renderPageHeader()}
      {renderPageLayout()}
    </View>
  );
};

export default MovieDetailsScreen;
