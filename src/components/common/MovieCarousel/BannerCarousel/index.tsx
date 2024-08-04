import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import {useAnimatedRef} from 'react-native-reanimated';
import {MovieItem} from '@constants/AppInterfaces';
import {styles} from './styles';
import CarouselItem from './CarouselItem';
import LinearGradient from 'react-native-linear-gradient';
import RNMaskedView from '../../RNMaskedView';

interface BannerCarouselParams {
  data: MovieItem[];
  itemAction: () => void;
}

const BannerCarousel = ({data, itemAction}: BannerCarouselParams) => {
  const [activeMovieIndex, setActiveMovieIndex] = useState(0);
  const listRef = useAnimatedRef<any>();
  const keyExtractor = (item: MovieItem, index: number) =>
    `${item?.id}${index}`;

  return (
    <View style={styles.container}>
      <RNMaskedView element={<GradientView />}>
        <FlatList
          ref={listRef}
          data={data}
          renderItem={({item}: {item: MovieItem}) => (
            <CarouselItem item={item} action={itemAction} />
          )}
          keyExtractor={keyExtractor}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={e => {
            const idx = Math.floor(
              e.nativeEvent.contentOffset.x /
                e.nativeEvent.layoutMeasurement.width,
            );
            setActiveMovieIndex(idx);
          }}
        />
      </RNMaskedView>
    </View>
  );
};

const GradientView = () => (
  <View style={styles.gradientView}>
    <LinearGradient
      colors={['#FFFFFF00', '#FFFFFF', '#FFFFFF00']}
      style={styles.maskedGradient}
    />
  </View>
);

export default BannerCarousel;
