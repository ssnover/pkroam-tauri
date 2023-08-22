import React from "react";
import "./App.css";
import SaveSelectionScreen from "./components/SaveSelectionScreen";

const App: React.FC = () => {
  return (
    <div className="App">
      <span className="heading">PkROAM</span>
      <br />
      <br />
      <SaveSelectionScreen />
    </div>
  );
};

export default App;
