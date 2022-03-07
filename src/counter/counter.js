import useNghiaCounter, { Status } from './hook';

const Counter = () => {
  const [counter, increment, decrement] = useNghiaCounter();
  console.log(counter);

  return (
    <div>
      <div>{counter.value ?? ''}</div>
      {counter.status === Status.LOADING && <div>loading</div>}
      <div>
        <button
          onClick={decrement}
          disabled={counter.value <= 0 || counter.status === Status.LOADING}
        >
          decrement
        </button>
        <button
          onClick={increment}
          disabled={counter.value >= 10 || counter.status === Status.LOADING}
        >
          increment
        </button>
      </div>
    </div>
  );
};

export default Counter;
