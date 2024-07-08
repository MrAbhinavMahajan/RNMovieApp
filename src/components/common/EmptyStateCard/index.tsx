import React from 'react';
import {styles} from './styles';
import {AppRetryIcon} from '../RNIcon';
import RNText from '@components/common/RNText';
import AppCTA from '../AppCTA';

interface EmptyStateCreativeCardProps {
  containerStyles?: any;
  title: string;
  message: string;
  retryCTA: () => void;
}

const EmptyStateCreativeCard = (props: EmptyStateCreativeCardProps) => {
  const {title, message, containerStyles, retryCTA} = props;

  return (
    <AppCTA onPress={retryCTA} style={[styles.contentView, containerStyles]}>
      <AppRetryIcon />
      <RNText style={styles.titleText}>{title}</RNText>
      <RNText style={styles.subtitleText}>{message}</RNText>
    </AppCTA>
  );
};

export default EmptyStateCreativeCard;
