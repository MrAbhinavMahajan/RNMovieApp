/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {fetchMovieWatchlist, updateMovieWatchlist} from '@apis/Main';
import {APP_QUERY_MAP} from '@constants/Api';
import {IconSize, MaterialIcon} from '@components/common/RNIcon';
import {COLORS} from '@constants/Colors';
import {Alert} from 'react-native';
import {kGENERAL} from '@constants/Messages';
import {MovieItem, WatchlistRequestBody} from '@constants/AppInterfaces';
import AppCTA from '@components/common/AppCTA';
import RNText from '@components/common/RNText';
type WatchlistCTA = {
  movieId: number;
  ctaTextStyles: any;
  ctaContainerStyles: any;
};

const WatchlistCTA = ({
  movieId,
  ctaTextStyles,
  ctaContainerStyles,
}: WatchlistCTA) => {
  const page = 1;
  const queryClient = useQueryClient();
  const watchlistMoviesDataQuery = useQuery({
    queryKey: [APP_QUERY_MAP.WATCHLIST_MOVIES],
    queryFn: ({signal}) => fetchMovieWatchlist(signal, page),
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
  const [isWatchlist, setIsWatchlist] = useState(false);
  const scaleAnimation = useSharedValue(1);

  useEffect(() => {
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
  }, [movieId]);

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

  const onPressIn = () => {
    scaleAnimation.value = withSpring(0.5);
  };

  const onPressOut = () => {
    scaleAnimation.value = withSpring(1);
  };

  const scaleAnimatedStyles = useAnimatedStyle(() => ({
    transform: [{scale: scaleAnimation.value}],
  }));

  return (
    <AppCTA
      style={ctaContainerStyles}
      onPress={toggleWatchlist}
      onPressIn={onPressIn}
      onPressOut={onPressOut}>
      <Animated.View style={scaleAnimatedStyles}>
        <MaterialIcon
          name={isWatchlist ? 'bookmark' : 'bookmark-outline'}
          size={IconSize.medium}
          color={COLORS.oceanBlue}
        />
      </Animated.View>
      <RNText style={ctaTextStyles}>Watchlist</RNText>
    </AppCTA>
  );
};

export default WatchlistCTA;
