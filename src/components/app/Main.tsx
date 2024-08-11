import React, {useEffect} from 'react';
import {QueryClientProvider, onlineManager} from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo';
import {ErrorBoundary} from '@components/common/ErrorBoundary';
import {QUERY_CLIENT} from '@constants/Main';
import {StatusBar} from 'react-native';
import {STD_SCREEN_COLOR} from '~/src/constants/Styles';
import MainStack from '@components/stacks/Main';
import AppFallback from '@components/common/AppFallback';
import Toast from 'react-native-toast-message';

const Main = () => {
  const fallback = (data: any) => <AppFallback {...data} />;

  useEffect(() => {
    onlineManager.setEventListener(setOnline => {
      return NetInfo.addEventListener(state => {
        setOnline(!!state.isConnected);
      });
    });
  }, []);

  return (
    <QueryClientProvider client={QUERY_CLIENT}>
      <ErrorBoundary fallback={fallback}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={STD_SCREEN_COLOR}
          translucent
        />
        <MainStack />
        <Toast />
      </ErrorBoundary>
    </QueryClientProvider>
  );
};

export default Main;
