import React from 'react';
import {ScrollView, View} from 'react-native';
import {styles} from './styles';
import FavoriteCTA from './FavoriteCTA';
import WatchlistCTA from './WatchlistCTA';

type CTAsPanelBox = {
  movieId: number;
};

const CTAsPanelBox = ({movieId}: CTAsPanelBox) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollableContainer}
        bounces={false}>
        <FavoriteCTA
          movieId={movieId}
          ctaContainerStyles={styles.ctaView}
          ctaTextStyles={styles.ctaText}
        />
        <WatchlistCTA
          movieId={movieId}
          ctaContainerStyles={styles.ctaView}
          ctaTextStyles={styles.ctaText}
        />
      </ScrollView>
    </View>
  );
};

export default CTAsPanelBox;
