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

const initCounter = () => {
  const raw = getLSCounter();
  if (raw === null) {
    COUNTER = 0;
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
  if (COUNTER < 10) setLSCounter(++COUNTER);
  return COUNTER;
};

const decrement = async () => {
  await randomSleep();
  randomThrow();
  if (COUNTER > 0) setLSCounter(--COUNTER);
  return COUNTER;
};

export { get, increment, decrement };
