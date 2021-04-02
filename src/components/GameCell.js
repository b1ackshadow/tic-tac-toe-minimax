import React from "react";

export default function GameCell({ cells, idx, handleCellClick }) {
  let cls = cells[idx] === "" ? "" : cells[idx] === "×" ? "x" : "o";
  return (
    <div
      className={"game-cell " + cls}
      onClick={() => handleCellClick(idx)}
    ></div>
  );
}
