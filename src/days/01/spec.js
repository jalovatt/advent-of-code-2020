import loadText from '../../utilities/loadText';
import { a, b } from '.';

const title = 'No title yet';

const input = loadText('input.txt');

describe(`Day ${__filename.match(/\/([^/]+)\/spec/)[1]} - ${title}`, () => {
  describe('Part 1', () => {
    describe('Tests', () => {
      test.each([
        ['\n1721\n979\n366\n299\n675\n1456\n', 514579],
      ])('%p => %p', (given, expected) => {
        expect(a(given)).toEqual(expected);
      });
    });

    describe('Solution', () => {
      let solution;
      const knownSolution = 751776;

      beforeAll(() => { solution = a(input); });

      test(`${solution}`, () => {
        expect(solution).toEqual(knownSolution);
      });
    });
  });

  describe('Part 2', () => {
    describe('Tests', () => {
      test.each([
        ['\n1721\n979\n366\n299\n675\n1456\n', 241861950],
      ])('%p => %p', (given, expected) => {
        expect(b(given)).toEqual(expected);
      });
    });

    describe('Solution', () => {
      let solution;
      const knownSolution = 42275090;

      beforeAll(() => { solution = b(input); });

      test(`${solution}`, () => {
        expect(solution).toEqual(knownSolution);
      });
    });
  });
});
