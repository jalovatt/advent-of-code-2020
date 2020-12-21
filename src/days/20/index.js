const util = require('util');

// eslint-disable-next-line no-console, no-unused-vars
const dir = (obj) => console.log(util.inspect(obj, {
  showHidden: false,
  depth: null,
  colors: true,
  compact: false,
}));

const SIDE_LENGTH = 10;

const reversedEdges = {};

const reverseString = (str) => {
  const out = new Array(str.length);

  for (let i = 0; i < str.length; i += 1) {
    out[i] = str[str.length - i - 1];
  }

  return out.join('');
};

const reverseEdge = (edge) => {
  if (!reversedEdges[edge]) { reversedEdges[edge] = reverseString(edge); }

  return reversedEdges[edge];
};

const transformEdges = (edges) => ({
  90: {
    N: edges.E,
    E: reverseEdge(edges.S),
    W: reverseEdge(edges.N),
    S: edges.W,
  },
  180: {
    N: reverseEdge(edges.S),
    E: reverseEdge(edges.W),
    W: reverseEdge(edges.N),
    S: reverseEdge(edges.E),
  },
  270: {
    N: reverseEdge(edges.W),
    E: edges.N,
    W: edges.S,
    S: reverseEdge(edges.E),
  },
  f0: {
    N: reverseEdge(edges.N),
    E: edges.W,
    W: edges.E,
    S: reverseEdge(edges.S),
  },
  f90: {
    N: edges.W,
    E: edges.S,
    W: edges.N,
    S: edges.E,
  },
  f180: {
    N: edges.S,
    E: reverseEdge(edges.E),
    W: reverseEdge(edges.W),
    S: edges.N,
  },
  f270: {
    N: reverseEdge(edges.E),
    E: reverseEdge(edges.N),
    W: reverseEdge(edges.S),
    S: reverseEdge(edges.W),
  },
});

/*
0
90
180
270
f0
f90
f180
f270
*/
const getAllEdgeValues = (image) => {
  const base = {
    N: image[0],
    E: image.map((line) => line[SIDE_LENGTH - 1]).join(''),
    W: image.map((line) => line[0]).join(''),
    S: image[SIDE_LENGTH - 1],
  };

  return {
    0: base,
    ...transformEdges(base),
  };
};

const rotations = ['0', '90', '180', '270', 'f0', 'f90', 'f180', 'f270'];
const directions = ['N', 'E', 'W', 'S'];
const matchDirections = { N: 'S', E: 'W', W: 'E', S: 'N' };

const matchedTiles = {};
/**
 * Returns [ [id, rotation] ]
 */
const tilesMatching = (edge, matchDir, tilesArr) => {
  if (!matchedTiles[edge]?.[matchDir]) {
    if (!matchedTiles[edge]) { matchedTiles[edge] = {}; }

    const out = [];

    // const matchDir = matchDirections[edgeDir];

    tilesArr.forEach((t) => {
      for (let i = 0; i < rotations.length - 1; i += 1) {
        const rotation = rotations[i];
        if (t.edges[rotation][matchDir] === edge) {
          out.push([t.id, rotation]);
        }
      }
    });

    matchedTiles[edge][matchDir] = out;
  }

  return matchedTiles[edge]?.[matchDir];
};

const newGrid = (length) => new Array(length).fill(null).map(() => new Array(length).fill(null));

const cloneGrid = (grid) => {
  const { length } = grid;
  const cloned = newGrid(length);

  for (let y = 0; y < length; y += 1) {
    for (let x = 0; x < length; x += 1) {
      cloned[y][x] = grid[y][x];
    }
  }

  return cloned;
};

const printGrid = (grid) => {
  const out = grid.map((row) => row.map((cell) => {
    const value = cell
      ? `${cell[0]}@${cell[1].padEnd(4, ' ')}`
      : '';

    return value.padEnd(10, ' ');
  }).join(' | '));

  // eslint-disable-next-line no-console
  console.log(`\n${out.join('\n')}\n`);
};

