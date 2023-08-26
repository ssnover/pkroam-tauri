import React from "react";
import GameSaveEntry from "./GameSaveEntry";
import { GameSave } from "../../backend/GameSave";
import NewSaveEntry from "./NewSaveEntry";
import RoamBoxEntry from "./RoamBoxEntry";

interface Props {
  saves: GameSave[];
  setGameSaves: React.Dispatch<React.SetStateAction<GameSave[]>>;
  setShowSelectedSavePopup: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedSave: React.Dispatch<React.SetStateAction<GameSave | null>>;
  setRoamSelected: React.Dispatch<React.SetStateAction<boolean>>;
  setNewSaveSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameSaveList: React.FC<Props> = ({
  saves,
  setGameSaves,
  setShowSelectedSavePopup,
  setSelectedSave,
  setRoamSelected,
  setNewSaveSelected,
}) => {
  return (
    <div className="savelist">
      <RoamBoxEntry setRoamSelected={setRoamSelected} />
      {saves
        .filter((save) => save.connected)
        .map((save) => (
          <GameSaveEntry
            save={save}
            setShowSelectedSavePopup={setShowSelectedSavePopup}
            setSelectedSave={setSelectedSave}
          />
        ))}
      <NewSaveEntry setNewSaveSelected={setNewSaveSelected} />
    </div>
  );
};

export default GameSaveList;
