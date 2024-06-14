import React from 'react';
import MainStack from '../stacks/Main';
import {ErrorBoundary} from '../common/ErrorBoundary';
import AppFallback from '../common/AppFallback';

const Main = () => {
  const fallback = (data: any) => <AppFallback {...data} />;

  return (
    <ErrorBoundary fallback={fallback}>
      <MainStack />
    </ErrorBoundary>
  );
};

export default Main;
