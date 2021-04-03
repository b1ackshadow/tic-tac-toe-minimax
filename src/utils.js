const findBestMove = (board) => {
  //find a best possible move considering the current board state
  // now its time for minimizer
  let bestScore = Number.POSITIVE_INFINITY;
  let bestMove = null;

  //calc depth so that we can limit minimax function.
  //can  do so by checking how many values are already filled

  const depth = board.filter((each) => each === "").length;

  board.forEach((cell, idx) => {
    // check the score for each possible move

    //check if cell it not empty
    if (cell !== "") return;

    // if cell not empty pretent to make this move and get the score from minimax
    const boardCopy = [...board];
    boardCopy[idx] = "○";

    //3rd arg true is the indicator of whose turn i.e, maximizer
    let score = minimax(boardCopy, depth - 1, true);

    console.log(`Move : ${idx + 1} Score : ${score} \n\n`);
    if (score < bestScore) {
      bestScore = score;
      bestMove = idx;
    }
  });
  console.log("");
  return { bestMove, bestScore };
};

const minimax = (board, depth, isMaximizerTurn) => {
  //check for winner
  const result = evaluateGame(board);

  if (result !== "") {
    // console.log(board, depth);
    return result === "×" ? depth + 1 : -depth - 1;
  }

  //if depth reached and there is no more moves and no winner so tie
  if (depth === 0) return depth / 2;

  // No winner and can play still. so check recursively

  if (isMaximizerTurn) {
    let bestScore = Number.NEGATIVE_INFINITY;
    board.forEach((cell, idx) => {
      // check the score for each possible move

      //check if cell it not empty
      if (cell !== "") return;

      // if cell not empty pretent to make this move and get the score from minimax
      const boardCopy = [...board];
      boardCopy[idx] = "×";

      //3rd arg true is the indicator of whose turn i.e, maximizer
      let score = minimax(boardCopy, depth - 1, false);
      // console.log(`Move : ${idx} Score: ${score}`);
      if (score > bestScore) {
        bestScore = score;
      }
    });
    return bestScore;
  } else {
    let bestScore = Number.POSITIVE_INFINITY;
    board.forEach((cell, idx) => {
      // check the score for each possible move

      //check if cell it not empty
      if (cell !== "") return;

      // if cell not empty pretent to make this move and get the score from minimax
      const boardCopy = [...board];
      boardCopy[idx] = "○";

      //3rd arg true is the indicator of whose turn i.e, maximizer
      let score = minimax(boardCopy, depth - 1, true);
      if (score < bestScore) {
        bestScore = score;
      }
    });
    return bestScore;
  }
};

const possibleCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const evaluateGame = (cells) => {
  for (let combination of possibleCombinations) {
    const [x, y, z] = combination;
    if (cells[x] !== "" && cells[x] === cells[y] && cells[y] === cells[z]) {
      return cells[x];
    }
  }
  return "";
};

export { evaluateGame, findBestMove };
