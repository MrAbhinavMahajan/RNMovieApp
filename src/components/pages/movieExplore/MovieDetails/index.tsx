import React, {useState} from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import RNText from '@components/common/RNText';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {MovieItem} from '@constants/AppInterfaces';
import {AppStarIcon, IconSize} from '@components/common/RNIcon';
import {COLORS} from '@constants/Colors';
import Animated, {FadeInLeft, FadeOut} from 'react-native-reanimated';
import Pagination from '../Pagination';
import {genres} from '~/src/data/Main';

const MovieDetails = ({
  item,
  index,
  size,
}: {
  item: MovieItem;
  index: number;
  size: number;
}) => {
  const tabBarHeight = useBottomTabBarHeight();
  const {title, vote_average, genre_ids, overview, release_date} = item || {};

  const genresById = (genreId: number) => {
    return genres.find(el => el.id === genreId)?.name;
  };

  return (
    <Animated.View
      entering={FadeInLeft}
      exiting={FadeOut}
      style={[styles.container, {bottom: tabBarHeight}]}>
      <Pagination totalPages={size} currentPage={index + 1} />
      <RNText style={styles.metaText}>
        {genre_ids.map(genreId => genresById(genreId)).join(', ')}
      </RNText>
      <RNText style={styles.titleText}>{title}</RNText>
      <View style={styles.metaContainer}>
        <RNText style={styles.metaText}>{release_date}</RNText>
        <View style={styles.dot} />
        <RNText style={styles.metaText}>1h 51m</RNText>
        <View style={styles.dot} />
        <View style={styles.starContainer}>
          <AppStarIcon size={IconSize.small} color={COLORS.lightGray08} />
          <RNText style={styles.metaText}> {vote_average.toFixed(1)}</RNText>
        </View>
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

  return (
    <Animated.View
      entering={FadeInLeft}
      exiting={FadeOut}
      style={styles.infoContainer}>
      <View>
        <RNText style={styles.infoText} numberOfLines={isExpanded ? 0 : 3}>
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
