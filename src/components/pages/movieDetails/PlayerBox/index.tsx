/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, NativeAppEventEmitter, View} from 'react-native';
import WebView from 'react-native-webview';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {PAGE_REFRESH} from '@constants/Page';
import {fetchMovieVideos} from '@apis/Main';
import {APP_QUERY_MAP} from '@constants/Api';
import {STD_ACTIVITY_COLOR} from '@constants/Styles';
import {YOUTUBE_BASEURL} from '@constants/Main';
import {styles} from './styles';
import {MovieVideoItem, MovieVideoItemTypes} from '@constants/AppInterfaces';

type PlayerBoxProps = {
  movieId: number;
};

const PlayerBox = ({movieId}: PlayerBoxProps) => {
  const queryClient = useQueryClient();
  const {data, isFetching, refetch} = useQuery({
    queryKey: [APP_QUERY_MAP.MOVIES_TRAILER, movieId],
    queryFn: ({signal}) => fetchMovieVideos(signal, movieId),
  });

  const videos: MovieVideoItem[] = data?.results || [];
  const trailerVideoItem = videos.find(
    el => el.type === MovieVideoItemTypes.TRAILER,
  );

  const [webviewLoading, setWebViewLoading] = useState(false);

  const refreshData = () => {
    if (isFetching) {
      return;
    }
    refetch();
  };

  const onLoadStart = () => {
    setWebViewLoading(true);
  };

  const onLoadFinished = () => {
    setWebViewLoading(false);
  };

  const renderLoader = () => (
    <View style={styles.loaderView}>
      <ActivityIndicator size={'large'} color={STD_ACTIVITY_COLOR} />
    </View>
  );

  useEffect(() => {
    NativeAppEventEmitter.addListener(
      PAGE_REFRESH.MOVIE_DETAILS_SCREEN,
      refreshData,
    );
  }, []);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: [APP_QUERY_MAP.MOVIES_TRAILER, movieId],
      refetchType: 'active',
    });
  }, [movieId]);

  return (
    <View style={styles.container}>
      {webviewLoading && renderLoader()}
      {trailerVideoItem && (
        <WebView
          useWebKit
          allowsFullscreenVideo
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction
          source={{
            uri: `${YOUTUBE_BASEURL}/${trailerVideoItem.key}`,
          }}
          onLoadStart={onLoadStart}
          onLoad={onLoadFinished}
          scrollEnabled={false}
        />
      )}
    </View>
  );
};

export default PlayerBox;
