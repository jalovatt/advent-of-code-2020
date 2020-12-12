/* eslint-disable max-classes-per-file */

const DIRECTIONS = {
  E: 0,
  S: 1,
  W: 2,
  N: 3,
};

class ShipA {
  constructor() {
    this.direction = DIRECTIONS.E;

    this.x = 0;
    this.y = 0;

    this.log = [];
  }

  turn = (degrees, direction) => {
    const amount = degrees / 90;

    const newVal = (this.direction + (direction === 'R' ? amount : -amount) + 4) % 4;
    this.direction = newVal;
  }

  move = (value, direction = this.direction) => {
    if (direction === DIRECTIONS.E) { this.x += value; return; }
    if (direction === DIRECTIONS.S) { this.y += value; return; }
    if (direction === DIRECTIONS.W) { this.x -= value; return; }
    this.y -= value;
  }

  manhattan = () => Math.abs(this.x) + Math.abs(this.y);
}

export const a = (input) => {
  const parsedInput = input.trim().split('\n');

  const ship = new ShipA();

  parsedInput.forEach((line) => {
    const [, command, value] = line.match(/(\w)(\d+)/);

    if (DIRECTIONS[command] !== undefined) {
      ship.move(parseInt(value, 10), DIRECTIONS[command]);
    } else if (command === 'F') {
      ship.move(parseInt(value, 10));
    } else {
      ship.turn(parseInt(value, 10), command);
    }
  });

  return ship.manhattan();
};

class ShipB {
  constructor() {
    this.direction = DIRECTIONS.E;

    this.x = 0;
    this.y = 0;

    // relative
    this.wx = 10;
    this.wy = -1;

    this.log = [];
  }

  rotateWaypoint = (degrees, direction) => {
    const sign = direction === 'R' ? -1 : 1;
    const steps = degrees / 90;

    for (let i = 0; i < steps; i += 1) {
      const temp = this.wx;

      this.wx = this.wy * sign;
      this.wy = temp * -sign;
    }
  }

  move = (value) => {
    for (let i = 0; i < value; i += 1) {
      this.x += this.wx;
      this.y += this.wy;
    }
  }

  moveWaypoint = (value, direction) => {
    if (direction === DIRECTIONS.E) { this.wx += value; return; }
    if (direction === DIRECTIONS.S) { this.wy += value; return; }
    if (direction === DIRECTIONS.W) { this.wx -= value; return; }
    this.wy -= value;
  }

  manhattan = () => Math.abs(this.x) + Math.abs(this.y);
}

export const b = (input) => {
  const parsedInput = input.trim().split('\n');

  const ship = new ShipB();

  parsedInput.forEach((line) => {
    const [, command, value] = line.match(/(\w)(\d+)/);

    if (DIRECTIONS[command] !== undefined) {
      ship.moveWaypoint(parseInt(value, 10), DIRECTIONS[command]);
    } else if (command === 'F') {
      ship.move(parseInt(value, 10));
    } else {
      ship.rotateWaypoint(parseInt(value, 10), command);
    }
  });

  return ship.manhattan();
};
