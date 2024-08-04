import React, {useState} from 'react';
import _ from 'lodash';
import {View} from 'react-native';
import useMovieStore from '@store/useMovieStore';
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

const MovieDetails = ({item, index}: {item: MovieItem; index: number}) => {
  const genres = useMovieStore(state => state.genres);
  const {title, vote_average, genre_ids, overview, release_date} = item || {};

  const genresById = (genreId: number) => {
    return genres.find(el => el.id === genreId)?.name;
  };

  return (
    <Animated.View
      key={`${title}${index}`} // * Important for Animation
      entering={FadeIn}
      exiting={FadeOutDown}
      style={styles.container}>
      {!_.isEmpty(genre_ids) && (
        <RNText style={styles.metaText}>
          {genre_ids.map(genreId => genresById(genreId)).join(', ')}
        </RNText>
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
      <MovieOverview overview={overview} />
    </Animated.View>
  );
};

const MovieOverview = ({overview}: {overview: string}) => {
  const [isExpanded, setExpanded] = useState(false);

  const toggleViewMore = () => {
    setExpanded(f => !f);
  };

  if (!overview) {
    return <></>;
  }
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={styles.infoContainer}>
      <View>
        <RNText style={styles.infoText} numberOfLines={isExpanded ? 0 : 2}>
          {overview}
        </RNText>
        <RNText style={styles.infoCTAText} onPress={toggleViewMore}>
          {isExpanded ? 'hide' : 'see more'}
        </RNText>
      </View>
    </Animated.View>
  );
};

export default MovieDetails;
