export const a = (input) => {
  const parsedInput = input.trim().split('\n').map((v) => parseInt(v, 10)).sort((i, j) => i - j);

  const totals = { 1: 0, 3: 1 };

  parsedInput.forEach((cur, i) => {
    const prev = parsedInput[i - 1] ?? 0;

    const diff = cur - prev;

    totals[diff] += 1;
  });

  return totals[1] * totals[3];
};

const INCREMENTS = [1, 2, 3];

const allPathsFromSlice = (arr, [lowIndex, highIndex]) => {
  if (lowIndex === highIndex) { return 1; }

  const toCheck = [
    lowIndex,
  ];

  let complete = 0;

  while (toCheck.length) {
    const lastIndex = toCheck.pop();

    // eslint-disable-next-line no-loop-func
    INCREMENTS.forEach((inc) => {
      const i = lastIndex + inc;

      if (i < highIndex) {
        toCheck.push(i);
      } else if (i === highIndex) {
        complete += 1;
      }
    });
  }

  return complete;
};

// Maps the array into slices wherever there's a difference of 3, since there
// can only be one path across those points
const sliceAtThrees = (arr) => {
  const out = [];

  let lowIndex = 0;
  let highIndex = 0;

  while (highIndex <= arr.length - 1) {
    if (arr[highIndex + 1] - arr[highIndex] === 3) {
      out.push([lowIndex, highIndex]);
      lowIndex = highIndex + 1;
      highIndex = lowIndex;
    } else if (highIndex === arr.length - 1) {
      out.push([lowIndex, highIndex]);
      break;
    } else {
      highIndex += 1;
    }
  }

  return out;
};

export const b = (input) => {
  const parsedInput = input.trim().split('\n').map((v) => parseInt(v, 10)).sort((i, j) => i - j);
  parsedInput.unshift(0);

  const slices = sliceAtThrees(parsedInput);
  const total = slices.reduce((acc, cur) => acc * allPathsFromSlice(parsedInput, cur), 1);

  return total;
};
