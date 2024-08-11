/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useRef, useState} from 'react';
import _ from 'lodash';
import Toast from 'react-native-toast-message';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {fetchMovieFavorites, updateMovieFavorites} from '@apis/Main';
import {APP_QUERY_MAP} from '@constants/Api';
import {kFAVORITES, kGENERAL} from '@constants/Messages';
import {
  ActivityStatus,
  FavoriteRequestBody,
  MovieItem,
} from '@constants/AppInterfaces';
import {onErrorEvent, onPageClickEvent} from '~/src/analytics';
import {APP_PAGES_MAP} from '@constants/Navigation';

const useFavorites = (movieId: number) => {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const {data, isFetching} = useQuery({
    queryKey: [APP_QUERY_MAP.FAVORITE_MOVIES, page],
    queryFn: ({signal}) => fetchMovieFavorites(signal, page),
  });
  const modified = useRef(false);
  const favoritesMutation = useMutation({
    mutationFn: updateMovieFavorites,
    onSuccess: d => {
      if (d.status === ActivityStatus.ADDED) {
        Toast.show({
          type: 'success',
          text1: kFAVORITES.added.title,
          text2: kFAVORITES.added.subtitle,
          position: 'bottom',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: kFAVORITES.deleted.title,
          text2: kFAVORITES.added.subtitle,
          position: 'bottom',
        });
      }
      modified.current = true;
    },
    onError: (error: any) => {
      Toast.show({
        type: 'error',
        text1: kGENERAL.title,
        text2: kGENERAL.subtitle,
        position: 'bottom',
      });
      onErrorEvent({
        id: APP_PAGES_MAP.MOVIE_DETAILS_SCREEN,
        errorMessage: error?.message,
        extraData: {
          id: 'FAVORITE_CTA',
        },
      });
    },
  });

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Cleanup for New MovieId
    setIsFavorite(false);
    setPage(1);

    return () => {
      if (modified.current) {
        queryClient.invalidateQueries({
          queryKey: [APP_QUERY_MAP.FAVORITE_MOVIES],
          refetchType: 'active',
        }); // ! Invalidates the favoriteMovies query data and fetch on successful mutation
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
        setIsFavorite(isMovieFound);
      } else {
        setPage(p => p + 1);
      }
    }
  }, [movieId, page]);

  const toggleFavorite = () => {
    onPageClickEvent({
      pageID: APP_PAGES_MAP.MOVIE_DETAILS_SCREEN,
      name: 'FAVORITE CTA',
    });
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

  return {
    isFavorite,
    isFetching,
    toggleFavorite,
  };
};

export default useFavorites;
