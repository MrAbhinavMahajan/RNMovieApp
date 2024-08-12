import React from 'react';
import {Pressable, PressableProps} from 'react-native';
import RNText from '../RNText';
import {styles} from './styles';

type PrimaryCTAProps = {
  title: string;
  containerStyles?: any;
} & PressableProps;

type SecondaryCTAProps = {
  title: string;
  containerStyles?: any;
} & PressableProps;

export const PrimaryCTA = (props: PrimaryCTAProps) => {
  const {title, containerStyles = {}, ...remainingProps} = props;
  return (
    <Pressable style={[styles.primaryCTA, containerStyles]} {...remainingProps}>
      <RNText style={styles.primaryCTAText}>{title}</RNText>
    </Pressable>
  );
};

export const SecondaryCTA = (props: SecondaryCTAProps) => {
  const {title, containerStyles = {}, ...remainingProps} = props;
  return (
    <Pressable
      style={[styles.secondaryCTA, containerStyles]}
      {...remainingProps}>
      <RNText style={styles.secondaryCTAText}>{title}</RNText>
    </Pressable>
  );
};

const AppCTA = (props: PressableProps) => {
  const {children, ...remainingProps} = props;
  return <Pressable {...remainingProps}>{children}</Pressable>;
};

export default AppCTA;
