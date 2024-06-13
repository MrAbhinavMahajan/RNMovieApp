import React from 'react';
import RootStack from '../stacks/RootStack';
import {ErrorBoundary} from '../common/ErrorBoundary';
import AppFallback from '../common/AppFallback';

const Main = () => {
  const fallback = (data: any) => <AppFallback {...data} />;

  return (
    <ErrorBoundary fallback={fallback}>
      <RootStack />
    </ErrorBoundary>
  );
};

export default Main;
