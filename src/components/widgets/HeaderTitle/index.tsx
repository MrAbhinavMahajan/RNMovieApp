import React from 'react';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import RNText from '../../common/RNText';
import {styles} from './styles';
import {AppNextIcon} from '../../common/RNIcon';
import {COLORS} from '../../../constants/Colors';
import {STD_ACTIVITY_COLOR} from '../../../constants/Styles';

interface HeaderTitleWidgetProps {
  title: string;
  titleTextStyles?: any;
  containerStyles?: any;
  rightCTAIcon?: any;
  rightCTAAction?: () => void;
  rightCTAEnabled?: boolean;
  loaderEnabled?: boolean;
}

const HeaderTitleWidget = (props: HeaderTitleWidgetProps) => {
  const {
    title,
    titleTextStyles,
    containerStyles,
    rightCTAEnabled,
    rightCTAAction,
    rightCTAIcon = <AppNextIcon color={COLORS.fullBlack} />,
    loaderEnabled = false,
  } = props;

  const renderLeftJSX = () => {
    return <RNText style={[styles.titleText, titleTextStyles]}>{title}</RNText>;
  };

  const renderRightJSX = () => {
    if (loaderEnabled) {
      return <ActivityIndicator color={STD_ACTIVITY_COLOR} />;
    } else if (rightCTAEnabled && rightCTAIcon && !!rightCTAAction) {
      return rightCTAIcon;
    }
    return <></>;
  };

  return (
    <TouchableOpacity
      style={[styles.contentView, containerStyles]}
      activeOpacity={0.7}
      disabled={loaderEnabled || !rightCTAEnabled || !rightCTAAction}
      onPress={rightCTAAction}>
      {renderLeftJSX()}
      {renderRightJSX()}
    </TouchableOpacity>
  );
};

export default HeaderTitleWidget;
