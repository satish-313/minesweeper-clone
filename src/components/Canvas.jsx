import React from "react";

import Cell from "./cell";
import { allNeighours } from "../utils/neighbour";

const Canvas = ({ row }) => {
  const [mat, setMat] = React.useState([[]]);
  const [visit, setVisit] = React.useState(new Set());
  const [bomb, setBomb] = React.useState([]);

  const generateBomb = (num) => {
    const b = [];
    const set = new Set();
    while (set.size < num) {
      let x = Math.floor(Math.random() * num);
      let y = Math.floor(Math.random() * num);
      let key = x + "," + y;
      b.push([x, y]);
      set.add(key);
    }
    setBomb(b);
    return set;
  };

  const randomGen = (num, set) => {
    let matrix = [];
    for (let i = 0; i < num; i++) {
      let subMatrix = [];
      for (let j = 0; j < num; j++) {
        const key = i + "," + j;
        if (set.has(key)) {
          subMatrix.push("x");
        } else {
          subMatrix.push(0);
        }
      }
      matrix.push(subMatrix);
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

  const showVisit = (i, j) => {
    let key = i + "," + j;
    const tempSet = new Set(visit);

    if (!tempSet.has(key)) {
      tempSet.add(key);
    }

    if (mat[i][j] !== 0) {
      if (mat[i][j] === "x") {
        console.log("end game");
        for (let ele of bomb) {
          let [r, c] = ele;
          key = r + "," + c;
          tempSet.add(key);
        }
      }
    } else {
      const queue = [[i, j]];

      while (queue.length > 0) {
        const [r, c] = queue.shift();
        const neighbour = allNeighours(r, c, row);

        for (let n of neighbour) {
          let [nr, nc] = n;
          key = nr + "," + nc;
          if (mat[nr][nc] === 0 && !tempSet.has(key)) {
            tempSet.add(key);
            queue.push([nr, nc]);
          }
          tempSet.add(key);
        }
      }
    }

    setVisit(tempSet);
  };

  React.useEffect(() => {
    const set = generateBomb(row);
    randomGen(row, set);
  }, []);

  return (
    <div className="canvasWrapper">
      <div className="canvas">
        {mat.map((_, i) => (
          <Cell key={i} showVisit={showVisit} i={i} mat={mat} visit={visit} />
        ))}
      </div>
    </div>
  );
};

export default Canvas;
