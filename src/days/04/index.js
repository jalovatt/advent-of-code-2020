/* eslint-disable yoda */
const requiredFields = [
  'ecl',
  'pid',
  'eyr',
  'hcl',
  'byr',
  'iyr',
  // 'cid',
  'hgt',
];

const eyeColors = new Set(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']);

const inRange = (n, low, high) => (low <= n && n <= high);

const validateField = {
  byr: (v) => inRange(parseInt(v, 10), 1920, 2002),
  iyr: (v) => inRange(parseInt(v, 10), 2010, 2020),
  eyr: (v) => inRange(parseInt(v, 10), 2020, 2030),
  hgt: (v) => {
    const [, height, unit] = v.match(/(\d+)(\w+)/);

    switch (unit) {
      case 'cm': return inRange(parseInt(height, 10), 150, 193);
      case 'in': return inRange(parseInt(height, 10), 59, 76);
      default: return false;
    }
  },
  hcl: (v) => v.length === 7 && v.match(/#[0-9a-f]{6}/),
  ecl: (v) => eyeColors.has(v),
  pid: (v) => v.length === 9 && v.match(/\d{9}/),
  cid: () => true,
};

const parseFields = (rawFields) => rawFields.reduce((acc, cur) => {
  const [k, v] = cur.split(':');
  acc[k] = v;

  return acc;
}, {});

const parseInput = (input) => input.trim().split('\n\n').reduce((acc, cur) => {
  acc.push(parseFields(cur.split(/[ \n]/)));

  return acc;
}, []);

export const a = (input) => {
  const parsedInput = parseInput(input);

  const numValid = parsedInput.reduce((acc, cur) => {
    if (requiredFields.every((f) => cur[f])) {
      // eslint-disable-next-line no-param-reassign
      acc += 1;
    }

    return acc;
  }, 0);

  return numValid;
};

export const b = (input) => {
  const parsedInput = parseInput(input);

  const numValid = parsedInput.reduce((acc, cur) => {
    if (requiredFields.every((f) => cur[f] && validateField[f](cur[f]))) {
      // eslint-disable-next-line no-param-reassign
      acc += 1;
    }

    return acc;
  }, 0);

  return numValid;
};
