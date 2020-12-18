import loadText from '../../utilities/loadText';
import { a, b } from '.';

const title = 'No title yet';

const input = loadText('input.txt');

describe(`Day ${__filename.match(/\/([^/]+)\/spec/)[1]} - ${title}`, () => {
  xdescribe('Part 1', () => {
    describe('Tests', () => {
      test.each([
        ['2 * 3 + (4 * 5)', 26],
        ['5 + (8 * 3 + 9 + 3 * 4 * 3)', 437],
        ['5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))', 12240],
        ['((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2', 13632],
      ])('%p => %p', (given, expected) => {
        expect(a(given)).toEqual(expected);
      });
    });

    describe('Solution', () => {
      const knownSolution = 3647606140187;

      test(`${knownSolution}`, () => {
        const solution = a(input);

        expect(solution).toEqual(knownSolution);
      });
    });
  });

  describe('Part 2', () => {
    describe('Tests', () => {
      test.each([
        ['1 + (2 * 3) + (4 * (5 + 6))', 51],
        ['2 * 3 + (4 * 5)', 46],
        ['5 + (8 * 3 + 9 + 3 * 4 * 3)', 1445],
        ['5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))', 669060],
        ['((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2', 23340],
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
