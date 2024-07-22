/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {ActivityIndicator, Alert} from 'react-native';
import * as NavigationService from '@service/Navigation';
import Animated, {FadeInUp, FadeOut} from 'react-native-reanimated';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import LinearGradient from 'react-native-linear-gradient';
import {
  deleteMovieRating,
  updateMovieFavorites,
  updateMovieWatchlist,
} from '@apis/Main';
import {styles} from './styles';
import {APP_PAGES_MAP, APP_WIDGETS_MAP} from '@constants/Navigation';
import {AppDeleteIcon, IconSize} from '@components/common/RNIcon';
import {COLORS} from '@constants/Colors';
import {
  FavoriteRequestBody,
  WatchlistRequestBody,
} from '@constants/AppInterfaces';
import {kFAVORITES, kGENERAL, kRATINGS, kWATCHLIST} from '@constants/Messages';
import {APP_QUERY_MAP} from '@constants/Api';
import {MoviePosterItem} from '@constants/AppInterfaces';
import MoviePosterWidget from '@components/widgets/MoviePoster';
import AppCTA from '@components/common/AppCTA';

const MovieCard = ({
  item,
  index,
  editableModeEnabled,
  widgetId,
}: {
  item: MoviePosterItem;
  index: number;
  editableModeEnabled?: boolean;
  widgetId?: string;
}) => {
  const queryClient = useQueryClient();
  const favoritesMutation = useMutation({
    mutationFn: updateMovieFavorites,
    onSuccess: () => {
      Alert.alert(kFAVORITES.deleted.title, kFAVORITES.deleted.subtitle);
      queryClient.invalidateQueries({
        queryKey: [APP_QUERY_MAP.PROFILE_VIEW_ALL_MOVIES],
        refetchType: 'active',
      });
      queryClient.invalidateQueries({
        queryKey: [APP_QUERY_MAP.FAVORITE_MOVIES],
        refetchType: 'active',
      });
      queryClient.invalidateQueries({
        queryKey: [APP_QUERY_MAP.PROFILE_VIEW_ALL_MOVIES],
        refetchType: 'active',
      });
    },
    onError: () => {
      Alert.alert(kGENERAL.title, kGENERAL.subtitle);
    },
  });

  const watchlistMutation = useMutation({
    mutationFn: updateMovieWatchlist,
    onSuccess: () => {
      Alert.alert(kWATCHLIST.deleted.title, kWATCHLIST.deleted.subtitle);
      queryClient.invalidateQueries({
        queryKey: [APP_QUERY_MAP.PROFILE_VIEW_ALL_MOVIES],
        refetchType: 'active',
      });
      queryClient.invalidateQueries({
        queryKey: [APP_QUERY_MAP.WATCHLIST_MOVIES],
        refetchType: 'active',
      });
      queryClient.invalidateQueries({
        queryKey: [APP_QUERY_MAP.PROFILE_VIEW_ALL_MOVIES],
        refetchType: 'active',
      });
    },
    onError: () => {
      Alert.alert(kGENERAL.title, kGENERAL.subtitle);
    },
  });

  const ratingsMutation = useMutation({
    mutationFn: deleteMovieRating,
    onSuccess: () => {
      Alert.alert(kRATINGS.deleteRating.title, kRATINGS.deleteRating.subtitle);
      queryClient.invalidateQueries({
        queryKey: [APP_QUERY_MAP.SELF_RATED_MOVIES],
        refetchType: 'active',
      });
      queryClient.invalidateQueries({
        queryKey: [APP_QUERY_MAP.PROFILE_VIEW_ALL_MOVIES],
        refetchType: 'active',
      });
    },
    onError: () => {
      Alert.alert(kGENERAL.title, kGENERAL.subtitle);
    },
  });
  const isPending =
    favoritesMutation.isPending ||
    watchlistMutation.isPending ||
    ratingsMutation.isPending;

  const {title, id} = item || {};

  const removeFavoriteItem = () => {
    const body: FavoriteRequestBody = {
      media_type: 'movie',
      media_id: id,
      favorite: false,
    };
    if (favoritesMutation.isPending) {
      // ! Throttle unnecessary Calls
      return;
    }
    favoritesMutation.mutate(body);
  };

  const removeWatchlistItem = () => {
    const body: WatchlistRequestBody = {
      media_type: 'movie',
      media_id: id,
      watchlist: false,
    };
    if (watchlistMutation.isPending) {
      // ! Throttle unnecessary Calls
      return;
    }
    watchlistMutation.mutate(body);
  };

  const removeRatedItem = () => {
    if (ratingsMutation.isPending) {
      // ! Throttle unnecessary Calls
      return;
    }
    ratingsMutation.mutate(id);
  };

  const onCTA = () => {
    if (editableModeEnabled) {
      switch (widgetId) {
        case APP_WIDGETS_MAP.FAVORITE_MOVIES:
          removeFavoriteItem();
          break;
        case APP_WIDGETS_MAP.WATCHLIST_MOVIES:
          removeWatchlistItem();
          break;
        case APP_WIDGETS_MAP.RATED_MOVIES:
          removeRatedItem();
          break;
      }
    } else {
      NavigationService.navigate(APP_PAGES_MAP.MOVIE_DETAILS_SCREEN, {
        queryParams: {screenTitle: title, movieId: id},
      });
    }
  };

  return (
    <Animated.View entering={FadeInUp} exiting={FadeOut}>
      <AppCTA style={styles.moviePosterContainer} onPress={onCTA}>
        <MoviePosterWidget
          item={item}
          index={index}
          containerStyles={styles.moviePoster}
        />

        {editableModeEnabled && (
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
        )}
      </AppCTA>
    </Animated.View>
  );
};

export default MovieCard;
