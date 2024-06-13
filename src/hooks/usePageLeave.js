/* eslint-disable react-hooks/exhaustive-deps */
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';

const usePageLeave = (props, callback) => {
  useFocusEffect(
    useCallback(() => {
      return () => {
        // sendPageLeaveEvent(props);
        if (typeof callback === 'function') {
          callback();
        }
      };
    }, []),
  );
};

export default usePageLeave;
