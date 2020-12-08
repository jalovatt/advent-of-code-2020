const runSequence = (seq, shouldLog = false) => {
  let i = 0;
  let acc = 0;

  const log = [];

  while (seq[i]?.executedTimes === 0 && i < seq.length) {
    const { instruction, value } = seq[i];

    if (shouldLog) {
      log.push([i, instruction, value]);
    }

    let incrementBy = 1;

    switch (instruction) {
      case 'acc': { acc += value; break; }
      case 'jmp': { incrementBy = value; break; }
      default: { break; }
    }

    // eslint-disable-next-line no-param-reassign
    seq[i].executedTimes += 1;
    i += incrementBy;
  }

  return [acc, i >= seq.length, log];
};

const parseInput = (input) => input.trim().split('\n').map((line) => {
  const [, instruction, value] = line.match(/(\w+) ([+\-0-9]+)/);

  return { instruction, value: parseInt(value, 10), executedTimes: 0 };
});

export const a = (input) => {
  const sequence = parseInput(input);

  const [acc] = runSequence(sequence);

  return acc;
};

export const b = (input) => {
  const sequence = parseInput(input);

  // Run through to get sequence of steps we hit
  const [, , log] = runSequence(sequence, true);

  // Starting from the last instruction hit and working back, try flipping each
  // jmp or nop we landed on until one lets the program finish.
  for (let k = 0; k < log.length; k += 1) {
    const [lineIndex, instruction, value] = log[k];

    if (instruction !== 'acc') {
      const permutation = [...sequence.map((obj) => ({ ...obj, executedTimes: 0 }))];

      permutation[lineIndex] = {
        instruction: (instruction === 'jmp') ? 'nop' : 'jmp',
        value,
        executedTimes: 0,
      };

      const [acc, finished] = runSequence(permutation);

      if (finished) {
        return acc;
      }
    }
  }

  return null;
};
