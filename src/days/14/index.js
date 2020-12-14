export const a = (input) => {
  const parsed = input.trim().split('\n');

  const mem = {};
  let mask = '';

  for (let i = 0; i < parsed.length; i += 1) {
    // mask = 011011X11X11100101XX0XX0100100000X0X
    if (parsed[i][1] === 'a') {
      mask = parsed[i].slice(7);

    // mem[15511] = 1222721
    } else {
      const [, addr, value] = parsed[i].match(/(\d+)\] = (\d+)/);

      const bin = parseInt(value, 10).toString(2).padStart(mask.length, '0').split('');

      for (let k = 0; k < mask.length; k += 1) {
        if (mask[k] !== 'X') {
          bin[k] = mask[k];
        }
      }

      mem[addr] = bin.join('');
    }
  }

  return Object.values(mem).reduce((acc, cur) => acc + parseInt(cur, 2), 0);
};

const allBinAddresses = (binAddr) => {
  let possible = [binAddr];

  const xes = binAddr.reduce((acc, cur, i) => {
    if (cur === 'X') { acc.push(i); }

    return acc;
  }, []);

  for (let i = 0; i < xes.length; i += 1) {
    const next = [];

    const xIndex = xes[i];

    for (let k = 0; k < possible.length; k += 1) {
      const one = [...possible[k]];
      one[xIndex] = '1';

      const zero = [...possible[k]];
      zero[xIndex] = '0';

      next.push(one, zero);
    }

    possible = next;
  }

  return possible;
};

export const b = (input) => {
  const parsed = input.trim().split('\n');

  const mem = {};
  let mask = '';

  for (let i = 0; i < parsed.length; i += 1) {
    // mask = 011011X11X11100101XX0XX0100100000X0X
    if (parsed[i][1] === 'a') {
      mask = parsed[i].slice(7);

    // mem[15511] = 1222721
    } else {
      const [, addr, value] = parsed[i].match(/(\d+)\] = (\d+)/);

      const binAddr = parseInt(addr, 10).toString(2).padStart(mask.length, '0').split('');

      for (let k = 0; k < mask.length; k += 1) {
        if (mask[k] !== '0') {
          binAddr[k] = mask[k];
        }
      }

      allBinAddresses(binAddr).forEach((address) => { mem[address.join('')] = parseInt(value, 10); });
    }
  }

  return Object.values(mem).reduce((acc, cur) => acc + cur);
};
