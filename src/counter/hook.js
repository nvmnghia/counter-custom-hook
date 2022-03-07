import { useCallback, useEffect, useState } from 'react';
import * as API from '../mock/api';

const useNghiaCounter = () => {
  const [counter, setCounter] = useState({ value: undefined, loaded: false });

  // Initial load
  useEffect(() => {
    (async () => {
      setCounter({ value: await API.get(), loaded: true });
    })();
  }, []);

  // TODO: setState() batching INSIDE Promise is only available in 18+ WITH createRoot()
  const decrement = useCallback(async () => {
    setCounter({ value: counter.value, loaded: false });
    setCounter({ value: await API.decrement(), loaded: true });
  }, [counter.value]); // EXACTLY counter.value, NOT the whole counter

  const increment = useCallback(async () => {
    setCounter({ value: counter.value, loaded: false });
    setCounter({ value: await API.increment(), loaded: true });
  }, [counter.value]);

  return [counter, increment, decrement];
};

export default useNghiaCounter;
