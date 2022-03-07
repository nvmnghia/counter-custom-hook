import useNghiaCounter from './hook';

const Counter = () => {
  const [counter, increment, decrement] = useNghiaCounter();
  console.log(counter);

  return (
    <div>
      <div>{counter.value ?? ''}</div>
      {!counter.loaded && <div>loading</div>}
      <div>
        <button
          onClick={decrement}
          disabled={counter.value <= 0 || !counter.loaded}
        >
          decrement
        </button>
        <button
          onClick={increment}
          disabled={counter.value >= 10 || !counter.loaded}
        >
          increment
        </button>
      </div>
    </div>
  );
};

export default Counter;
