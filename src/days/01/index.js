export const a = (input) => {
  const TARGET = 2020;

  const lookup = {};

  const parsedInput = input.split('\n').map((v) => parseInt(v, 10));

  let valueA;
  let valueB;

  for (let i = 0; i < parsedInput.length; i += 1) {
    const current = parsedInput[i];

    if (lookup[current]) {
      valueA = current;
      valueB = lookup[current];
      break;
    }

    lookup[TARGET - current] = current;
  }

  return valueA * valueB;
};

export const b = (input) => {
  const TARGET = 2020;

  const lookup = {};

  const parsedInput = input.split('\n').map((v) => parseInt(v, 10));

  let valueA;
  let valueB;
  let valueC;

  for (let i = 0; i < parsedInput.length; i += 1) {
    const iValue = parsedInput[i];

    if (lookup[iValue]) {
      valueA = iValue;
      [valueB, valueC] = lookup[iValue];
      break;
    }

    for (let k = 0; k < i; k += 1) {
      const kValue = parsedInput[k];

      const subTarget = TARGET - iValue - kValue;

      lookup[subTarget] = [iValue, kValue];
    }
  }

  return valueA * valueB * valueC;
};
