import { useCallback, useEffect, useState } from 'react';
import * as API from '../mock/api';

const Status = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
};

const useNghiaCounter = () => {
  const [counter, setCounter] = useState(undefined);
  const [status, setStatus] = useState(Status.LOADING);

  useEffect(() => {
    (async () => {
      try {
        setStatus(Status.LOADING);
        setCounter(await API.get());
        setStatus(Status.SUCCESS);
      } catch {
        setStatus(Status.FAILED);
      }
    })();
  }, []);

  const decrement = useCallback(async () => {
    try {
      setStatus(Status.LOADING);
      setCounter(await API.decrement());
      setStatus(Status.SUCCESS);
    } catch {
      setStatus(Status.FAILED);
    }
  }, []);

  const increment = useCallback(async () => {
    try {
      setStatus(Status.LOADING);
      setCounter(await API.increment());
      setStatus(Status.SUCCESS);
    } catch {
      setStatus(Status.FAILED);
    }
  }, []);

  return [counter, status, increment, decrement];
};

export default useNghiaCounter;
export { Status };
