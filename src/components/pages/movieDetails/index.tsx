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
import {useIsFocused} from '@react-navigation/native';
import useMovieStore from '~/src/store/useMovieStore';
import MovieDetailsTab from '@components/tabs/movieDetails';
import {
  fetchMovieFavorites,
  fetchMovieWatchlist,
  updateMovieFavorites,
  updateMovieWatchlist,
} from '@apis/Main';
import {styles} from './styles';
import {PAGE_REFRESH} from '@constants/Page';
import {kGENERAL} from '@constants/Messages';
import {APP_QUERY_MAP} from '@constants/Api';
import {
  FavoriteRequestBody,
  MovieItem,
  WatchlistRequestBody,
} from '@constants/AppInterfaces';
import AppHeader from '@components/common/AppHeader';
import SimilarMoviesWidget from '../../widgets/SimilarMovies';

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
  const isFocussed = useIsFocused();
  const setLastWatchedMovieId = useMovieStore(
    state => state.setLastWatchedMovieId,
  );
  const page = 1;
  const favoriteMoviesQuery = useQuery({
    queryKey: [APP_QUERY_MAP.FAVORITE_MOVIES],
    queryFn: ({signal}) => fetchMovieFavorites(signal, page),
    enabled: isFocussed,
  });
  const watchlistMoviesDataQuery = useQuery({
    queryKey: [APP_QUERY_MAP.WATCHLIST_MOVIES],
    queryFn: ({signal}) => fetchMovieWatchlist(signal, page),
    enabled: isFocussed,
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

  const renderPageHeader = () => (
    <AppHeader
      title={screenTitle}
      safePaddingEnabled
      transparentBackgroundEnabled={false}
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
      <SimilarMoviesWidget />
      {/* <MovieDetailsTab /> */}
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
