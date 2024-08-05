import React from 'react';
import _ from 'lodash';
import {View} from 'react-native';
import Animated, {FadeInRight, FadeOutLeft} from 'react-native-reanimated';
import {MovieItem} from '@constants/AppInterfaces';
import {COLORS} from '@constants/Colors';
import {styles} from './styles';
import {AppStarIcon, IconSize} from '@components/common/RNIcon';
import RNText from '@components/common/RNText';
import dayjs from 'dayjs';
import MovieGenres from '../../../MovieGenres';

const MovieDetails = ({item, index}: {item: MovieItem; index: number}) => {
  const {title, release_date, vote_average, genre_ids} = item;

  return (
    <Animated.View
      entering={FadeInRight}
      exiting={FadeOutLeft}
      key={`${title}${index}`} // * Important for Animation
      style={styles.movieDetailsView}>
      <RNText style={styles.titleText}>{title}</RNText>
      {!_.isEmpty(genre_ids) && (
        <MovieGenres genreIds={genre_ids} genreTextStyles={styles.metaText} />
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
