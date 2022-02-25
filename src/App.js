import React from "react";
import "./App.css";

import Canvas from "./components/Canvas";

const App = () => {
  const [val,setVal] = React.useState(15)
  return <Canvas row={val} />;
};

export default App;
