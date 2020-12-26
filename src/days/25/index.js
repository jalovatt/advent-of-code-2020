const transform = (v, subject) => (v * subject) % 20201227;

const transformTimes = (v, n) => {
  let cur = 1;

  for (let i = 0; i < n; i += 1) {
    cur = transform(cur, v);
  }

  return cur;
};

const timesToProduce = (v) => {
  let cur = 1;
  let i = 0;

  while (cur !== v) {
    cur = transform(cur, 7);
    i += 1;
  }

  return i;
};

// eslint-disable-next-line import/prefer-default-export
export const a = (input) => {
  const [cardKey, doorKey] = input.trim().split('\n').map((v) => parseInt(v, 10));

  // const nCard = timesToProduce(cardKey);
  const nDoor = timesToProduce(doorKey);

  return transformTimes(cardKey, nDoor);
};
