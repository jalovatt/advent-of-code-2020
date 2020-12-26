/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable max-classes-per-file */
const shouldLog = false;
const log = (str, force) => (shouldLog || force) && process.stderr.write(`${str || ''}\n`);
const padLog = (str, depth = 0, force) => log(`${'  '.repeat(depth)}${str}`, force);

class Node {
  constructor(rule) {
    this.rule = rule;
    this.value = null;

    this.left = null;
    this.right = null;

  }
}

class Trie {
  constructor(rules) {
    this.nodes = new Array(rules.length);

    rules.forEach((rule, i) => {
      this.nodes[i] = new Node(rule);
    });

    this.nodes.forEach((node) => {
      const { rule } = node;

      // Primitive
      if (rule.length === 1 && rule[0].length === 1 && !parseInt(rule[0][0], 10)) {
        node.value = rule[0][0];
      } else {
        node.left = rule[0];
        node.right = rule[1];
      }
    });
  }

  findValidLength(str, rule = 0, atChar = 0, logDepth = 0) {
    if (logDepth === 0) {
      log(`\n${str}:`);
    }
    padLog(`${rule}, at ${atChar} = ${str[atChar]}`, logDepth);

    const node = this.nodes[rule];
    if (node.value) {
      const eq = (str[atChar] === node.value);

      padLog(`val ${node.value}, str ${str[atChar]}, eq? ${eq}`, logDepth);

      return eq && atChar + 1;
    }

    let leftAtChar = atChar;
    for (let i = 0; i < node.left.length; i += 1) {
      leftAtChar = this.findValidLength(str, node.left[i], leftAtChar, logDepth + 1);

      padLog(`i=${i}: leftAtChar = ${leftAtChar}`, logDepth + 1);

      if (leftAtChar === false) { log(); break; }
    }

    if (leftAtChar) { return leftAtChar; }

    if (!node.right) { return false; }

    let rightAtChar = atChar;
    for (let i = 0; i < node.right.length; i += 1) {
      rightAtChar = this.findValidLength(str, node.right[i], rightAtChar, logDepth + 1);

      padLog(`\ti=${i}: rightAtChar = ${rightAtChar}`, logDepth);

      if (rightAtChar === false) { log(); break; }
    }

    return rightAtChar;
  }

  validate = (str) => this.findValidLength(str) === str.length
}

export const a = (input) => {
  const [rules, messages] = input.trim().split('\n\n').map((v) => v.split('\n'));

  const parsedRules = rules.reduce((acc, cur) => {
    const [, n, content] = cur.replace(/"(\w)"/g, '$1').match(/(\d+): (.+)/);

    const split = content.split(' | ').map((branch) => branch.split(' '));

    acc[n] = split;
    return acc;
  }, []);

  log();
  log(parsedRules.map((v, i) => `${i}: ${v.join(' | ')}`).join('\n'));
  log();

  const trie = new Trie(parsedRules);

  // console.dir(trie.nodes);

  let nValid = 0;
  for (let i = 0; i < messages.length; i += 1) {
    const valid = trie.validate(messages[i]);

    if (valid) { nValid += 1; }

    log(`\n${i}: ${messages[i]}? ${valid}`);
  }

  return nValid;
};

export const b = (input) => {};
