/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
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
import {ActivityIndicator, Alert} from 'react-native';
import {kGENERAL} from '@constants/Messages';
import {MovieItem, WatchlistRequestBody} from '@constants/AppInterfaces';
import AppCTA from '@components/common/AppCTA';
import RNText from '@components/common/RNText';
import {STD_ACTIVITY_COLOR} from '@constants/Styles';
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
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const {data, isFetching} = useQuery({
    queryKey: [APP_QUERY_MAP.WATCHLIST_MOVIES, page],
    queryFn: ({signal}) => fetchMovieWatchlist(signal, page),
  });
  const watchlistMutation = useMutation({
    mutationFn: updateMovieWatchlist,
    onSuccess: () => {
      hasModified.current = true;
    },
    onError: () => {
      Alert.alert(kGENERAL.title, kGENERAL.subtitle);
    },
  });
  const [isWatchlist, setIsWatchlist] = useState(false);
  const hasModified = useRef(false);
  const scaleAnimation = useSharedValue(1);

  useEffect(() => {
    return () => {
      if (hasModified.current) {
        queryClient.invalidateQueries({
          queryKey: [APP_QUERY_MAP.WATCHLIST_MOVIES],
          refetchType: 'active',
        }); // ! Invalidates the watchlistMovies query data and fetch on successful mutation
      }
    };
  }, []);

  useEffect(() => {
    // Cleanup for New MovieId
    return () => {
      setIsWatchlist(false);
      setPage(1);
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
      disabled={isFetching}
      onPress={toggleWatchlist}
      onPressIn={onPressIn}
      onPressOut={onPressOut}>
      <Animated.View style={scaleAnimatedStyles}>
        {isFetching ? (
          <ActivityIndicator color={STD_ACTIVITY_COLOR} size={'small'} />
        ) : (
          <MaterialIcon
            name={isWatchlist ? 'bookmark' : 'bookmark-outline'}
            size={IconSize.medium}
            color={COLORS.oceanBlue}
          />
        )}
      </Animated.View>
      <RNText style={ctaTextStyles}>Watchlist</RNText>
    </AppCTA>
  );
};

export default WatchlistCTA;
