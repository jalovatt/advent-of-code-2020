const shouldLog = false;
const log = (str, indent = 0) => shouldLog && process.stderr.write(`${'  '.repeat(indent)}${str}\n`);

const parseDecks = (input) => input.trim().split('\n\n')
  .map((deckStr) => deckStr.split('\n')
    .slice(1)
    .reverse()
    .map((v) => parseInt(v, 10)));

const play = (decks, recursive = 0) => {
  const seen = {};

  const currentCards = [];

  if (recursive) {
    log(`Game ${recursive} (0 has ${decks[0].length}, 1 has ${decks[1].length})`, recursive - 1);
  }

  while (decks[0].length && decks[1].length) {
    if (recursive) {
      const k = `${decks[0].join(',')}|${decks[1].join(',')}`;

      if (seen[k]) {
        log('0 wins (prev. order)', recursive - 1);
        return [0, decks[0]];
      }

      seen[k] = true;
    }

    currentCards[0] = decks[0].pop();
    currentCards[1] = decks[1].pop();

    // eslint-disable-next-line no-nested-ternary
    const winnerIndex = (
      recursive
      && decks[0].length >= currentCards[0]
      && decks[1].length >= currentCards[1]
    )
      ? play([
        decks[0].slice(-currentCards[0]),
        decks[1].slice(-currentCards[1]),
      ], recursive + 1)[0]
      : (currentCards[0] > currentCards[1] ? 0 : 1);

    decks[winnerIndex].unshift(currentCards[1 - winnerIndex], currentCards[winnerIndex]);
  }

  const winner = decks[0].length ? [0, decks[0]] : [1, decks[1]];

  log(`${winner[0]} wins`, recursive - 1);

  return winner;
};

export const a = (input, recursive = 0) => {
  const decks = parseDecks(input);

  const [, winningDeck] = play(decks, recursive);

  return winningDeck.reduce((acc, cur, i) => acc + (cur * (i + 1)), 0);
};

export const b = (input) => a(input, true);
