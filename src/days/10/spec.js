import loadText from '../../utilities/loadText';
import { a, b } from '.';

const title = 'Adapter Array';

const input = loadText('input.txt');

describe(`Day ${__filename.match(/\/([^/]+)\/spec/)[1]} - ${title}`, () => {
  xdescribe('Part 1', () => {
    describe('Tests', () => {
      test.each([
        ['\n16\n10\n15\n5\n1\n11\n7\n19\n6\n12\n4\n', 7 * 5],
        ['\n28\n33\n18\n42\n31\n14\n46\n20\n48\n47\n24\n23\n49\n45\n19\n38\n39\n11\n1\n32\n25\n35\n8\n17\n7\n9\n4\n2\n34\n10\n3\n', 22 * 10],
      ])('%p => %p', (given, expected) => {
        expect(a(given)).toEqual(expected);
      });
    });

    describe('Solution', () => {
      const knownSolution = 2368;

      test(`${knownSolution}`, () => {
        const solution = a(input);

        expect(solution).toEqual(knownSolution);
      });
    });
  });

  describe('Part 2', () => {
    describe('Tests', () => {
      test.each([
        ['\n16\n10\n15\n5\n1\n11\n7\n19\n6\n12\n4\n', 8],
        ['\n28\n33\n18\n42\n31\n14\n46\n20\n48\n47\n24\n23\n49\n45\n19\n38\n39\n11\n1\n32\n25\n35\n8\n17\n7\n9\n4\n2\n34\n10\n3\n', 19208],

        // Additional test cases
        ['\n16\n10\n15\n5\n1\n11\n7\n19\n6\n12\n4', 8],
        ['\n1\n4\n7\n10\n', 1],
        ['\n1\n4\n5\n7\n10\n', 2],
        ['\n1\n4\n5\n7\n10\n11\n13\n', 4],
        ['\n1\n2\n3\n4\n6\n7\n8\n9\n12\n', 58],
        ['\n1\n3\n4\n5\n6\n7\n10\n', 18],
      ])('%p => %p', (given, expected) => {
        expect(b(given)).toEqual(expected);
      });
    });

    describe('Solution', () => {
      const knownSolution = 1727094849536;

      test(`${knownSolution}`, () => {
        const solution = b(input);

        expect(solution).toEqual(knownSolution);
      });
    });
  });
});
