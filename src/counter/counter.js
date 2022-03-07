import useNghiaCounter, { Status } from './hook';

const Counter = () => {
  const [counter, increment, decrement] = useNghiaCounter();
  console.log(counter);

  return (
    <div>
      <div>{counter.value ?? ''}</div>
      <div>{counter.status}</div>
      <div>
        <button
          onClick={decrement}
          disabled={counter.status === Status.LOADING}
        >
          decrement
        </button>
        <button
          onClick={increment}
          disabled={counter.status === Status.LOADING}
        >
          increment
        </button>
      </div>
    </div>
  );
};

export default Counter;
