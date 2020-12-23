const modAdd = (n, v) => (v + n) % n;

const LENGTH = 9;

const shouldLog = false;
const log = (str) => { if (shouldLog) { process.stderr.write(`${str}\n`); } };

const wrapValue = (v) => {
  let out = v - 1;
  if (out < 1) { out = 9; }

  return out;
};

export const a = (input, times) => {
  const arrays = [input.split('').map((v) => parseInt(v, 10)), new Array(input.length)];

  const arr = arrays[0];

  const modLength = modAdd.bind(undefined, LENGTH);

  let curIndex = 0;

  for (let t = 0; t < times; t += 1) {
    log(`\n${t}:\n${arr.join(' ')}`);
    const curValue = arr[curIndex];

    log(`cur = ${curValue} @ ${curIndex}`);

    const picked = arr.splice(curIndex + 1, 3);

    if (picked.length < 3) {
      picked.push(...arr.splice(0, 3 - picked.length));
    }

    log(`picked ${picked.join(', ')}`);
    log(`rest ${arr.join(' ')}`);

    let destIndex = -1;
    let destValue = modLength(curValue - 1);
    if (destValue < 1) { destValue = 9; }

    while (destIndex === -1) {
      destIndex = arr.indexOf(destValue);

      log(`    dest? ${arr[destIndex]} @ ${destIndex} (looking for ${destValue})`);

      destValue = modLength(destValue - 1);

      if (!destValue || destValue < 1) { destValue = 9; }
    }

    log(`dest ${arr[destIndex]} @ ${destIndex}`);

    arr.splice(destIndex + 1, 0, ...picked);

    const newCurIndex = arr.indexOf(curValue);
    curIndex = modLength(newCurIndex + 1);

    log(`cur cup now at ${newCurIndex}`);

    log(`${arr.join(' ')}`);
  }

  log(`\nfinal:\n${arr.join(' ')}`);

  const start = arr.indexOf(1) + 1;

  const out = [];

  for (let i = 0; i < arr.length - 1; i += 1) {
    out.push(arr[modLength(start + i)]);
  }

  return parseInt(out.join(''), 10);
  // let fromArray = 0;
  // let curIndex = 0;

  // for (let t = 0; t < 2 /* times */; t += 1) {
  //   const [from, to] = [arrays[fromArray], arrays[1 - fromArray]];

  //   log(`\n${t}:\n${from.join(' ')}`);

  //   const pickIndices = [curIndex + 1, curIndex + 2, curIndex + 3];

  //   let destIndex;
  //   let destValue = modLength(from[curIndex] - 1);

  //   do {
  //     destIndex = from.indexOf(destValue);
  //     destValue = modLength(destValue - 1);
  //   } while (modLength(destIndex - curIndex) < 3 && modLength(destIndex - curIndex) !== curIndex);

  //   log(`dest ${from[destIndex]}@${destIndex}`);

  //   to[modLength(destIndex - 3)] = from[destIndex];
  //   log(`\n${to[destIndex]}@${[destIndex]}`);

  //   log('picks:');
  //   for (let i = 1; i < 4; i += 1) {
  //     const toIndex = modLength(destIndex + i);
  //     const fromIndex = modLength(curIndex + i);
  //     log(`${from[fromIndex]}@${toIndex}`);
  //     to[toIndex] = from[fromIndex];
  //   }

  //   for (let i = 5; i < 10; i += 1) {
  //     to[modLength(destIndex + i)] = from[modLength(destIndex + i - 4)];
  //   }

  //   console.dir(to);

  //   curIndex = modLength(curIndex + 1);
  //   fromArray = 1 - fromArray;
  // }
};

export const b = (input) => {};
