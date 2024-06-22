import React from 'react';
import {TouchableOpacity} from 'react-native';
import RNText from '../../common/RNText';
import {styles} from './styles';
import {AppNextIcon} from '../../common/RNIcon';
import {COLORS} from '../../../constants/Colors';

interface HeaderTitleWidgetProps {
  title: string;
  containerStyles: any;
  rightCTAAction: () => void;
  rightCTAEnabled: boolean;
}

const HeaderTitleWidget = (props: HeaderTitleWidgetProps) => {
  const {title, containerStyles, rightCTAEnabled, rightCTAAction} = props;
  return (
    <TouchableOpacity
      style={[styles.contentView, containerStyles]}
      activeOpacity={0.7}
      disabled={!rightCTAAction}
      onPress={rightCTAAction}>
      <RNText style={styles.titleText}>{title}</RNText>
      {rightCTAEnabled && !!rightCTAAction && (
        <AppNextIcon color={COLORS.fullBlack} />
      )}
    </TouchableOpacity>
  );
};

export default HeaderTitleWidget;
