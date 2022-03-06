import { useCallback, useState } from 'react';

const Counter = () => {
  const [counter, setCounter] = useState(0);

  // TODO: throw if not in [0, 10]

  const increment = useCallback(
    () => setCounter((curr) => (curr === 10 ? curr : curr + 1)),
    []
  );
  const decrement = useCallback(
    () => setCounter((curr) => (curr === 0 ? curr : curr - 1)),
    []
  );

  return (
    <div>
      <div>{counter}</div>
      <div>
        <button onClick={decrement}>decrement</button>
        <button onClick={increment}>increment</button>
      </div>
    </div>
  );
};

export default Counter;
