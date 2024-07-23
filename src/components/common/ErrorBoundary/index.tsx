import React from 'react';
import {logError} from '@analytics';

interface Props {
  fallback: any;
  children: any;
}

interface State {
  error: any;
  stackTrace: any;
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {error: null, stackTrace: null, hasError: false};
  }

  componentDidCatch(error: any, stackTrace: any) {
    this.setState(
      {
        error,
        stackTrace,
        hasError: true,
      },
      () => {
        logError(`StackTrace: ${stackTrace}`);
      },
    );
  }

  render() {
    const fallbackData = {
      error: this.state.error,
      stackTrace: this.state.stackTrace,
    };

    return this.state.hasError
      ? this.props?.fallback(fallbackData)
      : this.props?.children;
  }
}
