import { useCallback, useEffect, useState } from 'react';
import * as API from '../mock/api';

const Status = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
};

const useNghiaCounter = () => {
  const [counter, setCounter] = useState({
    value: undefined,
    status: Status.LOADING,
  });

  useEffect(() => {
    (async () => {
      try {
        setCounter({ value: await API.get(), status: Status.SUCCESS });
      } catch {
        setCounter({ value: undefined, status: Status.FAILED });
      }
    })();
  }, []);

  const decrement = useCallback(async () => {
    setCounter({ value: counter.value, status: Status.LOADING });

    // TODO: setState() batching INSIDE Promise is only available in 18+ WITH createRoot()
    try {
      setCounter({ value: await API.decrement(), status: Status.SUCCESS });
    } catch {
      setCounter({ value: counter.value, status: Status.FAILED });
    }
  }, [counter.value]); // EXACTLY counter.value, NOT the whole counter, which is created repeatedly

  const increment = useCallback(async () => {
    setCounter({ value: counter.value, status: Status.LOADING });

    try {
      setCounter({ value: await API.increment(), status: Status.SUCCESS });
    } catch {
      setCounter({ value: counter.value, status: Status.FAILED });
    }
  }, [counter.value]);

  return [counter, increment, decrement];
};

export default useNghiaCounter;
export { Status };
