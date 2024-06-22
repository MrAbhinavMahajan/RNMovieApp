import React from 'react';
import {TouchableOpacity} from 'react-native';
import {AppArrowUpIcon} from '../RNIcon';

interface AppCTAProps {
  onPress: () => void;
  disabled?: boolean;
  children: any;
  styles?: any;
}

interface ScrollToTopCTAProps {
  styles?: any;
  scrollToTop: () => void;
}
const AppCTA = (props: AppCTAProps) => {
  const {children, ...remainingProps} = props;
  return <TouchableOpacity {...remainingProps}>{children}</TouchableOpacity>;
};

export const ScrollToTopCTA = (props: ScrollToTopCTAProps) => {
  const {styles, scrollToTop} = props;

  return (
    <TouchableOpacity style={styles} onPress={scrollToTop}>
      <AppArrowUpIcon />
    </TouchableOpacity>
  );
};

export default AppCTA;
