export const a = (input, turns = 2020) => {
  const parsed = input.split(',').map((v) => parseInt(v, 10));

  let last;

  // tuples of [prevSpokenTurn, lastSpokenTurn]
  const lastSpoken = parsed.reduce((acc, cur, i) => {
    acc[cur] = [null, i];

    last = cur;

    return acc;
  }, {});

  const t0 = Date.now();

  for (let i = parsed.length; i < turns; i += 1) {
    if (i % 1000000 === 0) {
      process.stdout.write(`i = ${i / 1000000}M (${Math.ceil((Date.now() - t0) / 1000)}s)\n`);
    }

    const lastWas = last;

    const lastRecord = lastSpoken[last];

    // process.stdout.write(`  last was ${lastWas}, prev ${lastRecord?.[0]}, last ${lastRecord?.[1]}\n`);

    const speaking = (lastRecord[0] === null)
      ? 0
      : lastRecord[1] - lastRecord[0];

    if (!lastSpoken[speaking]) {
      lastSpoken[speaking] = [null, i];
    }

    const speakingRecord = lastSpoken[speaking];

    speakingRecord[0] = speakingRecord[1];
    speakingRecord[1] = i;

    last = speaking;
  }

  return last;
};

export const b = (input) => {
  return a(input, 30000000);
};
