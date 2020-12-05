const decodeRow = (rawRow) => {
  let low = 0;
  let high = 127;

  for (let i = 0; i < rawRow.length; i += 1) {
    const v = rawRow[i];

    if (v === 'F') {
      high -= Math.floor((high - low) / 2);
    } else {
      low += Math.ceil((high - low) / 2);
    }
  }

  return low;
};

const decodeColumn = (rawColumn) => {
  let low = 0;
  let high = 7;

  for (let i = 0; i < rawColumn.length; i += 1) {
    const v = rawColumn[i];

    if (v === 'L') {
      high -= Math.floor((high - low) / 2);
    } else {
      low += Math.ceil((high - low) / 2);
    }
  }

  return low;
};

const getSeatId = (row, column) => row * 8 + column;

export const decode = (str) => {
  const [, rawRow, rawColumn] = str.match(/(\w{7})(\w{3})/);

  const row = decodeRow(rawRow);
  const column = decodeColumn(rawColumn);

  const id = getSeatId(row, column);

  return id;
};

const replaceMap = (str, lookup) => {
  const out = [];

  for (let i = 0; i < str.length; i += 1) {
    out[i] = lookup[str[i]];
  }

  return out.join('');
};

// Clever solution, should have been obvious, thanks to jholman for the idea
export const decodeBinary = (str) => {
  const binary = replaceMap(str, {
    F: 0,
    B: 1,
    L: 0,
    R: 1,
  });

  const [, rawRow, rawColumn] = binary.match(/(\w{7})(\w{3})/);

  const row = parseInt(rawRow, 2);
  const column = parseInt(rawColumn, 2);

  return row * 8 + column;
};

export const a = (input) => input.split('\n').reduce((acc, cur) => {
  const id = decode(cur);

  return Math.max(acc, id);
}, 0);

export const b = (input) => {
  const [idLookup, max] = input.split('\n').reduce((acc, cur) => {
    const id = decode(cur);
    acc[0][id] = true;

    acc[1] = Math.max(acc[1], id);

    return acc;
  }, [{}, 0]);

  for (let i = 0; i < max; i += 1) {
    if (!idLookup[i] && idLookup[i - 1] && idLookup[i + 1]) {
      return i;
    }
  }

  return NaN;
};
