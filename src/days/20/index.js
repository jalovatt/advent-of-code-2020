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
    W: reverseEdge(edges.E),
    S: reverseEdge(edges.N),
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

const tileTuples = {};
const matchedTiles = {};
/**
 * Returns [ [id, rotation] ]
 */
const tilesMatching = (wEdge, nEdge, tilesArr) => {
  if (!matchedTiles[wEdge]?.[nEdge]) {
    if (!matchedTiles[wEdge]) { matchedTiles[wEdge] = {}; }

    const out = [];

    // const matchDir = matchDirections[edgeDir];

    tilesArr.forEach((t) => {
      for (let i = 0; i < rotations.length - 1; i += 1) {
        const rotation = rotations[i];
        const edges = t.edges[rotation];

        if (
          (!wEdge || edges.W === wEdge)
          &&
          (!nEdge || edges.N === nEdge)
        ) {
          if (!tileTuples[t.id]?.[rotation]) {
            if (!tileTuples[t.id]) { tileTuples[t.id] = {}; }
            tileTuples[t.id][rotation] = [t.id, rotation];
          }

          out.push(tileTuples[t.id][rotation]);
        }
      }
    });

    matchedTiles[wEdge][nEdge] = out;
  }

  return matchedTiles[wEdge]?.[nEdge];
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

const getUsed = (grid) => {
  const out = {};

  for (let y = 0; y < grid.length; y += 1) {
    for (let x = 0; x < grid.length; x += 1) {
      const v = grid[y]?.[x];

      if (!v) { return out; }

      out[v[0]] = true;
    }
  }

  return out;
};

let tLast = Date.now();

let maxPos = [0, null];

const tryGrid = (grid, tiles, pos = 1) => {
  if (pos > maxPos[0]) {
    maxPos = [pos, grid];
  }

  // Full!!
  if (pos >= tiles.arr.length) { return grid; }

  const x = pos % grid.length;
  const y = Math.floor(pos / grid.length);

  const used = getUsed(grid);

  let wEdge;
  if (x > 0) {
    const [wId, wRotation] = grid[y][x - 1];
    wEdge = tiles.lookup[wId].edges[wRotation].E;
  }

  let nEdge;
  if (y > 0) {
    const [nId, nRotation] = grid[y - 1][x];
    nEdge = tiles.lookup[nId].edges[nRotation].S;
  }

  const possible = tilesMatching(wEdge, nEdge, tiles.arr).filter((p) => !used[p[0]]);

  if (pos < 20) {
    const t = Date.now();
    process.stderr.write(`   ${' '.repeat(pos)}@ ${pos}    ${possible.length} possible    (${(t - tLast) / 1000}s)\n`);
    tLast = t;
  }

  for (let i = 0; i < possible.length; i += 1) {
    const cloned = cloneGrid(grid);
    cloned[y][x] = possible[i];

    const result = tryGrid(cloned, tiles, pos + 1);

    if (result) { return result; }
  }

  return false;
};

const renderTile = (tile, rotation) => {

};

const renderImage = (grid) => {

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

  process.stderr.write(`${tiles.arr.length} tiles...`);

  for (let i = 0; i < tiles.arr.length; i += 1) {
    process.stderr.write(`\nstarting tile ${i}: ${tiles.arr[i].id}\n`);
    for (let r = 0; r < rotations.length; r += 1) {
      const baseGrid = newGrid(Math.sqrt(tiles.arr.length));

      baseGrid[0][0] = [tiles.arr[i].id, rotations[r]];

      const result = tryGrid(baseGrid, tiles);

      process.stderr.write(`  finished rotation ${r}: ${rotations[r]}\n`);

      if (result) {
        solution = result;
        break;
      }
    }

    if (solution) {
      break;
    }

    process.stderr.write(`\nfinished tile ${i}: ${tiles.arr[i].id}\n------------------------\n`);
  }

  console.log('maxPos:', maxPos[0]);
  printGrid(maxPos[1]);
  // printGrid(solution);

  // renderImage(solution, tiles.lookup);

  const solutionIDs = [
    solution[0][0],
    solution[solution.length - 1][0],
    solution[solution.length - 1][solution.length - 1],
    solution[0][solution.length - 1],
  ];

  return solutionIDs.reduce((acc, cur) => acc * parseInt(cur[0], 10), 1);
};

export const b = (input) => {};
