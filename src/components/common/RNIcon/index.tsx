import React from 'react';
import IIcon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {vpx} from '../../../libraries/responsive-pixels';
import {COLORS} from '../../../constants/Colors';

IIcon.loadFont();
MIcon.loadFont();

type IconSizeProps = {
  iconSizes: keyof typeof IconSizes;
};

export interface IconProps {
  size: IconSizeProps['iconSizes'];
  name: string;
  color: string;
}

const IconSizes = {
  small: vpx(16),
  medium: vpx(24),
  large: vpx(28),
  extraLarge: vpx(32),
  smallSemi: vpx(36),
  mediumSemi: vpx(40),
  largeSemi: vpx(44),
  extraLargeSemi: vpx(48),
  smallBold: vpx(40),
  mediumBold: vpx(44),
  largeBold: vpx(48),
  extraLargeBold: vpx(54),
};

export enum IconSize {
  small = 'small',
  medium = 'medium',
  large = 'large',
  extraLarge = 'extraLarge',
  smallSemi = 'smallSemi',
  mediumSemi = 'mediumSemi',
  largeSemi = 'largeSemi',
  extraLargeSemi = 'extraLargeSemi',
  smallBold = 'smallBold',
  mediumBold = 'mediumBold',
  largeBold = 'largeBold',
  extraLargeBold = 'extraLargeBold',
}

export const IoniIcon = ({size, name, color}: IconProps) => (
  <IIcon name={name} size={IconSizes[size]} color={color} />
);

export const MaterialIcon = ({size, name, color}: IconProps) => (
  <MIcon name={name} size={IconSizes[size]} color={color} />
);

export const AppBackIcon = ({
  color = COLORS.fullBlack,
  size = IconSize.large,
}) => <IoniIcon name={'arrow-back'} size={size} color={color} />;

export const AppSearchIcon = ({
  color = COLORS.fullBlack,
  size = IconSize.large,
}) => <IoniIcon name={'search'} size={size} color={color} />;

export const AppEditIcon = ({
  color = COLORS.fullBlack,
  size = IconSize.large,
}) => <MaterialIcon name={'edit'} size={size} color={color} />;

export const AppArrowUpIcon = ({
  color = COLORS.fullWhite,
  size = IconSize.large,
}) => <MaterialIcon name={'keyboard-arrow-up'} size={size} color={color} />;

export const AppNextIcon = ({
  color = COLORS.fullWhite,
  size = IconSize.large,
}) => <MaterialIcon name={'chevron-right'} size={size} color={color} />;

export const AppLogoutIcon = ({
  color = COLORS.fullWhite,
  size = IconSize.medium,
}) => <MaterialIcon name={'logout'} size={size} color={color} />;

export const AppCrossIcon = ({
  color = COLORS.fullBlack,
  size = IconSize.large,
}) => <IoniIcon name={'close-sharp'} size={size} color={color} />;

export const AppTickIcon = ({
  color = COLORS.fullBlack,
  size = IconSize.large,
}) => <MaterialIcon name={'done'} size={size} color={color} />;

export const AppRadioBtnIcon = ({
  color = COLORS.fullBlack,
  size = IconSize.large,
  checked = false,
}) => (
  <MaterialIcon
    name={checked ? 'radio-button-on' : 'radio-button-unchecked'}
    size={size}
    color={color}
  />
);

export const AppCheckboxBtnIcon = ({
  color = COLORS.fullBlack,
  size = IconSize.large,
  checked = false,
}) => (
  <IoniIcon
    name={checked ? 'checkbox' : 'checkbox-outline'}
    size={size}
    color={color}
  />
);

export const AppRetryIcon = ({
  color = COLORS.fullBlack,
  size = IconSize.largeSemi,
}) => <MaterialIcon name={'replay-circle-filled'} size={size} color={color} />;

export const AppDeleteIcon = ({
  color = COLORS.fullWhite,
  size = IconSize.large,
}) => <MaterialIcon name={'delete-forever'} size={size} color={color} />;
