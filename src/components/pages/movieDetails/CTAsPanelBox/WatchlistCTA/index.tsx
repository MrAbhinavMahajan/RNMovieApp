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
import {kGENERAL, kWATCHLIST} from '@constants/Messages';
import {
  ActivityStatus,
  MovieItem,
  WatchlistRequestBody,
} from '@constants/AppInterfaces';
import {STD_ACTIVITY_COLOR} from '@constants/Styles';
import {onPageClickEvent} from '~/src/analytics';
import {APP_PAGES_MAP} from '~/src/constants/Navigation';
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
    onError: () => {
      Alert.alert(kGENERAL.title, kGENERAL.subtitle);
    },
  });
  const [isWatchlist, setIsWatchlist] = useState(false);
  const scaleAnimation = useSharedValue(1);

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
