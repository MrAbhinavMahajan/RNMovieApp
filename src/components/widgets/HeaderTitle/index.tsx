import React from 'react';
import {TouchableOpacity} from 'react-native';
import RNText from '../../common/RNText';
import {styles} from './styles';
import {AppNextIcon} from '../../common/RNIcon';
import {COLORS} from '../../../constants/Colors';

interface HeaderTitleWidgetProps {
  title: string;
  containerStyles: any;
}

const HeaderTitleWidget = (props: HeaderTitleWidgetProps) => {
  const {title, containerStyles} = props;
  return (
    <TouchableOpacity
      style={[styles.contentView, containerStyles]}
      activeOpacity={0.7}>
      <RNText style={styles.titleText}>{title}</RNText>
      <AppNextIcon color={COLORS.fullBlack} />
    </TouchableOpacity>
  );
};

export default HeaderTitleWidget;
