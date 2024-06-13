import React, {Component} from 'react';
import RootStack from '../stacks/RootStack';
import {ErrorBoundary} from './Errorboundary';

export default class Main extends Component {
  render() {
    return (
      <ErrorBoundary>
        <RootStack />
      </ErrorBoundary>
    );
  }
}
