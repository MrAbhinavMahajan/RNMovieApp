/* eslint-disable react-hooks/exhaustive-deps */
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';

const usePageLeave = (callback, dependencies) => {
  useFocusEffect(
    useCallback(() => {
      return () => {
        if (typeof callback === 'function') {
          callback();
        }
      };
    }, [dependencies]),
  );
};

export default usePageLeave;
