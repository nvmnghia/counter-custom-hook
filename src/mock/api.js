/* Sleep utils */

const MIN_SLEEP = 500; // Min & max sleep time, in ms
const MAX_SLEEP = 2000;
const SLEEP_RANGE = MAX_SLEEP - MIN_SLEEP;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const randomSleep = () => sleep(Math.random() * SLEEP_RANGE + MIN_SLEEP);

const randomThrow = () => {
  if (Math.random() < 0.2) throw new Error('oh fuck');
};

/* Local storage */

const LS_COUNTER = 'counter';
const getLSCounter = () => localStorage.getItem(LS_COUNTER);
const setLSCounter = (newCounter) =>
  localStorage.setItem(LS_COUNTER, newCounter.toString());

/* Mock API */

let COUNTER;
const MIN_COUNTER = 0;
const MAX_COUNTER = 10;

const initCounter = () => {
  const raw = getLSCounter();
  if (raw === null) {
    console.log(process.env.REACT_APP_INITIAL_COUNTER);
    COUNTER = parseInt(process.env.REACT_APP_INITIAL_COUNTER ?? MIN_COUNTER);
    setLSCounter(COUNTER);
  } else {
    COUNTER = parseInt(raw);
  }
  return COUNTER;
};

const get = async () => {
  await randomSleep();
  randomThrow();
  return COUNTER ?? initCounter();
};

const increment = async () => {
  await randomSleep();
  randomThrow();

  if (COUNTER < MAX_COUNTER) setLSCounter(++COUNTER);
  else throw new Error(`counter can't be more than ${MAX_COUNTER}`);
  return COUNTER;
};

const decrement = async () => {
  await randomSleep();
  randomThrow();

  if (COUNTER > MIN_COUNTER) setLSCounter(--COUNTER);
  else throw new Error(`counter can't be less than ${MIN_COUNTER}`);
  return COUNTER;
};

export { get, increment, decrement };
