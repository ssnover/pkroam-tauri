import React, { useState, useEffect } from "react";
import "./App.css";
import { GameSave } from "./backend/GameSave";
import { get_game_saves } from "./backend/api";
import GameSaveList from "./components/GameSaveList";

const App: React.FC = () => {
  const [gameSaves, setGameSaves] = useState<GameSave[]>([]);

  useEffect(() => {
    get_game_saves().then((saves: GameSave[]) => setGameSaves(saves));
  }, []);

  return (
    <div className="App">
      <span className="heading">PkROAM</span>
      <GameSaveList saves={gameSaves} setGameSaves={setGameSaves} />
    </div>
  );
};

export default App;
