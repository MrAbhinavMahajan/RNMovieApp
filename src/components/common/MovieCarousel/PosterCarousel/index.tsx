import React from 'react';
import {FlatList, View} from 'react-native';
import {useAnimatedRef} from 'react-native-reanimated';
import {MovieCarouselParams, MovieItem} from '@constants/AppInterfaces';
import {styles} from './styles';
import CarouselItem from './CarouselItem';

const PosterCarousel = ({data, itemAction}: MovieCarouselParams) => {
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
