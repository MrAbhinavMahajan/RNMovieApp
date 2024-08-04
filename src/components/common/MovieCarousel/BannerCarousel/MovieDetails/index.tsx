import React from 'react';
import _ from 'lodash';
import {View} from 'react-native';
import Animated, {FadeInRight, FadeOutLeft} from 'react-native-reanimated';
import useMovieStore from '@store/useMovieStore';
import {MovieItem} from '@constants/AppInterfaces';
import {COLORS} from '@constants/Colors';
import {styles} from './styles';
import {AppStarIcon, IconSize} from '@components/common/RNIcon';
import RNText from '@components/common/RNText';
import dayjs from 'dayjs';

const MovieDetails = ({item, index}: {item: MovieItem; index: number}) => {
  const genres = useMovieStore(state => state.genres);
  const {title, release_date, vote_average, genre_ids} = item;
  const genresById = (genreId: number) => {
    return genres.find(el => el.id === genreId)?.name;
  };

  return (
    <Animated.View
      entering={FadeInRight}
      exiting={FadeOutLeft}
      key={`${title}${index}`}
      style={styles.movieDetailsView}>
      <RNText style={styles.titleText}>{title}</RNText>
      {!_.isEmpty(genre_ids) && (
        <RNText style={styles.metaText}>
          {genre_ids.map(genreId => genresById(genreId)).join(' | ')}
        </RNText>
      )}
      <View style={styles.metaContainer}>
        {!!release_date && (
          <RNText style={styles.metaText}>
            {dayjs(release_date).format('DD MMM YYYY')}
          </RNText>
        )}
        {!!vote_average && (
          <View style={styles.starContainer}>
            <AppStarIcon size={IconSize.small} color={COLORS.lightGray08} />
            <RNText style={styles.metaText}> {vote_average.toFixed(1)}</RNText>
          </View>
        )}
      </View>
    </Animated.View>
  );
};

export default MovieDetails;
