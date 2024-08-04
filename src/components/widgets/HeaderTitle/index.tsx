import React from 'react';
import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import RNText from '@components/common/RNText';
import {styles} from './styles';
import {AppNextIcon} from '@components/common/RNIcon';
import {COLORS} from '@constants/Colors';
import {STD_ACTIVITY_COLOR} from '@constants/Styles';
import RNImage from '../../common/RNImage';

type Meta = {
  title: string;
  subtitle: string;
  imageURL: string;
};
interface HeaderTitleWidgetProps {
  title: string;
  titleTextStyles?: any;
  meta: Meta;
  containerStyles?: any;
  rightCTAIcon?: any;
  rightCTAAction?: () => void;
  rightCTAEnabled?: boolean;
  loaderEnabled?: boolean;
  hasMetaData?: boolean;
}

const HeaderTitleWidget = (props: HeaderTitleWidgetProps) => {
  const {
    title: originalTitle,
    titleTextStyles,
    containerStyles,
    rightCTAEnabled,
    rightCTAAction,
    rightCTAIcon = <AppNextIcon color={COLORS.fullBlack} />,
    loaderEnabled = false,
    hasMetaData = false,
    meta,
  } = props;

  const renderLeftJSX = () => {
    const {imageURL, subtitle, title} = meta || {};
    if (hasMetaData) {
      return (
        <View style={styles.leftJSXView}>
          {!!imageURL && (
            <RNImage
              imageURL={imageURL}
              imageViewStyles={styles.leftJSXImageView}
              imageStyles={styles.leftJSXImage}
              fallbackCharacter="R"
            />
          )}
          <View>
            {!!subtitle && (
              <RNText style={styles.subtitleText}>{subtitle}</RNText>
            )}
            <RNText style={[styles.titleText, titleTextStyles]}>{title}</RNText>
          </View>
        </View>
      );
    }

    return (
      <RNText style={[styles.titleText, titleTextStyles]}>
        {originalTitle}
      </RNText>
    );
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
