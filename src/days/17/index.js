/* eslint-disable max-classes-per-file */
/* eslint-disable no-param-reassign */
/*
  Neightbours = 26 where the Manhattan distance is at most 1
    9 above
    8 around
    9 below

  If a cube is active and exactly 2 or 3 of its neighbors are also active, the
  cube remains active. Otherwise, the cube becomes inactive.

  If a cube is inactive but exactly 3 of its neighbors are active, the cube
  becomes active. Otherwise, the cube remains inactive.
*/

const ACTIVE = '#';
const INACTIVE = '.';

/*
  field: {
    [z]: {
      [y]: [x, x, x, x]
    }
*/
class Grid3 {
  constructor(init) {
    const lines = init.trim().split('\n');
    this.field = {
      0: lines.reduce((accY, curY, y) => {
        accY[y] = curY.split('').reduce((accX, curX, x) => { accX[x] = curX; return accX; }, {});

        return accY;
      }, {}),
    };

    this.bounds = {
      min: {
        z: 0,
        y: 0,
        x: 0,
      },
      max: {
        z: 0,
        y: lines.length,
        x: lines[0].length,
      },
    };
  }

  countNeighbors = (z, y, x) => (
    // eslint-disable-next-line indent
      (this.field[z - 1]?.[y - 1]?.[x - 1] === ACTIVE ? 1 : 0)
    + (this.field[z - 1]?.[y - 1]?.[x] === ACTIVE ? 1 : 0)
    + (this.field[z - 1]?.[y - 1]?.[x + 1] === ACTIVE ? 1 : 0)
    + (this.field[z - 1]?.[y]?.[x - 1] === ACTIVE ? 1 : 0)
    + (this.field[z - 1]?.[y]?.[x] === ACTIVE ? 1 : 0)
    + (this.field[z - 1]?.[y]?.[x + 1] === ACTIVE ? 1 : 0)
    + (this.field[z - 1]?.[y + 1]?.[x - 1] === ACTIVE ? 1 : 0)
    + (this.field[z - 1]?.[y + 1]?.[x] === ACTIVE ? 1 : 0)
    + (this.field[z - 1]?.[y + 1]?.[x + 1] === ACTIVE ? 1 : 0)

    + (this.field[z]?.[y - 1]?.[x - 1] === ACTIVE ? 1 : 0)
    + (this.field[z]?.[y - 1]?.[x] === ACTIVE ? 1 : 0)
    + (this.field[z]?.[y - 1]?.[x + 1] === ACTIVE ? 1 : 0)
    + (this.field[z]?.[y]?.[x - 1] === ACTIVE ? 1 : 0)
    + (this.field[z]?.[y]?.[x + 1] === ACTIVE ? 1 : 0)
    + (this.field[z]?.[y + 1]?.[x - 1] === ACTIVE ? 1 : 0)
    + (this.field[z]?.[y + 1]?.[x] === ACTIVE ? 1 : 0)
    + (this.field[z]?.[y + 1]?.[x + 1] === ACTIVE ? 1 : 0)

    + (this.field[z + 1]?.[y - 1]?.[x - 1] === ACTIVE ? 1 : 0)
    + (this.field[z + 1]?.[y - 1]?.[x] === ACTIVE ? 1 : 0)
    + (this.field[z + 1]?.[y - 1]?.[x + 1] === ACTIVE ? 1 : 0)
    + (this.field[z + 1]?.[y]?.[x - 1] === ACTIVE ? 1 : 0)
    + (this.field[z + 1]?.[y]?.[x] === ACTIVE ? 1 : 0)
    + (this.field[z + 1]?.[y]?.[x + 1] === ACTIVE ? 1 : 0)
    + (this.field[z + 1]?.[y + 1]?.[x - 1] === ACTIVE ? 1 : 0)
    + (this.field[z + 1]?.[y + 1]?.[x] === ACTIVE ? 1 : 0)
    + (this.field[z + 1]?.[y + 1]?.[x + 1] === ACTIVE ? 1 : 0)
  )

  /*
    If a cube is active and exactly 2 or 3 of its neighbors are also active, the
    cube remains active. Otherwise, the cube becomes inactive.

    If a cube is inactive but exactly 3 of its neighbors are active, the cube
    becomes active. Otherwise, the cube remains inactive.
  */
  update = () => {
    const next = {};

    for (let z = this.bounds.min.z - 1; z <= this.bounds.max.z + 1; z += 1) {
      for (let y = this.bounds.min.y - 1; y <= this.bounds.max.y + 1; y += 1) {
        for (let x = this.bounds.min.x - 1; x <= this.bounds.max.x + 1; x += 1) {
          if (!next[z]) { next[z] = {}; }
          if (!next[z][y]) { next[z][y] = {}; }

          const cur = this.field[z]?.[y]?.[x];
          const neighbors = this.countNeighbors(z, y, x);

          if (cur === ACTIVE) {
            next[z][y][x] = (neighbors === 2 || neighbors === 3)
              ? ACTIVE
              : INACTIVE;
          } else {
            next[z][y][x] = (neighbors === 3)
              ? ACTIVE
              : INACTIVE;
          }
        }
      }
    }

    this.field = next;

    this.bounds.min.z -= 1;
    this.bounds.min.y -= 1;
    this.bounds.min.x -= 1;

    this.bounds.max.z += 1;
    this.bounds.max.y += 1;
    this.bounds.max.x += 1;
  }

