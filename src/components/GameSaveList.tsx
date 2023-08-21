import React from "react";
import GameSaveEntry from "./GameSaveEntry";
import { GameSave } from "../backend/GameSave";
import NewSaveEntry from "./NewSaveEntry";
import RoamBoxEntry from "./RoamBoxEntry";

interface Props {
  saves: GameSave[];
  setGameSaves: React.Dispatch<React.SetStateAction<GameSave[]>>;
}

const GameSaveList: React.FC<Props> = ({ saves, setGameSaves }) => {
  return (
    <div className="savelist">
      <RoamBoxEntry />
      {saves.map((save) => (
        <GameSaveEntry save={save} />
      ))}
      <NewSaveEntry />
    </div>
  );
};

export default GameSaveList;
