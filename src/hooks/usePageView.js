/* eslint-disable react-hooks/exhaustive-deps */
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';

const usePageView = (callback, dependencies) => {
  useFocusEffect(
    useCallback(() => {
      if (typeof callback === 'function') {
        callback();
      }
    }, [dependencies]),
  );
};

export default usePageView;
