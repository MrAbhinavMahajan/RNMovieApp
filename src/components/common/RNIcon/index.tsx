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
};

export enum IconSize {
  small = 'small',
  medium = 'medium',
  large = 'large',
  extraLarge = 'extraLarge',
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
}) => <MaterialIcon name={'arrow-back'} size={size} color={color} />;

export const AppArrowUpIcon = ({
  color = COLORS.fullWhite,
  size = IconSize.large,
}) => <MaterialIcon name={'keyboard-arrow-up'} size={size} color={color} />;

export const AppNextIcon = ({
  color = COLORS.fullWhite,
  size = IconSize.large,
}) => <MaterialIcon name={'chevron-right'} size={size} color={color} />;

export const AppCrossIcon = ({
  color = COLORS.fullBlack,
  size = IconSize.large,
}) => <IoniIcon name={'close-sharp'} size={size} color={color} />;

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
