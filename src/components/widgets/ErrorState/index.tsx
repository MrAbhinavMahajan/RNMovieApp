import React from 'react';
import RNText from '../../common/RNText';
import {styles} from './styles';
import AppCTA from '../../common/AppCTA';
import {AppRetryIcon} from '../../common/RNIcon';

interface ErrorInfoWidgetProps {
  error: Error;
  containerStyles: any;
  retryCTA: () => void;
}

const ErrorStateWidget = (props: ErrorInfoWidgetProps) => {
  const {error, containerStyles, retryCTA} = props;

  return (
    <AppCTA onPress={retryCTA} style={[styles.contentView, containerStyles]}>
      <AppRetryIcon />
      <RNText style={styles.titleText}>Tap to retry</RNText>
      <RNText style={styles.subtitleText}>{error?.message}</RNText>
    </AppCTA>
  );
};

export default ErrorStateWidget;
