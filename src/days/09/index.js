const hasSumPair = (arr, back, front, value) => {
  for (let i = back; i < (front - 1); i += 1) {
    for (let j = i + 1; j < front; j += 1) {
      // console.log(arr[i], arr[k], arr[i] + arr[k], value);
      if (arr[i] + arr[j] === value) { return true; }
    }
  }

  return false;
};

export const a = (input, preambleSize = 25) => {
  const parsedInput = input.trim().split('\n').map((v) => parseInt(v, 10));

  let back = 0;

  for (let front = preambleSize; front < parsedInput.length; front += 1) {
    const value = parsedInput[front];
    if (!hasSumPair(parsedInput, back, front, value)) { return value; }

    back += 1;
  }

  return null;
};

export const b = (input, preambleSize = 25) => {
  const target = a(input, preambleSize);

  const parsedInput = input.trim().split('\n').map((v) => parseInt(v, 10));

  let back = 0;
  let front = 1;

  let runningSum = parsedInput[0] + parsedInput[1];

  do {
    if (runningSum > target) {
      runningSum -= parsedInput[back];
      back += 1;
    } else if (runningSum < target) {
      front += 1;
      runningSum += parsedInput[front];
    }
  } while (runningSum !== target);

  const set = parsedInput.slice(back, front).sort((i, j) => i - j);

  return set[0] + set[set.length - 1];
};
