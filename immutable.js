import { fromJS, Map, List, Seq } from 'immutable';

function solution1(cells) {
  const map = Map(),
    map2 = map.map(function(map) {
      cells.map(function(cell) {
        map.set(List([cell.column, cell.row]), Map(cell));
      });
    });
    return map2;
}

function getSortedCells(cells) {
  return fromJS(cells).sort((a, b) => {
    if (a.get('column') > b.get('column')) return 1;
    else if (a.get('column') < b.get('column')) return -1;
    else {
      if (a.get('row') > b.get('row')) return 1;
      if (a.get('row') < b.get('row')) return -1;
    }
  });
}
export function get2(cells) {
  const cellss = fromJS(cells),
    cols = cellss.toMap()
      .groupBy(cell => cell.get('column'))
      .map(col => { return col.sortBy(cell => cell.get('row')).toIndexedSeq(); }),
    rows = cellss.toMap()
      .groupBy(cell => cell.get('row'))
      .map(row => { return row.sortBy(cell => cell.get('column')).toIndexedSeq(); });

  return Map({ cols, rows});
}
export function get3(cells) { return fromJS(cells); }
export function get4(cells) { return getSortedCells(cells).toIndexedSeq(); }

export function solution2(cs, selections) {
  const cells = get2(cs);
  return selections.map(selection => {
    let [[startCol=0, startRow=0], [endCol=Infinity, endRow=Infinity]] = selection;
    startCol++; endCol++; startRow++; endRow++;

      if (startCol === endCol) {
        return cells.get('cols').get(startCol)
          .skipWhile(cell => cell.get('row') < startRow)
          .takeWhile(cell => cell.get('row') <= endRow);
      } else if (startRow === endRow) {
        return cells.get('rows').get(startRow)
          .skipWhile(cell => cell.get('col') < startCol)
          .takeWhile(cell => cell.get('column') <= endCol);
      }
  });
}

export function solution3(cs, selections) {
  const cells = get3(cs);
  return selections.map(selection => {
    let [[startCol=0, startRow=0], [endCol=Infinity, endRow=Infinity]] = selection;
    startCol++; endCol++; startRow++; endRow++;

    return cells.filter(cell =>  {
      let column = cell.get('column'), row = cell.get('row');
      return column >= startCol && column <= endCol && row >= startRow && row <= endRow;
    });
  });
}

export function solution4(cells, selections) {
  return selections.map(selection => {
    let [[startCol=0, startRow=0], [endCol=Infinity, endRow=Infinity]] = selection;
    startCol++; endCol++; startRow++; endRow++;

    return cells.skipWhile(cell => cell.get('row') < startRow && cell.get('column') < startCol)
      .takeWhile(cell => cell.get('row') <= endRow && cell.get('column') <= endCol);
  });
}

