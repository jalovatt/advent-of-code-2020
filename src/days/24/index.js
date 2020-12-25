const SHOULD_LOG = false;
const log = (str, should = SHOULD_LOG) => should && process.stderr.write(`${str}\n`);

class HexCursor {
  static moves = {
    e: [1, -1, 0],
    se: [0, -1, 1],
    sw: [-1, 0, 1],
    w: [-1, 1, 0],
    nw: [0, 1, -1],
    ne: [1, 0, -1],
  }

  static neighbors = Object.values(HexCursor.moves);

  static fromString = (str) => {
    const [x, y, z] = str.split(',').map((v) => parseInt(v, 10));

    return new HexCursor(x, y, z);
  }

  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  move = (dir) => {
    const vals = HexCursor.moves[dir];

    this.x += vals[0];
    this.y += vals[1];
    this.z += vals[2];
  };

  getNeighborStrings = () => HexCursor.neighbors.map(([x, y, z]) => `${this.x + x},${this.y + y},${this.z + z}`);

  toString = () => `${this.x},${this.y},${this.z}`;

  print = () => log(this.toString());
}

export const a = (input) => {
  const parsed = input.trim().split('\n');

  const black = {};

  parsed.forEach((line) => {
    const cursor = new HexCursor();

    for (let i = 0; i < line.length;) {
      const c = line[i];

      if (c === 'n' || c === 's') {
        cursor.move(`${c}${line[i + 1]}`);
        i += 2;
      } else {
        cursor.move(c);
        i += 1;
      }
    }

    const k = cursor.toString();
    black[k] = !black[k];
  });

  return black;
};

export const b = (input, times = 100) => {
  const initBlack = a(input);

  let curLookup = {};
  let curBlack = Object.entries(initBlack).reduce((acc, [k, v]) => {
    if (v) {
      const hex = HexCursor.fromString(k);
      acc.push(hex);
      curLookup[k] = hex;
    }

    return acc;
  }, []);

  for (let i = 0; i < times; i += 1) {
    const nextLookup = {};
    const nextBlack = [];
    const neighborStringCounts = {};

    // eslint-disable-next-line no-loop-func
    curBlack.forEach((cur) => {
      const neighborStrings = cur.getNeighborStrings();

      const count = neighborStrings.reduce((acc, k) => acc + (curLookup[k] ? 1 : 0), 0);

      if (count === 1 || count === 2) {
        nextBlack.push(cur);
        nextLookup[cur.toString()] = true;
      }

      neighborStrings.forEach((n) => {
        if (neighborStringCounts[n] === undefined) {
          neighborStringCounts[n] = 0;
        }

        neighborStringCounts[n] += 1;
      });
    });

    Object.entries(neighborStringCounts).forEach(([k, v]) => {
      if (v === 2 && !nextLookup[k]) {
        const hex = HexCursor.fromString(k);

        nextBlack.push(hex);
        nextLookup[k] = true;
      }
    });

    curBlack = nextBlack;
    curLookup = nextLookup;
  }

  return curBlack.length;
};
