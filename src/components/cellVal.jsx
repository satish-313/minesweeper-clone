import React from "react";

const CellValue = ({ value }) => {
  const inLine = {
    color: "",
    display: "block",
  };

  switch (value) {
    case 0:
      inLine.display = "none";
      break;
    case 1:
      inLine.color = "blue";
      break;
    case 2:
      inLine.color = "green";
      break;
    case 3:
      inLine.color = "red";
      break;
    case 4:
      inLine.color = "purple";
      break;
    case 5:
      inLine.color = "yellow";
      break;
    case 6:
      inLine.color = "teal";
      break;
    case 7:
      inLine.color = "grey";
      break;
    case 8:
      inLine.color = "black";
      break;
  }

  return (
    <span aria-label={`${value === "x" ? "Bomb" : ""}`} style={inLine}>
      {value === "x" ? "💣" : value}
    </span>
  );
};

export default CellValue;
