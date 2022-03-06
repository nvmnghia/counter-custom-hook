/* Sleep utils */

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const randomSleep = () => sleep(Math.random() * 5000 + 1000); // Sleep [1, 5) s

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
    localStorage.setItem(LS_COUNTER, COUNTER.toString());
  } else {
    COUNTER = parseInt(raw);
  }
  return COUNTER;
};

const get = async () => {
  await randomSleep();
  return COUNTER ?? initCounter();
};

const increment = async () => {
  await randomSleep();
  if (COUNTER < 10) setLSCounter(++COUNTER);
  return COUNTER;
};

const decrement = async () => {
  await randomSleep();
  if (COUNTER > 0) setLSCounter(--COUNTER);
  return COUNTER;
};

export { get, increment, decrement };
