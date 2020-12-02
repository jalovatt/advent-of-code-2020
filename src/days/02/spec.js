import loadText from '../../utilities/loadText';
import { a, b } from '.';

const title = 'Password Philosophy';

const input = loadText('input.txt');

describe(`Day ${__filename.match(/\/([^/]+)\/spec/)[1]} - ${title}`, () => {
  describe('Part 1', () => {
    describe('Tests', () => {
      test.each([
        ['\n1-3 a: abcde\n1-3 b: cdefg\n2-9 c: ccccccccc\n', 2],
      ])('%p => %p', (given, expected) => {
        expect(a(given)).toEqual(expected);
      });
    });

    describe('Solution', () => {
      const knownSolution = 550;

      test(`${knownSolution}`, () => {
        const solution = a(input);
        expect(solution).toEqual(knownSolution);
      });
    });
  });

  describe('Part 2', () => {
    describe('Tests', () => {
      test.each([
        ['\n1-3 a: abcde\n1-3 b: cdefg\n2-9 c: ccccccccc\n', 1],
      ])('%p => %p', (given, expected) => {
        expect(b(given)).toEqual(expected);
      });
    });

    describe('Solution', () => {
      const knownSolution = 634;

      test(`${knownSolution}`, () => {
        const solution = b(input);
        expect(solution).toEqual(knownSolution);
      });
    });
  });
});
