/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import {ShadowedView} from 'react-native-fast-shadow';
import {PageState} from '../../../constants/Main';
import {STYLES} from '../../../constants/Styles';
import {styles} from './styles';
import AppHeader from '../../common/AppHeader';
import RNImage from '../../common/RNImage';
import AppCTA from '../../common/AppCTA';
import RNText from '../../common/RNText';
import {fetchTopRatedMovies} from '../../../apis/Main';
import _ from 'lodash';

interface TopRatedMovieProps {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
interface PageDataProps {
  results: TopRatedMovieProps[];
  total_pages: number;
}

const HomeScreen = () => {
  const imageURL =
    'https://media.licdn.com/dms/image/D5603AQEwgqk61oy06Q/profile-displayphoto-shrink_400_400/0/1713561898723?e=1723680000&v=beta&t=bvo0MwBiuhn4XpTHH0vWO5xr_VK6osWdSXn_KFtWseM';
  const [pageState, setPageState] = useState(PageState.EMPTY);
  const [pageData, setPageData] = useState<PageDataProps | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const listRef = useRef(null);
  const abortController = new AbortController();

  const openHamburger = () => {};

  const makePageApiCall = async () => {
    setPageState(PageState.LOADING);
    const options = {
      signal: abortController.signal,
    };
    fetchTopRatedMovies(options)
      .then((pageDataRes: PageDataProps) => {
        if (!_.isEmpty(pageDataRes)) {
          setPageData(pageDataRes);
          setPageState(PageState.SUCCESS);
        } else {
          setPageData(null);
          setPageState(PageState.EMPTY);
        }
      })
      .catch(err => {
        Alert.alert('Error');
        setError(err);
        setPageState(PageState.FAILED);
      });
  };

  const onPageRefresh = () => {
    makePageApiCall();
  };

  useEffect(() => {
    // Mount
    makePageApiCall();

    return () => {
      // Unmount
      abortController.abort();
    };
  }, []);

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

  const renderPageSuccessView = () => {
    return (
      <View style={styles.pageView}>
        <FlatList
          ref={listRef}
          data={pageData?.results || []}
          renderItem={({item}) => {
            return <RNText>{item.title}</RNText>;
          }}
          refreshControl={
            <RefreshControl
              refreshing={pageState === PageState.LOADING}
              onRefresh={onPageRefresh}
            />
          }
          keyExtractor={item => `${item?.id}`}
        />
      </View>
    );
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
      <ScrollView
        bounces={false}
        contentContainerStyle={STYLES.flexGrow}
        showsVerticalScrollIndicator={false}>
        {renderPageHeaderView()}
        {renderPageSuccessView()}
      </ScrollView>
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

  if (_.isEmpty(pageData) && pageState === PageState.LOADING) {
    // Skeleton loading
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.screenView}>
      {pageState === PageState.SUCCESS
        ? renderPageLayout()
        : renderPageFailed()}
    </View>
  );
};

export default HomeScreen;
