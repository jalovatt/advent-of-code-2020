import loadText from '../../utilities/loadText';
import { a, b } from '.';

const title = 'Crab Combat';

const input = loadText('input.txt');

describe(`Day ${__filename.match(/\/([^/]+)\/spec/)[1]} - ${title}`, () => {
  xdescribe('Part 1', () => {
    describe('Tests', () => {
      test.each([
        ['\nPlayer 1:\n9\n2\n6\n3\n1\n\nPlayer 2:\n5\n8\n4\n7\n10\n', 306],
      ])('%p => %p', (given, expected) => {
        expect(a(given)).toEqual(expected);
      });
    });

    describe('Solution', () => {
      const knownSolution = 32162;

      test(`${knownSolution}`, () => {
        const solution = a(input);

        expect(solution).toEqual(knownSolution);
      });
    });
  });

  describe('Part 2', () => {
    describe('Tests', () => {
      test.each([
        ['\nPlayer 1:\n9\n2\n6\n3\n1\n\nPlayer 2:\n5\n8\n4\n7\n10\n', 291],
      ])('%p => %p', (given, expected) => {
        expect(b(given)).toEqual(expected);
      });
    });

    describe('Solution', () => {
      const knownSolution = 32534;

      test(`${knownSolution}`, () => {
        const solution = b(input);

        expect(solution).toEqual(knownSolution);
      });
    });
  });
});
