export const a = (input, slope = { x: 3, y: 1 }) => {
  const map = input.trim().split('\n');
  const WIDTH = map[0].length;
  const BOTTOM = map.length - 1;

  const current = { x: 0, y: 0 };

  let trees = 0;

  do {
    if (map[current.y][current.x] === '#') { trees += 1; }

    current.x = (current.x + slope.x + WIDTH) % WIDTH;
    current.y += slope.y;
  } while (current.y <= BOTTOM);

  return trees;
};

export const b = (input) => [
  { x: 1, y: 1 },
  { x: 3, y: 1 },
  { x: 5, y: 1 },
  { x: 7, y: 1 },
  { x: 1, y: 2 },
].reduce((acc, cur) => acc * a(input, cur), 1);
