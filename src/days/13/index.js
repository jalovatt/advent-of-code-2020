/* global BigInt */

const gcd = (x, y) => {
  let temp;

  while (y !== 0) {
    temp = y;
    /* eslint-disable no-param-reassign */
    y = x % y;
    x = temp;
    /* eslint-enable no-param-reassign */
  }

  return x;
};

const xgcd = (A, B, needBigInt = false) => {
  let s = needBigInt ? 0n : 0;
  let oldS = needBigInt ? 1n : 1;
  let t = needBigInt ? 1n : 1;
  let oldT = needBigInt ? 0n : 0;
  let r = B;
  let oldR = A;

  let quotient;

  while (r) {
    quotient = oldR / r;

    [oldR, r] = [r, oldR - r * quotient];
    [oldS, s] = [s, oldS - s * quotient];
    [oldT, t] = [t, oldT - t * quotient];
  }

  return [oldR, oldS, oldT];
};

const lcm = (x, y) => (x * y) / gcd(x, y);

const lcmMultiple = (arr) => (
  (arr.length === 2)
    ? lcm(arr[0], arr[1])
    : lcm(arr[0], lcmMultiple(arr.slice(1)))
);

export const a = (input) => {
  const [rawTimestamp, rawSchedule] = input.trim().split('\n');

  const baseTimestamp = parseInt(rawTimestamp, 10);

  const schedule = rawSchedule.split(',').reduce((acc, cur) => {
    if (cur === 'x') { return acc; }

    acc.push(parseInt(cur, 10));

    return acc;
  }, []);

  const scheduleCycleLength = lcmMultiple(schedule);

  const usingTimestamp = baseTimestamp % scheduleCycleLength;

  const [nextId, nextTime] = schedule.reduce((acc, cur) => {
    const next = Math.ceil(usingTimestamp / cur) * cur;

    return (next < acc[1])
      ? [cur, next]
      : acc;
  }, [null, Number.MAX_SAFE_INTEGER]);

  return nextId * (nextTime - usingTimestamp);
};

// ≡

/*
  Bezout's Identity:

  For

    n ≡ a1 (mod m1)
    n ≡ a2 (mod m2)
    ...

  There exists 'x' and 'y' for any pair with coprime bases such that

    m1*x + m2*y = 1 (the gcd of two primes)

  Chinese Remainder Theorem:

  Once the Bezout coefficients 'b' are known, a set of modular congruences with
  coprime bases can be reduced one pair at a time

    n ≡ a1 (mod m1)
    n ≡ a2 (mod m2)

    =>

    n ≡ (a1 * m2 * b2 + a2 * m1 * b1) (mod m1 * m2)

  When only one congruence is left

    n ≡ a (mod m)

  the first positive solution is (should be?)

    a % m + (m * enough to get past zero)
*/

export const b = (input) => {
  const [, rawSchedule] = input.trim().split('\n');

  const congruences = rawSchedule.split(',').map((v) => parseInt(v, 10))
    .reduce((acc, cur, i) => {
      if (cur) {
        acc.push([BigInt((cur - i) % cur), BigInt(cur)]);
      }

      return acc;
    }, []).sort((x, y) => y.value - x.value);

  // Reduce via CRT
  while (congruences.length > 1) {
    const [v1, m1] = congruences.pop();
    const [v2, m2] = congruences.pop();

    const [, b1, b2] = xgcd(m1, m2, true);

    congruences.push([BigInt(v1 * m2 * b2) + BigInt(v2 * m1 * b1), BigInt(m1 * m2)]);
  }

  const [value, base] = congruences[0];

  const final = value % base;
  return final > 0 ? final : final + base;
};
