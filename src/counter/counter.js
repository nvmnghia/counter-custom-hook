import { useCallback, useEffect, useState } from 'react';
import * as API from '../mock/api';

const Counter = () => {
  const [counter, setCounter] = useState(undefined);
  const [loading, setLoading] = useState(true);

  // Initial load
  useEffect(() => {
    (async () => {
      setCounter(await API.get());
      setLoading(false);
    })();
  }, []);

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

  return (
    <div>
      <div>{counter ?? ''}</div>
      {loading && <div>loading</div>}
      <div>
        <button onClick={decrement} disabled={counter <= 0 || loading}>
          decrement
        </button>
        <button onClick={increment} disabled={counter >= 10 || loading}>
          increment
        </button>
      </div>
    </div>
  );
};

export default Counter;
