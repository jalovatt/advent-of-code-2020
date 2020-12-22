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
          // eslint-disable-next-line operator-linebreak
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

const tryGrid = (grid, tiles, pos = 1) => {
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

      const result = tryGrid(baseGrid, tiles);

      if (result) {
        solution = result;
        break;
      }
    }

    if (solution) {
      break;
    }
  }

  printGrid(solution);

  return [solution, tiles.lookup];
};

export const multiplyCorners = (grid) => {
  const cornerIDs = [
    grid[0][0],
    grid[grid.length - 1][0],
    grid[grid.length - 1][grid.length - 1],
    grid[0][grid.length - 1],
  ];

  return cornerIDs.reduce((acc, cur) => acc * parseInt(cur[0], 10), 1);
};

// CCW
const arrayRotations = {
  0: (y, x) => [y, x],
  90: (y, x, n) => [n - x - 1, y],
  180: (y, x, n) => [n - y - 1, n - x - 1],
  270: (y, x, n) => [x, n - y - 1],
  f0: (y, x, n) => [y, n - x - 1],
  f90: (y, x) => [x, y],
  f180: (y, x, n) => [n - y - 1, x],
  f270: (y, x, n) => [n - x - 1, n - y - 1],
};

const rotate2DArray = (arr, rotation) => {
  const out = new Array(arr.length).fill(null).map(() => new Array(arr.length));

  const rot = arrayRotations[rotation];
  const n = arr.length;

  for (let y = 0; y < n; y += 1) {
    for (let x = 0; x < n; x += 1) {
      const [yNew, xNew] = rot(y, x, n);

      out[yNew][xNew] = arr[y][x];
    }
  }

  return out;
};

const stripTileBorders = (content) => {
  const out = [];

  for (let i = 1; i < content.length - 1; i += 1) {
    out.push(content[i].slice(1, -1));
  }

  return out;
};

const renderTile = ({ content }, rotation) => {
  const stripped = stripTileBorders(content);
  const rotated = rotate2DArray(stripped, rotation);

  return rotated;
};

const renderImage = (grid, tilesLookup) => {
  const out = [];

  grid.forEach((row) => {
    const tiles = row.map((t) => renderTile(tilesLookup[t[0]], t[1]));

    for (let i = 0; i < (SIDE_LENGTH - 2); i += 1) {
      out.push([].concat(...tiles.map((t) => t[i])));
    }
  });

  return out;
};

const MONSTER = '                  # \n#    ##    ##    ###\n #  #  #  #  #  #   ';
const MONSTER_LENGTH = 20;
const MONSTER_HEIGHT = 3;
const MONSTER_SEGMENTS = 15;

const countMonsters = (() => {
  const positions = [];

  MONSTER.split('\n').forEach((line, lineIndex) => line.split('').forEach((c, cIndex) => {
    if (c === ' ') { return; }

    positions.push([lineIndex, cIndex]);
  }));

  return (image, mark = false) => {
    let count = 0;

    for (let y = 0; y < image.length - MONSTER_HEIGHT + 1; y += 1) {
      for (let x = 0; x < image.length - MONSTER_LENGTH + 1; x += 1) {
        if (positions.every(([yCheck, xCheck]) => image[y + yCheck][x + xCheck] === '#')) {
          count += 1;

          if (mark) {
            positions.forEach(([yCheck, xCheck]) => {
              // eslint-disable-next-line no-param-reassign
              image[y + yCheck][x + xCheck] = 'O';
            });
          }
        }
      }
    }

    return count;
  };
})();

export const b = (input) => {
  const [grid, tilesLookup] = a(input);

  const image = renderImage(grid, tilesLookup);

  let nMonsters = 0;
  let finalImage;

  const totalWaves = image.reduce((acc, row) => {
    for (let i = 0; i < row.length; i += 1) {
      if (row[i] === '#') {
        // eslint-disable-next-line no-param-reassign
        acc += 1;
      }
    }

    return acc;
  }, 0);

  for (let i = 0; i < rotations.length; i += 1) {
    const r = rotations[i];

    const rotated = rotate2DArray(image, r);

    const count = countMonsters(rotated, true);

    if (count) {
      [nMonsters, finalImage] = [count, rotated];
      break;
    }
  }

  // eslint-disable-next-line no-console
  console.dir(finalImage.map((row) => row.join('')).join('\n'));

  return totalWaves - (nMonsters * MONSTER_SEGMENTS);
};
