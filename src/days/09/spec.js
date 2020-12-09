import loadText from '../../utilities/loadText';
import { a, b } from '.';

const title = 'Encoding Error';

const input = loadText('input.txt');

describe(`Day ${__filename.match(/\/([^/]+)\/spec/)[1]} - ${title}`, () => {
  describe('Part 1', () => {
    describe('Tests', () => {
      test.each([
        ['\n35\n20\n15\n25\n47\n40\n62\n55\n65\n95\n102\n117\n150\n182\n127\n219\n299\n277\n309\n576\n', 127],
      ])('%p => %p', (given, expected) => {
        expect(a(given, 5)).toEqual(expected);
      });
    });

    describe('Solution', () => {
      const knownSolution = 167829540;

      test(`${knownSolution}`, () => {
        const solution = a(input);

        expect(solution).toEqual(knownSolution);
      });
    });
  });

  describe('Part 2', () => {
    describe('Tests', () => {
      test.each([
        ['\n35\n20\n15\n25\n47\n40\n62\n55\n65\n95\n102\n117\n150\n182\n127\n219\n299\n277\n309\n576\n', 62],
      ])('%p => %p', (given, expected) => {
        expect(b(given, 5)).toEqual(expected);
      });
    });

    describe('Solution', () => {
      const knownSolution = 28045630;

      test(`${knownSolution}`, () => {
        const solution = b(input);

        expect(solution).toEqual(knownSolution);
      });
    });
  });
});
