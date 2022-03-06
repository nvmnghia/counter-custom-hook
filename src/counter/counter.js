import useNghiaCounter from './hook';

const Counter = () => {
  const [counter, loading, increment, decrement] = useNghiaCounter();
  console.log({ counter, loading });

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
