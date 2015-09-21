import { get2, get3, get4, solution2, solution3, solution4 } from './immutable';
import _ from 'lodash';
import Benchmark from 'benchmark';
import { cells } from './cells-median';

const cells3 = get3(cells),
  cells2 = get2(cells),
  cells4 = get4(cells);

export function getSelectedCells(cells, selection) {
  return selection
  .map((indices=[[], []]) => {
    let [[startCol=0, startRow=0], [endCol=Infinity, endRow=Infinity]] = indices;

    // Ignore selections if they're for the entire sheet
    if (_.flatten(indices).every(i => i === -1)) {
      return [];
    }

    if (startCol === -1) {
      startCol = 0;
    }
    if (startRow === -1) {
      startRow = 0;
    }
    if (endCol === -1) {
      endCol = Infinity;
    }
    if (endRow === -1) {
      endRow = Infinity;
    }

    startCol++;
    endCol++;
    startRow++;
    endRow++;
    return cells
    .filter(cell => {
      let { column, row } = cell;
      return column >= startCol && column <= endCol && row >= startRow && row <= endRow;
    });
  });
}


function runTest(selection) {
  console.log(`Running for ${selection}`);
  const ret = getSelectedCells(cells, [selection]);
  const a = solution2(cells, [selection]);
  const b = solution3(cells, [selection]);
  // const c = solution4(cells4, [selection]);

  console.log(_.isEqual(ret[0], a[0].toJS()));
  console.log(_.isEqual(ret[0], b[0].toJS()));
  // console.log(_.isEqual(ret[0], c[0].toJS()));

  var suite = new Benchmark.Suite;
  suite.add('BrutForce lodash search', function() {
    const ret = getSelectedCells(cells, [selection]);
  })
  .add('Immutable solution 2', () => {
    const a = solution2(cells, [selection]);
  })
  .add('Immutable solution 3', () => {
    const a = solution3(cells, [selection]);
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').pluck('name'));
  }).run();
}

runTest([[0, 0], [0, 8]]);
// runTest([[0, 3], [3, 3]]);
// runTest([[2, 10], [2, Infinity]]);
