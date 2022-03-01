import React from "react";
import CellValue from "./cellVal";

const Cell = ({ mat, i, showVisit, visit }) => {
  return (
    <div>
      {mat[0].map((_, j) => {
        const key = i + "," + j;
        const val = visit.has(key);
        return (
          <button
            key={key}
            onClick={() => showVisit(i, j)}
            className={`${val ? "playedCell" : "cell"}`}
          >
            {val ? <CellValue value={mat[i][j]}/> : ""}
          </button>
        );
      })}
    </div>
  );
};

export default Cell;
