const parseInput = (input) => {
  const trimmed = input.trim().split('\n');

  const containers = {};
  const containees = {};

  trimmed.forEach((line) => {
    const [, container] = line.match(/^([a-z\s]+) bags*/);
    const matchedContainees = ([...line.matchAll(/(\d+) ([a-z\s]+) bags*/g)] || [])
      .map((v) => ({ count: parseInt(v[1], 10), color: v[2] }));

    if (!matchedContainees.length) { return; }

    if (!containers[container]) { containers[container] = []; }

    matchedContainees.forEach((c) => {
      containers[container].push(c);

      if (!containees[c.color]) { containees[c.color] = []; }

      containees[c.color].push({ count: c.count, color: container });
    });
  });

  return [containers, containees];
};

export const a = (input) => {
  const [, containees] = parseInput(input);

  const toCheck = containees['shiny gold'];
  const final = {};

  while (toCheck.length) {
    const { color } = toCheck.pop();

    final[color] = true;

    if (containees[color]) {
      toCheck.push(...containees[color]);
    }
  }

  return Object.keys(final).length;
};

export const b = (input) => {
  const [containers] = parseInput(input);

  const toCheck = containers['shiny gold'];
  let total = 0;

  while (toCheck.length) {
    const { count, color } = toCheck.pop();

    total += count;

    if (containers[color]) {
      for (let i = 0; i < count; i += 1) {
        toCheck.push(...containers[color]);
      }
    }
  }

  return total;
};
