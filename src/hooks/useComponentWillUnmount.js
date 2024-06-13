/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';

const useComponentWillUnmount = callback => {
  useEffect(() => {
    return () => {
      if (typeof callback === 'function') {
        callback();
      }
    };
  }, []);
};

export default useComponentWillUnmount;
