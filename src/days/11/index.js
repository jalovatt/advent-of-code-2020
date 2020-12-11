/* eslint-disable no-param-reassign */

const FLOOR = '.';
const EMPTY = 'L';
const OCCUPIED = '#';

const countOccupiedSeats = (seats) => seats.reduce((acc, cur) => {
  for (let i = 0; i < cur.length; i += 1) {
    if (cur[i] === OCCUPIED) { acc += 1; }
  }

  return acc;
}, 0);

const runIteration = (seats, getNextSeatState) => {
  const nextSeats = new Array(seats.length).fill().map(() => []);
  let changed = false;

  for (let row = 0; row < seats.length; row += 1) {
    for (let col = 0; col < seats[0].length; col += 1) {
      nextSeats[row][col] = getNextSeatState(row, col);

      if (nextSeats[row][col] !== seats[row][col]) {
        changed = true;
      }
    }
  }

  return [nextSeats, changed];
};

export const a = (input) => {
  let seats = input.trim().split('\n');

  const getNextSeatState = (row, col) => {
    const current = seats[row][col];

    if (current === FLOOR) { return FLOOR; }

    const adjacent = [
      seats[row - 1]?.[col],
      seats[row - 1]?.[col + 1],
      seats[row][col + 1],
      seats[row + 1]?.[col + 1],
      seats[row + 1]?.[col],
      seats[row + 1]?.[col - 1],
      seats[row][col - 1],
      seats[row - 1]?.[col - 1],
    ];

    const count = adjacent.reduce((acc, cur) => (cur === OCCUPIED ? acc + 1 : acc), 0);

    if (current === EMPTY) {
      return count === 0 ? OCCUPIED : EMPTY;
    }

    return count >= 4 ? EMPTY : OCCUPIED;
  };

  let changed;

  do {
    [seats, changed] = runIteration(seats, getNextSeatState);
  } while (changed);

  return countOccupiedSeats(seats);
};

export const b = (input) => {
  let seats = input.trim().split('\n');

  const findVisibleSeat = (row, col, dy, dx) => {
    let y = row + dy;
    let x = col + dx;

    while (y >= 0 && y < seats.length && x >= 0 && x < seats[0].length) {
      const v = seats[y]?.[x];

      if (v !== FLOOR) { return v; }

      y += dy;
      x += dx;
    }

    return FLOOR;
  };

  const getNextSeatState = (row, col) => {
    const current = seats[row][col];

    if (current === FLOOR) { return FLOOR; }

    const visible = [
      findVisibleSeat(row, col, -1, 0),
      findVisibleSeat(row, col, -1, +1),
      findVisibleSeat(row, col, 0, +1),
      findVisibleSeat(row, col, +1, +1),
      findVisibleSeat(row, col, +1, 0),
      findVisibleSeat(row, col, +1, -1),
      findVisibleSeat(row, col, 0, -1),
      findVisibleSeat(row, col, -1, -1),
    ];

    const count = visible.reduce((acc, cur) => (cur === OCCUPIED ? acc + 1 : acc), 0);

    if (current === EMPTY) {
      return count === 0 ? OCCUPIED : EMPTY;
    }

    return count >= 5 ? EMPTY : OCCUPIED;
  };

  let changed;

  do {
    [seats, changed] = runIteration(seats, getNextSeatState);
  } while (changed);

  return countOccupiedSeats(seats);
};
