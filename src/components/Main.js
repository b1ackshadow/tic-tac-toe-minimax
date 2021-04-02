import React, { useState, useEffect } from "react";

import Status from "./Status";
import GameCell from "./GameCell";
import { evaluateGame, findBestMove } from "../utils";
import "../App.css";

export default function Main() {
  const [status, setStatus] = useState("X is next");

  // let tempArray = ["×", "○", "×", "○", "○", "×", "", "", ""];
  // let tempArray = ["×", "×", "", "○", "×", "×", "", "○", "○"];

  const [cells, setCell] = useState(new Array(9).fill(""));

  const [xTurn, setXTurn] = useState(true);

  const xValue = "×";
  const oValue = "○";

  let value = xTurn ? xValue : oValue;

  const [winner, setWinner] = useState("");

  useEffect(() => {
    console.log(`Winner updated ${winner}`);
    if (winner !== "") {
      setStatus(`${winner.toUpperCase()} won!`);
    } else setStatus(`${xTurn ? "X" : "O"} is next`);
  }, [winner, xTurn]);

  useEffect(() => {
    // move updated so checking minimax
    if (!xTurn) {
      console.log("Before call", cells);
      const { bestMove } = findBestMove(cells);
      let newCells = [...cells];

      newCells[bestMove] = value;
      setCell(newCells);
      setXTurn(!xTurn);

      // evaluate if winner
      setWinner(evaluateGame(newCells));
    }
    // console.log({ bestMove, bestScore });

    if (cells.filter((each) => each === "").length === 0) {
      //over no winner draw
      setStatus("Draw. Reset to play");
    }
  }, [cells, xTurn, value]);

  const handleCellClick = (index) => {
    if (cells[index] !== "" || winner !== "") return;
    let newCells = [...cells];
    newCells[index] = value;
    setCell(newCells);
    setXTurn(!xTurn);

    // evaluate if winner
    setWinner(evaluateGame(newCells));
  };

  const resetGame = () => {
    setCell(new Array(9).fill(""));
    setWinner("");
    setXTurn(true);
  };

  const gameCells = [];

  for (let i = 0; i < 9; i++) {
    gameCells.push(
      <GameCell
        key={i}
        idx={i}
        cells={cells}
        handleCellClick={handleCellClick}
      />
    );
  }

  return (
    <div className="container">
      <h1 className="title">
        Tic <span style={{ color: "white" }}>Tac</span> Toe
      </h1>
      <div className="status-action">
        <Status status={status} />
        <div className="reset" onClick={resetGame}>
          Reset
        </div>
      </div>
      <div className="game-grid">{gameCells}</div>
    </div>
  );
}
