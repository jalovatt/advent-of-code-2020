import loadText from '../../utilities/loadText';
import { decode, a, b } from '.';

const title = 'Binary Boarding';

const input = loadText('input.txt');

describe(`Day ${__filename.match(/\/([^/]+)\/spec/)[1]} - ${title}`, () => {
  describe('Part 1', () => {
    describe('Tests', () => {
      test.each([
        ['FBFBBFFRLR', 357],
        ['BFFFBBFRRR', 567],
        ['FFFBBBFRRR', 119],
        ['BBFFBBFRLL', 820],
      ])('%p => %p', (given, expected) => {
        expect(decode(given)).toEqual(expected);
      });
    });

    describe('Solution', () => {
      const knownSolution = 908;

      test(`${knownSolution}`, () => {
        const solution = a(input);

        expect(solution).toEqual(knownSolution);
      });
    });
  });

  describe('Part 2', () => {
    describe('Solution', () => {
      const knownSolution = 619;

      test(`${knownSolution}`, () => {
        const solution = b(input);

        expect(solution).toEqual(knownSolution);
      });
    });
  });
});
