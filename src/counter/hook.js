import { useCallback, useEffect, useState } from 'react';
import * as API from '../mock/api';

const Status = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
};

const useNghiaCounter = () => {
  const [counter, setCounter] = useState({
    value: undefined,
    status: Status.LOADING,
  });

  // Initial load
  useEffect(() => {
    (async () => {
      try {
        setCounter({ value: await API.get(), status: Status.SUCCESS });
      } catch {
        setCounter({ value: undefined, status: Status.FAILED });
      }
    })();
  }, []);

  // Revert to IDLE after 2s
  useEffect(() => {
    if (counter.status === Status.SUCCESS) {
      const timerID = setTimeout(
        () => setCounter({ value: counter.value, status: Status.IDLE }),
        2000
      );

      return () => clearTimeout(timerID);
    }
  }, [counter]);

  // TODO: setState() batching INSIDE Promise is only available in 18+ WITH createRoot()
  const decrement = useCallback(async () => {
    setCounter({ value: counter.value, status: Status.LOADING });

    try {
      setCounter({ value: await API.decrement(), status: Status.SUCCESS });
    } catch {
      setCounter({ value: counter.value, status: Status.FAILED });
    }
  }, [counter.value]); // EXACTLY counter.value, NOT the whole counter

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
