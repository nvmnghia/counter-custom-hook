import useNghiaCounter, { Status } from './hook';

const Counter = () => {
  const [counter, status, increment, decrement] = useNghiaCounter();
  console.log({ counter, status });

  return (
    <div>
      <div>{counter ?? ''}</div>
      <div>{status}</div>
      <div>
        <button onClick={decrement} disabled={status === Status.LOADING}>
          decrement
        </button>
        <button onClick={increment} disabled={status === Status.LOADING}>
          increment
        </button>
      </div>
    </div>
  );
};

export default Counter;
