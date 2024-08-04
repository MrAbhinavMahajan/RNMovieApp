import React from 'react';
import {QueryClientProvider} from '@tanstack/react-query';
import {ErrorBoundary} from '@components/common/ErrorBoundary';
import {QUERY_CLIENT} from '@constants/Main';
import MainStack from '@components/stacks/Main';
import AppFallback from '@components/common/AppFallback';
import {StatusBar} from 'react-native';
import {STD_SCREEN_COLOR} from '~/src/constants/Styles';
const Main = () => {
  const fallback = (data: any) => <AppFallback {...data} />;

  return (
    <QueryClientProvider client={QUERY_CLIENT}>
      <ErrorBoundary fallback={fallback}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={STD_SCREEN_COLOR}
          translucent
        />
        <MainStack />
      </ErrorBoundary>
    </QueryClientProvider>
  );
};

export default Main;
