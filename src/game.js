export function makeMove(data, row, column) {
  const options = [
    {row, column: column - 1}, {row, column: column + 1},
    {row: row - 1, column}, {row: row + 1, column}
  ];
  const result = options.find(x => data[x.row] && data[x.row][x.column] === null);
  if (result) {
    data[result.row][result.column] = data[row][column];
    data[row][column] = null;
  }
  return data;
}

function shuffle(data) {
  do {
    for (let i = 0; i < 1000000; i++) {
      data = makeMove(data, Math.floor(Math.random() * data.length), Math.floor(Math.random() * data[0].length));
    }
  } while (isSolved(data));
  return data;
}

function ordered(rows, columns) {
  const data = [];
  let counter = 1;
  for (let i = 0; i < rows; i++) {
    const row = [];
    data.push(row);
    for (let j = 0; j < columns; j++) {
      row.push(counter);
      counter++;
    }
  }
  data[rows - 1][columns - 1] = null;
  return data;
}

export function initGame(rows, columns) {
  return shuffle(ordered(rows, columns));
}

export function isSolved(data) {
  const solved = ordered(data.length, data[0].length);
  return solved.every((row, rowIndex) => row.every((column, columnIndex) => {
    return solved[rowIndex][columnIndex] === data[rowIndex][columnIndex];
  }));
}
