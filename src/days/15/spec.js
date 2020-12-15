import loadText from '../../utilities/loadText';
import { a, b } from '.';

const title = 'Rambunctious Recitation';

const input = loadText('input.txt');

describe(`Day ${__filename.match(/\/([^/]+)\/spec/)[1]} - ${title}`, () => {
  xdescribe('Part 1', () => {
    describe('Tests', () => {
      test.each([
        ['0,3,6', 436],
        // ['1,3,2', 1],
        // ['2,1,3', 10],
        // ['1,2,3', 27],
        // ['2,3,1', 78],
        // ['3,2,1', 438],
        // ['3,1,2', 1836],
      ])('%p => %p', (given, expected) => {
        expect(a(given)).toEqual(expected);
      });
    });

    xdescribe('Solution', () => {
      const knownSolution = 1238;

      test(`${knownSolution}`, () => {
        const solution = a(input);

        expect(solution).toEqual(knownSolution);
      });
    });
  });

  describe('Part 2', () => {
    describe('Tests', () => {
      test.each([
        ['0,3,6', 175594],
        ['1,3,2', 2578],
        ['2,1,3', 3544142],
        ['1,2,3', 261214],
        ['2,3,1', 6895259],
        ['3,2,1', 18],
        ['3,1,2', 362],
      ])('%p => %p', (given, expected) => {
        expect(b(given)).toEqual(expected);
      });
    });

    describe('Solution', () => {
      const knownSolution = 3745954;

      test(`${knownSolution}`, () => {
        const solution = b(input);

        expect(solution).toEqual(knownSolution);
      });
    });
  });
});
