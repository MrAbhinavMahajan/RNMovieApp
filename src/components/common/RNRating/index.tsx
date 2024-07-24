import * as React from 'react';
import {View, Text} from 'react-native';
import {IconSize, IoniIcon} from '../RNIcon';
import {styles} from './styles';

type RNRatingProps = {
  rating: number;
  iconSize: IconSize;
  containerStyles: any;
  ratingStyles: any;
};

const RNRating = ({
  rating,
  iconSize,
  containerStyles = {},
  ratingStyles = {},
}: RNRatingProps) => {
  const filledStars = Math.floor(rating / 2); // fully filled stars
  const halfFilled = rating % 2 !== 0; // half-filled star
  const emptyStars = 5 - filledStars - (halfFilled ? 1 : 0); // empty stars
  const stars = [
    ...Array(filledStars).fill('star'), // Fully filled stars
    ...(halfFilled ? ['star-half'] : []), // Half-filled star (if needed)
    ...Array(emptyStars).fill('star-outline'), // Empty stars
  ];

  return (
    <View style={[styles.container, containerStyles]}>
      <Text style={[styles.ratingText, ratingStyles]}>{rating.toFixed(1)}</Text>
      {stars.map((type, index) => (
        <IoniIcon key={index} name={type} size={iconSize} color={'tomato'} />
      ))}
    </View>
  );
};

export default RNRating;
