import React from 'react';
import {FlatList, View} from 'react-native';
import {useAnimatedRef} from 'react-native-reanimated';
import {MovieItem} from '~/src/constants/AppInterfaces';
import CarouselItem from './CarouselItem';
import {styles} from './styles';

interface PosterCarouselParams {
  data: MovieItem[];
  itemAction: () => void;
}
const PosterCarousel = ({data, itemAction}: PosterCarouselParams) => {
  const listRef = useAnimatedRef<any>();
  const keyExtractor = (item: MovieItem, index: number) =>
    `${item?.id}${index}`;

  return (
    <View style={styles.container}>
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
      />
    </View>
  );
};

export default PosterCarousel;
