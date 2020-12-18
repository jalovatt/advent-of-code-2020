const ops = {
  '+': (a, b) => a + b,
  '*': (a, b) => a * b,
};

const evaluateTerms = (terms, altPrecedence = false) => {
  /*
  [
    {
      start: 5,
      total: 6,
      pendingOp: '+',
  ]
  */
  const parens = [{ start: 0, total: 0, pendingOp: null }];

  // const pad = () => '  '.repeat(parens.length - 1);

  terms.forEach((t, i) => {
    if (t === ' ') { return; }

    // process.stdout.write(`\n${pad()}${t}\n`);

    if (t === '(') {
      parens.push({ start: i, total: 0, pendingOp: null });
      return;
    }

    let applyValue;

    if (ops[t]) {
      parens[parens.length - 1].pendingOp = t;
    } else if (t === ')') {
      const finished = parens.pop();

      applyValue = finished.total;

      // process.stdout.write(`${pad()}paren finished, applying ${applyValue}\n`);
    } else {
      // process.stdout.write(`${pad()}applying ${t}\n`);
      applyValue = parseInt(t, 10);
    }

    if (applyValue !== undefined) {
      // const was = parens[parens.length - 1].total;

      parens[parens.length - 1].total = parens[parens.length - 1].pendingOp
        ? ops[parens[parens.length - 1].pendingOp](parens[parens.length - 1].total, applyValue)
        : applyValue;

      // process.stdout.write(`${pad()}${was} ${parens[parens.length - 1].pendingOp} ${applyValue} => ${parens[parens.length - 1].total}\n`);

      parens[parens.length - 1].pendingOp = null;
    }
  });

  return parens[0].total;
};

export const a = (input) => {
  const parsed = input.split('\n');

  let sum = 0;

  parsed.forEach((line) => {
    const terms = line.match(/(\s|\(|\)|\d|\+|\*)/g);

    sum += evaluateTerms(terms);
  });

  return sum;
};

export const b = (input) => {
  const parsed = input.split('\n');

  let sum = 0;

  parsed.forEach((line) => {
    const terms = line.match(/(\s|\(|\)|\d|\+|\*)/g);

    sum += evaluateTerms(terms, true);
  });

  return sum;
};
