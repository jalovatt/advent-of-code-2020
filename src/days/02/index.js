export const a = (input) => {
  const parsedInput = input.trim().split('\n').map((line) => {
    const [, min, max, target, password] = line.match(/(\d+)-(\d+) (\w): (\w+)/);

    return {
      min: parseInt(min, 10),
      max: parseInt(max, 10),
      target,
      password,
    };
  });

  const valid = parsedInput.reduce((acc, { min, max, target, password }) => {
    let count = 0;

    for (let i = 0; i < password.length; i += 1) {
      const cur = password[i];
      if (cur === target) {
        count += 1;

        if (count > max) { return acc; }
      }
    }

    return acc + (min <= count ? 1 : 0);
  }, 0);

  return valid;
};

// Only for boolean inputs
const xor = (left, right) => left !== right;

export const b = (input) => {
  const parsedInput = input.trim().split('\n').map((line) => {
    const [, min, max, target, password] = line.match(/(\d+)-(\d+) (\w): (\w+)/);

    return {
      first: parseInt(min, 10) - 1,
      second: parseInt(max, 10) - 1,
      target,
      password,
    };
  });

  const valid = parsedInput.reduce((acc, { first, second, target, password }) => {
    const isValid = xor(password[first] === target, password[second] === target);

    return acc + (isValid ? 1 : 0);
  }, 0);

  return valid;
};