const filterUsed = (grid, possible) => possible.filter(([id]) => {
  for (let y = 0; y < grid.length; y += 1) {
    for (let x = 0; x < grid.length; x += 1) {
      if (grid[y][x]?.[0] === id) { return false; }
    }
  }

  return true;
});

const getUsed = (grid) => {
  const out = [];

  for (let y = 0; y < grid.length; y += 1) {
    for (let x = 0; x < grid.length; x += 1) {
      const v = grid[y]?.[x];

      if (v) { out.push(v); }
    }
  }

  return true;
};

let tLast = Date.now();

const tryGrid = (grid, tiles, pos = 1) => {
  // Full!!
  if (pos >= tiles.arr.length) { return grid; }

  if (pos < 25) {
    const t = Date.now();
    process.stderr.write(`    ${' '.repeat(pos - 1)}pos ${pos} (${(t - tLast) / 1000}s)\n`);
    tLast = t;
  }

  const x = pos % grid.length;
  const y = Math.floor(pos / grid.length);

  // console.log('pos y', y, ', x', x);

  let possible = new Set();

  // console.dir(tiles.arr);
  // const available = filterUsed(grid, tiles.arr);
  let used = getUsed(grid);

  // console.dir(available);

  if (x > 0) {
    const [wId, wRotation] = grid[y][x - 1];

    const w = tiles.lookup[wId].edges[wRotation];
    tilesMatching(w.E, 'W', tiles.arr).forEach((t) => possible.add(t));
  }

  if (y > 0) {
    const [nId, nRotation] = grid[y - 1][x];
    const n = tiles.lookup[nId].edges[nRotation];
    tilesMatching(n.S, 'N', tiles.arr).forEach((t) => possible.add(t));
  }

  possible = filterUsed(grid, Array.from(possible));
  // console.dir(possible);

  // process.stderr.write(`    ${possible.length} possible\n`);
  // if (pos === 1) {
  // process.stderr.write(`    pos ${pos}, ${possible.length} possible\n`);
  // }

  for (let i = 0; i < possible.length; i += 1) {
    const cloned = cloneGrid(grid);
    cloned[y][x] = possible[i];

    const result = tryGrid(cloned, tiles, pos + 1);

    if (result) { return result; }
  }

  return false;
};

// Uses global memoization, so the test and solution must be run in isolation
export const a = (input) => {
  const tiles = input.trim().split('\n\n').reduce((acc, t) => {
    const [label, ...content] = t.split('\n');

    const id = label.match(/(\d+)/)[1];

    content.forEach((line, i) => { content[i] = line.replace(/./g, (v) => (v === '#' ? 1 : 0)); });

    const edges = getAllEdgeValues(content);

    const obj = { id, content, edges };

    acc.arr.push(obj);
    acc.lookup[id] = obj;

    return acc;
  }, { arr: [], lookup: {} });

  let solution;

  for (let i = 0; i < tiles.arr.length; i += 1) {
    for (let r = 0; r < rotations.length; r += 1) {
      const baseGrid = newGrid(Math.sqrt(tiles.arr.length));

      baseGrid[0][0] = [tiles.arr[i].id, rotations[r]];

      // printGrid(baseGrid);

      const result = tryGrid(baseGrid, tiles);

      process.stderr.write(`  finished rotation ${r}: ${rotations[r]}\n`);

      if (result) {
        solution = result;
        break;
      }
    }

    process.stderr.write(`finished tile ${i}: ${tiles.arr[i].id}\n`);
    if (i > 10) return;
  }

  // printGrid(solution);

  const solutionIDs = [
    solution[0][0],
    solution[solution.length - 1][0],
    solution[solution.length - 1][solution.length - 1],
    solution[0][solution.length - 1],
  ];

  return solutionIDs.reduce((acc, cur) => acc * parseInt(cur[0], 10), 1);
};

export const b = (input) => {};
