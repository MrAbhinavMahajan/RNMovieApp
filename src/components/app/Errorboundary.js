import React from 'react';
import AppFallback from '../common/AppFallback';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {error: null, stackTrace: null, hasError: false};
  }

  componentDidCatch(error, stackTrace) {
    this.setState(
      {
        error,
        stackTrace,
        hasError: true,
      },
      () => {
        console.log('stackTrace:::', stackTrace);
        // sendErrorEvent({ error, stackTrace });
      },
    );
  }

  render() {
    return this.state.hasError ? (
      <AppFallback
        error={this.state.error}
        stackTrace={this.state.stackTrace}
      />
    ) : (
      this.props.children
    );
  }
}
