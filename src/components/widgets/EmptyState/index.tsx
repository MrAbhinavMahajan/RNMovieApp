import React from 'react';
import RNText from '@components/common/RNText';
import {styles} from './styles';
import AppCTA from '@components/common/AppCTA';

interface EmptyStateWidgetProps {
  containerStyles: any;
  action?: () => void;
  title: string;
  message: string;
  icon: any;
}

const EmptyStateWidget = (props: EmptyStateWidgetProps) => {
  const {title, message, containerStyles, action, icon} = props;
  const onPress = () => {
    if (action) {
      action();
    }
  };
  const renderIcon = () => icon || <></>;

  return (
    <AppCTA
      onPress={onPress}
      style={[styles.contentView, containerStyles]}
      disabled={!action}>
      {renderIcon()}
      <RNText style={styles.titleText}>{title}</RNText>
      <RNText style={styles.subtitleText}>{message}</RNText>
    </AppCTA>
  );
};

export default EmptyStateWidget;
