const allNeighours = (x, y, num) => {
  const neighours = [];
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

  for (let d of direction) {
    let [r, c] = d;
    let xr = x + r,
      yc = y + c;

    if (xr >= 0 && xr < num && yc >= 0 && yc < num) {
      neighours.push([xr,yc])
    }
  }

  return neighours
};


export {allNeighours}