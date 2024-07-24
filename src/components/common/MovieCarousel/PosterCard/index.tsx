import React from 'react';
import {View} from 'react-native';
import {MovieItem} from '@constants/AppInterfaces';
import {IconSize} from '../../RNIcon';
import {styles} from './styles';
import RNText from '../../RNText';
import MoviePosterWidget from '@components/widgets/MoviePoster';
import RNRating from '../../RNRating';
import RNGenre from '../../RNGenre';

type PosterCardProps = {
  item: MovieItem;
  index: number;
  action?: () => void;
};

const PosterCard = ({item, index, action}: PosterCardProps) => {
  const {original_title: title, vote_average, genre_ids, overview} = item || {};

  return (
    <View style={styles.container}>
      <MoviePosterWidget
        item={item}
        index={index}
        containerStyles={styles.poster}
        action={action}
      />

      <View key={`${title}${index}`} style={styles.container}>
        <RNText numberOfLines={1} style={styles.titleText}>
          {title}
        </RNText>
        {!!vote_average && (
          <RNRating
            rating={vote_average}
            iconSize={IconSize.small}
            containerStyles={styles.ratingContainer}
            ratingStyles={styles.ratingText}
          />
        )}
        <RNGenre
          genreIds={genre_ids}
          containerStyles={styles.genreContainer}
          cardStyles={styles.genreCard}
          labelStyles={styles.genreText}
        />
        {!!overview && (
          <RNText style={styles.overviewText} numberOfLines={3}>
            {overview}
          </RNText>
        )}
      </View>
    </View>
  );
};

export default PosterCard;
