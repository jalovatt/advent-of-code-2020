export const a = (input, turns = 2020) => {
  const parsed = input.split(',').map((v) => parseInt(v, 10));

  let last;

  /*
    I originally solved this with an object of tuples [prevSpokenAt, lastSpokenAt],
    but that took around 5 minutes to complete. Commenters on Reddit pointed out
    that array indexing is faster than hash indexing, and I also realized the
    lastSpokenAt value would always be i - 1 and was therefore unnecessary.

    Switching to a presized array of integers brings the runtime down to 800ms.
  */
  const prevSpoken = parsed.reduce((acc, cur, i) => {
    acc[cur] = i;

    last = cur;

    return acc;
  }, new Array(turns));

  for (let i = parsed.length; i < turns; i += 1) {
    const prevSpokenAt = prevSpoken[last];

    prevSpoken[last] = i - 1;

    const speaking = (prevSpokenAt === undefined)
      ? 0
      : i - 1 - prevSpokenAt;

    last = speaking;
  }

  return last;
};

export const b = (input) => a(input, 30000000);
