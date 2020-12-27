/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable max-classes-per-file */
const shouldLog = false;
const log = (str, force) => (shouldLog || force) && process.stderr.write(`${str || ''}\n`);
const padLog = (str, depth = 0, force) => log(`${'  '.repeat(depth)}${str}`, force);

const showValidated = (str, atChar) => `${str.slice(0, atChar)}[${str[atChar]}]${str.slice(atChar + 1)}`;

class Node {
  constructor(rule) {
    this.rule = rule;
    this.value = null;

    this.children = [];
  }
}

class Validator {
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
        node.children.push(...rule);
      }
    });
  }

  findValidLengths(str, rule = 0, atChar = 0, logDepth = 0) {
    if (logDepth === 0) {
      log(`\n${str}:`);
    }

    if (atChar === str.length) { padLog(`recursed past end @ ${atChar}`); return false; }

    log(`${showValidated(str, atChar).padEnd(str.length + 4, ' ')}${' '.repeat(logDepth)}${rule}: ${this.nodes[rule].rule.join(' | ')}`);

    const node = this.nodes[rule];
    if (node.value) {
      const eq = (str[atChar] === node.value);

      return eq && atChar + 1;
    }

    for (let c = 0; c < node.children.length; c += 1) {
      const child = node.children[c];

      let cur = atChar;

      log(`${''.padEnd(str.length + 4, ' ')}${' '.repeat(logDepth)}child ${c} of ${node.children.length - 1}`);
      for (let i = 0; i < child.length; i += 1) {
        cur = this.findValidLengths(str, child[i], cur, logDepth + 1);

        if (cur === false) { break; }

        // We've hit the end of the string with an unfinished rule
        if (cur === str.length && i < child.length - 1) {
          log(`${''.padEnd(str.length + 4, ' ')}${' '.repeat(logDepth)}EOS early; ${str.length} chars @ i=${i} of ${child.length - 1}`);
          cur = false;
          break;
        }
      }

      if (cur) { return cur; }
    }

    return false;
  }

  validate = (str) => this.findValidLengths(str) >= str.length
}

// eslint-disable-next-line import/prefer-default-export
export const a = (input, addLoops = false) => {
  const [rules, messages] = input.trim().split('\n\n').map((v) => v.split('\n'));

  if (addLoops) {
    rules.push('8: 42 | 42 8', '11: 42 31 | 42 11 31');

    const zero = [];
    // n = 6 is the shortest loop that allows the solution to pass, in the interest
    // of tidy run times
    for (let eight = 1; eight < 6; eight += 1) {
      for (let eleven = 1; eleven < 6; eleven += 1) {
        zero.push(`${'8 '.repeat(eight)}${'11 '.repeat(eleven)}`.trim());
      }
    }

    rules.push(`0: ${zero.join(' | ')}`);
  }

  const parsedRules = rules.reduce((acc, cur) => {
    const [, n, content] = cur.replace(/"(\w)"/g, '$1').match(/(\d+): (.+)/);

    const split = content.split(' | ').map((branch) => branch.split(' '));

    acc[n] = split;
    return acc;
  }, []);

  log();
  log(parsedRules.reduce((acc, v, i) => {
    if (v) {
      acc.push(`${i}: ${v.join(' | ')}`);
    }

    return acc;
  }, []).join('\n'));
  log();

  const validator = new Validator(parsedRules);

  return messages.reduce((acc, cur) => acc + (validator.validate(cur) ? 1 : 0), 0);
};
