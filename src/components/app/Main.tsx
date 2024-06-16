import React from 'react';
import MainStack from '../stacks/Main';
import {ErrorBoundary} from '../common/ErrorBoundary';
import AppFallback from '../common/AppFallback';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

const Main = () => {
  const fallback = (data: any) => <AppFallback {...data} />;

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary fallback={fallback}>
        <MainStack />
      </ErrorBoundary>
    </QueryClientProvider>
  );
};

export default Main;
