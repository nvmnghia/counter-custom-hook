import { useCallback, useEffect, useState } from 'react';
import * as API from '../mock/api';

const useNghiaCounter = () => {
  const [counter, setCounter] = useState(undefined);
  const [loading, setLoading] = useState(true);

  // Initial load
  useEffect(() => {
    (async () => {
      setCounter(await API.get());
      setLoading(false);
    })();
  }, []);

  // TODO: setState() batching INSIDE Promise is only available in 18+ WITH createRoot()
  const decrement = useCallback(async () => {
    setLoading(true);
    setCounter(await API.decrement());
    setLoading(false);
  }, []);

  const increment = useCallback(async () => {
    setLoading(true);
    setCounter(await API.increment());
    setLoading(false);
  }, []);

  return [counter, loading, increment, decrement];
};

export default useNghiaCounter;
