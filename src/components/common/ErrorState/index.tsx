/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import RNText from '@components/common/RNText';
import {AppRetryIcon} from '@components/common/RNIcon';
import {onErrorEvent} from '~/src/analytics';
import {styles} from './styles';
import AppCTA from '@components/common/AppCTA';

interface ErrorStateCardProps {
  error: Error;
  containerStyles: any;
  retryCTA: () => void;
  id: string;
  extraData?: any;
}

const ErrorStateCard = (props: ErrorStateCardProps) => {
  const {error, containerStyles, retryCTA, id, extraData = {}} = props;

  useEffect(() => {
    onErrorEvent({
      id,
      errorMessage: error?.message,
      extraData: {
        ...extraData,
        ...error,
      },
    });
  }, [error, id]);

  return (
    <AppCTA onPress={retryCTA} style={[styles.contentView, containerStyles]}>
      <AppRetryIcon />
      <RNText style={styles.titleText}>Tap to retry</RNText>
      <RNText style={styles.subtitleText}>{error?.message}</RNText>
    </AppCTA>
  );
};

export default ErrorStateCard;
