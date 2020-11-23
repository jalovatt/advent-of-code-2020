import loadText from '../../utilities/loadText';
import { solve } from '.';

const title = 'No title yet';

const input = loadText('input.txt');

describe(`Day ${__filename.match(/\/([^/]+)\/spec/)[1]} - ${title}`, () => {
  describe('Part 1', () => {
    describe('Tests', () => {
      test.each([
        [1, 2],
      ])('%p => %p', (given, expected) => {
        expect(solve(given)).toEqual(expected);
      });
    });

    xdescribe('Solution', () => {
      let solution;
      let knownSolution;

      beforeAll(() => { solution = solve(input); });

      test(`${solution}`, () => {
        expect(solution).toEqual(knownSolution);
      });
    });
  });

  xdescribe('Part 2', () => {
    describe('Tests', () => {
      test.each([
        [1, 2],
      ])('%p => %p', (given, expected) => {
        expect(solve(given)).toEqual(expected);
      });
    });

    xdescribe('Solution', () => {
      let solution;
      let knownSolution;

      beforeAll(() => { solution = solve(input); });

      test(`${solution}`, () => {
        expect(solution).toEqual(knownSolution);
      });
    });
  });
});
