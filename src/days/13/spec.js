import loadText from '../../utilities/loadText';
import { a, b } from '.';

const title = 'Shuttle Search';

const input = loadText('input.txt');

describe(`Day ${__filename.match(/\/([^/]+)\/spec/)[1]} - ${title}`, () => {
  describe('Part 1', () => {
    describe('Tests', () => {
      test.each([
        ['\n939\n7,13,x,x,59,x,31,19\n', 295],
      ])('%p => %p', (given, expected) => {
        expect(a(given)).toEqual(expected);
      });
    });

    describe('Solution', () => {
      const knownSolution = 102;

      test(`${knownSolution}`, () => {
        const solution = a(input);

        expect(solution).toEqual(knownSolution);
      });
    });
  });

  describe('Part 2', () => {
    describe('Tests', () => {
      test.each([
        // Numbers written as 1234n === BigInt(1234)
        ['\n939\n7,13,x,x,59,x,31,19\n', 1068781n],
        ['\n000\n17,x,13,19\n', 3417n],
        ['\n000\n67,7,59,61\n', 754018n],
        ['\n000\n67,x,7,59,61\n', 779210n],
        ['\n000\n67,7,x,59,61\n', 1261476n],
        ['\n000\n1789,37,47,1889\n', 1202161486n],
      ])('%p => %p', (given, expected) => {
        expect(b(given)).toEqual(expected);
      });
    });

    describe('Solution', () => {
      const knownSolution = 327300950120029n;

      test(`${knownSolution}`, () => {
        const solution = b(input);

        expect(solution).toEqual(knownSolution);
      });
    });
  });
});
