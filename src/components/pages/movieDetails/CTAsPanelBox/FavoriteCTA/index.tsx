/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {fetchMovieFavorites, updateMovieFavorites} from '@apis/Main';
import {APP_QUERY_MAP} from '@constants/Api';
import {IconSize, MaterialIcon} from '@components/common/RNIcon';
import {COLORS} from '@constants/Colors';
import {ActivityIndicator, Alert} from 'react-native';
import {kFAVORITES, kGENERAL} from '@constants/Messages';
import {
  ActivityStatus,
  FavoriteRequestBody,
  MovieItem,
} from '@constants/AppInterfaces';
import AppCTA from '@components/common/AppCTA';
import RNText from '@components/common/RNText';
import {STD_ACTIVITY_COLOR} from '@constants/Styles';

type FavoriteCTA = {
  movieId: number;
  ctaTextStyles: any;
  ctaContainerStyles: any;
};

const FavoriteCTA = ({
  movieId,
  ctaTextStyles,
  ctaContainerStyles,
}: FavoriteCTA) => {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const {data, isFetching} = useQuery({
    queryKey: [APP_QUERY_MAP.FAVORITE_MOVIES, page],
    queryFn: ({signal}) => fetchMovieFavorites(signal, page),
  });
  const favoritesMutation = useMutation({
    mutationFn: updateMovieFavorites,
    onSuccess: d => {
      if (d.status === ActivityStatus.ADDED) {
        Alert.alert(kFAVORITES.added.title, kFAVORITES.added.subtitle);
      } else {
        Alert.alert(kFAVORITES.deleted.title, kFAVORITES.deleted.subtitle);
      }
      queryClient.invalidateQueries({
        queryKey: [APP_QUERY_MAP.FAVORITE_MOVIES],
        refetchType: 'active',
      }); // ! Invalidates the favoriteMovies query data and fetch on successful mutation
    },
    onError: () => {
      Alert.alert(kGENERAL.title, kGENERAL.subtitle);
    },
  });

  const [isFavorite, setIsFavorite] = useState(false);
  const scaleAnimation = useSharedValue(1);

  useEffect(() => {
    // Cleanup for New MovieId
    setIsFavorite(false);
    setPage(1);
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
      onPress={toggleFavorite}
      onPressIn={onPressIn}
      onPressOut={onPressOut}>
      {isFetching ? (
        <ActivityIndicator color={STD_ACTIVITY_COLOR} size={'small'} />
      ) : (
        <Animated.View style={scaleAnimatedStyles}>
          <MaterialIcon
            name={isFavorite ? 'favorite' : 'favorite-outline'}
            size={IconSize.medium}
            color={COLORS.red}
          />
        </Animated.View>
      )}
      <RNText style={ctaTextStyles}>Favorite</RNText>
    </AppCTA>
  );
};

export default FavoriteCTA;
