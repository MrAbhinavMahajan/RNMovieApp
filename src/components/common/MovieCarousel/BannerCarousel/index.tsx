/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import _ from 'lodash';
import {FlatList, View} from 'react-native';
import {MovieCarouselParams, MovieItem} from '@constants/AppInterfaces';
import {styles} from './styles';
import CarouselItem from './CarouselItem';
import LinearGradient from 'react-native-linear-gradient';
import RNMaskedView from '../../RNMaskedView';
import MovieDetails from './MovieDetails';

const BannerCarousel = ({
  data,
  itemAction,
  autoPlay = false,
  autoPlayTimer = 3000,
}: MovieCarouselParams) => {
  const [activeMovieIndex, setActiveMovieIndex] = useState(0);
  const listRef = useRef<any>();
  const autoPlayInterval = useRef<any>();
  const keyExtractor = (item: MovieItem, index: number) =>
    `${item?.id}${index}`;

  const scrollToIdx = () => {
    listRef.current?.scrollToIndex({animated: true, index: activeMovieIndex});
  };

  const moveToNext = () => {
    setActiveMovieIndex(prevIdx => {
      if (prevIdx >= data?.length - 1) {
        return 0;
      }
      return prevIdx + 1;
    });
  };

  useEffect(() => {
    if (!_.isEmpty(data) && activeMovieIndex >= 0) {
      scrollToIdx();
    }
  }, [activeMovieIndex]);

  useEffect(() => {
    if (autoPlay) {
      autoPlayInterval.current = setInterval(() => {
        if (!_.isEmpty(data)) {
          moveToNext();
        }
      }, autoPlayTimer);
    }
    return () => {
      clearInterval(autoPlayInterval.current);
    };
  }, [autoPlay]);

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
          initialScrollIndex={0}
        />
      </RNMaskedView>
      {!_.isEmpty(data) && (
        <MovieDetails item={data[activeMovieIndex]} index={activeMovieIndex} />
      )}
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
