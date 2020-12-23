import loadText from '../../utilities/loadText';
import { a, b } from '.';

const title = 'Crab Cups';

const input = loadText('input.txt');

describe(`Day ${__filename.match(/\/([^/]+)\/spec/)[1]} - ${title}`, () => {
  describe('Part 1', () => {
    describe('Tests', () => {
      test.each([
        [['389125467', 10], 92658374],
        [['389125467', 100], 67384529],
      ])('%p => %p', ([labels, times], expected) => {
        expect(a(labels, times)).toEqual(expected);
      });
    });

    describe('Solution', () => {
      const knownSolution = 49725386;

      test(`${knownSolution}`, () => {
        const solution = a(input, 100);

        expect(solution).toEqual(knownSolution);
      });
    });
  });

  xdescribe('Part 2', () => {
    describe('Tests', () => {
      test.each([
        [1, 2],
      ])('%p => %p', (given, expected) => {
        expect(b(given)).toEqual(expected);
      });
    });

    xdescribe('Solution', () => {
      const knownSolution = null;

      test(`${knownSolution}`, () => {
        const solution = b(input);

        expect(solution).toEqual(knownSolution);
      });
    });
  });
});
