import loadText from '../../utilities/loadText';
import { a, b } from '.';

const title = 'Ticket Translation';

const input = loadText('input.txt');

describe(`Day ${__filename.match(/\/([^/]+)\/spec/)[1]} - ${title}`, () => {
  describe('Part 1', () => {
    describe('Tests', () => {
      test.each([
        ['\nclass: 1-3 or 5-7\nrow: 6-11 or 33-44\nseat: 13-40 or 45-50\n\nyour ticket:\n7,1,14\n\nnearby tickets:\n7,3,47\n40,4,50\n55,2,20\n38,6,12\n', 71],
      ])('%p => %p', (given, expected) => {
        expect(a(given)).toEqual(expected);
      });
    });

    describe('Solution', () => {
      const knownSolution = 26988;

      test(`${knownSolution}`, () => {
        const solution = a(input);

        expect(solution).toEqual(knownSolution);
      });
    });
  });

  describe('Part 2', () => {
    describe('Tests - Identifying positions', () => {
      test.each([
        ['\nclass: 0-1 or 4-19\nrow: 0-5 or 8-19\nseat: 0-13 or 16-19\n\nyour ticket:\n11,12,13\n\nnearby tickets:\n3,9,18\n15,1,5\n5,14,9\n', { row: 11, class: 12, seat: 13 }],
      ])('%p => %p', (given, expected) => {
        expect(b(given)).toEqual(expected);
      });
    });

    describe('Solution', () => {
      const knownSolution = 426362917709;

      test(`${knownSolution}`, () => {
        const ticket = b(input);

        const solution = Object.entries(ticket)
          .filter(([k]) => k.startsWith('departure'))
          .reduce((acc, [, v]) => acc * v, 1);

        expect(solution).toEqual(knownSolution);
      });
    });
  });
});
