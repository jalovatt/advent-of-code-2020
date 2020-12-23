export const a = (input) => {
  const decks = input.trim().split('\n\n')
    .map((deckStr) => deckStr.split('\n').slice(1).reverse().map((v) => parseInt(v, 10)));

  const currentCards = [];

  while (decks[0].length && decks[1].length) {
    currentCards[0] = decks[0].pop();
    currentCards[1] = decks[1].pop();

    const winnerIndex = (currentCards[0] > currentCards[1]) ? 0 : 1;

    decks[winnerIndex].unshift(currentCards[1 - winnerIndex], currentCards[winnerIndex]);
  }

  const winner = decks[0].length ? decks[0] : decks[1];

  return winner.reduce((acc, cur, i) => acc + (cur * (i + 1)), 0);
};

export const b = (input) => {};
