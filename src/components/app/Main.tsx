import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ErrorBoundary} from '../common/ErrorBoundary';
import AppFallback from '../common/AppFallback';
import MainStack from '../stacks/Main';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300000, // 5 minutes
      retry: 2,
      refetchOnWindowFocus: true,
    },
  },
});

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
