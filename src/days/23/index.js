class LLNode {
  constructor(value) {
    this.value = value;
    this.next = undefined;

    this.removeArrs = [];
  }

  insertAfter(nodes) {
    const oldNext = this.next;

    // eslint-disable-next-line prefer-destructuring
    this.next = nodes[0];
    // eslint-disable-next-line no-param-reassign
    nodes[nodes.length - 1].next = oldNext;
  }

  removeAfter(n) {
    if (!this.removeArrs[n]) { this.removeArrs[n] = new Array(n); }

    const out = this.removeArrs[n];
    for (let i = 0; i < n; i += 1) {
      const cur = this.next;
      out[i] = cur;

      this.next = cur.next;
    }

    return out;
  }
}

// eslint-disable-next-line import/prefer-default-export
export const a = (input, cups, times, isPartB = false) => {
  const length = Math.max(input.length, cups);

  const arr = new Array(length);

  const tempHead = new LLNode();
  let tail = tempHead;

  for (let i = 0; i < input.length; i += 1) {
    const v = parseInt(input[i], 10);
    arr[v] = new LLNode(v);
    tail.next = arr[v];

    tail = arr[v];
  }

  if (cups > input.length) {
    for (let i = 10; i <= cups; i += 1) {
      const v = parseInt(i, 10);

      arr[v] = new LLNode(v);
      tail.next = arr[v];

      tail = arr[v];
    }
  }

  let curValue = tempHead.next.value;

  tail.next = tempHead.next;

  for (let t = 0; t < times; t += 1) {
    const cur = arr[curValue];

    const pick = cur.removeAfter(3);

    let destValue = curValue - 1;
    if (destValue < 1) { destValue = length; }

    // eslint-disable-next-line no-loop-func
    while (pick.find((n) => n.value === destValue)) {
      destValue -= 1;
      if (destValue < 1) { destValue = length; }
    }

    arr[destValue].insertAfter(pick);

    curValue = cur.next.value;
  }

  if (!isPartB) {
    const out = [];
    let cur = arr[1].next;

    for (let i = 1; i < arr.length - 1; i += 1) {
      out.push(cur.value);
      cur = cur.next;
    }

    return parseInt(out.join(''), 10);
  }

  const one = arr[1];
  const j = one.next.value;
  const k = one.next.next.value;

  return j * k;
};
