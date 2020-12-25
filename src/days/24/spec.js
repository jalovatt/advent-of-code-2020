import loadText from '../../utilities/loadText';
import { a, b } from '.';

const title = 'Lobby Layout';

const input = loadText('input.txt');

const testSteps = '\nsesenwnenenewseeswwswswwnenewsewsw\nneeenesenwnwwswnenewnwwsewnenwseswesw\nseswneswswsenwwnwse\nnwnwneseeswswnenewneswwnewseswneseene\nswweswneswnenwsewnwneneseenw\neesenwseswswnenwswnwnwsewwnwsene\nsewnenenenesenwsewnenwwwse\nwenwwweseeeweswwwnwwe\nwsweesenenewnwwnwsenewsenwwsesesenwne\nneeswseenwwswnwswswnw\nnenwswwsewswnenenewsenwsenwnesesenew\nenewnwewneswsewnwswenweswnenwsenwsw\nsweneswneswneneenwnewenewwneswswnese\nswwesenesewenwneswnwwneseswwne\nenesenwswwswneneswsenwnewswseenwsese\nwnwnesenesenenwwnenwsewesewsesesew\nnenewswnwewswnenesenwnesewesw\neneswnwswnwsenenwnwnwwseeswneewsenese\nneswnwewnwnwseenwseesewsenwsweewe\nwseweeenwnesenwwwswnew\n';

describe(`Day ${__filename.match(/\/([^/]+)\/spec/)[1]} - ${title}`, () => {
  xdescribe('Part 1', () => {
    describe('Tests', () => {
      test.each([
        ['\nnwwswee\n', 1],
        [testSteps, 10],
      ])('%p => %p', (given, expected) => {
        const black = a(given);

        const n = Object.values(black).filter(Boolean).length;
        expect(n).toEqual(expected);
      });
    });

    describe('Solution', () => {
      const knownSolution = 326;

      test(`${knownSolution}`, () => {
        const black = a(input);
        const solution = Object.values(black).filter(Boolean).length;

        expect(solution).toEqual(knownSolution);
      });
    });
  });

  describe('Part 2', () => {
    describe('Tests', () => {
      test.each([
        [1, 15],
        [2, 12],
        [3, 25],
        [4, 14],
        [5, 23],
        [6, 28],
        [7, 41],
        [8, 37],
        [9, 49],
        [10, 37],
        [20, 132],
        [30, 259],
        [40, 406],
        [50, 566],
        [60, 788],
        [70, 1106],
        [80, 1373],
        [90, 1844],
        [100, 2208],
      ])('%p => %p', (given, expected) => {
        expect(b(testSteps, given)).toEqual(expected);
      });
    });

    describe('Solution', () => {
      const knownSolution = 3979;

      test(`${knownSolution}`, () => {
        const solution = b(input, 100);

        expect(solution).toEqual(knownSolution);
      });
    });
  });
});
