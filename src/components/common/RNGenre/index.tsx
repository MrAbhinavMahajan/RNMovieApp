import React from 'react';
import {FlatList, View} from 'react-native';
import _ from 'lodash';
import useMovieStore from '@store/useMovieStore';
import RNText from '../RNText';
import {styles} from './styles';

type RNGenre = {
  genreIds: number[];
  containerStyles: any;
  cardStyles: any;
  labelStyles: any;
};

const RNGenre = ({genreIds, containerStyles, ...others}: RNGenre) => {
  const [genres] = useMovieStore(state => [state.genres]);
  const genresById = (genreId: number) => {
    return genres.find(el => el.id === genreId)?.name;
  };

  if (_.isEmpty(genreIds)) {
    return null;
  }

  return (
    <FlatList
      data={genreIds}
      horizontal
      renderItem={({item, index}) => (
        <GenreItem
          name={genresById(item) || ''}
          genreId={item}
          index={index}
          {...others}
        />
      )}
      contentContainerStyle={containerStyles}
    />
  );
};

const GenreItem = ({
  name,
  genreId,
  index,
  cardStyles = {},
  labelStyles = {},
}: {
  name: string;
  genreId: number;
  index: number;
  cardStyles: any;
  labelStyles: any;
}) => {
  if (!name) {
    return null;
  }

  return (
    <View key={`genre-${genreId}-${index}`} style={[styles.card, cardStyles]}>
      <RNText style={[styles.label, labelStyles]}>{name}</RNText>
    </View>
  );
};

export default RNGenre;
