import { useCallback, useEffect, useState } from 'react';
import * as API from '../mock/api';

const Status = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
};

/* Effects */

const initialLoad = (setCounter) =>
  (async () => {
    try {
      setCounter({ value: await API.get(), status: Status.SUCCESS });
    } catch {
      setCounter({ value: undefined, status: Status.FAILED });
    }
  })();

// Revert to IDLE 2s after SUCCESS
const idleAfterSuccess = (counter, setCounter) => {
  if (counter.status === Status.SUCCESS) {
    const timerID = setTimeout(
      () => setCounter({ value: counter.value, status: Status.IDLE }),
      2000
    );
    return () => clearTimeout(timerID);
  }
};

/* Callbacks */

const _decrement = (value, setCounter) => async () => {
  setCounter({ value, status: Status.LOADING });

  // TODO: setState() batching INSIDE Promise is only available in 18+ WITH createRoot()
  try {
    setCounter({ value: await API.decrement(), status: Status.SUCCESS });
  } catch {
    setCounter({ value, status: Status.FAILED });
  }
};

const _increment = (value, setCounter) => async () => {
  setCounter({ value, status: Status.LOADING });

  try {
    setCounter({ value: await API.increment(), status: Status.SUCCESS });
  } catch {
    setCounter({ value, status: Status.FAILED });
  }
};

/* Component */

const useNghiaCounter = () => {
  const [counter, setCounter] = useState({
    value: undefined,
    status: Status.LOADING,
  });

  useEffect(() => initialLoad(setCounter), []);

  useEffect(() => idleAfterSuccess(counter, setCounter), [counter]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const decrement = useCallback(_decrement(counter.value, setCounter), [
    counter.value,
  ]); // EXACTLY counter.value, NOT the whole counter, which is created repeatedly

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const increment = useCallback(_increment(counter.value, setCounter), [
    counter.value,
  ]);

  return [counter, increment, decrement];
};

export default useNghiaCounter;
export { Status };
