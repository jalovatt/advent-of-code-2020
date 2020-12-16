const parseInput = (input) => {
  const parsed = input.trim().split('\n\n');

  const rulesLookup = {};
  const rulesArr = [];

  parsed[0].split('\n').forEach((rule) => {
    const [, k, l1, h1, l2, h2] = rule.match(/([\sa-z]+): (\d+)-(\d+) or (\d+)-(\d+)/);

    const values = [parseInt(l1, 10), parseInt(h1, 10), parseInt(l2, 10), parseInt(h2, 10)];
    rulesLookup[k] = values;
    rulesArr.push(values);
  });

  const ticket = parsed[1].split('\n')[1].split(',').map((v) => parseInt(v, 10));
  const tickets = parsed[2].split('\n').slice(1).map((line) => line.split(',').map((v) => parseInt(v, 10)));

  return { ticket, tickets, rulesLookup, rulesArr };
};

export const a = (input) => {
  const { tickets, rulesArr } = parseInput(input);

  const invalidValues = [];
  const validTicketIndices = [];

  const isValidNumber = (n) => rulesArr.some(([l1, h1, l2, h2]) => (
    (l1 <= n && n <= h1)
    || (l2 <= n && n <= h2)
  ));

  tickets.forEach((t) => {
    for (let i = 0; i < t.length; i += 1) {
      const v = t[i];

      if (!isValidNumber(v)) {
        invalidValues.push(v);

        return;
      }

      validTicketIndices.push(i);
    }
  });

  return invalidValues.reduce((acc, cur) => acc + cur);
};

export const b = (input) => {
  const { ticket, tickets, rulesLookup, rulesArr } = parseInput(input);

  const isValidNumber = (n) => rulesArr.some(([l1, h1, l2, h2]) => (
    (l1 <= n && n <= h1)
    || (l2 <= n && n <= h2)
  ));

  const isValidFor = (n, k) => {
    const [l1, h1, l2, h2] = rulesLookup[k];

    return (l1 <= n && n <= h1) || (l2 <= n && n <= h2);
  };

  const validTickets = tickets.filter((t) => t.every(isValidNumber));

  const ruleKeys = Object.keys(rulesLookup);
  const possiblePositionRules = new Array(ticket.length).fill().map(() => ({}));

  validTickets.forEach((t) => {
    for (let pos = 0; pos < t.length; pos += 1) {
      for (let k = 0; k < ruleKeys.length; k += 1) {
        const rule = ruleKeys[k];

        if (possiblePositionRules[pos][rule] !== false) {
          possiblePositionRules[pos][rule] = isValidFor(t[pos], rule);
        }
      }
    }
  });

  let knownCount = 0;
  const knownPositions = {};
  const knownRules = {};

  while (knownCount < ticket.length) {
    // eslint-disable-next-line no-loop-func
    possiblePositionRules.forEach((obj, pos) => {
      if (knownPositions[pos]) { return; }

      const possible = ruleKeys.filter((rule) => !knownRules[rule] && obj[rule]);

      if (possible.length === 1) {
        [knownPositions[pos]] = possible;
        knownRules[possible[0]] = true;
        knownCount += 1;
      }
    });
  }

  return ticket.reduce((acc, cur, pos) => { acc[knownPositions[pos]] = cur; return acc; }, {});
};
