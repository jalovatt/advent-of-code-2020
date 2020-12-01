import loadText from '../../utilities/loadText';
import { a, b } from '.';

const title = 'No title yet';

const input = loadText('input.txt');

describe(`Day ${__filename.match(/\/([^/]+)\/spec/)[1]} - ${title}`, () => {
  describe('Part 1', () => {
    describe('Tests', () => {
      test.each([
        [1, 2],
      ])('%p => %p', (given, expected) => {
        expect(a(given)).toEqual(expected);
      });
    });

    xdescribe('Solution', () => {
      let solution;
      let knownSolution;

      beforeAll(() => { solution = a(input); });

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
        expect(b(given)).toEqual(expected);
      });
    });

    xdescribe('Solution', () => {
      let solution;
      let knownSolution;

      beforeAll(() => { solution = b(input); });

      test(`${solution}`, () => {
        expect(solution).toEqual(knownSolution);
      });
    });
  });
});
