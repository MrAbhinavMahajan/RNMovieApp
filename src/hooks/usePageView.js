/* eslint-disable react-hooks/exhaustive-deps */
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';

const usePageView = (props, callback) => {
  useFocusEffect(
    useCallback(() => {
      // sendPageViewEvent(props);
      if (typeof callback === 'function') {
        callback();
      }
    }, []),
  );
};

export default usePageView;
