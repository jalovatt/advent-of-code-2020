import loadText from '../../utilities/loadText';
import { a } from '.';

const title = 'Crab Cups';

const input = loadText('input.txt');

describe(`Day ${__filename.match(/\/([^/]+)\/spec/)[1]} - ${title}`, () => {
  xdescribe('Part 1', () => {
    describe('Tests', () => {
      test.each([
        [['389125467', 9, 10], 92658374],
        [['389125467', 9, 100], 67384529],
      ])('%p => %p', ([labels, cups, times], expected) => {
        expect(a(labels, cups, times)).toEqual(expected);
      });
    });

    describe('Solution', () => {
      const knownSolution = 49725386;

      test(`${knownSolution}`, () => {
        const solution = a(input, 9, 100);

        expect(solution).toEqual(knownSolution);
      });
    });
  });

  describe('Part 2', () => {
    describe('Tests', () => {
      test.each([
        [['389125467', 1000000, 10000000, true], 149245887792],
      ])('%p => %p', ([labels, cups, times], expected) => {
        expect(a(labels, cups, times, true)).toEqual(expected);
      });
    });

    describe('Solution', () => {
      const knownSolution = 538935646702;

      test(`${knownSolution}`, () => {
        const solution = a(input, 1000000, 10000000, true);

        expect(solution).toEqual(knownSolution);
      });
    });
  });
});
