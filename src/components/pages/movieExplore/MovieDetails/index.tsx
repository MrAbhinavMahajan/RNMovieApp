import React from 'react';
import _ from 'lodash';
import {View} from 'react-native';
import {MovieItem} from '@constants/AppInterfaces';
import {AppStarIcon, IconSize} from '@components/common/RNIcon';
import {COLORS} from '@constants/Colors';
import {styles} from './styles';
import Animated, {
  FadeIn,
  FadeInLeft,
  FadeOut,
  FadeOutDown,
} from 'react-native-reanimated';
import RNText from '@components/common/RNText';
import dayjs from 'dayjs';
import MovieOverview from '@components/common/MovieOverview';
import MovieGenres from '@components/common/MovieGenres';

const MovieDetails = ({item, index}: {item: MovieItem; index: number}) => {
  const {title, vote_average, genre_ids, overview, release_date} = item || {};

  return (
    <Animated.View
      key={`${title}${index}`} // * Important for Animation
      entering={FadeIn}
      exiting={FadeOutDown}
      style={styles.container}>
      {!_.isEmpty(genre_ids) && (
        <MovieGenres genreIds={genre_ids} genreTextStyles={styles.metaText} />
      )}
      <Animated.Text
        entering={FadeInLeft}
        exiting={FadeOut}
        style={styles.titleText}>
        {title}
      </Animated.Text>
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
      <MovieOverview
        text={overview}
        textStyles={styles.overViewText}
        ctaTextStyles={styles.overViewCTAText}
        containerStyles={styles.overViewTextContainer}
      />
    </Animated.View>
  );
};

export default MovieDetails;
