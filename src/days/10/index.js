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

// I had to get a hint from Reddit to get this running in useable time
export const b = (input) => {
  const parsedInput = input.trim().split('\n').map((v) => parseInt(v, 10)).sort((i, j) => i - j);

  // Works, but would take ~10 minutes on the real input :(
  //
  // const lastIndex = parsedInput.length - 1;
  // const toCheck = [
  //   { value: parsedInput[lastIndex], index: lastIndex },
  // ];

  // let complete = 0;

  // while (toCheck.length) {
  //   const last = toCheck.pop();

  //   if (last.value <= 3) {
  //     complete += 1;
  //   }

  //   for (let i = last.index - 1; i >= last.index - 3; i -= 1) {
  //     const possible = parsedInput[i];

  //     if (last.value - possible <= 3) {
  //       toCheck.push({ value: possible, index: i });
  //     }
  //   }
  // }

  const pathsTo = { [parsedInput[parsedInput.length - 1] + 3]: 1 };

  const sumPathsTo = (v) => {
    const one = pathsTo[v + 1] || 0;
    const two = pathsTo[v + 2] || 0;
    const three = pathsTo[v + 3] || 0;

    return one + two + three;
  };

  for (let i = parsedInput.length - 1; i >= 0; i -= 1) {
    pathsTo[parsedInput[i]] = sumPathsTo(parsedInput[i]);
  }

  return sumPathsTo(0);
};
