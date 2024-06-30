import React from 'react';
import RNText from '../../common/RNText';
import {styles} from './styles';
import AppCTA from '../../common/AppCTA';

interface EmptyStateWidgetProps {
  containerStyles: any;
  action: () => void;
  title: string;
  message: string;
  icon: any;
}

const EmptyStateWidget = (props: EmptyStateWidgetProps) => {
  const {title, message, containerStyles, action, icon} = props;

  const renderIcon = () => icon || <></>;

  return (
    <AppCTA onPress={action} style={[styles.contentView, containerStyles]}>
      {renderIcon()}
      <RNText style={styles.titleText}>{title}</RNText>
      <RNText style={styles.subtitleText}>{message}</RNText>
    </AppCTA>
  );
};

export default EmptyStateWidget;
