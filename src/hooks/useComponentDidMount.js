/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';

const useComponentDidMount = callback => {
  useEffect(() => {
    if (typeof callback === 'function') {
      callback();
    }
  }, []);
};

export default useComponentDidMount;
