import React from 'react';
import {ScrollView, View} from 'react-native';
import {styles} from './styles';
import FavoriteCTA from './FavoriteCTA';
import WatchlistCTA from './WatchlistCTA';
import {IconSize} from '~/src/components/common/RNIcon';
import ShareCTA from './ShareCTA';

type CTAsPanelBox = {
  movieId: number;
  movieName: string;
};

const ICON_SIZE = IconSize.small;
const CTAsPanelBox = ({movieId, movieName}: CTAsPanelBox) => {
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
        <ShareCTA
          movieId={movieId}
          ctaContainerStyles={styles.ctaView}
          ctaTextStyles={styles.ctaText}
          iconSize={ICON_SIZE}
          movieName={movieName}
        />
      </ScrollView>
    </View>
  );
};

export default CTAsPanelBox;
