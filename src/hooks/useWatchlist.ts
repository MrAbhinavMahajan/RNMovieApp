/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useRef, useState} from 'react';
import _ from 'lodash';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {fetchMovieWatchlist, updateMovieWatchlist} from '@apis/Main';
import {APP_QUERY_MAP} from '@constants/Api';
import {kGENERAL, kWATCHLIST} from '@constants/Messages';
import {
  ActivityStatus,
  MovieItem,
  WatchlistRequestBody,
} from '@constants/AppInterfaces';
import {onErrorEvent, onPageClickEvent} from '~/src/analytics';
import {APP_PAGES_MAP} from '~/src/constants/Navigation';
import {Alert} from 'react-native';

const useWatchlist = (movieId: number) => {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const {data, isFetching} = useQuery({
    queryKey: [APP_QUERY_MAP.WATCHLIST_MOVIES, page],
    queryFn: ({signal}) => fetchMovieWatchlist(signal, page),
  });
  const modified = useRef(false);
  const watchlistMutation = useMutation({
    mutationFn: updateMovieWatchlist,
    onSuccess: d => {
      if (d.status === ActivityStatus.ADDED) {
        Alert.alert(kWATCHLIST.added.title, kWATCHLIST.added.subtitle);
      } else {
        Alert.alert(kWATCHLIST.deleted.title, kWATCHLIST.deleted.subtitle);
      }
      modified.current = true;
    },
    onError: (error: any) => {
      Alert.alert(kGENERAL.title, kGENERAL.subtitle);
      onErrorEvent({
        id: APP_PAGES_MAP.MOVIE_DETAILS_SCREEN,
        errorMessage: error?.message,
        extraData: {
          id: 'WATCHLIST_CTA',
        },
      });
    },
  });
  const [isWatchlist, setIsWatchlist] = useState(false);

  useEffect(() => {
    // Cleanup for New MovieId
    setIsWatchlist(false);
    setPage(1);

    return () => {
      if (modified.current) {
        queryClient.invalidateQueries({
          queryKey: [APP_QUERY_MAP.WATCHLIST_MOVIES],
          refetchType: 'active',
        }); // ! Invalidates the watchlistMovies query data and fetch on successful mutation
      }
    };
  }, [movieId]);

  useEffect(() => {
    // Updates on New Page
    const {results, total_pages} = data || {};
    if (!_.isEmpty(results) && page <= total_pages) {
      const isMovieFound =
        results.filter((el: MovieItem) => el.id === movieId)?.length > 0;
      if (isMovieFound) {
        setIsWatchlist(isMovieFound);
      } else {
        setPage(p => p + 1);
      }
    }
    return () => {
      setIsWatchlist(false);
    };
  }, [movieId, page]);

  const toggleWatchlist = () => {
    onPageClickEvent({
      pageID: APP_PAGES_MAP.MOVIE_DETAILS_SCREEN,
      name: 'WATCHLIST CTA',
    });
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

  return {
    isWatchlist,
    isFetching,
    toggleWatchlist,
  };
};

export default useWatchlist;
