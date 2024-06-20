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
  scrollRef: any;
  styles?: any;
}
const AppCTA = (props: AppCTAProps) => {
  const {children, ...remainingProps} = props;
  return <TouchableOpacity {...remainingProps}>{children}</TouchableOpacity>;
};

export const ScrollToTopCTA = (props: ScrollToTopCTAProps) => {
  const {styles, scrollRef} = props;
  const scrollToTop = () => {
    scrollRef?.current.scrollTo({x: 0, y: 0, animated: true});
  };

  return (
    <TouchableOpacity style={styles} onPress={scrollToTop}>
      <AppArrowUpIcon />
    </TouchableOpacity>
  );
};

export default AppCTA;
