import React from "react";

import Cell from "./cell";

const Canvas = ({ row }) => {
  const [mat, setMat] = React.useState([[]]);
  const [bomb, setBomb] = React.useState([[]]);

  const generateBomb = (num) => {
    const set = new Set();
    const createBomb = [];
    while (createBomb.length < num) {
      let x = Math.floor(Math.random() * num);
      let y = Math.floor(Math.random() * num);
      let key = x + "," + y;
      if (!set.has(key)) createBomb.push([x, y]);
      set.add(key);
    }
    setBomb(createBomb);
    return createBomb;
  };

  const randomGen = (num, createBomb) => {
    let matrix = [];
    for (let i = 0; i < num; i++) {
      let subMatrix = [];
      for (let j = 0; j < num; j++) {
        subMatrix.push(0);
      }
      matrix.push(subMatrix);
    }

    for (let ele of createBomb) {
      let [x, y] = ele;
      matrix[x][y] = "x";
    }

    const direction = [
      [-1, 0],
      [1, 0],
      [0, 1],
      [0, -1],
      [-1, -1],
      [1, 1],
      [-1, 1],
      [1, -1],
    ];

    for (let x = 0; x < num; x++) {
      for (let y = 0; y < num; y++) {
        if (matrix[x][y] !== "x") {
          let count = 0;
          for (let d of direction) {
            let [r, c] = d;
            let xr = x + r,
              yc = y + c;
            if (
              xr >= 0 &&
              xr < num &&
              yc >= 0 &&
              yc < num &&
              matrix[xr][yc] === "x"
            ) {
              count += 1;
            }
          }
          matrix[x][y] = count;
        }
      }
    }

    setMat(matrix);
  };

  React.useEffect(() => {
    const createBomb = generateBomb(row);
    randomGen(row, createBomb);
  }, []);

  return (
    <div className="canvasWrapper">
      <div className="canvas">
        {mat.map((_, i) => (
          <Cell key={i} i={i} mat={mat} />
        ))}
      </div>
    </div>
  );
};

export default Canvas;
