/* eslint-disable react-hooks/exhaustive-deps */
import React, {useRef} from 'react';
import {ActivityIndicator, FlatList, RefreshControl, View} from 'react-native';
import {ShadowedView} from 'react-native-fast-shadow';
import {styles} from './styles';
import AppHeader from '../../common/AppHeader';
import RNImage from '../../common/RNImage';
import AppCTA from '../../common/AppCTA';
import RNText from '../../common/RNText';
import {fetchTopRatedMovies} from '../../../apis/Main';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import MovieItem from './MovieItem';
import _ from 'lodash';

const HomeScreen = () => {
  const queryClient = useQueryClient(); // * Access the TanStack Query Client
  const query = useQuery({
    queryKey: ['topRatedMovies'],
    queryFn: fetchTopRatedMovies,
  });
  console.log(query);
  const {data: pageData, error, isLoading, isSuccess, refetch} = query;
  const imageURL =
    'https://media.licdn.com/dms/image/D5603AQEwgqk61oy06Q/profile-displayphoto-shrink_400_400/0/1713561898723?e=1723680000&v=beta&t=bvo0MwBiuhn4XpTHH0vWO5xr_VK6osWdSXn_KFtWseM';
  const listRef = useRef(null);

  const openHamburger = () => {};

  const onPageRefresh = () => {
    refetch();
  };

  const headerLeftCTA = () => {
    return (
      <ShadowedView style={styles.headerLeftCTAShadow}>
        <View style={styles.headerLeftCTA}>
          <AppCTA onPress={openHamburger}>
            <RNImage
              imageURL={imageURL}
              imageViewStyles={styles.headerLeftCTAImage}
            />
          </AppCTA>
        </View>
      </ShadowedView>
    );
  };

  const renderPageHeaderView = () => {
    return <AppHeader LeftComponent={headerLeftCTA()} title="Show Time" />;
  };

  const renderPageErrorView = () => {
    return (
      <View>
        <RNText style={{}}>{error?.message}</RNText>
      </View>
    );
  };

  const renderPageLayout = () => {
    return (
      <View style={styles.pageView}>
        {renderPageHeaderView()}
        <FlatList
          ref={listRef}
          data={pageData?.results || []}
          numColumns={2}
          renderItem={data => {
            return <MovieItem {...data} />;
          }}
          keyExtractor={item => `${item?.id}`}
          contentContainerStyle={styles.listContentView} // * To take entire list view height
          columnWrapperStyle={styles.listColumnWrapper}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onPageRefresh} />
          }
        />
      </View>
    );
  };

  const renderPageFailed = () => {
    return (
      <View>
        {renderPageHeaderView()}
        {renderPageErrorView()}
      </View>
    );
  };

  if (_.isEmpty(pageData) && isLoading) {
    // Skeleton loading
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.screenView}>
      {isSuccess ? renderPageLayout() : renderPageFailed()}
    </View>
  );
};

export default HomeScreen;
