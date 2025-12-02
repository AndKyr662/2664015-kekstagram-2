const getRandomInteger = (min, max) => Math.floor(Math.random() * max - min + 1) + min;

function debounce (callback, timeoutDelay) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

const getUniqueId = (min, max) => {
  const usedIds = [];

  return function () {
    let currentId = getRandomInteger(min, max);
    if (max - min + 1 <= usedIds.length) {
      throw new Error(`Перебраны все числа из диапазона от ${min} до ${max}`);
    }
    while (usedIds.includes(currentId)) {
      currentId = getRandomInteger(min, max);
    }
    usedIds.push(currentId);
    return currentId;
  };
};

export { getRandomInteger, getUniqueId, debounce };
