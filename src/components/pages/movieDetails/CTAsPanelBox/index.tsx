import React from 'react';
import {ScrollView, View} from 'react-native';
import {styles} from './styles';
import FavoriteCTA from './FavoriteCTA';
import WatchlistCTA from './WatchlistCTA';
import {IconSize} from '~/src/components/common/RNIcon';

type CTAsPanelBox = {
  movieId: number;
};

const ICON_SIZE = IconSize.small;
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
          iconSize={ICON_SIZE}
        />
        <WatchlistCTA
          movieId={movieId}
          ctaContainerStyles={styles.ctaView}
          ctaTextStyles={styles.ctaText}
          iconSize={ICON_SIZE}
        />
      </ScrollView>
    </View>
  );
};

export default CTAsPanelBox;