  countActive = () => {
    let count = 0;

    for (let { z } = this.bounds.min; z <= this.bounds.max.z; z += 1) {
      for (let { y } = this.bounds.min; y <= this.bounds.max.y; y += 1) {
        for (let { x } = this.bounds.min; x <= this.bounds.max.x; x += 1) {
          if (this.field[z]?.[y]?.[x] === ACTIVE) {
            count += 1;
          }
        }
      }
    }

    return count;
  }
}

class Grid4 {
  constructor(init) {
    const lines = init.trim().split('\n');
    this.field = {
      0: {
        0: lines.reduce((accY, curY, y) => {
          accY[y] = curY.split('').reduce((accX, curX, x) => { accX[x] = curX; return accX; }, {});

          return accY;
        }, {}),
      },
    };

    this.bounds = {
      min: {
        w: 0,
        z: 0,
        y: 0,
        x: 0,
      },
      max: {
        w: 0,
        z: 0,
        y: lines.length,
        x: lines[0].length,
      },
    };
  }

  countNeighbors = (w, z, y, x) => {
    let count = this.field[w]?.[z]?.[y]?.[x] === ACTIVE
      ? -1
      : 0;

    for (let curW = w - 1; curW <= w + 1; curW += 1) {
      for (let curZ = z - 1; curZ <= z + 1; curZ += 1) {
        for (let curY = y - 1; curY <= y + 1; curY += 1) {
          for (let curX = x - 1; curX <= x + 1; curX += 1) {
            count += this.field[curW]?.[curZ]?.[curY]?.[curX] === ACTIVE ? 1 : 0;
          }
        }
      }
    }

    return count;
  }

  /*
    If a cube is active and exactly 2 or 3 of its neighbors are also active, the
    cube remains active. Otherwise, the cube becomes inactive.

    If a cube is inactive but exactly 3 of its neighbors are active, the cube
    becomes active. Otherwise, the cube remains inactive.
  */
  update = () => {
    const next = {};

    for (let w = this.bounds.min.w - 1; w <= this.bounds.max.w + 1; w += 1) {
      for (let z = this.bounds.min.z - 1; z <= this.bounds.max.z + 1; z += 1) {
        for (let y = this.bounds.min.y - 1; y <= this.bounds.max.y + 1; y += 1) {
          for (let x = this.bounds.min.x - 1; x <= this.bounds.max.x + 1; x += 1) {
            const cur = this.field[w]?.[z]?.[y]?.[x];
            const neighbors = this.countNeighbors(w, z, y, x);

            const nextActive = (cur === ACTIVE)
              ? (neighbors === 2 || neighbors === 3)
              : (neighbors === 3);

            if (nextActive) {
              if (!next[w]) { next[w] = {}; }
              if (!next[w][z]) { next[w][z] = {}; }
              if (!next[w][z][y]) { next[w][z][y] = {}; }

              next[w][z][y][x] = ACTIVE;
            }
          }
        }
      }
    }

    this.field = next;

    this.bounds.min.w -= 1;
    this.bounds.min.z -= 1;
    this.bounds.min.y -= 1;
    this.bounds.min.x -= 1;

    this.bounds.max.w += 1;
    this.bounds.max.z += 1;
    this.bounds.max.y += 1;
    this.bounds.max.x += 1;
  }

  countActive = () => {
    let count = 0;

    for (let { w } = this.bounds.min; w <= this.bounds.max.w; w += 1) {
      for (let { z } = this.bounds.min; z <= this.bounds.max.z; z += 1) {
        for (let { y } = this.bounds.min; y <= this.bounds.max.y; y += 1) {
          for (let { x } = this.bounds.min; x <= this.bounds.max.x; x += 1) {
            if (this.field[w]?.[z]?.[y]?.[x] === ACTIVE) {
              count += 1;
            }
          }
        }
      }
    }

    return count;
  }
}

export const a = (input) => {
  const grid = new Grid3(input);

  for (let i = 0; i < 6; i += 1) {
    grid.update();
  }

  return grid.countActive();
};

export const b = (input) => {
  const grid = new Grid4(input);

  for (let i = 0; i < 6; i += 1) {
    grid.update();
  }

  return grid.countActive();
};
