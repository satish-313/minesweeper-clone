import React from "react";

const Cell = ({ mat, i }) => {
  const print = (i, j) => {
    console.log(mat[i][j]);
  };

  return (
    <div>
      {mat[0].map((_, j) => (
        <button onClick={() => print(i, j)} key={j} className="cell">
          {mat[i][j]}
        </button>
      ))}
    </div>
  );
};

export default Cell;
