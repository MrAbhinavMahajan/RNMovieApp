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
import {Alert} from 'react-native';
import {kGENERAL} from '@constants/Messages';
import {FavoriteRequestBody, MovieItem} from '@constants/AppInterfaces';
import AppCTA from '@components/common/AppCTA';
import RNText from '@components/common/RNText';

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
  const page = 1;
  const queryClient = useQueryClient();
  const favoriteMoviesQuery = useQuery({
    queryKey: [APP_QUERY_MAP.FAVORITE_MOVIES],
    queryFn: ({signal}) => fetchMovieFavorites(signal, page),
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

  const [isFavorite, setIsFavorite] = useState(false);
  const scaleAnimation = useSharedValue(1);

  useEffect(() => {
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
      onPress={toggleFavorite}
      onPressIn={onPressIn}
      onPressOut={onPressOut}>
      <Animated.View style={scaleAnimatedStyles}>
        <MaterialIcon
          name={isFavorite ? 'favorite' : 'favorite-outline'}
          size={IconSize.medium}
          color={COLORS.red}
        />
      </Animated.View>
      <RNText style={ctaTextStyles}>Favorite</RNText>
    </AppCTA>
  );
};

export default FavoriteCTA;
