import { useCallback, useEffect, useState } from 'react';
import * as API from '../mock/api';

const Status = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
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
        setCounter({ value: await API.get(), status: Status.IDLE });
      } catch {
        setCounter({ value: undefined, status: Status.IDLE });
      }
    })();
  }, []);

  // TODO: setState() batching INSIDE Promise is only available in 18+ WITH createRoot()
  const decrement = useCallback(async () => {
    setCounter({ value: counter.value, status: Status.LOADING });

    try {
      setCounter({ value: await API.decrement(), status: Status.IDLE });
    } catch {
      setCounter({ value: counter.value, status: Status.IDLE });
    }
  }, [counter.value]); // EXACTLY counter.value, NOT the whole counter

  const increment = useCallback(async () => {
    setCounter({ value: counter.value, status: Status.LOADING });

    try {
      setCounter({ value: await API.increment(), status: Status.IDLE });
    } catch {
      setCounter({ value: counter.value, status: Status.IDLE });
    }
  }, [counter.value]);

  return [counter, increment, decrement];
};

export default useNghiaCounter;
export { Status };
