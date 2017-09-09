const subReverse = array => {
  return array.map(subArr => subArr.reverse()).reverse();
}

const GetWinningTiles = (squares, tileToWin, boardSize, limit) => {
  let mappedMinors = minorIndicesFromMajor(boardSize);
  mappedMinors = mappedMinors.concat(subReverse(mappedMinors));
  const resultMajor = {
    tileStyle: Array(squares.length).fill(0),
    lines: {
      'X': 0,
      'O': 0
    }
  }
  //To keep previous winning tiles indices
  const alreadyUsed = resultMajor.tileStyle.slice();
  mappedMinors.forEach(mappedGrid => {
    //Create a minor board from a patch of major board without 'used'(won) tiles
    const currentMinor = mappedGrid.map(val => (
      !alreadyUsed[val] ? squares[val] : ''
    ))
    const result = checkForWin(currentMinor, tileToWin);
    //If result has a winner
    if (result.toEnd) {
      //Add winning tiles to alreadyUsed
      mappedGrid.forEach((val, ind) => {
        //map minor board's winning tiles to major board
        if (result.tileStyle[ind] === 2) {
          alreadyUsed[val] = true;
          const teamNumber = result.toEnd === 'X' ? 2 : 3
          resultMajor.tileStyle[val] = teamNumber;
        }
      })
      //tally score to resultMajor
      resultMajor.lines[result.toEnd] += 1;
      mappedGrid.forEach((val,ind) => {

      })
    }
  });
  resultMajor.toEnd = false;
  const [X, O] = [resultMajor.lines.X, resultMajor.lines.O];
  resultMajor.toEnd = X === limit ? 'X' : O === limit ? 'O' : false;
  if (resultMajor.toEnd) {
    const teamNumber = resultMajor.toEnd === 'X' ? 2 : 3
    resultMajor.tileStyle = resultMajor.tileStyle.map((val, ind) => (
      val === teamNumber ? val : squares[ind] === resultMajor.toEnd ? 1 : 0
    ));
  }
  return resultMajor
}
const minorIndicesFromMajor = (major, minor=3) => {
  const getMinor = startIndex => {
    let entry = Array(minor**2).fill(0), i=startIndex, row=0;
    entry = entry.map(() => {
      if (row === minor) {
        row = 0;
        i += major - minor
      }
      row++
      return i++;
    })
    return entry;
  }
  let boxes = Array((major-2)**2).fill(0), i=0, row=0;
  return boxes.map(() => {
    if ((i - major*row) + 3 > major) {
      i += 2;
      row++;
    }
    return getMinor(i++)
  })
}

const checkForWin = (squares, tileToWin) => {
  const result = {
    tileStyle: null,
    toEnd: false
  };
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
    [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
  ];
  // Check if the played move has created a line.
  lines.forEach(line => {
    const [a, b, c] = line;
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      // Set up board tileStyle to highlight winning team and combo
      if (result.tileStyle === null) {
        result.tileStyle = squares.map((tile, ind) => {
          line.forEach(win => {
            if (ind === win) {
              // All tiles in combo get 2,
              tile = 2;
            }
          });
          return tile;
        });
        result.toEnd = squares[a];
      }
    }
  });
  // No winner so no highlights;
  return result;
}
export default GetWinningTiles;
